const displayDefaults = {
  showBreadcrumbs: true,
  linkSection: "Documents",
  sectionOrder: [ "Documents", "Subsections" ],
  sectionTitles: {
    "Documents": "Documents",
    "Subsections": "Subsections"
  }
}

const endSlash = /\/$/

const PATH_INPUT_FILE="inputs.yaml"
const SITE_INPUT_PATH="/site-inputs.yaml"

export {
  displayDefaults,
  endSlash,
  PATH_INPUT_FILE,
  SITE_INPUT_PATH
}
