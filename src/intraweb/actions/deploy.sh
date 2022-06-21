intraweb-deploy() {
  local APP_DEPLOY_OPTS
  # TODO: need to revisit 'passthrough' support in 'setSimpleOptions' to avoid all this. E.g., by befault, use the
  # existing var if the option is NOT set
  APP_DEPLOY_OPTS="--project ${PROJECT}"
  # We are quite/auto-deployed by default. This *is* a transalted setting.
  [[ -n "${CONFIRM:-}" ]] || APP_DEPLOY_OPTS="${APP_DEPLOY_OPTS} --quiet" # skips delpoy confirm

  [[ -n "${NO_DEPLOY_CONTENT:-}" ]] || \
    {
      echo "Syncing '${CONTENT_SOURCE}' to 'gs://${BUCKET}'..."
      gsutil -o "GSUtil:parallel_process_count=1" -m rsync -d -r "${CONTENT_SOURCE}" gs://${BUCKET}
    }

  [[ -n "${NO_DEPLOY_APP:-}" ]] || {
    local APP_ENGINE_DIR
    APP_ENGINE_DIR="$(dirname $(real_path "${0}"))/appengine"

    local APP_YAML="${APP_ENGINE_DIR}/app.yaml"
    local ENV_YAML="${APP_ENGINE_DIR}/env-variables.yaml"

    cat <<EOF > "${ENV_YAML}"
env_variables:
  BUCKET: ${BUCKET}
EOF
    gcloud app deploy "${APP_YAML}" ${APP_DEPLOY_OPTS}
  }
}
