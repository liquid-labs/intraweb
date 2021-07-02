intraweb-deploy() {
  local DEPLOY_OPTS
  [[ -z "${PROJECT}" ]] || DEPLOY_OPTS="--project ${PROJECT}"
  [[ -z "${ASSUME_DEFAULTS}" ]] || DEPLOY_OPTS="${DEPLOY_OPTS} --quiet" # skips delpoy confirm
  gcloud app deploy ./src/appengine/app.yaml ${DEPLOY_OPTS}
}
