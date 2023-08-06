#!/bin/zsh
SCRIPT_PATH="${0:A:h}"

NAMESPACE=mapapp

podman start kind-control-plane kind-worker

if ! kubectl get ns $NAMESPACE &>/dev/null; then
  kubectl create ns $NAMESPACE
  kubectl label namespace $NAMESPACE istio-injection=enabled
fi

kubectl config set-context "$(kubectl config current-context)" --namespace=$NAMESPACE

kubectl create secret generic mc-secret --from-env-file="$SCRIPT_PATH"/hazelcast/deploy.env

for apply_yml in "$SCRIPT_PATH"/hazelcast/*.yml "$SCRIPT_PATH"/../../services/*/k8s/*.yml "$SCRIPT_PATH"/../../ui/k8s/*.yml; do
  kubectl apply -f "$apply_yml"
done

kubectl create configmap keycloak-realm --from-file=realm.json="$SCRIPT_PATH"/keycloak/realm.json
kubectl create secret generic --from-env-file="$SCRIPT_PATH"/keycloak/keycloak.env kc-secret
helm install keycloak -f "$SCRIPT_PATH"/keycloak/values.yaml oci://registry-1.docker.io/bitnamicharts/keycloak
kubectl apply -f "$SCRIPT_PATH"/keycloak/gateway.yml