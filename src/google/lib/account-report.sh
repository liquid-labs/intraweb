google-account-report() {
  local ACTIVE_GCLOUD_ACCOUNT=$(gcloud config configurations list --filter='is_active=true' --format 'value(properties.core.account)')
  echofmt "Using account '${ACTIVE_GCLOUD_ACCOUNT}'..."
}
