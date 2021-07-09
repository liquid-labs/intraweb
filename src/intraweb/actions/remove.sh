intraweb-remove() {
  if [[ -n "${SHUTDOWN_PROJECT}" ]]; then
    gcloud projects delete "${PROJECT}" && echofmt "Project '${PROJECT}' has been shut down." \
      || echoerrandexit "There was a problem shutting down the project. Leaving intraweb site entry in place."
  fi
  if [[ -d "${INTRAWEB_SITES}/${SITE}" ]]; then
    rm -rf "${INTRAWEB_SITES}/${SITE}" && echofmt "Local intraweb site entry deleted."
  fi
}
