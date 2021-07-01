# TODO: we have older gcloud code... somewhere that handles some of this stuff. Like, maybe dealing with the project 'name'

# Utility to robustly create a new Google storage bucket. Since storage buckets IDs are (bizarely) both global /and/ entirely
# unreserved, there is often contention for storage bucket names and by default the utility will attempt to append random
# numbers in order to locate a free name.
#
# --no-retry-names : if storage bucket creation fails possibly because of name collision, then the utility will fail
#   immediately rather than append random number and retry
# --non-interactive : causes flows that would otherwise result in a user prompt to instead halt with an error
google-storage-buckets-create() {
  # TODO: the '--non-interactive' setting would be nice to support globally as part of the prompt package
  eval "$(setSimpleOptions \
    $(google-lib-common-core-options-spec) \
    $(google-lib-common-create-options-spec) \
    BUCKET_ID= \
    PUBLIC:
    -- "$@")"
  # set default and common processing
  google-lib-ensure-project-id
  google-lib-common-options-check-access-and-report
  google-lib-common-create-options-processing

  local TARGET_OPTS=''
  [[ -z "${PROJECT_ID}" ]] || TARGET_OPTS="-p ${PROJECT_ID}"

  if [[ -z "${BUCKET_ID}" ]]; then
    [[ -z "${NON_INTERACTIVE}" ]] \
      || echoerrandexit "Bucket ID not specified while invoking google-storage-buckets in non-interactive mode."
    require-answer 'Bucket ID to create?' BUCKET_ID
  fi

  echofmt "Testing if storage bucket '${BUCKET_ID}' already exists..."
  if ! gsutil ls ${TARGET_OPTS} gs://${BUCKET_ID} >/dev/null 2>&1; then
    [[ -z "${NON_INTERACTIVE}" ]] || [[ -n "${CREATE_IF_NECESSARY}" ]] \
      || echoerrandexit "Bucket does not exist and 'create if necessary' option is not set while invoking google-storage-buckets-create in non-interactive mode."
    if [[ -n "${CREATE_IF_NECESSARY}" ]] \
        || yes-no "Storage bucket '${BUCKET_ID}' not found. Attempt to create?" 'Y'; then
      local FINAL_ERROR
      google-storage-buckets-create-helper-command || { # if first attempt doesn't succeed, maybe we can retry?
        [[ -z "${NO_RETRY_NAMES}" ]] && { # retry is allowed
          local I=1
          while (( ${I} <= ${RETRY_COUNT} )); do
            echofmt "There seems to have been a problem; this may be because the global storage bucket ID is taken. Retrying ${I} of ${RETRY_COUNT}..."
            { google-storage-buckets-create-helper-command &&  break; } || {
              I=$(( ${I} + 1 ))
              (( ${I} <= ${RETRY_COUNT} ))
            }
          done
        } # retry allowed block
      } || { # final; we're out of retries
        echoerrandexit "Could not create storage bucket. Error message on last attempt was: $(<"${INTRAWEB_TMP_ERROR}")"
      }
    fi # CREATE_IF_NECESSARY
  else # gcloud projects describe found something and the storage bucket exists
    google-storage-buckets-create-helper-set-var
    echofmt "Bucket '${BUCKET_ID}' already exists."
  fi

  if [[ -n "${PUBLIC}" ]]; then
    gsutil defacl set public-read gs://${BUCKET_ID} \
      || echoerrandexit "Failed to configure bucket '${BUCKET_ID}' for public access."
  fi
}

# helper functions; these functions rely on the parent function variables and are not intended to be called directly by
# anyone else

google-storage-buckets-create-helper-set-var() {
  [[ -z "${ID_OUTPUT_VAR}" ]] || eval "${ID_OUTPUT_VAR}='${EFFECTIVE_NAME}'"
}

google-storage-buckets-create-helper-command() {
  local EFFECTIVE_NAME
  if [[ -z "${I:-}" ]]; then # we are in the first go around
    rm "${INTRAWEB_TMP_ERROR}"
    EFFECTIVE_NAME="${BUCKET_ID}"
  else
    # TODO: make the max string length 'GOOGLE_MAX_PROJECT_ID_LENGTH' or sometihng and load it
    # for every failure, we try a longer random number
    fill-rand --max-string-length 30 --max-number-length $(( 5 * ${I} )) --output-var EFFECTIVE_NAME "${BUCKET_ID}-"
  fi
  echofmt "Attempting to create storage bucket '${EFFECTIVE_NAME}'..."
  # on success, will set ID_OUTPUT_VAR when appropriate; otherwise, exits with a failure code
  echo gsutil mb ${TARGET_OPTS} gs://${EFFECTIVE_NAME} # DEBUG
  gsutil mb ${TARGET_OPTS} gs://${EFFECTIVE_NAME} 2> "${INTRAWEB_TMP_ERROR}" && {
    echofmt "Created storage bucket '${EFFECTIVE_NAME}'."
    google-storage-buckets-create-helper-set-var
  }
}
