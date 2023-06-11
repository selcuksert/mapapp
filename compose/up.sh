#!/bin/zsh
SCRIPT_PATH="${0:A:h}"

sed -e "s/_HOSTIP_/$(ipconfig getifaddr en0)/g" < "${SCRIPT_PATH}/param.env" > .env

podman-compose -f "${SCRIPT_PATH}/docker-compose.hazelcast.yml" up -d