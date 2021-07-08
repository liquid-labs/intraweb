intraweb-init() {
  if [[ -z "${SITE}" ]] && [[ -n "${NON_INTERACTIVE}" ]]; then
    echoerrandexit "Must specify site in invocation in non-interactive mode."
  elif [[ -z "${SITE}" ]]; then
    require-answer "Name (domain) of site to initialize?" SITE
  fi

  intraweb-init-lib-enusre-dirs "${SITE}"
  intraweb-init-lib-ensure-settings
}

intraweb-init-lib-enusre-dirs() {
  local SITE="${1}"

  local DIR
  for DIR in "${INTRAWEB_DB}" "${INTRAWEB_SITES}" "${INTRAWEB_CACHE}" "${INTRAWEB_SITES}/${SITE}"; do
    [[ -d "${DIR}" ]] \
      || { echofmt "Creating '${DIR}'..."; mkdir -p "${DIR}"; }
  done
}

intraweb-init-lib-ensure-settings() {
  [[ -f "${INTRAWEB_SITE_SETTINGS}" ]] || touch "${INTRAWEB_SITE_SETTINGS}"
  source "${INTRAWEB_SITE_SETTINGS}"

  local INTRAWEB_SITE_ORGANIZATION_PROMPT='Organization—a number—to nest projects under?'
  local INTRAWEB_SITE_COMPANY_NAME_PROMPT='Company name?'
  local INTRAWEB_SITE_SUPPORT_EMAIL_PROMPT='OAuth authentication support email?'

  local SETTING PROMPT_VAR
  for SETTING in ${INTRAWEB_SITE_SETTINGS}; do
    PROMPT_VAR="${SETTING}_PROMPT"
    eval require-answer --force "'${!PROMPT_VAR:=${SETTING}?}'" "${SETTING}" "'${!SETTING:-}'"
  done

  intraweb-init-lib-update-settings
}

intraweb-init-lib-update-settings() {
  ! [[ -f "${INTRAWEB_SITE_SETTINGS}" ]] || rm "${INTRAWEB_SITE_SETTINGS}"
  local SETTING
  for SETTING in ${INTRAWEB_SITE_SETTINGS}; do
    echo "${SETTING}='${!SETTING}'" >> "${INTRAWEB_SITE_SETTINGS}"
  done
}
