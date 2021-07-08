intraweb-create() {
  if [[ -z "${SITE}" ]] && [[ -n "${NON_INTERACTIVE}" ]]; then
    echoerrandexit "Must specify site in invocation in non-interactive mode."
  elif [[ -z "${SITE}" ]]; then
    require-answer "Name (domain) of site to create?" SITE
  fi

  intraweb-settings-infer-from-gcloud-config
  intraweb-settings-process-assumptions

  intraweb-create-lib-enusre-dirs "${SITE}"
  intraweb-create-lib-ensure-settings

  # Reflect our effective values back into the saved settings
  for SETTING in ${INTRAWEB_SETTINGS}; do
    IW_SETTING="INTRAWEB_SITE_${SETTING}"
    eval "${IW_SETTING}='${!SETTING:-}'" # may still be blank, but we'll catch that in ensure-settings
  done

  intraweb-settings-update-settings
}

intraweb-create-lib-enusre-dirs() {
  local SITE="${1}"

  local DIR
  for DIR in "${INTRAWEB_DB}" "${INTRAWEB_SITES}" "${INTRAWEB_CACHE}" "${INTRAWEB_SITES}/${SITE}"; do
    [[ -d "${DIR}" ]] \
      || { echofmt "Creating '${DIR}'..."; mkdir -p "${DIR}"; }
  done
}

intraweb-create-lib-ensure-settings() {
  [[ -f "${SITE_SETTINGS_FILE}" ]] || touch "${SITE_SETTINGS_FILE}"
  source "${SITE_SETTINGS_FILE}"

  local INTRAWEB_SITE_ORGANIZATION_PROMPT='Organization—a number—to nest projects under?'
  local INTRAWEB_SITE_PROJECT_PROMPT='Project (base) name?'
  local INTRAWEB_SITE_BUCKET_PROMPT='Bucket (base) name?'
  local INTRAWEB_SITE_REGION_PROMPT='Deploy region?'
  local INTRAWEB_SITE_SUPPORT_EMAIL_PROMPT='OAuth authentication support email?'

  local SETTING PROMPT_VAR PROMPT DEFAULT_VAR DEFAULT
  for SETTING in ${INTRAWEB_SETTINGS}; do
    if [[ -z "${ASSUME_DEFAULTS}" ]] || [[ -z "${!SETTING:-}" ]]; then
      [[ -z "${NON_INTERACTIVE}" ]] || echofmt "Could not determine value for '${SETTING}' in non-interactive mode."

      PROMPT_VAR="INTRAWEB_SITE_${SETTING}_PROMPT"
      PROMPT="${!PROMPT_VAR:=${SETTING}?}"

      DEFAULT="${!SETTING:-}"
      if [[ -z "${DEFAULT:-}" ]]; then
        DEFAULT_VAR="INTRAWEB_DEFAULT_${SETTING}"
        DEFAULT="${!DEFAULT_VAR:-}"
      fi

      require-answer --force "${PROMPT}" ${SETTING} "${DEFAULT}"
      eval "INTRAWEB_SITE_${SETTING}=${!SETTING}"

      intraweb-settings-process-assumptions > /dev/null # TODO: set quiet instead
    fi
  done
}
