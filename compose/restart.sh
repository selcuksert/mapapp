#!/bin/zsh
SCRIPT_PATH="${0:A:h}"

podman-compose -f "${SCRIPT_PATH}/docker-compose.hazelcast.yml" restart