intraweb-deploy() {
  local APP_DEPLOY_OPTS
  [[ -z "${PROJECT:-}" ]] || APP_DEPLOY_OPTS="--project ${PROJECT}"
  [[ -z "${ASSUME_DEFAULTS:-}" ]] || APP_DEPLOY_OPTS="${APP_DEPLOY_OPTS} --quiet" # skips delpoy confirm

  [[ -n "${NO_DEPLOY_CONTENT:-}" ]] || \
    gsutil -m rsync -r src/test/hello-world-web gs://${BUCKET}

  [[ -n "${NO_DEPLOY_APP:-}" ]] || \
    gcloud app deploy ./src/appengine/app.yaml ${APP_DEPLOY_OPTS}
}
