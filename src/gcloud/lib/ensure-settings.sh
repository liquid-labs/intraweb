ensure-setting() {
  local SETTING="${1}"
  if [[ -z "${!SETTING:-}" ]]; then
    if [[ -n "${NON_INTERACTIVE:-}" ]]; then
      echoerrandexit "Cannot determine valid default for '${SETTING}' in non-interactive mode. A valid value must be discernable or set on invocation."
    else
      get-answer "Value for '${SETTING}?'" ${SETTING} "${!SETTING:-}"
    fi
  fi
}
