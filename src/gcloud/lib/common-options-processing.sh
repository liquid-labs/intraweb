# These are common helper functions meant to be called by higher level functions utilizing the common options. They rely
# on external varaiables.

gcloud-lib-common-core-options-spec() {
  echo 'PROJECT_ID= NON_INTERACTIVE: NO_ACCOUNT_REPORT: SKIP_AUTH_CHECK:'
}

gcloud-lib-common-options-check-access-and-report() {
  [[ -n "${SKIP_AUTH_CHECK:-}" ]] || {
    gcloud-check-access
    [[ -n "${NO_ACCOUNT_REPORT:-}" ]] || gcloud-account-report
  }
}

gcloud-lib-ensure-project-id() {
  if [[ -z "${PROJECT_ID:-}" ]]; then
    # TODO: allow project set from active config...
    if [[ -n "${NON_INTERACTIVE:-}" ]]; then
      echoerrandexit "Cannot determine valid default for 'PROJECT_ID' when invoking gcloud-project-create in non-interactive mode. A valid value must be provided prior to invocation."
    else
      get-answer "Google project ID for new intraweb project?" PROJECT_ID "${PROJECT_ID:-}"
    fi
  fi
}

gcloud-lib-common-org-options-spec() {
  echo 'ORGANIZATION_ID='
}

gcloud-lib-common-org-options-processing() {
  [[ -n "${ORGANIZATION_ID:-}" ]] || echoerrandexit 'Organization ID (--organization-id=xxxx) is required.'
}

gcloud-lib-common-create-options-spec() {
  echo 'CREATE_IF_NECESSARY NO_RETRY_NAMES: RETRY_COUNT:= ID_OUTPUT_VAR'
}

gcloud-lib-common-create-options-processing() {
  [[ -n "${RETRY_COUNT:-}" ]] || RETRY_COUNT=3
}
