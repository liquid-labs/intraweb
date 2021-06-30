intraweb-build() {
  # google-projects-create can be called directly for other purposes, se we have to provide a default project ID if none
  # is set.
  local CREATE_OPTS="--organization-id ${ORGANIZATION_ID}"
  if [[ -n "${ASSUME_DEFAULTS:-}" ]]; then
    CREATE_OPTS="${CREATE_OPTS} --non-interactive --create-if-necessary"
    # TODO: we have older gcloud code... somewhere that handles some of this stuff. Like, maybe dealing with the project 'name'
    [[ -n "${PROJECT_ID:-}" ]] || PROJECT_ID="${INTRAWEB_PROJECT_PREFIX}-intraweb"
  fi
  if [[ -n "${PROJECT_ID:-}" ]]; then
    CREATE_OPTS="${CREATE_OPTS} --project-id '${PROJECT_ID}'"
  fi
  google-projects-create ${CREATE_OPTS}

  # google-projects-iap-brand --project-id "${PROJECT_ID}"
}
