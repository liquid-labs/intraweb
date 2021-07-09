intraweb-deploy() {
  local APP_DEPLOY_OPTS
  # TODO: need to revisit 'passthrough' support in 'setSimpleOptions' to avoid all this. E.g., by befault, use the
  # existing var if the option is NOT set
  APP_DEPLOY_OPTS="--project ${PROJECT}"
  # We are quite/auto-deployed by default. This *is* a transalted setting.
  [[ -n "${CONFIRM:-}" ]] || APP_DEPLOY_OPTS="${APP_DEPLOY_OPTS} --quiet" # skips delpoy confirm

  [[ -n "${NO_DEPLOY_CONTENT:-}" ]] || \
    gsutil -m rsync -r src/test/hello-world-web gs://${BUCKET}

  [[ -n "${NO_DEPLOY_APP:-}" ]] || \
    gcloud app deploy ./src/appengine/app.yaml ${APP_DEPLOY_OPTS}
}
