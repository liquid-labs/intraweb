#!/usr/bin/env bash

# Technical Notes
#
# The overall flow is:
#
# 1) Identify the site we're working with and load existing settings. Note, these settings aren't used directly as they
#    may be overriden or missing. The effective values will be set as we process.
# 2) Set settings based on the site configs, if any, unless overidden by explicit options.
# 3a) If in create flow, infer (some) missing settings from the gcloud configuration if not already set (by the site
#    config or the on the command line).
# 3b) If we're in a non-create flow, then verify that all settings are present.
# 4) Perform the action.

import strict

import echoerr
import options
import prompt
import real_path

source ./inc.sh

COMMON_OPTIONS="SITE= NON_INTERACTIVE:"

# Options used by create to setup site data. Using these options with other actions will cause an error.
INIT_OPTIONS="APPLICATION_TITLE:t= \
SUPPORT_EMAIL:e= \
ASSUME_DEFAULTS: \
ORGANIZATION= \
NO_INFER_ORGANIZATION: \
PROJECT= \
NO_INFER_PROJECT: \
BUCKET= \
REGION= \
NO_INFER_REGION:"

BUILD_OPTIONS="CREATE_IF_NECESSARY \
NO_RETRY_NAMES: \
RETRY_COUNT:="

# Options specific to deploy.
DEPLOY_OPTIONS="CONFIRM: \
NO_DEPLOY_APP:A \
NO_DEPLOY_CONTENT:C"

OPTION_GROUPS="INIT_OPTIONS DEPLOY_OPTIONS"

eval "$(setSimpleOptions --script ${COMMON_OPTIONS} ${INIT_OPTIONS} ${DEPLOY_OPTIONS} -- "$@")"
ACTION="${1:-}"
if [[ -z "${ACTION}" ]]; then
  usage-bad-action # will exit process
else
  # 'create' is fine to re-run, so 'update-settings' is effectively just a semantic alias.
  [[ "${ACTION}" != "update-settings" ]] || ACTION=create

  OPTIONS_VAR="$(echo "${ACTION}" | tr '[[:lower:]]' '[[:upper:]]')_INIT"
  for OPTION_GROUP in ${OPTION_GROUPS}; do
    if [[ "${OPTIONS_VAR}" != "${OPTION_GROUP}" ]]; then
      [[ -z "${!OPTIONS_VAR:-}" ]] || for OPTION in ${!OPTIONS_VAR}; do
        OPTION_VAR=$(echo "${OPTION}" | sed 's/[^A-Z_]//g')
        [[ -z "${!OPTION_VAR}" ]] || {
          CLI_OPTION="$(echo "${!OPTION_VAR}" | tr '[[:upper:]]' '[[:lower:]]')"
          echoerrandexit "Option '--${CLI_OPTION}' cannot be used with action '${ACTION}'."
        }
      done
    fi
  done
fi

# TODO: support a (possible) default site link.
[[ -n "${SITE}" ]] || echoerrandexit "The '--site' option must be specified."

SITE_SETTINGS_FILE="${INTRAWEB_SITES}/${SITE}/settings.sh"
if [[ -f "${SITE_SETTINGS_FILE}" ]]; then
  source "${SITE_SETTINGS_FILE}"
elif [[ "${ACTION}" != 'create' ]]; then
  echoerrandexit "Did not find expected settings file for '${SITE}'. Try:\nintraweb create --site '${SITE}'"
fi

# Set the effective parameters from site settings if not set in command options.
[[ -n "${ORGANIZATION:-}" ]] || ORGANIZATION="${INTRAWEB_SITE_ORGANIZATION:-}"
[[ -n "${PROJECT:-}" ]] || PROJECT="${INTRAWEB_SITE_PROJECT:-}"
[[ -n "${BUCKET:-}" ]] || BUCKET="${INTRAWEB_SITE_BUCKET:-}"
[[ -n "${REGION:-}" ]] || REGION="${INTRAWEB_SITE_REGION:-}"

if [[ "${ACTION}" == create ]]; then
  intraweb-settings-infer-from-gcloud
  intraweb-settings-process-assumptions
else
  intraweb-settings-verify-present
fi

case "${ACTION}" in
  create|build|deploy|run)
    intraweb-${ACTION} ;;
  *)
    usage-bad-action ;;# will exit process
esac
