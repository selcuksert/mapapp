# World Population Statistics Portal on Istio
A project to display population statistics on a map based on [UN Population Division](https://www.un.org/development/desa/pd/) data. The stack is deployable on Istio service mesh and leverages [Leaflet](https://leafletjs.com/), [Next.js](https://nextjs.org/), [Quarkus](https://quarkus.io/) and [Hazelcast](https://hazelcast.com/). 

This documentation provides guidelines on installation, configuration and architectural details.

## Installation Guidelines
This section is for revealing installation details for underpinning technologies required by project. The development is done on MacBook so guideline may require MacOS based instruction sets. For different platforms please follow technology vendors' installation guidelines.

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
    podman machine init --cpus 4 --memory 5120 --disk-size 60
    podman machine start
    podman system connection default podman-machine-default-root
    ```
- Validate whether podman VM is up&running:
    ```shell
    podman info
    ```
    ```text
    NAME                    VM TYPE     CREATED        LAST UP            CPUS        MEMORY      DISK SIZE
    podman-machine-default  qemu        3 minutes ago  Currently running  4           5.369GB     64.42GB
    ```
