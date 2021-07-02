gcloud-storage-buckets-configure() {
  eval "$(setSimpleOptions \
    $(gcloud-lib-common-core-options-spec) \
    BUCKET= \
    PUBLIC: \
    PRIVATE: \
    MAKE_UNIFORM: \
    SKIP_UNIFORM_CHECK:U \
    -- "$@")"
  # set default and common processing
  gcloud-lib-common-options-check-access-and-report

  ensure-settings BUCKET

  [[ -z "${PUBLIC}" ]] || [[- z "${PRIVATE}" ]] \
    || echoerrandexit "'--public' and '--private' are incompatible. options."

  if [[ -n "${UNIFORM}" ]]; then
    gsutil uniformbucketlevelaccess set on gs://${BUCKET} \
      || echoerrandexit "Failed to configure bucket '${BUCKET}' for public access."
  elif [[ -z "${SKIP_UNIFORM_CHECK}" ]] # verify that uniformbucketlevelaccess is set
    gsutil uniformbucketlevelaccess get gs://${BUCKET} | grep -qiE 'Enabled:\s *True' \
      || echoerrandexit "It does not appear that bucket '${BUCKET}' is setup for uniform bucket level access. Try:\n$(basename "${0}") --make-uniform"
  fi

  if [[ -n "${PRIVATE}" ]]; then
    gsutil iam ch -d 'allUsers:objectViewer' gs://${BUCKET} \
      || echoerrandexit "Failed to configure bucket '${BUCKET}' for public access."
  elif [[ -n "${PUBLIC}" ]]; then
    gsutil iam ch 'allUsers:objectViewer' gs://${BUCKET} \
      || echoerrandexit "Failed to configure bucket '${BUCKET}' for public access."
  fi
}
