gcloud-storage-buckets-configure() {
  eval "$(setSimpleOptions \
    $(gcloud-lib-common-core-options-spec) \
    BUCKET= \
    READER:= \
    DELETE: \
    PUBLIC: \
    PRIVATE: \
    MAKE_UNIFORM: \
    SKIP_UNIFORM_CHECK:U \
    -- "$@")"
  # set default and common processing
  gcloud-lib-common-options-check-access-and-report

  ensure-settings BUCKET

  if [[ -n "${PUBLIC}" ]] && [[ -n "${PRIVATE}" ]]; then
    echoerrandexit "'--public' and '--private' are incompatible. options."
  fi

  local SHOW=true

  if [[ -n "${MAKE_UNIFORM}" ]]; then
    [[ -z "${DELETE}" ]] || echoerrandexit "'--delete' and '--uniform' are incompatible."
    gsutil uniformbucketlevelaccess set on gs://${BUCKET} \
      || echoerrandexit "Failed to configure bucket '${BUCKET}' for public access."
    unset SHOW
  elif [[ -z "${SKIP_UNIFORM_CHECK}" ]]; then # verify that uniformbucketlevelaccess is set
    gsutil uniformbucketlevelaccess get gs://${BUCKET} | grep -qiE 'Enabled:\s *True' \
      || echoerrandexit "It does not appear that bucket '${BUCKET}' is setup for uniform bucket level access. Try:\n$(basename "${0}") --make-uniform"
  fi

  if [[ -n "${PRIVATE}" ]]; then
    [[ -z "${DELETE}" ]] || echoerrandexit "'--delete' and '--private' are incompatible."
    gsutil iam ch -d 'allUsers:objectViewer' gs://${BUCKET} \
      && echofmt "Bucket '${BUCKET}' is now private." \
      || echoerrandexit "Failed to configure bucket '${BUCKET}' for public access."
    unset SHOW
  elif [[ -n "${PUBLIC}" ]]; then
    [[ -z "${DELETE}" ]] || echoerrandexit "'--delete' and '--public' are incompatible."
    gsutil iam ch 'allUsers:objectViewer' gs://${BUCKET} \
      && echofmt "Bucket '${BUCKET}' is now publicly readable." \
      || echoerrandexit "Failed to configure bucket '${BUCKET}' for public access."
    unset SHOW
  fi

  local OPTS=""
  [[ -z "${DELETE}" ]] || OPTS="-d"

  local CHANGE SPEC
  if [[ -n "${READER}" ]]; then
    [[ -n "${DELETE}" ]] && CHANGE="NOT readable" || CHANGE="readable"
    for SPEC in ${READER}; do
      local MEMBER
      MEMEBR="$(echo "${SPEC}" | cut -d: -f2)"
      gsutil iam ch ${OPTS} "${SPEC}:objectViewer" gs://${BUCKET} \
        && echofmt "Bucket '${BUCKET}' is now ${CHANGE} by ${MEMBER}." \
        || echoerrandexit "FAILED to update bucket '${BUCKET}' to ${CHANGE} by ${MEMBER}."
    done
    unset SHOW
  fi

  if [[ -n "${SHOW}" ]]; then
    gsutil iam get gs://${BUCKET}
  fi
}
