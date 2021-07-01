fill-rand() {
  eval "$(setSimpleOptions MAX_STRING_LENGTH:= MAX_NUMBER_LENGTH:= OUTPUT_VAR:= -- "$@")"
  local BASE_STRING="${1}"
  local NUMBER=""

  while (( ${#NUMBER} < ${MAX_NUMBER_LENGTH} )) && (( ( ${#NUMBER} + ${#BASE_STRING} ) < ${MAX_STRING_LENGTH} )); do
    NUMBER="${NUMBER}${RANDOM}"
    NUMBER=${NUMBER:0:${MAX_NUMBER_LENGTH}}
    if (( ( ${#NUMBER} + ${#BASE_STRING} ) > ${MAX_STRING_LENGTH} )); then
      MAX_NUMBER_LENGTH=$(( ${MAX_STRING_LENGTH} - ${#BASE_STRING}))
      NUMBER=${NUMBER:0:${MAX_NUMBER_LENGTH}}
    fi
  done

  local CONCAT="${BASE_STRING}${NUMBER}"
  if [[ -n "${OUTPUT_VAR}" ]]; then
    eval "${OUTPUT_VAR}='${CONCAT}'"
  else
    echo "${CONCAT}"
  fi
}
