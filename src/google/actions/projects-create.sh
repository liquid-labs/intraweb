# TODO: we have older gcloud code... somewhere that handles some of this stuff. Like, maybe dealing with the project 'name'

# --non-interactive : causes flows that would otherwise result in a user prompt to instead halt with an error
google-projects-create() {
  # TODO: the '--non-interactive' setting would be nice to support globally as part of the prompt package
  eval "$(setSimpleOptions $(google-lib-common-options-spec) ORGANIZATION_ID= CREATE_IF_NECESSARY NO_RETRY_NAMES: RETRY_COUNT:= PROJECT_ID_OUTPUT_VAR -- "$@")"
  # set default and common processing
  google-lib-common-options-processing
  [[ -n "${RETRY_COUNT}" ]] || RETRY_COUNT=3


  [[ -n "${ORGANIZATION_ID}" ]] || echoerrandexit 'Organization ID (--organization-id=xxxx) is required.'

  echofmt "Testing if project '${PROJECT_ID}' already exists..."
  if ! gcloud projects describe "${PROJECT_ID}" >/dev/null 2>&1; then
    [[ -z "${NON_INTERACTIVE}" ]] || [[ -n "${CREATE_IF_NECESSARY}" ]] \
      || echoerrandexit "Project does not exist and 'create if necessary' option is not set while invoking google-projects-create in non-interactive mode."
    if [[ -n "${CREATE_IF_NECESSARY}" ]] \
        || yes-no "Project '${PROJECT_ID}' not found. Attempt to create?" 'Y'; then
      local FINAL_ERROR
      google-projects-create-helper-command || { # if first attempt doesn't succeed, maybe we can retry?
        [[ -z "${NO_RETRY_NAMES}" ]] && { # retry is allowed
          local I=1
          while (( ${I} <= ${RETRY_COUNT} )); do
            echofmt "There seems to have been a problem; this may be because the global project ID is taken. Retrying ${I} of ${RETRY_COUNT}..."
            { google-projects-create-helper-command &&  break; } || {
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
    google-projects-create-helper-set-var
    echofmt "Project '${PROJECT_ID}' already exists under organization ${ORGANIZATION_ID}."
  fi
}

# helper functions; these functions rely on the parent function variables and are not intended to be called directly by
# anyone else

google-projects-create-helper-set-var() {
  [[ -z "${PROJECT_ID_OUTPUT_VAR}" ]] || eval "${PROJECT_ID_OUTPUT_VAR}='${EFFECTIVE_NAME}'"
}

google-projects-create-helper-command() {
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
    google-projects-create-helper-set-var
  }
}
