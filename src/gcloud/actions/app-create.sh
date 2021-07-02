# TODO: we have older gcloud code... somewhere that handles some of this stuff. Like, maybe dealing with the project 'name'

# Utility to robustly create a new Google project. Since projects IDs are (bizarely) both global /and/ entirely
# unreserved, there is often contention for project names and by default the utility will attempt to append random
# numbers in order to locate a free name.
#
# --non-interactive : causes flows that would otherwise result in a user prompt to instead halt with an error
gcloud-app-create() {
  # TODO: the '--non-interactive' setting would be nice to support globally as part of the prompt package
  eval "$(setSimpleOptions \
    $(gcloud-lib-common-core-options-spec) \
    $(gcloud-lib-common-create-options-spec) \
    REGION= \
    -- "$@")"
  # set default and common processing
  gcloud-lib-ensure-project-id
  gcloud-lib-common-options-check-access-and-report

  echofmt "Testing if app associated with '${PROJECT}' already exists..."
  if ! gcloud app describe --project "${PROJECT}" >/dev/null 2>&1; then
    [[ -z "${NON_INTERACTIVE}" ]] || [[ -n "${CREATE_IF_NECESSARY}" ]] \
      || echoerrandexit "App does not exist and 'create if necessary' option is not set while invoking gcloud-apps-create in non-interactive mode."
    if [[ -n "${CREATE_IF_NECESSARY}" ]] \
        || yes-no "App for '${PROJECT}' not found. Attempt to create?" 'Y'; then
      local CREATE_OPTS
      [[ -z "${PROJECT}" ]] || CREATE_OPTS="--project ${PROJECT}"
      [[ -z "${REGION}" ]] || CREATE_OPTS="--region ${REGION}"
      gcloud app create ${CREATE_OPTS} \
        && echo "App created for project '${PROJECT}'" \
        || echoerrandexit "Unable to create app. See app."
    fi # CREATE_IF_NECESSARY
  else # gcloud projects describe found something and the project exists
    echofmt "App for project '${PROJECT}' already exists."
  fi
}
