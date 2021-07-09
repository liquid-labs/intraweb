intraweb-settings-verify-present() {
  local SETTING PROBLEMS

  for SETTING in $INTRAWEB_SITE_SETTINGS; do
    if [[ -z "${!SETTING:-}" ]]; then
      echoerr "Did not find expected setting: '${SETTING}'."
      PROBLEMS=true
    fi
    if [[ "${PROBLEMS}" == true ]]; then
      echoerrandexit "At least one parameter is not set. Try:\n\nintraweb update-settings --site ${SITE}"
    fi
  done
}

intraweb-setting-infer-gcloud-property-scope() {
  local GCLOUD_PROPERTY="${1}"

  GCLOUD_PROPERTY="$(echo "${GCLOUD_PROPERTY}" | tr '[:upper:]' '[:lower:]')"
  case "${GCLOUD_PROPERTY}" in
    region)
      GCLOUD_PROPERTY="compute/${GCLOUD_PROPERTY}" ;;
  esac

  echo "${GCLOUD_PROPERTY}"
}

intraweb-settings-infer-from-gcloud-config() {
  local SETTING NO_SETTING GCLOUD_PROPERTY
  for SETTING in ${INTRAWEB_GCLOUD_PROPERTIES}; do
    NO_SETTING="NO_INFER_${SETTING}"

    if [[ -z "${!SETTING:-}" ]] && [[ -z "${!NO_SETTING:-}" ]]; then
      GCLOUD_PROPERTY="$(intraweb-setting-infer-gcloud-property-scope "${SETTING}")"

      eval "${SETTING}=\$(gcloud config get-value ${GCLOUD_PROPERTY})" || true
      # Note the setting may remain undefined, and that's OK
      [[ -z "${!SETTING:-}" ]] || echofmt "Inferred ${SETTING} '${!SETTING}' from active gcloud conf."
    fi
  done
}

# Examines non-set values and attempts to infer default values. This will update the effective values (e.g.,
# ORGANIZATION, PROJECT, etc.) as well as the 'INTRAWEB_SITE_*' values. We assume that the INTRAWEB_VALUES are not set
# because if they were, then the effective value would have been set by this point.
intraweb-settings-process-assumptions() {
  if [[ -n "${ASSUME_DEFAULTS}" ]]; then
    echofmt "Setting assumable values..."
    if [[ -z "${ORGANIZATION}" ]]; then # let's see if they have access to just one
      local POTENTIAL_IDS ID_COUNT
      POTENTIAL_IDS="$(gcloud organizations list --format 'value(ID)')"
      ID_COUNT=$(echo "${POTENTIAL_IDS}" | wc -l)
      if (( ${ID_COUNT} == 1 )); then
        ORGANIZATION=${POTENTIAL_IDS}
        echofmt "Inferred organization '${ORGANIZATION}' from single access."
      fi
    fi

    # is this a new project?
    local COMPANY_DISPLAY_NAME
    if [[ -z "${PROJECT}" ]]; then
      # TODO: lowercase and '-' case whatever comes out of here... once we move this to node? At that point, we'll wanat # to use the 'project safe' version for the project and the raw version for the application title. (I'm assuming
      # the display name can have spaces. It's 'liquid-labs.com' for LL, but I'm assuming that's just my convention.)
      COMPANY_DISPLAY_NAME="$(gcloud organizations describe ${ORGANIZATION} --format 'value(displayName)')"
      # TODO (cont) for now, we'll just kill it if there's any disallowed characters
      { [[ "${COMPANY_DISPLAY_NAME}" != *' '* ]] && echofmt "Found company name '${COMPANY_DISPLAY_NAME}'..."; } \
        || unset COMPANY_DISPLAY_NAME
    fi

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

intraweb-settings-update-settings() {
  ! [[ -f "${SITE_SETTINGS_FILE}" ]] || rm "${SITE_SETTINGS_FILE}"
  local SETTING
  for SETTING in ${INTRAWEB_SITE_SETTINGS}; do
    echo "${SETTING}='${!SETTING}'" >> "${SITE_SETTINGS_FILE}"
  done
}
