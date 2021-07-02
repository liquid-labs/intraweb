# TODO: we have older gcloud code... somewhere that handles some of this stuff. Like, maybe dealing with the project 'name'

# Utility to robustly create a new Google project. Since projects IDs are (bizarely) both global /and/ entirely
# unreserved, there is often contention for project names and by default the utility will attempt to append random
# numbers in order to locate a free name.
#
# --no-retry-names : if project creation fails possibly because of name collision, then the utility will fail
#   immediately rather than append random number and retry
# --non-interactive : causes flows that would otherwise result in a user prompt to instead halt with an error
gcloud-projects-create() {
  # TODO: the '--non-interactive' setting would be nice to support globally as part of the prompt package
  eval "$(setSimpleOptions \
    $(gcloud-lib-common-core-options-spec) \
    $(gcloud-lib-common-org-options-spec) \
    $(gcloud-lib-common-create-named-options-spec) \
    -- "$@")"
  # set default and common processing
  gcloud-lib-ensure-project-id
  gcloud-lib-common-options-check-access-and-report
  gcloud-lib-common-org-options-processing
  gcloud-lib-common-retry-options-processing

  echofmt "Testing if project '${PROJECT}' already exists..."
  if ! gcloud projects describe "${PROJECT}" >/dev/null 2>&1; then
    [[ -z "${NON_INTERACTIVE}" ]] || [[ -n "${CREATE_IF_NECESSARY}" ]] \
      || echoerrandexit "Project does not exist and 'create if necessary' option is not set while invoking gcloud-projects-create in non-interactive mode."
    if [[ -n "${CREATE_IF_NECESSARY}" ]] \
        || yes-no "Project '${PROJECT}' not found. Attempt to create?" 'Y'; then
      local FINAL_ERROR
      gcloud-projects-create-helper-command || { # if first attempt doesn't succeed, maybe we can retry?
        [[ -z "${NO_RETRY_NAMES}" ]] && { # retry is allowed
          local I=1
          while (( ${I} <= ${RETRY_COUNT} )); do
            echofmt "There seems to have been a problem; this may be because the global project is taken. Retrying ${I} of ${RETRY_COUNT}..."
            { gcloud-projects-create-helper-command &&  break; } || {
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
    gcloud-projects-create-helper-set-var
    echofmt "Project '${PROJECT}' already exists under organization ${ORGANIZATION}."
  fi
}

# helper functions; these functions rely on the parent function variables and are not intended to be called directly by
# anyone else

gcloud-projects-create-helper-set-var() {
  [[ -z "${ID_OUTPUT_VAR}" ]] || eval "${ID_OUTPUT_VAR}='${EFFECTIVE_NAME}'"
}

gcloud-projects-create-helper-command() {
  local EFFECTIVE_NAME
  if [[ -z "${I:-}" ]]; then # we are in the first go around
    rm "${INTRAWEB_TMP_ERROR}"
    EFFECTIVE_NAME="${PROJECT}"
  else
    # TODO: make the max string length 'GOOGLE_MAX_PROJECT_LENGTH' or sometihng and load it
    # for every failure, we try a longer random number
    fill-rand --max-string-length 30 --max-number-length $(( 5 * ${I} )) --output-var EFFECTIVE_NAME "${PROJECT}-"
  fi
  echofmt "Attempting to create project '${EFFECTIVE_NAME}'..."
  # on success, will set ID_OUTPUT_VAR when appropriate; otherwise, exits with a failure code
  gcloud projects create "${EFFECTIVE_NAME}" --organization="${ORGANIZATION}" 2> "${INTRAWEB_TMP_ERROR}" && {
    echofmt "Created project '${EFFECTIVE_NAME}' under organization ${ORGANIZATION}"
    gcloud-projects-create-helper-set-var
  }
}
