usage() {
  echo "TODO"
}

usage-bad-action() {
  usage
  echoerrandexit "\nMust specify a valid action as first argument:\n\nintraweb [ $(echo "${VALID_ACTIONS}" | sed 's/ / \| /g') ]\n\nSee usage above for further details."
}
