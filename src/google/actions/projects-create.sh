# --non-interactive : causes flows that would otherwise result in a user prompt to instead halt with an error
google-projects-create() {
  # TODO: the '--non-interactive' setting would be nice to support globally as part of the prompt package
  eval "$(setSimpleOptions ORGANIZATION_ID= PROJECT_ID= CREATE_IF_NECESSARY NON_INTERACTIVE: NO_ACCOUNT_REPORT:A SKIP_AUTH_CHECK NO_RETRY_NAMES: RETRY_COUNT:= PROJECT_ID_OUTPUT_VAR -- "$@")"

  [[ -n "${ORGANIZATION_ID}" ]] || echoerrandexit 'Organization ID (--organization-id=xxxx) is required.'
  [[ -n "${RETRY_COUNT}" ]] || RETRY_COUNT=3

  if [[ -z "${SKIP_AUTH_CHECK}" ]]; then
    google-check-access
  fi

  if [[ -z "${NO_ACCOUNT_REPORT}" ]]; then
    local ACTIVE_GCLOUD_ACCOUNT=$(gcloud config configurations list --filter='is_active=true' --format 'value(properties.core.account)')
    echofmt "Using account '${ACTIVE_GCLOUD_ACCOUNT}'..."
  fi

  if [[ -z "${PROJECT_ID:-}" ]]; then
    if [[ -n "${NON_INTERACTIVE:-}" ]]; then
      echoerrandexit "Cannot determine valid default for 'PROJECT_ID' when invoking google-project-create in non-interactive mode. A valid value must be provided prior to invocation."
    else
      get-answer "Google project ID for new intraweb project?" PROJECT_ID "${PROJECT_ID:-}"
    fi
  fi
  if ! gcloud projects describe "${PROJECT_ID}" >/dev/null 2>&1; then
    [[ -z "${NON_INTERACTIVE}" ]] || [[ -n "${CREATE_IF_NECESSARY}" ]] \
      || echoerrandexit "Project does not exist and 'create if necessary' option is not set while invoking google-projects-create in non-interactive mode."
    if [[ -n "${CREATE_IF_NECESSARY}" ]] \
        || yes-no "Project '${PROJECT_ID}' not found. Attempt to create?" 'Y'; then
      local FINAL_ERROR
      google-projects-create-command-helper || { # if first attempt doesn't succeed, maybe we can retry?
        [[ -z "${NO_RETRY_NAMES}" ]] && { # retry is allowed
          local I=1
          while (( ${I} <= ${RETRY_COUNT} )); do
            echofmt "There seems to have been a problem; this may be because the global project ID is taken. Retrying ${I} of ${RETRY_COUNT}..."
            { google-projects-create-command-helper &&  break; } || {
              I=$(( ${I} + 1 ))
              (( ${I} <= ${RETRY_COUNT} ))
            }
          done
        } # retry allowed block
      } || { # final; we're out of retries
        echoerrandexit "Could not create project. Error message on last attempt was: $(<"${INTRAWEB_TMP_ERROR}")"
      }
    fi # CREATE_IF_NECESSARY
  else # gcloud projects describe found something and the project exists
    echofmt "Project '${PROJECT_ID}' already exists under organization ${ORGANIZATION_ID}."
  fi
}

# This is never meant to be called by anyone but google-projects-create. It uses that functions variables.
google-projects-create-command-helper() {
  local EFFECTIVE_NAME
  if [[ -z "${I:-}" ]]; then # we are in the first go around
    EFFECTIVE_NAME="${PROJECT_ID}"
  else
    # TODO: make the max string length 'GOOGLE_MAX_PROJECT_ID_LENGTH' or sometihng and load it
    # for every failure, we try a longer random number
    fill-rand --max-string-length 30 --max-number-length $(( 5 * ${I} )) --output-var EFFECTIVE_NAME "${PROJECT_ID}-"
  fi
  echofmt "Attempting to create project '${EFFECTIVE_NAME}'..."
  # on success, will set PROJECT_ID_OUTPUT_VAR when appropriate; otherwise, exits with a failure code
  gcloud projects create "${EFFECTIVE_NAME}" --organization="${ORGANIZATION_ID}" 2> "${INTRAWEB_TMP_ERROR}" && {
    echofmt "Created project '${EFFECTIVE_NAME}' under organization ${ORGANIZATION_ID}"
    [[ -z "${PROJECT_ID_OUTPUT_VAR}" ]] || eval "${PROJECT_ID_OUTPUT_VAR}='${EFFECTIVE_NAME}'"
  }
}
