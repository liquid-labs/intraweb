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

eval "$(setSimpleOptions --script ASSUME_DEFAULTS: PROJECT_ID= INFER_PROJECT_ID: BUCKET_ID= ORGANIZATION_ID= APPLICATION_TITLE:t= SUPPORT_EMAIL:e= -- "$@")"
ACTION="${1:-}"
if [[ -z "${ACTION}" ]]; then
  usage-bad-action # will exit process
fi

intraweb-helper-verify-settings() {
  local SETTING PROBLEMS

  for SETTING in $INTRAWEB_SETTINGS; do
    if [[ -z "${!SETTING:-}" ]]; then
      echoerr "Did not find expected setting: '${SETTING}'."
      PROBLEMS=true
    fi
    if [[ "${PROBLEMS}" == true ]]; then
      echoerrandexit "At least one parameter is not set. Try:\n\nintraweb init"
    fi
  done
}

[[ "${ACTION}" == init ]] || intraweb-helper-verify-settings

if [[ -z "${PROJECT_ID}" ]] && [[ -n "${INFER_PROJECT_ID}" ]]; then
  PROJECT_ID=$(gcloud config get-value project)
  # note, PROJECT_ID may still be undefined, and that's OK
  [[ -z "${PROJECT_ID}" ]] || echofmt "Inferred project ID '${PROJECT_ID}' from active gcloud conf."
fi

[[ -n "${ORGANIZATION_ID:-}" ]] || ORGANIZATION_ID="${INTRAWEB_DEFAULT_ORGANIZATION_ID}"
if [[ -n "${ASSUME_DEFAULTS}" ]]; then
  # is this a new project?
  [[ -n "${PROJECT_ID:-}" ]] || PROJECT_ID="${INTRAWEB_PROJECT_PREFIX}-intraweb"

  [[ -n "${APPLICATION_TITLE}" ]] || [[ -z "${INTRAWEB_COMPANY_NAME}" ]] \
    || APPLICATION_TITLE="${INTRAWEB_COMPANY_NAME} Intraweb"

  [[ -n "${SUPPORT_EMAIL}" ]] || [[ -z "${INTRAWEB_OAUTH_SUPPORT_EMAIL}" ]] || SUPPORT_EMAIL="${INTRAWEB_OAUTH_SUPPORT_EMAIL}"

  echofmt "Running with default values..."
fi

case "${ACTION}" in
  build|init|run|update-web)
    intraweb-${ACTION} ;;
  *)
    usage-bad-action ;;# will exit process
esac
