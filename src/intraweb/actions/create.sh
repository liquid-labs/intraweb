intraweb-create() {
  if [[ -z "${SITE}" ]] && [[ -n "${NON_INTERACTIVE}" ]]; then
    echoerrandexit "Must specify site in invocation in non-interactive mode."
  elif [[ -z "${SITE}" ]]; then
    require-answer "Name (domain) of site to create?" SITE
  fi

  intraweb-create-lib-enusre-dirs "${SITE}"
  intraweb-create-lib-ensure-settings
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

  local SETTING PROMPT_VAR
  for SETTING in ${INTRAWEB_SITE_SETTINGS}; do
    if [[ -z "${ASSUME_DEFAULTS}"]] || [[ -z "${!SETTING}" ]]; then
      PROMPT_VAR="${SETTING}_PROMPT"
      eval require-answer --force "'${!PROMPT_VAR:=${SETTING}?}'" "${SETTING}" "'${!SETTING:-}'"
      intraweb-settings-process-assumptions > /dev/null # TODO: set quiet instead
    fi
  done

  intraweb-settings-update-settings
}
