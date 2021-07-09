# These are common helper functions meant to be called by higher level functions utilizing the common options. They rely
# on external varaiables.

gcloud-lib-common-core-options-spec() {
  echo 'PROJECT= NON_INTERACTIVE: NO_ACCOUNT_REPORT: SKIP_AUTH_CHECK:A'
}

gcloud-lib-common-options-check-access-and-report() {
  [[ -n "${SKIP_AUTH_CHECK:-}" ]] || {
    gcloud-check-access
    [[ -n "${NO_ACCOUNT_REPORT:-}" ]] || gcloud-account-report
  }
}

gcloud-lib-common-org-options-spec() {
  echo 'ORGANIZATION='
}

gcloud-lib-common-org-options-processing() {
  [[ -n "${ORGANIZATION:-}" ]] || echoerrandexit 'Organization (--organization=xxxx) is required.'
}

gcloud-lib-common-create-options-spec() {
  echo 'CREATE_IF_NECESSARY'
}

gcloud-lib-common-create-named-options-spec() {
  gcloud-lib-common-create-options-spec
  echo 'NO_RETRY_NAMES: RETRY_COUNT:= ID_OUTPUT_VAR:='
}

gcloud-lib-common-retry-options-processing() {
  [[ -n "${RETRY_COUNT:-}" ]] || RETRY_COUNT=3
}
