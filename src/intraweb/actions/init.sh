intraweb-init() {
  local DIR
  for DIR in INTRAWEB_DB INTRAWEB_CACHE; do
    [[ -d "${!DIR}" ]] || mkdir "${!DIR}"
  done
  intraweb-init-lib-ensure-settings
}

intraweb-init-lib-ensure-settings() {
  [[ -f "${INTRAWEB_SETTINGS_FILE}" ]] || touch "${INTRAWEB_SETTINGS_FILE}"
  source "${INTRAWEB_SETTINGS_FILE}"

  local INTRAWEB_DEFAULT_ORGANIZATION_ID_PROMPT='Default Organization ID—a number—to nest projects under?'
  local INTRAWEB_PROJECT_PREFIX_PROMPT='Default Google project prefix?'

  local SETTING PROMPT_VAR
  for SETTING in ${INTRAWEB_SETTINGS}; do
    PROMPT_VAR="${SETTING}_PROMPT"
    [[ -n "${!PROMPT_VAR}" ]] || eval "${PROMPT_VAR}='${PROMPT_VAR}?'"
    eval require-answer --force "'${!PROMPT_VAR}'" "${SETTING}" "'${!SETTING:-}'"
  done

  intraweb-init-lib-update-settings
}

intraweb-init-lib-update-settings() {
  ! [[ -f "${INTRAWEB_SETTINGS_FILE}" ]] || rm "${INTRAWEB_SETTINGS_FILE}"
  local SETTING
  for SETTING in ${INTRAWEB_SETTINGS}; do
    echo "${SETTING}='${!SETTING}'" >> "${INTRAWEB_SETTINGS_FILE}"
  done
}
