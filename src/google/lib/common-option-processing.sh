# These are common helper functions meant to be called by higher level functions utilizing the common options. They rely
# on external varaiables.

google-lib-common-options-spec() {
  echo 'PROJECT_ID= NON_INTERACTIVE: NO_ACCOUNT_REPORT: SKIP_AUTH_CHECK:'
}

google-lib-common-options-processing() {
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

google-lib-common-options-check-access-and-report() {
  [[ -n "${SKIP_AUTH_CHECK}" ]] || {
    google-check-access
    [[ -n "${NO_ACCOUNT_REPORT}" ]] || google-account-report
  }
}
