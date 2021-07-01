# These are common helper functions meant to be called by higher level functions utilizing the common options. They rely
# on external varaiables.

google-lib-common-core-options-spec() {
  echo 'PROJECT_ID= NON_INTERACTIVE: NO_ACCOUNT_REPORT: SKIP_AUTH_CHECK:'
}

google-lib-common-options-check-access-and-report() {
  [[ -n "${SKIP_AUTH_CHECK:-}" ]] || {
    google-check-access
    [[ -n "${NO_ACCOUNT_REPORT:-}" ]] || google-account-report
  }
}

google-lib-common-core-options-processing() {
  if [[ -z "${PROJECT_ID:-}" ]]; then
    # TODO: allow project set from active config...
    if [[ -n "${NON_INTERACTIVE:-}" ]]; then
      echoerrandexit "Cannot determine valid default for 'PROJECT_ID' when invoking google-project-create in non-interactive mode. A valid value must be provided prior to invocation."
    else
      get-answer "Google project ID for new intraweb project?" PROJECT_ID "${PROJECT_ID:-}"
    fi
  fi

  google-lib-common-options-check-access-and-report
}

google-lib-common-org-options-spec() {
  echo 'ORGANIZATION_ID='
}

google-lib-common-org-options-processing() {
  [[ -n "${ORGANIZATION_ID}" ]] || echoerrandexit 'Organization ID (--organization-id=xxxx) is required.'
}

google-lib-common-create-options-spec() {
  echo 'CREATE_IF_NECESSARY NO_RETRY_NAMES: RETRY_COUNT:= ID_OUTPUT_VAR'
}

google-lib-common-create-options-processing() {
  [[ -n "${RETRY_COUNT}" ]] || RETRY_COUNT=3
}
