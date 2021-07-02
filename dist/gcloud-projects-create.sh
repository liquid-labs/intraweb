# note, this file is generated to be source-able, but not directly executable
# http://linuxcommand.org/lc3_adv_tput.php
red=`tput setaf 1`
green=`tput setaf 2`
yellow=`tput setaf 3`
blue=`tput setaf 4`
purple=`tput setaf 5`
cyan=`tput setaf 6`
white=`tput setaf 7`

bold=`tput bold`
red_b="${red}${bold}"
green_b="${green}${bold}"
yellow_b="${yellow}${bold}"
blue_b="${blue}${bold}"
purple_b="${purple}${bold}"
cyan_b="${cyan}${bold}"
white_b="${white}${bold}"

underline=`tput smul`
red_u="${red}${underline}"
green_u="${green}${underline}"
yellow_u="${yellow}${underline}"
blue_u="${blue}${underline}"
purple_u="${purple}${underline}"
cyan_u="${cyan}${underline}"
white_u="${white}${underline}"

red_bu="${red}${bold}${underline}"
green_bu="${green}${bold}${underline}"
yellow_bu="${yellow}${bold}${underline}"
blue_bu="${blue}${bold}${underline}"
purple_bu="${purple}${bold}${underline}"
cyan_bu="${cyan}${bold}${underline}"
white_bu="${white}${bold}${underline}"

reset=`tput sgr0`
list-add-item() {
  local LIST_VAR="${1}"; shift
  while (( $# > 0 )); do
    local ITEM
    ITEM="${1}"; shift
    # TODO: enforce no newlines in item

    if [[ -n "$ITEM" ]]; then
      if [[ -z "${!LIST_VAR:-}" ]]; then
        eval $LIST_VAR='"$ITEM"'
      else
        # echo $LIST_VAR='"${!LIST_VAR}"$'"'"'\n'"'"'"${ITEM}"'
        eval $LIST_VAR='"${!LIST_VAR:-}"$'"'"'\n'"'"'"${ITEM}"'
      fi
    fi
  done
}

list-add-uniq() {
  local LIST_VAR="${1}"; shift
  while (( $# > 0 )); do
    local ITEM
    ITEM="${1}"; shift
    # TODO: enforce no newlines in item
    if [[ -z $(list-get-index $LIST_VAR "$ITEM") ]]; then
      list-add-item $LIST_VAR "$ITEM"
    fi
  done
}

# Echos the number of items in the list.
#
# Takes single argument, the list var name.
#
# Example:
# list-add-item A B C
# list-count MY_LIST # echos '3'
list-count() {
  if [[ -z "${!1:-}" ]]; then
    echo -n "0"
  else
    echo -e "${!1}" | wc -l | tr -d '[:space:]'
  fi
}

list-from-csv() {
  local LIST_VAR="${1}"
  local CSV="${2:-}"

  if [[ -z "$CSV" ]]; then
    CSV="${!LIST_VAR:-}"
    unset ${LIST_VAR}
  fi

  if [[ -n "$CSV" ]]; then
    local ADDR
    while IFS=',' read -ra ADDR; do
      for i in "${ADDR[@]}"; do
        i="$(echo "$i" | awk '{$1=$1};1')"
        list-add-item "$LIST_VAR" "$i"
      done
    done <<< "$CSV"
  fi
}

list-get-index() {
  local LIST_VAR="${1}"
  local TEST="${2}"

  local ITEM
  local INDEX=0
  while read -r ITEM; do
    if [[ "${ITEM}" == "${TEST}" ]]; then
      echo $INDEX
      return
    fi
    INDEX=$(($INDEX + 1))
  done <<< "${!LIST_VAR:-}"
}

list-get-item() {
  local LIST_VAR="${1}"
  local INDEX="${2}"

  local CURR_INDEX=0
  local ITEM
  while read -r ITEM; do
    if (( $CURR_INDEX == $INDEX )) ; then
      echo -n "${ITEM%\\n}"
      return
    fi
    CURR_INDEX=$(($CURR_INDEX + 1))
  done <<< "${!LIST_VAR:-}"
}

# Echoes the frist item in the named list matching the given prefix.
#
# Example:
# LIST="foo bar"$'\n'"foo baz"
# list-get-item-by-prefix LIST "foo " # echoes 'foo bar'
list-get-item-by-prefix() {
  local LIST_VAR="${1}"
  local PREFIX="${2}"

  local ITEM
  while read -r ITEM; do
    if [[ "${ITEM}" == "${PREFIX}"* ]] ; then
      echo -n "${ITEM%\\n}"
      return
    fi
  done <<< "${!LIST_VAR:-}"
}

# Joins a list with a given string and echos the result. We use 'echo -e' for the join string, so '\n', '\t', etc. will
# work.
#
# Takes (1) the list variable name, (2) the join string
#
# Example:
# list-add-item MY_LIST A B C
# list-join MY_LIST '||' # echos 'A||B||C'
list-join() {
  local LIST_VAR="${1}"
  local JOIN_STRING="${2}"

  local CURR_INDEX=0
  local COUNT
  COUNT="$(list-count $LIST_VAR)"
  while read -r ITEM; do
    echo -n "$ITEM"
    CURR_INDEX=$(($CURR_INDEX + 1))
    if (( $CURR_INDEX < $COUNT )) ; then
      echo -ne "$JOIN_STRING"
    fi
  done <<< "${!LIST_VAR:-}"
}

list-replace-by-string() {
  local LIST_VAR="${1}"
  local TEST_ITEM="${2}"
  local NEW_ITEM="${3}"

  local ITEM INDEX NEW_LIST
  INDEX=0
  for ITEM in ${!LIST_VAR:-}; do
    if [[ "$(list-get-item $LIST_VAR $INDEX)" == "$TEST_ITEM" ]]; then
      list-add-item NEW_LIST "$NEW_ITEM"
    else
      list-add-item NEW_LIST "$ITEM"
    fi
    INDEX=$(($INDEX + 1))
  done
  eval $LIST_VAR='"'"$NEW_LIST"'"'
}

list-quote() {
  local LIST_VAR="${1}"

  while read -r ITEM; do
    echo -n "'$(echo "$ITEM" | sed -e "s/'/'\"'\"'/")' "
  done <<< "${!LIST_VAR:-}"
}

list-rm-item() {
  local LIST_VAR="${1}"; shift
  while (( $# > 0 )); do
    local ITEM NEW_ITEMS
    ITEM="${1}"; shift
    ITEM=${ITEM//\/\\/}
    ITEM=${ITEM//#/\\#}
    ITEM=${ITEM//./\\.}
    ITEM=${ITEM//[/\\[}
    # echo "ITEM: $ITEM" >&2
    NEW_ITEMS="$(echo "${!LIST_VAR:-}" | sed -e '\#^'"${ITEM}"'$#d')"
    eval $LIST_VAR='"'"$NEW_ITEMS"'"'
  done
}

if [[ $(uname) == 'Darwin' ]]; then
  GNU_GETOPT="$(brew --prefix gnu-getopt)/bin/getopt"
else
  GNU_GETOPT="$(which getopt)"
fi

# Usage:
#   eval "$(setSimpleOptions DEFAULT VALUE= SPECIFY_SHORT:X NO_SHORT: LONG_ONLY:= COMBINED:C= -- "$@")" \
#     || ( contextHelp; echoerrandexit "Bad options."; )
setSimpleOptions() {
  local SCRIPT SET_COUNT VAR_SPEC LOCAL_DECLS
  local LONG_OPTS=""
  local SHORT_OPTS=""

  # our own, bootstrap option processing
  while [[ "${1:-}" == '-'* ]]; do
    local OPT="${1}"; shift
    case "${OPT}" in
      --set-count)
        SET_COUNT="${1}"
        shift;;
      --script)
        SCRIPT=true;;
      --) # usually we'd find a non-option first, but this is valid; we were called with no options specs to process.
        break;;
      *)
        echoerrandexit "Unknown option: $1";;
    esac
  done

  # Bash Bug? This looks like a straight up bug in bash, but the left-paren in
  # '--)' was matching the '$(' and causing a syntax error. So we use ']' and
  # replace it later.
  local CASE_HANDLER=$(cat <<EOF
    --]
      break;;
EOF
)
  while true; do
    if (( $# == 0 )); then
      echoerrandexit "setSimpleOptions: No argument to process; did you forget to include the '--' marker?"
    fi
    VAR_SPEC="$1"; shift
    local VAR_NAME LOWER_NAME SHORT_OPT LONG_OPT IS_PASSTHRU
    IS_PASSTHRU=''
    if [[ "$VAR_SPEC" == *'^' ]]; then
      IS_PASSTHRU=true
      VAR_SPEC=${VAR_SPEC/%^/}
    fi
    local OPT_ARG=''
    if [[ "$VAR_SPEC" == *'=' ]]; then
      OPT_ARG=':'
      VAR_SPEC=${VAR_SPEC/%=/}
    fi

    if [[ "$VAR_SPEC" == '--' ]]; then
      break
    elif [[ "$VAR_SPEC" == *':'* ]]; then
      VAR_NAME=$(echo "$VAR_SPEC" | cut -d: -f1)
      SHORT_OPT=$(echo "$VAR_SPEC" | cut -d: -f2)
    else # each input is a variable name
      VAR_NAME="$VAR_SPEC"
      SHORT_OPT=$(echo "${VAR_NAME::1}" | tr '[:upper:]' '[:lower:]')
    fi

    VAR_NAME=$(echo "$VAR_NAME" | tr -d "=")
    LOWER_NAME=$(echo "$VAR_NAME" | tr '[:upper:]' '[:lower:]')
    LONG_OPT="$(echo "${LOWER_NAME}" | tr '_' '-')"

    if [[ -n "${SHORT_OPT}" ]]; then
      SHORT_OPTS="${SHORT_OPTS:-}${SHORT_OPT}${OPT_ARG}"
    fi

    LONG_OPTS=$( ( test ${#LONG_OPTS} -gt 0 && echo -n "${LONG_OPTS},") || true && echo -n "${LONG_OPT}${OPT_ARG}")

    # Note, we usually want locals, so we actually just blindling build it up and then decide wether to include it at
    # the last minute.
    LOCAL_DECLS="${LOCAL_DECLS:-}local ${VAR_NAME}='';"
    local CASE_SELECT="-${SHORT_OPT}|--${LONG_OPT}]"
    if [[ "$IS_PASSTHRU" == true ]]; then # handle passthru
      CASE_HANDLER=$(cat <<EOF
        ${CASE_HANDLER}
          ${CASE_SELECT}
          list-add-item _PASSTHRU "\$1"
EOF
      )
      if [[ -n "$OPT_ARG" ]]; then
        CASE_HANDLER=$(cat <<EOF
          ${CASE_HANDLER}
            list-add-item _PASSTHRU "\$2"
            shift
EOF
        )
      fi
      CASE_HANDLER=$(cat <<EOF
        ${CASE_HANDLER}
          shift;;
EOF
      )
    else # non-passthru vars
      local VAR_SETTER="${VAR_NAME}=true;"
      if [[ -n "$OPT_ARG" ]]; then
        LOCAL_DECLS="${LOCAL_DECLS}local ${VAR_NAME}_SET='';"
        VAR_SETTER=${VAR_NAME}'="${2}"; '${VAR_NAME}'_SET=true; shift;'
      fi
      if [[ -z "$SHORT_OPT" ]]; then
        CASE_SELECT="--${LONG_OPT}]"
      fi
      CASE_HANDLER=$(cat <<EOF
      ${CASE_HANDLER}
        ${CASE_SELECT}
          $VAR_SETTER
          _OPTS_COUNT=\$(( \$_OPTS_COUNT + 1))
          shift;;
EOF
      )
    fi
  done # main while loop
  CASE_HANDLER=$(cat <<EOF
    case "\${1}" in
      $CASE_HANDLER
    esac
EOF
)
  # replace the ']'; see 'Bash Bug?' above
  CASE_HANDLER=$(echo "$CASE_HANDLER" | perl -pe 's/\]$/)/')

  # now we actually start the output to be evaled by the caller.

  # In script mode, we skip the local declarations. When used in a function
  # (i.e., not in scirpt mode), we declare everything local.
  if [[ -z "${SCRIPT:-}" ]]; then
    echo "${LOCAL_DECLS}"
    cat <<'EOF'
local _OPTS_COUNT=0
local _PASSTHRU=""
local TMP # see https://unix.stackexchange.com/a/88338/84520
EOF
  else # even though we don't declare local, we still want to support 'strict'
    # mode, so we do have to declare, just not local
    echo "${LOCAL_DECLS}" | sed -E 's/(^|;)[[:space:]]*local /\1/g'
    cat <<'EOF'
_OPTS_COUNT=0
_PASSTHRU=""
EOF
  fi

  cat <<EOF
TMP=\$(${GNU_GETOPT} -o "${SHORT_OPTS}" -l "${LONG_OPTS}" -- "\$@") \
  || exit \$?
eval set -- "\$TMP"
while true; do
  $CASE_HANDLER
done
shift
if [[ -n "\$_PASSTHRU" ]]; then
  eval set -- \$(list-quote _PASSTHRU) "\$@"
fi
EOF
  [[ -z "${SET_COUNT:-}" ]] || echo "${SET_COUNT}=\${_OPTS_COUNT}"
}

# Formats and echoes the the message.
#
# * Will process special chars the same as 'echo -e' (so \t, \n, etc. can be used in the message).
# * Treats all arguments as the message. 'echofmt "foo bar"' and 'echofmt foo bar' are equivalent.
# * Error and warning messages are directed towards stderr (unless modified by options).
# * Default message width is the lesser of 82 columns or the terminal column width.
# * Environment variable 'ECHO_WIDTH' will set the width. The '--width' option will override the environment variable.
# * Environment variable 'ECHO_QUIET' will suppress all non-error, non-warning messages if set to any non-empty value.
# * Environment variable 'ECHO_SILENT' will suppress all non-error messages if set to any non-empty value.
# * Environment variable 'ECHO_STDERR' will cause all output to be directed to stderr unless '--stderr' or '--stdout'
#   is specified.
# * Environment variable 'ECHO_STDOUT' will cause all output to be directed to stdout unless '--stderr' or '--stdout'
#   is specified.
echofmt() {
  local OPTIONS='INFO WARN ERROR WIDTH NO_FOLD:F STDERR STDOUT'
  eval "$(setSimpleOptions ${OPTIONS} -- "$@")"

  # First, let's check to see of the message is suppressed. The 'return 0' is explicitly necessary. 'return' sends
  # along $?, which, if it gets there, is 1 due to the failed previous test.
  ! { [[ -n "${ECHO_SILENT:-}" ]] && [[ -z "${ERROR:-}" ]]; } || return 0
  ! { [[ -n "${ECHO_QUIET:-}" ]] && [[ -z "${ERROR:-}" ]] && [[ -z "${WARN}" ]]; } || return 0

  # Examine environment to see if the redirect controls are set.
  if [[ -z "${STDERR:-}" ]] && [[ -z "${STDOUT:-}" ]]; then
    [[ -z "${ECHO_STDERR:-}" ]] || STDERR=true
    [[ -z "${ECHO_STDOUT:-}" ]] || STDOUT=true
  fi

  # Determine width... if folding
  [[ -z "${NO_FOLD:-}" ]] && [[ -n "${WIDTH:-}" ]] || { # If width is set as an option, then that's the end of story.
    local DEFAULT_WIDTH=82
    local WIDTH="${ECHO_WIDTH:-}"
    [[ -n "${WIDTH:-}" ]] || WIDTH=$DEFAULT_WIDTH
    # ECHO_WIDTH and DEFAULT_WIDTH are both subject to actual terminal width limitations.
    local TERM_WIDITH
    TERM_WIDTH=$(tput cols)
    (( ${TERM_WIDTH} >= ${WIDTH} )) || WIDTH=${TERM_WIDTH}
  }

  # Determine output color, if any.
  # internal helper function; set's 'STDERR' true unless target has already been set with '--stderr' or '--stdout'
  default-stderr() {
    [[ -n "${STDERR:-}" ]] || [[ -n "${STDOUT:-}" ]] || STDERR=true
  }
  local COLOR=''
  if [[ -n "${ERROR:-}" ]]; then
    COLOR="${red}"
    default-stderr
  elif [[ -n "${WARN:-}" ]]; then
    COLOR="${yellow}"
    default-stderr
  elif [[ -n "${INFO:-}" ]]; then
    COLOR="${green}"
  fi

  # we don't want to use an eval, and the way bash is evaluated means we can't do 'echo ... ${REDIRECT}' or something.
  if [[ -n "${STDERR:-}" ]]; then
    if [[ -z "$NO_FOLD" ]]; then
      echo -e "${COLOR:-}$*${reset}" | fold -sw "${WIDTH}" >&2
    else
      echo -e "${COLOR:-}$*${reset}" >&2
    fi
  else
    if [[ -z "${NO_FOLD:-}" ]]; then
      echo -e "${COLOR:-}$*${reset}" | fold -sw "${WIDTH}"
    else
      echo -e "${COLOR:-}$*${reset}"
    fi
  fi
}

echoerr() {
  echofmt --error "$@"
}

echowarn() {
  echofmt --warn "$@"
}

# Echoes a formatted message to STDERR. The default exit code is '1', but if 'EXIT_CODE', then that will be used. E.g.:
#
#    EXIT_CODE=5
#    echoerrandexit "Fatal code 5
#
# 'ECHO_NEVER_EXIT' can be set to any non-falsy value to supress the exit. This is intended primarily for use when liq
# functions are sourced and called directly from within the main shell, in which case exiting would kill the entire
# terminal session.
#
# See echofmt for further options and details.
echoerrandexit() {
  echofmt --error "$@"

  if [[ -z "${ECHO_NEVER_EXIT:-}" ]]; then
    [[ -z "${EXIT_CODE:-}" ]] || exit ${EXIT_CODE}
    exit 1
  fi
}

field-to-label() {
  local FIELD="${1}"
  echo "${FIELD:0:1}$(echo "${FIELD:1}" | tr '[:upper:]' '[:lower:]' | tr '_' ' ')"
}

echo-label-and-values() {
  eval "$(setSimpleOptions STDERR:e -- "$@")"

  local FIELD="${1}"
  local VALUES="${2:-}"
  (( $# == 2 )) || VALUES="${!FIELD:-}"
  local OUT

  OUT="$(echo -n "$(field-to-label "$FIELD"): ")"
  if (( $(echo "${VALUES}" | wc -l) > 1 )); then
    OUT="${OUT}$(echo -e "\n${VALUES}" | sed '2,$ s/^/   /')" # indent
  else # just one line
    OUT="${OUT}$(echo "${VALUES}")"
  fi

  if [[ -z "$STDERR" ]]; then # echo to stdout
    echo -e "$OUT"
  else
    echo -e "$OUT" >&2
  fi
}

# Prompts the user for input and saves it to a var.
# Arg 1: The prompt.
# Arg 2: The name of the var to save the answer to. (BUG: Don't use 'VAR'. 'ANSWER' is always safe.)
# Arg 3 (opt): Default value to use if the user just hits enter.
#
# The defult value will be added to the prompt.
# If '--multi-line' is specified, the user may enter multiple lines, and end input with a line containing a single '.'.
# Instructions to this effect will emitted. Also, in this mode, spaces in the answer will be preserved, while in
# 'single line' mode, leading and trailing spaces will be removed.
get-answer() {
  eval "$(setSimpleOptions MULTI_LINE -- "$@")"
  local PROMPT="$1"
  local VAR="$2" # TODO: if name is 'VAR', then this breaks...
  local DEFAULT="${3:-}"

  if [[ -n "${DEFAULT}" ]]; then
    if [[ -z "$MULTI_LINE" ]]; then
      PROMPT="${PROMPT} (${DEFAULT}) "
    else
      PROMPT="${PROMPT}"$'\n''(Hit "<PERIOD><ENTER>" for default:'$'\n'"$DEFAULT"$'\n'')'
    fi
  fi

  if [[ -z "$MULTI_LINE" ]]; then
    read -r -p "$PROMPT" $VAR
    if [[ -z ${!VAR:-} ]] && [[ -n "$DEFAULT" ]]; then
      # MacOS dosen't support 'declare -g' :(
      eval $VAR='"$DEFAULT"'
    fi
  else
    local LINE
    echo "$PROMPT"
    echo "(End multi-line input with single '.')"
    unset $VAR LINE
    while true; do
      IFS= read -r LINE
      if [[ "$LINE" == '.' ]]; then
        if [[ -z "${!VAR:-}" ]] && [[ -n "$DEFAULT" ]]; then
          eval $VAR='"$DEFAULT"'
        fi
        break
      else
        list-add-item $VAR "$LINE"
      fi
    done
  fi
}

# Functions as 'get-answer', but will continually propmt the user if no answer is given.
# '--force' causes the default to be set to the previous answer and the query to be run again. This is mainly useful
# internally and direct calls should generally note have cause to use this option. (TODO: let's rewrite this to 'unset'
# the vars (?) and avoid the need for force?)
require-answer() {
  eval "$(setSimpleOptions FORCE MULTI_LINE -- "$@")"
  local PROMPT="$1"
  local VAR="$2" # TODO: if name is 'VAR', then this breaks...
  local DEFAULT="${3:-}"

  if [[ -n "$FORCE" ]] && [[ -z "$DEFAULT" ]]; then
    DEFAULT="${!VAR:-}"
  fi

  # TODO: support 'pass-through' options in 'setSimpleOptions'
  local OPTS=''
  if [[ -n "$MULTI_LINE" ]]; then
    OPTS="${OPTS}--multi-line "
  fi
  while [[ -z ${!VAR:-} ]] || [[ -n "$FORCE" ]]; do
    get-answer ${OPTS} "$PROMPT" "$VAR" "$DEFAULT" # can't use "$@" because default may be overriden
    if [[ -z ${!VAR:-} ]]; then
      echoerr "A response is required."
    else
      FORCE='' # if forced into loop, then we un-force when we get an answer
    fi
  done
}

# Produces a 'yes/no' prompt, accepting 'y', 'yes', 'n', or 'no' (case insensitive). Unlike other prompts, this function
# returns true or false, making it convenient for boolean tests.
yes-no() {
  default-yes() { return 0; }
  default-no() { return 1; } # bash false-y

  local PROMPT="${1:-}"
  local DEFAULT="${2:-}"
  local HANDLE_YES="${3:-default-yes}"
  local HANDLE_NO="${4:-default-no}" # default to noop

  local ANSWER=''
  read -p "$PROMPT" ANSWER
  if [[ -z "$ANSWER" ]] && [[ -n "$DEFAULT" ]]; then
    case "$DEFAULT" in
      Y*|y*)
        $HANDLE_YES; return $?;;
      N*|n*)
        $HANDLE_NO; return $?;;
      *)
        echo "You must choose an answer."
        yes-no "$PROMPT" "$DEFAULT" $HANDLE_YES $HANDLE_NO
    esac
  else
    case "$(echo "$ANSWER" | tr '[:upper:]' '[:lower:]')" in
      y|yes)
        $HANDLE_YES; return $?;;
      n|no)
        $HANDLE_NO; return $?;;
      *)
        echo "Did not understand response, please answer 'y(es)' or 'n(o)'."
        yes-no "$PROMPT" "$DEFAULT" $HANDLE_YES $HANDLE_NO;;
    esac
  fi
}

gather-answers() {
  eval "$(setSimpleOptions VERIFY PROMPTER= SELECTOR= DEFAULTER= -- "$@")"
  local FIELDS="${1:-}"

  local FIELD VERIFIED
  while [[ "${VERIFIED}" != true ]]; do
    # collect answers
    for FIELD in $FIELDS; do
      local LABEL
      LABEL="$(field-to-label "$FIELD")"

      local PROMPT DEFAULT SELECT_OPTS
      PROMPT="$({ [[ -n "$PROMPTER" ]] && $PROMPTER "$FIELD" "$LABEL"; } || echo "${LABEL}: ")"
      DEFAULT="$({ [[ -n "$DEFAULTER" ]] && $DEFAULTER "$FIELD"; } || echo '')"
      if [[ -n "$SELECTOR" ]] && SELECT_OPS="$($SELECTOR "$FIELD")" && [[ -n "$SELECT_OPS" ]]; then
        local FIELD_SET="${FIELD}_SET"
        if [[ -z ${!FIELD:-} ]] && [[ "${!FIELD_SET}" != 'true' ]] || [[ "$VERIFIED" == false ]]; then
          unset $FIELD
          PS3="${PROMPT}"
          selectDoneCancel "$FIELD" SELECT_OPS
          unset PS3
        fi
      else
        local OPTS=''
        # if VERIFIED is set, but false, then we need to force require-answer to set the var
        [[ "$VERIFIED" == false ]] && OPTS='--force '
        if [[ "${FIELD}" == *: ]]; then
          FIELD=${FIELD/%:/}
          OPTS="${OPTS}--multi-line "
        fi

        require-answer ${OPTS} "${PROMPT}" $FIELD "$DEFAULT"
      fi
    done

    # verify, as necessary
    if [[ -z "${VERIFY}" ]]; then
      VERIFIED=true
    else
      verify() { VERIFIED=true; }
      no-verify() { VERIFIED=false; }
      echo
      echo "Verify the following:"
      for FIELD in $FIELDS; do
        FIELD=${FIELD/:/}
        echo-label-and-values "${FIELD}" "${!FIELD:-}"
      done
      echo
      yes-no "Are these values correct? (y/N) " N verify no-verify
    fi
  done
}

gcloud-account-report() {
  local ACTIVE_GCLOUD_ACCOUNT=$(gcloud config configurations list --filter='is_active=true' --format 'value(properties.core.account)')
  echofmt "Using account '${ACTIVE_GCLOUD_ACCOUNT}'..."
}
gcloud-check-access() {
  gcloud projects list > /dev/null ||
    echoerrandexit "\nIt does not appear we can access the Google Cloud. This may be due to stale or lack of  authentication tokens. See above for more information."
}
# These are common helper functions meant to be called by higher level functions utilizing the common options. They rely
# on external varaiables.

gcloud-lib-common-core-options-spec() {
  echo 'PROJECT= NON_INTERACTIVE: NO_ACCOUNT_REPORT: SKIP_AUTH_CHECK:'
}

gcloud-lib-common-options-check-access-and-report() {
  [[ -n "${SKIP_AUTH_CHECK:-}" ]] || {
    gcloud-check-access
    [[ -n "${NO_ACCOUNT_REPORT:-}" ]] || gcloud-account-report
  }
}

gcloud-lib-common-org-options-spec() {
  echo 'ORGANIZATION='
}

gcloud-lib-common-org-options-processing() {
  [[ -n "${ORGANIZATION:-}" ]] || echoerrandexit 'Organization (--organization=xxxx) is required.'
}

gcloud-lib-common-create-options-spec() {
  echo 'CREATE_IF_NECESSARY'
}

gcloud-lib-common-create-named-options-spec() {
  gcloud-lib-common-create-options-spec
  echo 'NO_RETRY_NAMES: RETRY_COUNT:= ID_OUTPUT_VAR'
}

gcloud-lib-common-retry-options-processing() {
  [[ -n "${RETRY_COUNT:-}" ]] || RETRY_COUNT=3
}
ensure-settings() {
  while (( $# > 0 )); do
    local SETTING="${1}"; shift
    if [[ -z "${!SETTING:-}" ]]; then
      if [[ -n "${NON_INTERACTIVE:-}" ]]; then
        echoerrandexit "Cannot determine valid default for '${SETTING}' in non-interactive mode. A valid value must be discernable or set on invocation."
      else
        get-answer "Value for '${SETTING}?'" ${SETTING} "${!SETTING:-}"
      fi
    fi
  done
}
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
# TODO: we have older gcloud code... somewhere that handles some of this stuff. Like, maybe dealing with the project 'name'

# Utility to robustly create a new Google project. Since projects IDs are (bizarely) both global /and/ entirely
# unreserved, there is often contention for project names and by default the utility will attempt to append random
# numbers in order to locate a free name.
#
# --no-retry-names : if project creation fails possibly because of name collision, then the utility will fail
#   immediately rather than append random number and retry
# --non-interactive : causes flows that would otherwise result in a user prompt to instead halt with an error
gcloud-projects-create() {
  # TODO: the '--non-interactive' setting would be nice to support globally as part of the prompt package
  eval "$(setSimpleOptions \
    $(gcloud-lib-common-core-options-spec) \
    $(gcloud-lib-common-org-options-spec) \
    $(gcloud-lib-common-create-named-options-spec) \
    -- "$@")"
  # set default and common processing
  ensure-settings PROJECT
  gcloud-lib-common-options-check-access-and-report
  gcloud-lib-common-org-options-processing
  gcloud-lib-common-retry-options-processing

  echofmt "Testing if project '${PROJECT}' already exists..."
  if ! gcloud projects describe "${PROJECT}" >/dev/null 2>&1; then
    [[ -z "${NON_INTERACTIVE}" ]] || [[ -n "${CREATE_IF_NECESSARY}" ]] \
      || echoerrandexit "Project does not exist and 'create if necessary' option is not set while invoking gcloud-projects-create in non-interactive mode."
    if [[ -n "${CREATE_IF_NECESSARY}" ]] \
        || yes-no "Project '${PROJECT}' not found. Attempt to create?" 'Y'; then
      local FINAL_ERROR
      gcloud-projects-create-helper-command || { # if first attempt doesn't succeed, maybe we can retry?
        [[ -z "${NO_RETRY_NAMES}" ]] && { # retry is allowed
          local I=1
          while (( ${I} <= ${RETRY_COUNT} )); do
            echofmt "There seems to have been a problem; this may be because the global project is taken. Retrying ${I} of ${RETRY_COUNT}..."
            { gcloud-projects-create-helper-command &&  break; } || {
              I=$(( ${I} + 1 ))
              (( ${I} <= ${RETRY_COUNT} ))
            }
          done
        } # retry allowed block
      } || { # final; we're out of retries
        echoerrandexit "Could not create project. Error message on last attempt was: $(<"${INTRAWEB_TMP_ERROR}")"
      }
    fi # CREATE_IF_NECESSARY
  else # gcloud projects describe found something and the project exists
    gcloud-projects-create-helper-set-var
    echofmt "Project '${PROJECT}' already exists under organization ${ORGANIZATION}."
  fi
}

# helper functions; these functions rely on the parent function variables and are not intended to be called directly by
# anyone else

gcloud-projects-create-helper-set-var() {
  [[ -z "${ID_OUTPUT_VAR}" ]] || eval "${ID_OUTPUT_VAR}='${EFFECTIVE_NAME}'"
}

gcloud-projects-create-helper-command() {
  local EFFECTIVE_NAME
  if [[ -z "${I:-}" ]]; then # we are in the first go around
    rm "${INTRAWEB_TMP_ERROR}"
    EFFECTIVE_NAME="${PROJECT}"
  else
    # TODO: make the max string length 'GOOGLE_MAX_PROJECT_LENGTH' or sometihng and load it
    # for every failure, we try a longer random number
    fill-rand --max-string-length 30 --max-number-length $(( 5 * ${I} )) --output-var EFFECTIVE_NAME "${PROJECT}-"
  fi
  echofmt "Attempting to create project '${EFFECTIVE_NAME}'..."
  # on success, will set ID_OUTPUT_VAR when appropriate; otherwise, exits with a failure code
  gcloud projects create "${EFFECTIVE_NAME}" --organization="${ORGANIZATION}" 2> "${INTRAWEB_TMP_ERROR}" && {
    echofmt "Created project '${EFFECTIVE_NAME}' under organization ${ORGANIZATION}"
    gcloud-projects-create-helper-set-var
  }
}
