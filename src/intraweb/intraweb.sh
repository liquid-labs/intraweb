#!/usr/bin/env bash

# Technical Notes
#
# The overall flow is:
#
# 1) Identify the site we're working with and load existing settings. Note, these settings aren't used directly as they
#    may be overriden or missing. The effective values will be set as we process.
# 2) Set settings based on the site configs, if any, unless overidden by explicit options.
# 3a) If in init flow, infer (some) missing settings from the gcloud configuration if not already set (by the site
#    config or the on the command line).
# 3b) If we're in a non-init flow, then verify that all settings are present.
# 4) Perform the action.

import strict

import echoerr
import options
import prompt
import real_path

source ./inc.sh

# The first group are user visible config options. These will be automatically provided if '--assume-defaults' is
# toggled.
#
# The second group, staarting at '--assume-defaults', affect the behavior of the app.
#
# The third group, starting at '--organization', affect associotions of any created components. These can typically
# be gleaned from the active 'gcloud config', but can be overriden here.
eval "$(setSimpleOptions --script \
  SITE= \
  APPLICATION_TITLE:t= \
  SUPPORT_EMAIL:e= \
  ASSUME_DEFAULTS: \
  NO_DEPLOY_APP:A \
  NO_DEPLOY_CONTENT:C \
  ORGANIZATION= \
  NO_INFER_ORGANIZATION: \
  PROJECT= \
  NO_INFER_PROJECT: \
  BUCKET= \
  REGION= \
  NO_INFER_REGION: -- "$@")"
ACTION="${1:-}"
if [[ -z "${ACTION}" ]]; then
  usage-bad-action # will exit process
fi

[[ -z "${SITE}" ]] || INTRAWEB_SITE_SETTINGS="${INTRAWEB_SITES}/${SITE}/settings.sh"
if [[ -n "${SITE}" ]] && [[ -f "${INTRAWEB_SITE_SETTINGS}" ]]; then
  source "${INTRAWEB_SITE_SETTINGS}"
fi

# Set the effective parameters from site settings if not set in command options.
[[ -n "${ORGANIZATION:-}" ]] || ORGANIZATION="${INTRAWEB_SITE_ORGANIZATION}"
[[ -n "${PROJECT:-}" ]] || PROJECT="${INTRAWEB_SITE_PROJECT}"
[[ -n "${BUCKET:-}" ]] || BUCKET="${INTRAWEB_SITE_BUCKET}"
[[ -n "${REGION:-}" ]] || REGION="${INTRAWEB_SITE_REGION}"

if [[ "${ACTION}" == init ]]; then
  intraweb-settings-infer-from-gcloud
  intraweb-settings-process-assumptions
else
  intraweb-settings-verify-present
fi

case "${ACTION}" in
  init|build|deploy|run)
    intraweb-${ACTION} ;;
  *)
    usage-bad-action ;;# will exit process
esac
