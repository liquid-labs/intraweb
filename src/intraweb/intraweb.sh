#!/usr/bin/env bash

import strict

import echoerr
import options
import prompt
import real_path

source ./inc.sh

if [[ -f "${INTRAWEB_SETTINGS_FILE}" ]]; then
  source "${INTRAWEB_SETTINGS_FILE}"
fi

eval "$(setSimpleOptions --script ASSUME_DEFAULTS: PROJECT_ID= -- "$@")"

ACTION="${1:-}"
if [[ -z "${ACTION}" ]]; then
  usage-bad-action # will exit process
fi

[[ -z "${ASSUME_DEFAULTS:-}" ]] || echofmt "Running with default values..."

case "${ACTION}" in
  build|init|run|update-web)
    intraweb-${ACTION} ;;
  *)
    usage-bad-action ;;# will exit process
esac
