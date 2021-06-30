google-projects-iap-oauth-setup() {
  # TODO: the '--non-interactive' setting would be nice to support globally as part of the prompt package
  eval "$(setSimpleOptions $(google-lib-common-options-spec) APPLICATION_TITLE:t= SUPPORT_EMAIL:e= -- "$@")"
  google-lib-common-options-processing

  local IAP_SERVICE='iap.googleapis.com'
  local IAP_AVAILABLE
  IAP_AVAILABLE=$(gcloud services list --project=${PROJECT_ID} \
    --available \
    --filter="name:${IAP_SERVICE}" \
    --format='value(name)')
  if [[ -z "${IAP_AVAILABLE}" ]]; then
    echofmt "Service '${IAP_SERVICE}' already configured for project '${PROJECT_ID}'..."
  else
    gcloud services enable ${IAP_SERVICE} --project=${PROJECT_ID} \
      && echofmt "IAP service enableled for project '${PROJECT_ID}'..." \
      || echoerrandexit "Error enabling service. Refer to any error report above. Try again later or enable manually."
  fi

  # Check if OAuth brand is configured, and if not, attempt to configure it.
  gcloud alpha iap oauth-brands list --project=${PROJECT_ID} --quiet >/dev/null >&2 \
    && echofmt "IAP OAuth brands already configured..." \
    || {
      # Check if we have 'non-interactive' set and blow up if we don't have the data we need.
      [[ -z "${NON_INTERACTIVE}" ]] \
        || { [[ -n "${APPLICATION_TITLE}" ]] && [[ -n "${SUPPORT_EMAIL}" ]]; } \
        || echoerrandexit "Must provide application title and support email when running in non-interactive mode."
      # If the defaults are present, then it is considered answered and nothing happens.
      require-answer 'Application title (for OAuth authentication)?' APPLICATION_TITLE "${APPLICATION_TITLE}"
      require-answer 'Support email for for OAuth authentication problems?' SUPPORT_EMAIL "${SUPPORT_EMAIL}"
      # Finally, all the data is gathered and we're ready to actually configure.
      gcloud alpha iap oauth-brands create --application-title="${APPLICATION_TITLE}" --support-email="${SUPPORT_EMAIL}" \
        && echofmt "IAP-OAuth brand identify configured for project '${PROJECT_ID}' with title '${APPLICATION_TITLE}' and support email '${SUPPORT_EMAIL}'..." \
        || echoerrandexit "Error configuring OAuth brand identity. Refer to any errors above. Try again later or enable manually."
    }
}
