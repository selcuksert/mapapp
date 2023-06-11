#!/bin/zsh
SCRIPT_PATH="${0:A:h}"

function validate() {
  if ! command -v podman &>/dev/null; then
    echo "podman installation does not exist. Please install podman"
    exit
  fi

  if ! command -v kind &>/dev/null; then
    echo "kind installation does not exist. Please install kind"
    exit
  fi

  if ! command -v mvn &>/dev/null; then
    echo "Maven installation does not exist. Please install Maven"
    exit
  fi

  JAVA_MAJOR_VER=$("$JAVA_HOME"/bin/javap -verbose java.lang.String | grep "major.version" | awk -F':' '{print $2}' | xargs)
  if [ "$JAVA_MAJOR_VER" -ne 61 ]; then
    echo -e "This project requires Java SE 17 installed and registered for Maven." \
      "Set JAVA_OPTS environment variable with the path of Java 17 installation." \
      "Current Java major version: $JAVA_MAJOR_VER"
    exit
  fi
}

function buildBackend() {
  echo -e "\n> Building backend images..."
  for pom_xml in "$SCRIPT_PATH"/../../services/*/pom.xml; do
    echo "Processing service: $(dirname $pom_xml | awk -F'/' '{print $(NF)}')"
    mvn -q -f "$pom_xml" -Dquarkus.container-image.group=mapapp quarkus:image-build
  done
}

function buildUI() {
  echo -e "\n> Building UI image..."
  podman build -q -t mapapp/ui "$SCRIPT_PATH"/../../ui/.
}

function listImages() {
  podman images -f reference='localhost/mapapp/*' --format="{{.Repository}}:{{.Tag}}"
}

function loadTok8s() {
  for image in $(listImages); do
    echo "Loading image to kind: $image"
    kind load image-archive <(podman save --format=oci-archive "$image")
  done
  echo -e "\n> Loaded images into kind:"
  podman exec -it kind-control-plane crictl images | grep mapapp
}

function run() {
  loadTok8s
}

run
