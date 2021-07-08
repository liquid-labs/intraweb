#!/usr/bin/env bash

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

intraweb-helper-verify-settings() {
  local SETTING PROBLEMS

  for SETTING in $INTRAWEB_SITE_SETTINGS; do
    if [[ -z "${!SETTING:-}" ]]; then
      echoerr "Did not find expected setting: '${SETTING}'."
      PROBLEMS=true
    fi
    if [[ "${PROBLEMS}" == true ]]; then
      echoerrandexit "At least one parameter is not set. Try:\n\nintraweb init"
    fi
  done
}

[[ "${ACTION}" == init ]] || intraweb-helper-verify-settings "${SITE}"

# Process/set the association parameters.
[[ -n "${ORGANIZATION:-}" ]] || ORGANIZATION="${INTRAWEB_SITE_ORGANIZATION}"

intraweb-helper-infer-associations() {
  local SETTING NO_SETTING GCLOUD_PROPERTY
  for SETTING in PROJECT REGION; do
    NO_SETTING="NO_INFER_${SETTING}"
    GCLOUD_PROPERTY="$(echo "${SETTING}" | tr '[:upper:]' '[:lower:]')"
    case "${GCLOUD_PROPERTY}" in
      region)
        GCLOUD_PROPERTY="compute/${GCLOUD_PROPERTY}" ;;
    esac

    if [[ -z "${!SETTING:-}" ]] && [[ -z "${!NO_SETTING:-}" ]]; then
      eval "${SETTING}=\$(gcloud config get-value ${GCLOUD_PROPERTY})"
      # Note the setting may remain undefined, and that's OK
      [[ -z "${!SETTING:-}" ]] || echofmt "Inferred ${SETTING} '${!SETTING}' from active gcloud conf."
    fi
  done
}
intraweb-helper-infer-associations

if [[ -n "${ASSUME_DEFAULTS}" ]]; then
  echofmt "Setting assumable values..."
  # is this a new project?
  [[ -n "${INTRAWEB_SITE_COMPANY_NAME}" ]] || {
    # TODO: lowercase and '-' case whatever comes out of here... once we move this to node? At that point, we'll wanat # to use the 'project safe' version for the project and the raw version for the application title. (I'm assuming
    # the display name can have spaces. It's 'liquid-labs.com' for LL, but I'm assuming that's just my convention.)
    INTRAWEB_SITE_COMPANY_NAME="$(gcloud organizations describe ${ORGANIZATION} --format 'value(displayName)')"
    # TODO (cont) for now, we'll just kill it if there's any disallowed characters
    { [[ "${INTRAWEB_SITE_COMPANY_NAME}" != *' '* ]] && echofmt "Setting company name to '${INTRAWEB_SITE_COMPANY_NAME}'."; } \
      || unset INTRAWEB_SITE_COMPANY_NAME
  }

  # no project but we have a company name
  [[ -n "${PROJECT:-}" ]] || [[ -z "${INTRAWEB_SITE_COMPANY_NAME}" ]] || {
    PROJECT="${COMPANY_DISPLAY_NAME}-intraweb"
    echofmt "Setting project ID to '${PROJECT}'."
  }

  # no application title, but we have a company name
  [[ -n "${APPLICATION_TITLE}" ]] || [[ -z "${INTRAWEB_SITE_COMPANY_NAME}" ]] || {
    APPLICATION_TITLE="${INTRAWEB_SITE_COMPANY_NAME} Intraweb"
    echofmt "Setting application title to '${APPLICATION_TITLE}'."
  }


  # bucket ID is same as project ID if not set
  [[ -n "${BUCKET}" ]] || [[ -z "${PROJECT}" ]] || {
    BUCKET="${PROJECT}"
    echofmt "Setting bucket ID to '${BUCKET}'."
  }

  [[ -n "${SUPPORT_EMAIL}" ]] || [[ -z "${INTRAWEB_SITE_SUPPORT_EMAIL}" ]] || {
    SUPPORT_EMAIL="${INTRAWEB_SITE_SUPPORT_EMAIL}"
    echofmt "Setting support email to '${SUPPORT_EMAIL}'."
  }
fi

case "${ACTION}" in
  init|build|deploy|run)
    intraweb-${ACTION} ;;
  *)
    usage-bad-action ;;# will exit process
esac
