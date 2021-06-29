#!/usr/bin/env bash

import strict

import echoerr

VALID_ACTIONS="build run update-web"

ACTION="${1:-}"

usage() {
  echo "TODO"
}

if [[ -z "${ACTION}" ]]; then
  usage
  echoerrandexit "\nMust specify a valid action as first argument:\n\nintraweb [ $(echo "${VALID_ACTIONS}" | sed 's/ / \| /g') ]\n\nSee usage above for further details."
fi
