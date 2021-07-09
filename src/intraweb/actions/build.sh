intraweb-build() {
  # first, we do our own global auth check
  gcloud-lib-common-options-check-access-and-report
  # and now we can skip the auth check for the individual steps
  # TODO: need to revisit 'passthrough' support in 'setSimpleOptions' to avoid all this. E.g., by befault, use the
  # existing var if the option is NOT set
  local COMMON_OPTS PROJECT_CREATE_OPTS IAP_OPTS BUCKET_CREATE_OPTS APP_CREATE_OPTS
  intraweb-build-helper-update-settings

  local FINAL_PROJECT_NAME FINAL_BUCKET_NAME

  gcloud-projects-create ${PROJECT_CREATE_OPTS} --id-output-var FINAL_PROJECT_NAME
  if [[ "${FINAL_PROJECT_NAME}" != "${PROJECT}" ]]; then
    PROJECT="${FINAL_PROJECT_NAME}"
    INTRAWEB_SITE_PROJECT="${PROJECT}"
    intraweb-settings-update-settings
    intraweb-build-helper-update-settings
  fi

  # without the eval, the '-quotes get read as literal, to the tokens end up being like:
  # --application_title|'Foo|Bar'|--support_email|'foo@bar.com'
  # as if the email literally began and ended with ticks and any title with spaces gets cut up.
  eval gcloud-projects-iap-oauth-setup ${IAP_OPTS}

  gcloud-app-create ${APP_CREATE_OPTS}

  gcloud-storage-buckets-create ${BUCKET_CREATE_OPTS} --id-output-var FINAL_BUCKET_NAME
  if [[ "${FINAL_BUCKET_NAME}" != "${BUCKET}" ]]; then
    BUCKET="${FINAL_BUCKET_NAME}"
    INTRAWEB_SITE_BUCKET="${BUCKET}"
    intraweb-settings-update-settings
    intraweb-build-helper-update-settings
  fi

  gcloud-storage-buckets-configure ${COMMON_OPTS} \
    --bucket ${BUCKET} \
    --make-uniform \
    --reader "serviceAccount:${PROJECT}@appspot.gserviceaccount.com"
}

# This is necessary to update the 'project' setting if things change.
intraweb-build-helper-update-settings() {
  # notice, we manipulate the super-funcs local vars directly.
  COMMON_OPTS="--skip-auth-check --project ${PROJECT}"
  [[ -z "${NON_INTERACTIVE}" ]] || COMMON_OPTS="${COMMON_OPTS} --non-interactive"
  PROJECT_CREATE_OPTS="${COMMON_OPTS} --organization ${ORGANIZATION}"
  IAP_OPTS="${COMMON_OPTS}"
  BUCKET_CREATE_OPTS="${COMMON_OPTS}"
  APP_CREATE_OPTS="${COMMON_OPTS}"
  [[ -z "${CREATE_IF_NECESSARY}" ]] || {
    PROJECT_CREATE_OPTS="${PROJECT_CREATE_OPTS} --create-if-necessary"
    APP_CREATE_OPTS="${APP_CREATE_OPTS} --create-if-necessary"
    BUCKET_CREATE_OPTS="${BUCKET_CREATE_OPTS} --create-if-necessary"
  }
  [[ -z "${BUCKET}" ]] || BUCKET_CREATE_OPTS="${BUCKET_CREATE_OPTS} --bucket ${BUCKET}"
  [[ -z "${APPLICATION_TITLE}" ]] || IAP_OPTS="${IAP_OPTS} --application-title '${APPLICATION_TITLE}'"
  [[ -z "${SUPPORT_EMAIL}" ]] || IAP_OPTS="${IAP_OPTS} --support-email '${SUPPORT_EMAIL}'"
  [[ -z "${REGION}" ]] || APP_CREATE_OPTS="${APP_CREATE_OPTS} --region ${REGION}" # TODO: do others take a region?
}
