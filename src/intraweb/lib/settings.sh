intraweb-settings-verify-present() {
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

intraweb-settings-infer-from-gcloud() {
  local SETTING NO_SETTING GCLOUD_PROPERTY
  for SETTING in ORGANIZATION PROJECT REGION; do
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

intraweb-settings-process-assumptions() {
  if [[ -n "${ASSUME_DEFAULTS}" ]]; then
    echofmt "Setting assumable values..."
    # is this a new project?
    if [[ -z "${PROJECT}" ]]; then
      local COMPANY_DISPLAY_NAME
      # TODO: lowercase and '-' case whatever comes out of here... once we move this to node? At that point, we'll wanat # to use the 'project safe' version for the project and the raw version for the application title. (I'm assuming
      # the display name can have spaces. It's 'liquid-labs.com' for LL, but I'm assuming that's just my convention.)
      COMPANY_DISPLAY_NAME="$(gcloud organizations describe ${ORGANIZATION} --format 'value(displayName)')"
      # TODO (cont) for now, we'll just kill it if there's any disallowed characters
      [[ "${COMPANY_DISPLAY_NAME}" != *' '* ]] || unset COMPANY_DISPLAY_NAME
    }

    # no project but we have a company name
    [[ -n "${PROJECT:-}" ]] || [[ -z "${COMPANY_DISPLAY_NAME}" ]] || {
      PROJECT="${COMPANY_DISPLAY_NAME}-intraweb"
      echofmt "Setting project ID to '${PROJECT}'."
    }

    # no application title, but we have a company name
    [[ -n "${APPLICATION_TITLE}" ]] || [[ -z "${COMPANY_DISPLAY_NAME}" ]] || {
      APPLICATION_TITLE="${COMPANY_DISPLAY_NAME} Intraweb"
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
}
