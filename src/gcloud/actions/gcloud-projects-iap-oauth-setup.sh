gcloud-projects-iap-oauth-setup() {
  # TODO: the '--non-interactive' setting would be nice to support globally as part of the prompt package
  eval "$(setSimpleOptions $(gcloud-lib-common-core-options-spec) APPLICATION_TITLE:t= SUPPORT_EMAIL:e= -- "$@")"
  ensure-settings PROJECT

  local IAP_SERVICE='iap.googleapis.com'
  local IAP_STATE
  IAP_STATE=$(gcloud services list --project=${PROJECT} \
    --available \
    --filter="name:${IAP_SERVICE}" \
    --format='value(name)')
  if [[ "${IAP_STATE}" == 'ENABLED' ]]; then
    echofmt "Service '${IAP_SERVICE}' already enabled for project '${PROJECT}'."
  else
    gcloud services enable ${IAP_SERVICE} --project=${PROJECT} \
      && echofmt "IAP service enableled for project '${PROJECT}'..." \
      || echoerrandexit "Error enabling service. Refer to any error report above. Try again later or enable manually."
  fi

  # Check if OAuth brand is configured, and if not, attempt to configure it.
  local BRAND_NAME
  BRAND_NAME=$(gcloud alpha iap oauth-brands list --project=${PROJECT} --format='value(name)')
  [[ -n ${BRAND_NAME} ]] \
    && echofmt "IAP OAuth brand '${BRAND_NAME}' already configured..." \
    || {
      # Check if we have 'non-interactive' set and blow up if we don't have the data we need.
      [[ -z "${NON_INTERACTIVE}" ]] \
        || { [[ -n "${APPLICATION_TITLE}" ]] && [[ -n "${SUPPORT_EMAIL}" ]]; } \
        || echoerrandexit "Must provide application title and support email when running in non-interactive mode."
      # If the defaults are present, then it is considered answered and nothing happens.
      require-answer 'Application title (for OAuth authentication)?' APPLICATION_TITLE "${APPLICATION_TITLE}"
      require-answer 'Support email for for OAuth authentication problems?' SUPPORT_EMAIL "${SUPPORT_EMAIL}"
      # Finally, all the data is gathered and we're ready to actually configure.
      BRAND_NAME=$(gcloud alpha iap oauth-brands create --project=${PROJECT} \
          --application_title="${APPLICATION_TITLE}" \
          --support_email="${SUPPORT_EMAIL}" \
          --format='value(name)') \
        && echofmt "IAP-OAuth brand identify configured for project '${PROJECT}' with title '${APPLICATION_TITLE}' and support email '${SUPPORT_EMAIL}'..." \
        || echoerrandexit "Error configuring OAuth brand identity. Refer to any errors above. Try again later or enable manually.\n\nCommon problems include the use of a non-existent support email. Verify that the email address references a valid user or group."
    } # brand setup

  # now we can setup the intraweb client
  local OAUTH_CLIENT_NAME
  OAUTH_CLIENT_NAME=$(gcloud alpha iap oauth-clients list "${BRAND_NAME}" --format 'value(name)')
  [[ -n "${OAUTH_CLIENT_NAME}" ]] \
    && echofmt "OAuth client '${APPLICATION_TITLE}' already exists for brand '${BRAND_NAME}'..." \
    || {
      echofmt "Attempting to create new OAuth client..."
      OAUTH_CLIENT_NAME=$(gcloud alpha iap oauth-clients create ${BRAND_NAME} \
        --display_name "${APPLICATION_TITLE}" \
        --project ${PROJECT} \
        --format 'value(name)')
    } # oauth client setup
}
