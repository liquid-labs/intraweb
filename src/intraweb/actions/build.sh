intraweb-build() {
  # first, we do our own global auth check
  google-lib-common-options-check-access-and-report
  # and now we can skip the auth check for the individual steps
  local COMMAN_OPTS="--skip-auth-check"
  local CREATE_OPTS="${COMMON_OPTS} --organization-id ${ORGANIZATION_ID}"
  if [[ -n "${ASSUME_DEFAULTS:-}" ]]; then
    CREATE_OPTS="${CREATE_OPTS} --non-interactive --create-if-necessary"
    # TODO: we have older gcloud code... somewhere that handles some of this stuff. Like, maybe dealing with the project 'name'
    [[ -n "${PROJECT_ID:-}" ]] || PROJECT_ID="${INTRAWEB_PROJECT_PREFIX}-intraweb"
  fi
  if [[ -n "${PROJECT_ID:-}" ]]; then
    CREATE_OPTS="${CREATE_OPTS} --project-id '${PROJECT_ID}'"
  fi
  google-projects-create ${CREATE_OPTS}

  # google-projects-iap-oauth-setup --project-id "${PROJECT_ID}"
}
