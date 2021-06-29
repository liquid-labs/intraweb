intraweb-init() {
  [[ -d "${INTRAWEB_DB}" ]] || mkdir "${INTRAWEB_DB}"
  intraweb-init-lib-ensure-settings
}

intraweb-init-lib-ensure-settings() {
  [[ -f "${INTRAWEB_SETTINGS_FILE}" ]] || touch "${INTRAWEB_SETTINGS_FILE}"
  source "${INTRAWEB_SETTINGS_FILE}"

  local INTRAWEB_PROJECT_PREFIX_PROMPT='Default Google project prefix?'

  local SETTING PROMPT_VAR
  for SETTING in ${INTRAWEB_SETTINGS}; do
    PROMPT_VAR="${SETTING}_PROMPT"
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
