# World Population Statistics Portal on Istio
A project to display population statistics on a map based on [UN Population Division](https://www.un.org/development/desa/pd/) data. The stack is deployable on Istio service mesh and leverages [Leaflet](https://leafletjs.com/), [Next.js](https://nextjs.org/), [Quarkus](https://quarkus.io/) and [Hazelcast](https://hazelcast.com/). 

This documentation provides guidelines on installation, configuration and architectural details.

## Installation Guidelines
This section is for revealing installation details for underpinning technologies required by project. The development is done on MacBook so guideline may require MacOS based instruction sets. For different platforms please follow technology vendors' installation guidelines.

### JRE and Maven
This project requires Java SE 17 installed and registered for [Maven](https://maven.apache.org/). Install Maven and set JAVA_OPTS environment variable with the path of Java 17 installation.

### Podman
As containerization engine [podman](https://podman.io/) is used:

- Install podman, podman-desktop and podman-compose: 
  ```shell
  brew install podman
  brew install --cask podman-desktop
  brew install podman-compose
  ```
- Configure podman VM as follows in order to sustain Istio service mesh:
  ```shell
  podman machine init --cpus 4 --memory 8192 --disk-size 100
  podman machine start
  podman system connection default podman-machine-default-root
  ```
- Validate whether podman VM is up&running:
  ```shell
  podman info
  ```
  Output:
  ```text
  NAME                    VM TYPE     CREATED        LAST UP            CPUS        MEMORY      DISK SIZE
  podman-machine-default  qemu        3 minutes ago  Currently running  4           5.369GB     64.42GB
  ```

### kind
`Starting tunnel for service istio-ingressgateway.`

As Kubernetes(k8s) engine [kind](https://kind.sigs.k8s.io/) is used that is a convenient way to have a Kubernetes cluster for local development.

- Install kind using `brew`:
  ```shell
  brew install kind
  ```
- Install `kubectl` using brew:
  ```shell
  brew install kubectl
  ```
- Add following entry into `~/.zshrc` to have kubectl completion automatically in your terminal:
  ```shell
  source <(kubectl completion zsh)
  ``` 
- Add following entry into `~/.zshrc` to enable podman provider for kind:
  ```shell
  KIND_EXPERIMENTAL_PROVIDER=podman  
  ```
- Install a new k8s cluster on kind using custom configuration [cluster-config.yml](./k8s/kind/cluster-config.yml) that is to forward ports from the host to an ingress controller running on a node:
  ```shell
  kind create cluster --config=./k8s/kind/cluster-config.yml
  ```
- Check whether cluster is available:
  ```shell
  kind get clusters
  ```
  Output:
  ```text
  enabling experimental podman provider
  kind
  ```
  ```shell
  kubectl cluster-info --context kind-kind
  ```
  Output:
  ```text
  Kubernetes control plane is running at https://127.0.0.1:51040
  CoreDNS is running at https://127.0.0.1:51040/api/v1/namespaces/kube-system/services/kube-dns:dns/proxy
  
  To further debug and diagnose cluster problems, use 'kubectl cluster-info dump'.
  ```

### Istio
As service mesh [Istio](https://istio.io/) is used:
- Install binaries of latest version with following commands:
  ```shell
  cd /usr/local/opt/
  curl -L https://istio.io/downloadIstio | sh -
  mkdir -p ~/completions && istioctl collateral --zsh -o ~/completions
  ISTIO_VERSION="$(curl -sL https://github.com/istio/istio/releases | \
                  grep -o 'releases/[0-9]*.[0-9]*.[0-9]*/' | sort -V | \
                  tail -1 | awk -F'/' '{ print $2}')"
  echo -n "\nISTIO_HOME=/usr/local/opt/istio-${ISTIO_VERSION}" >> ~/.zshrc
  ```
- Add following entries into `~/.zshrc`:
  ```shell
  export PATH="$PATH:${ISTIO_HOME}/bin"
  source ~/completions/_istioctl
  ```
- In a new terminal session validate Istio installation:
  ```shell
  istioctl x precheck
  ```
  Output should be (for v1.18.0):
  ```text
  ✔ No issues found when checking the cluster. Istio is safe to install or upgrade!
  To get started, check out https://istio.io/latest/docs/setup/getting-started/
  ```
- Install Istio components with demo profile (see available [profiles](https://istio.io/latest/docs/setup/additional-setup/config-profiles/) for details) into k8s cluster:
  ```shell
  istioctl install --set profile=demo -y
  ```
  Output should be (for v1.18.0):
  ```text
  ✔ Istio core installed
  ✔ Istiod installed
  ✔ Egress gateways installed
  ✔ Ingress gateways installed
  ✔ Installation complete
  ```
- Add a new namespace for project:
  ```shell
  kubectl create namespace mapapp
  ```
  Output:
  ```text
  namespace/mapapp created
  ```
- To enable auto sidecar proxy injection of Istio add following label to namespace that is used for project:
  ```shell
  kubectl label namespace mapapp istio-injection=enabled
  ```
  Output:
  ```text
  namespace/mapapp labeled
  ```
- Verify Istio installation:
  ```shell
  istioctl verify-install
  ```
  The end of output should be:
  ```text
  ✔ Istio is installed and verified successfully
  ```
#### Ingress Setup
To launch deployments on Istio, an ingress controller needs to be deployed on cluster. This setup leverages [Nginx Ingress Controller](https://docs.nginx.com/nginx-ingress-controller/):
- Apply Nginx ingress controller objects via official yaml for kind:
  ```shell
  kubectl apply -f https://raw.githubusercontent.com/kubernetes/ingress-nginx/main/deploy/static/provider/kind/deploy.yaml
  ```
- Validate whether ingress controller is ready to accept requests:
  ```shell
  kubectl wait --namespace ingress-nginx \
  --for=condition=ready pod \
  --selector=app.kubernetes.io/component=controller \
  --timeout=90s
  ```
  Output should resemble:
  ```text
  pod/ingress-nginx-controller-5bb6b499dc-mclk6 condition met
  ```
- Apply [ingress object](./k8s/kind/ingress.yml) to route requests from host machine to Istio's `ingress-controller` service:
  ```shell
  kubectl apply -f ./k8s/kind/ingress.yml
  ```
To test this ingress setup:
- Add a new namespace and apply Istio side-car proxy auto injection:
  ```shell
  kubectl create namespace testingress
  kubectl label namespace testingress istio-injection=enabled    
  ```
- Apply sample deployment that comes with Istio installation (2 different versions of helloworld endpoint):
  ```shell
  kubectl config set-context $(kubectl config current-context) --namespace=testingress
  kubectl apply -f $ISTIO_HOME/samples/helloworld/helloworld-gateway.yaml
  kubectl apply -f $ISTIO_HOME/samples/helloworld/helloworld.yaml
  ```
- Validate whether pods are up&running:
  ```shell
  kubectl get pods
  ```
  Output should resemble:
  ```
  NAME                             READY   STATUS    RESTARTS   AGE
  helloworld-v1-b6c45f55-7c9xh     1/1     Running   0          55s
  helloworld-v2-79d5467d55-khmfg   1/1     Running   0          55s 
  ```
- Check requests are routed to different versions of helloworld service in a round-robin fashion:

  HTTP:
  ```shell
  for i in {0..4}
  do
    curl -XGET http://localhost/hello
  done
  ```
  Output should resemble to:
  ```
  Hello version: v2, instance: helloworld-v2-79d5467d55-khmfg
  Hello version: v1, instance: helloworld-v1-b6c45f55-7c9xh
  Hello version: v1, instance: helloworld-v1-b6c45f55-7c9xh
  Hello version: v2, instance: helloworld-v2-79d5467d55-khmfg
  Hello version: v2, instance: helloworld-v2-79d5467d55-khmfg
  ```
  
  HTTPS:
  ```shell
  for i in {0..4}
  do
    curl --insecure -XGET https://localhost/hello
  done
  ```
  Output should resemble to:
  ```
  Hello version: v2, instance: helloworld-v2-79d5467d55-khmfg
  Hello version: v1, instance: helloworld-v1-b6c45f55-7c9xh
  Hello version: v2, instance: helloworld-v2-79d5467d55-khmfg
  Hello version: v1, instance: helloworld-v1-b6c45f55-7c9xh
  Hello version: v2, instance: helloworld-v2-79d5467d55-khmfg
  ```
- It is also possible to verify whether traffic passes through [Envoy](https://www.envoyproxy.io/) sidecar proxy:
  ```shell
  curl --head -XGET http://localhost/hello
  ```
  Output should contain [`x-envoy-upstream-service-time`](https://www.envoyproxy.io/docs/envoy/latest/configuration/http/http_filters/router_filter#x-envoy-upstream-service-time) header that gives the time in milliseconds spent by the upstream host processing the request and the network latency between Envoy and upstream host:
  ```text
  HTTP/1.1 200 OK
  Date: Sun, 11 Jun 2023 13:28:07 GMT
  Content-Type: text/html; charset=utf-8
  Content-Length: 58
  Connection: keep-alive
  x-envoy-upstream-service-time: 192
  ```
- To clean up resources:
  ```shell
  kubectl -n testingress delete all --all
  kubectl delete ns testingress
  ```

## Deployment of Services
The project consists of several backend microservices, UI and Hazelcast data-grid. This section provides details to deploy and activate them.

### Building and Loading Custom Images into k8s Cluster
Invoke custom script, [build_and_load.sh](./k8s/deploy/build_and_load.sh), to build and load custom images into kind k8s cluster:
```shell
zsh ./k8s/deploy/build_and_load.sh
```
Output should resemble to:
```text
Loading image to kind: localhost/mapapp/population:1.0
using podman due to KIND_EXPERIMENTAL_PROVIDER
enabling experimental podman provider
...
Loading image to kind: localhost/mapapp/ui:latest
using podman due to KIND_EXPERIMENTAL_PROVIDER
enabling experimental podman provider
...
> Loaded images into kind:
localhost/mapapp/cacheloc                            1.0                  5e1000b564af4       194MB
...
localhost/mapapp/ui                                  latest               3ed85b82e22b2       58.6MB
```
