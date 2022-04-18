const displayDefaults = {
  showBreadcrumbs : true,
  linkSection     : 'Documents',
  sectionOrder    : ['Documents', 'Subsections'],
  sectionTitles   : {
    Documents   : 'Documents',
    Subsections : 'Subsections'
  }
}

const endSlash = /\/$/
const fileRegex = /.*\.[^./]+$/

const PATH_INPUT_FILE = 'inputs.yaml'
const SITE_INPUT_PATH = '/site-inputs.yaml'

export {
  displayDefaults,
  endSlash,
  fileRegex,
  PATH_INPUT_FILE,
  SITE_INPUT_PATH
}
