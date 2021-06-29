intraweb-build() {
  # google-projects-create can be called directly for other purposes, se we have to provide a default project ID if none
  # is set.
  local CREATE_OPTS=""
  if [[ -n "${ASSUME_DEFAULTS:-}" ]]; then
    CREATE_OPTS="--non-interactive --create-if-necessary"
    [[ -n "${PROJECT_ID:-}" ]] || PROJECT_ID="intraweb"
  fi
  if [[ -n "${PROJECT_ID:-}" ]]; then
    CREATE_OPTS="${CREATE_OPTS} --project-id '${PROJECT_ID}'"
  fi
  google-projects-create ${CREATE_OPTS}
}
