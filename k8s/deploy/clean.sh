#!/bin/zsh
SCRIPT_PATH="${0:A:h}"

NAMESPACE=mapapp

function listImages() {
  podman images -f reference='localhost/mapapp/*' --format="{{.Repository}}:{{.Tag}}"
}

function deleteImages() {
  for image in $(listImages); do
    echo "Deleting image from kind: $image"
    podman exec -it kind-control-plane crictl rmi "$image"
  done
}

if ! kubectl get ns $NAMESPACE &>/dev/null; then
  kubectl create ns $NAMESPACE
  kubectl label namespace $NAMESPACE istio-injection=enabled
fi

kubectl config set-context "$(kubectl config current-context)" --namespace=$NAMESPACE

for apply_yml in "$SCRIPT_PATH"/../../services/*/k8s/*.yml "$SCRIPT_PATH"/../../ui/k8s/*.yml "$SCRIPT_PATH"/hazelcast/*.yml; do
  kubectl delete -f "$apply_yml"
done

kubectl delete secret mc-secret

deleteImages