#!/bin/zsh
SCRIPT_PATH="${0:A:h}"

NAMESPACE=mapapp

function listImages() {
  podman images -f reference='localhost/mapapp/*' --format="{{.Repository}}:{{.Tag}}"
}

function deleteImages() {
  for image in $(listImages); do
    echo -e "\n> Deleting image: $image"
    for node in $(kubectl get nodes -o jsonpath={..metadata.name}); do
      podman exec -it "$node" crictl rmi "$image"
    done
    podman rmi -f "$image"
  done
}

function deleteHazelcast() {
  for apply_yml in "$SCRIPT_PATH"/../../services/*/k8s/*.yml "$SCRIPT_PATH"/../../ui/k8s/*.yml "$SCRIPT_PATH"/hazelcast/*.yml; do
    kubectl delete -f "$apply_yml"
  done

  kubectl delete secret mc-secret
}

function deleteKeycloak() {
  kubectl delete -f "$SCRIPT_PATH"/keycloak/gateway.yml
  helm delete keycloak
  kubectl delete secret kc-secret
  kubectl delete persistentvolumeclaims data-keycloak-postgresql-0
  kubectl delete configmap keycloak-realm
}

function deleteServices() {
  for apply_yml in "$SCRIPT_PATH"/../../services/*/k8s/*.yml "$SCRIPT_PATH"/../../ui/k8s/*.yml; do
    kubectl delete -f "$apply_yml" --all
  done
}

kubectl config set-context --current --namespace=$NAMESPACE

deleteImages &&
  deleteServices &&
  deleteHazelcast &&
  deleteKeycloak

kubectl delete secrets --all
kubectl delete -f "$SCRIPT_PATH"/istio/gateways.yml