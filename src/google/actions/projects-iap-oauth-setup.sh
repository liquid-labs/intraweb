google-projects-iap-brand-create() {
  # TODO: the '--non-interactive' setting would be nice to support globally as part of the prompt package
  eval "$(setSimpleOptions $(google-lib-common-options-spec) -- "$@")"
  google-lib-common-options-processing

  local IAP_SERVICE='iap.googleapis.com'
  local IAP_AVAILABLE
  IAP_AVAILABLE=$(gcloud services list --project=${PROJECT_ID} \
    --available \
    --filter="name:${IAP_SERVICE}" \
    --format='value(name)')
  if [[ -z "${IAP_AVAILABLE}" ]]; then
    echofmt "Service '${IAP_SERVICE}' already configure for project '${PROJECT_ID}'..."
  else
    configure the service here...
  fi

  ... check if brand setup and handle that
  gcloud alpha iap oauth-brands list
}
