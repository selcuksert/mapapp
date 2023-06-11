#!/bin/zsh
SCRIPT_PATH="${0:A:h}"

NAMESPACE=mapapp

if ! kubectl get ns $NAMESPACE &>/dev/null; then
  kubectl create ns $NAMESPACE
  kubectl label namespace $NAMESPACE istio-injection=enabled
fi

kubectl config set-context "$(kubectl config current-context)" --namespace=$NAMESPACE

for apply_yml in "$SCRIPT_PATH"/hazelcast/*.yml "$SCRIPT_PATH"/../../services/*/k8s/*.yml "$SCRIPT_PATH"/../../ui/k8s/*.yml; do
  kubectl apply -f "$apply_yml"
done
