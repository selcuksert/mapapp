#!/bin/zsh

SCRIPT_PATH="${0:A:h}"

podman build -t mapapp-ui "$SCRIPT_PATH"/.
