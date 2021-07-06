gcloud-check-access() {
  gcloud projects list > /dev/null ||
    echoerrandexit "\nIt does not appear we can access the Google Cloud. This may be due to stale or lack of  authentication tokens. See above for more information."
}
