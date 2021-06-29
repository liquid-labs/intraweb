# --non-interactive : causes flows that would otherwise result in a user prompt to instead halt with an error
google-projects-create() {
  # TODO: the '--non-interactive' setting would be nice to support globally as part of the prompt package
  eval "$(setSimpleOptions PROJECT_ID= CREATE_IF_NECESSARY NON_INTERACTIVE: NO_ACCOUNT_REPORT:A SKIP_AUTH_CHECK -- "$@")"

  if [[ -z "${SKIP_AUTH_CHECK}" ]]; then
    google-check-access
  fi

  if [[ -z "${NO_ACCOUNT_REPORT}" ]]; then
    local ACTIVE_GCLOUD_ACCOUNT=$(gcloud config configurations list --filter='is_active=true' --format 'value(properties.core.account)')
    echofmt "Using account '${ACTIVE_GCLOUD_ACCOUNT}'..."
  fi

  if [[ -z "${PROJECT_ID:-}" ]]; then
    if [[ -n "${NON_INTERACTIVE:-}" ]]; then
      echoerrandexit "Cannot determine valid default for 'PROJECT_ID' when invoking google-project-create in non-interactive mode. A valid value must be provided prior to invocation."
    else
      get-answer "Name for the google project to create for intraweb?" PROJECT_ID 'intraweb'
    fi
  fi
  if ! gcloud projects describe "${PROJECT_ID}" >/dev/null; then
    [[ -z "${NON_INTERACTIVE}" ]] || [[ -n "${CREATE_IF_NECESSARY}" ]] \
      || echoerrandexit "Project does not exist and 'create if necessary' option is not set while invoking google-projects-create in non-interactive mode."
    if [[ -n "${CREATE_IF_NECESSARY}" ]] \
        || yes-no "Project '${PROJECT_ID}' not found. Attempt to create?" 'Y'; then
      gcloud projects create "${PROJECT_ID}"
    fi
  fi
   # else the project already exists and there's nothing to do
}
