intraweb-build() {
  # first, we do our own global auth check
  google-lib-common-options-check-access-and-report
  # and now we can skip the auth check for the individual steps
  local COMMON_OPTS="--skip-auth-check"
  local PROJECT_CREATE_OPTS="${COMMON_OPTS} --organization-id ${ORGANIZATION_ID}"
  local IAP_OPTS="${COMMON_OPTS}"
  local BUCKET_CREATE_OPTS="${COMMON_OPTS}"
  if [[ -n "${PROJECT_ID:-}" ]]; then
    PROJECT_CREATE_OPTS="${PROJECT_CREATE_OPTS} --project-id ${PROJECT_ID}"
    IAP_OPTS="${IAP_OPTS} --project-id ${PROJECT_ID}"
    BUCKET_CREATE_OPTS="${BUCKET_CREATE_OPTS} --project-id ${PROJECT_ID}"
  fi
  if [[ -n "${ASSUME_DEFAULTS:-}" ]]; then
    PROJECT_CREATE_OPTS="${PROJECT_CREATE_OPTS} --non-interactive --create-if-necessary"
    IAP_OPTS="${IAP_OPTS} --non-interactive"
    BUCKET_CREATE_OPTS="${BUCKET_CREATE_OPTS} --non-interactive --create-if-necessary"
    [[ -n "${BUCKET_ID}" ]] || [[ -z "${PROJECT_ID}" ]] \
      || BUCKET_CREATE_OPTS="${BUCKET_CREATE_OPTS} --bucket-id ${PROJECT_ID}"
  fi
  [[ -z "${APPLICATION_TITLE}" ]] || IAP_OPTS="${IAP_OPTS} --application-title '${APPLICATION_TITLE}'"
  [[ -z "${SUPPORT_EMAIL}" ]] || IAP_OPTS="${IAP_OPTS} --support-email '${SUPPORT_EMAIL}'"

  # no 'eval' necessary here; we don't expect any spaces (see note below in 'google-projects-iap-oauth-setup' call)
  google-projects-create ${PROJECT_CREATE_OPTS}

  # without the eval, the '-quotes get read as literal, to the tokens end up being like:
  # --application_title|'Foo|Bar'|--support_email|'foo@bar.com'
  # as if the email literally began and ended with ticks and any title with spaces gets cut up.
  eval google-projects-iap-oauth-setup ${IAP_OPTS}
  google-storage-buckets-create ${BUCKET_CREATE_OPTS}
}
