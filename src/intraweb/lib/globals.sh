# set in the main CLI; declared here for completness
ACTION=""
ASSUME_DEFAULTS=""
PROJECT=""
ORGANIZATION=""
SITE_SETTINGS_FILE=""
# end cli option globals

VALID_ACTIONS="add list build deploy remove run update-settings"
INTRAWEB_SETTINGS="ORGANIZATION \
PROJECT \
BUCKET \
REGION \
APPLICATION_TITLE \
SUPPORT_EMAIL \
CONTENT_SOURCE"

INTRAWEB_SITE_SETTINGS=''
for SETTING in ${INTRAWEB_SETTINGS}; do
  if [[ -z "${INTRAWEB_SITE_SETTINGS}" ]]; then
    INTRAWEB_SITE_SETTINGS="INTRAWEB_SITE_${SETTING}"
  else
    INTRAWEB_SITE_SETTINGS="${INTRAWEB_SITE_SETTINGS} INTRAWEB_SITE_${SETTING}"
  fi
done
INTRAWEB_DEFAULT_REGION='us-central' #TODO: has all the features, but is something else better? Randomize?

INTRAWEB_GCLOUD_PROPERTIES='PROJECT REGION'

INTRAWEB_DB="${HOME}/.liq/intraweb"
INTRAWEB_SITES="${INTRAWEB_DB}/sites"
INTRAWEB_CACHE="${INTRAWEB_DB}/cache"
INTRAWEB_TMP_ERROR="${INTRAWEB_CACHE}/temp-error.txt"

# TODO: not currently used...
# INTRAWEB_DEFAULT_SETTINGS="${INTRAWEB_DB}/default-site-settings.sh"
