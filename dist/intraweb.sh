#!/usr/bin/env bash

# Technical Notes
#
# The overall flow is:
#
# 1) Identify the site we're working with and load existing settings. Note, these settings aren't used directly as they
#    may be overriden or missing. The effective values will be set as we process.
# 2) Set settings based on the site configs, if any, unless overidden by explicit options.
# 3a) If in add flow, infer (some) missing settings from the gcloud configuration if not already set (by the site
#    config or the on the command line).
# 3b) If we're in a non-add flow, then verify that all settings are present.
# 4) Perform the action.

# bash strict settings
set -o errexit # exit on errors; set -e
set -o nounset # exit on use of uninitialized variable
set -o pipefail # exit if any part of a pipeline fails (rather than just on failure of final piece)

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
function real_path {
  local FILE="${1:-}"
  if [[ -z "$FILE" ]]; then
    echo "'real_path' requires target file specified." >&2
    return 1
  elif [[ ! -e "$FILE" ]]; then
    echo "Target file '$FILE' does not exist." >&2
    return 1
  fi

  function trim_slash {
    # sed adds a newline ()
    printf "$1" | sed 's/\/$//' | tr -d '\n'
  }
  # [[ -h /foo/link_dir ]] works, but [[ -h /foo/link_dir/ ]] does not!
  FILE=`trim_slash "$FILE"`

  if [[ -h "$FILE" ]]; then
    function resolve_link {
      local POSSIBLE_REL_LINK="${1:-}"
      local APPEND="${2:-}"
      if [[ "$POSSIBLE_REL_LINK" == /* ]]; then
        # for some reason 'echo -n' was echoing the '-n' when this was used
        # included in the catalyst-scripts. Not sure why, and don't know how
        # to test, but 'printf' does what we need.
        printf "$POSSIBLE_REL_LINK${APPEND}"
      else
        # Now we go into the dir containg the link and then navigate the possibly
        # relative link to the real dir. The subshell preserves the caller's PWD.
        (cd "$(dirname "$FILE")"
        cd "$POSSIBLE_REL_LINK"
        printf "${PWD}${APPEND}")
      fi
    }

    if [[ ! -d "$FILE" ]]; then
      # we need to get the real path to the real file
      local REAL_FILE_LINK_PATH="$(readlink "$FILE")"
      resolve_link "$(dirname "$REAL_FILE_LINK_PATH")" "/$(basename "$REAL_FILE_LINK_PATH")"
    else
      # we need to get the real path of the linked directory
      resolve_link "$(readlink "$FILE")"
    fi
  else
    printf "$FILE"
  fi
}

intraweb-add() {
  if [[ -z "${SITE}" ]] && [[ -n "${NON_INTERACTIVE}" ]]; then
    echoerrandexit "Must specify site in invocation in non-interactive mode."
  elif [[ -z "${SITE}" ]]; then
    require-answer "Name (domain) of site to add?" SITE
  fi

  intraweb-settings-infer-from-gcloud-config
  intraweb-settings-process-assumptions

  intraweb-add-lib-enusre-dirs "${SITE}"
  intraweb-add-lib-ensure-settings

  # Reflect our effective values back into the saved settings
  for SETTING in ${INTRAWEB_SETTINGS}; do
    IW_SETTING="INTRAWEB_SITE_${SETTING}"
    eval "${IW_SETTING}='${!SETTING:-}'" # may still be blank, but we'll catch that in ensure-settings
  done

  intraweb-settings-update-settings
  intraweb-add-helper-udpate-gcloud
}

intraweb-add-lib-enusre-dirs() {
  local SITE="${1}"

  local DIR
  for DIR in "${INTRAWEB_DB}" "${INTRAWEB_SITES}" "${INTRAWEB_CACHE}" "${INTRAWEB_SITES}/${SITE}"; do
    [[ -d "${DIR}" ]] \
      || { echofmt "Creating '${DIR}'..."; mkdir -p "${DIR}"; }
  done
}

intraweb-add-lib-ensure-settings() {
  [[ -f "${SITE_SETTINGS_FILE}" ]] || touch "${SITE_SETTINGS_FILE}"
  source "${SITE_SETTINGS_FILE}"

  local INTRAWEB_SITE_ORGANIZATION_PROMPT='Organization—a number—to nest projects under?'
  local INTRAWEB_SITE_PROJECT_PROMPT='Project (base) name?'
  local INTRAWEB_SITE_BUCKET_PROMPT='Bucket (base) name?'
  local INTRAWEB_SITE_APPLICATION_TITLE_PROMPT='Application title?'
  local INTRAWEB_SITE_REGION_PROMPT='Deploy region?'
  local INTRAWEB_SITE_SUPPORT_EMAIL_PROMPT='OAuth authentication support email?'

  local SETTING PROMPT_VAR PROMPT DEFAULT_VAR DEFAULT
  for SETTING in ${INTRAWEB_SETTINGS}; do
    if [[ -z "${ASSUME_DEFAULTS}" ]] || [[ -z "${!SETTING:-}" ]]; then
      [[ -z "${NON_INTERACTIVE}" ]] || echofmt "Could not determine value for '${SETTING}' in non-interactive mode."

      PROMPT_VAR="INTRAWEB_SITE_${SETTING}_PROMPT"
      PROMPT="${!PROMPT_VAR:=${SETTING}?}"

      DEFAULT="${!SETTING:-}"
      if [[ -z "${DEFAULT:-}" ]]; then
        DEFAULT_VAR="INTRAWEB_DEFAULT_${SETTING}"
        DEFAULT="${!DEFAULT_VAR:-}"
      fi

      require-answer --force "${PROMPT}" ${SETTING} "${DEFAULT}"
      eval "INTRAWEB_SITE_${SETTING}=${!SETTING}"

      intraweb-settings-process-assumptions > /dev/null # TODO: set quiet instead
    fi
  done
}

intraweb-add-helper-udpate-gcloud() {
  if [[ -z "${NO_UPDATE_GCLOUD_CONF:-}" ]]; then
    local SETTING GCLOUD_VALUE
    for SETTING in ${INTRAWEB_GCLOUD_PROPERTIES}; do

      if [[ -n "${!SETTING:-}" ]]; then
        GCLOUD_PROPERTY="$(intraweb-setting-infer-gcloud-property-scope "${SETTING}")"
        GCLOUD_VALUE="$(gcloud config get-value ${GCLOUD_PROPERTY})"
        if [[ -z "${GCLOUD_VALUE}" ]] || [[ -n "${FORCE_UPDATE_GCLOUD_CONF}" ]]; then
          gcloud config set ${GCLOUD_PROPERTY} "${!SETTING}" \
            && echofmt "Set gcloud conf '${GCLOUD_PROPERTY}' to '${!SETTING}'"
        fi
      fi
    done
  fi
}
intraweb-build() {
  # first, we do our own global auth check
  gcloud-lib-common-options-check-access-and-report
  # and now we can skip the auth check for the individual steps
  # TODO: need to revisit 'passthrough' support in 'setSimpleOptions' to avoid all this. E.g., by befault, use the
  # existing var if the option is NOT set
  local COMMON_OPTS PROJECT_CREATE_OPTS IAP_OPTS BUCKET_CREATE_OPTS APP_CREATE_OPTS
  intraweb-build-helper-update-settings

  local FINAL_PROJECT_NAME FINAL_BUCKET_NAME

  gcloud-projects-create ${PROJECT_CREATE_OPTS} --id-output-var FINAL_PROJECT_NAME
  if [[ "${FINAL_PROJECT_NAME}" != "${PROJECT}" ]]; then
    PROJECT="${FINAL_PROJECT_NAME}"
    INTRAWEB_SITE_PROJECT="${PROJECT}"
    intraweb-settings-update-settings
    intraweb-build-helper-update-settings
  fi

  # without the eval, the '-quotes get read as literal, to the tokens end up being like:
  # --application_title|'Foo|Bar'|--support_email|'foo@bar.com'
  # as if the email literally began and ended with ticks and any title with spaces gets cut up.
  eval gcloud-projects-iap-oauth-setup ${IAP_OPTS}

  gcloud-app-create ${APP_CREATE_OPTS}

  gcloud-storage-buckets-create ${BUCKET_CREATE_OPTS} --id-output-var FINAL_BUCKET_NAME
  if [[ "${FINAL_BUCKET_NAME}" != "${BUCKET}" ]]; then
    BUCKET="${FINAL_BUCKET_NAME}"
    INTRAWEB_SITE_BUCKET="${BUCKET}"
    intraweb-settings-update-settings
    intraweb-build-helper-update-settings
  fi

  gcloud-storage-buckets-configure ${COMMON_OPTS} \
    --bucket ${BUCKET} \
    --make-uniform \
    --reader "serviceAccount:${PROJECT}@appspot.gserviceaccount.com"

  echofmt "\n${bold}Congragutalions!${reset} Your intraweb infrastructure is now built. To deploy content to the site, run:\n\nintraweb --site ${SITE} deploy"
}

# This is necessary to update the 'project' setting if things change.
intraweb-build-helper-update-settings() {
  # notice, we manipulate the super-funcs local vars directly.
  COMMON_OPTS="--skip-auth-check --project ${PROJECT}"
  [[ -z "${NON_INTERACTIVE}" ]] || COMMON_OPTS="${COMMON_OPTS} --non-interactive"
  PROJECT_CREATE_OPTS="${COMMON_OPTS} --organization ${ORGANIZATION}"
  IAP_OPTS="${COMMON_OPTS}"
  BUCKET_CREATE_OPTS="${COMMON_OPTS}"
  APP_CREATE_OPTS="${COMMON_OPTS}"
  [[ -z "${CREATE_IF_NECESSARY}" ]] || {
    PROJECT_CREATE_OPTS="${PROJECT_CREATE_OPTS} --create-if-necessary"
    APP_CREATE_OPTS="${APP_CREATE_OPTS} --create-if-necessary"
    BUCKET_CREATE_OPTS="${BUCKET_CREATE_OPTS} --create-if-necessary"
  }
  [[ -z "${BUCKET}" ]] || BUCKET_CREATE_OPTS="${BUCKET_CREATE_OPTS} --bucket ${BUCKET}"
  [[ -z "${APPLICATION_TITLE}" ]] || IAP_OPTS="${IAP_OPTS} --application-title '${APPLICATION_TITLE}'"
  [[ -z "${SUPPORT_EMAIL}" ]] || IAP_OPTS="${IAP_OPTS} --support-email '${SUPPORT_EMAIL}'"
  [[ -z "${REGION}" ]] || APP_CREATE_OPTS="${APP_CREATE_OPTS} --region ${REGION}" # TODO: do others take a region?
}
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
intraweb-list() {
  ls "${INTRAWEB_SITES}"
}
intraweb-remove() {
  if [[ -n "${SHUTDOWN_PROJECT}" ]]; then
    gcloud projects delete "${PROJECT}" && echofmt "Project '${PROJECT}' has been shut down." \
      || echoerrandexit "There was a problem shutting down the project. Leaving intraweb site entry in place."
  fi
  if [[ -d "${INTRAWEB_SITES}/${SITE}" ]]; then
    rm -rf "${INTRAWEB_SITES}/${SITE}" && echofmt "Local intraweb site entry deleted."
  fi
}
intraweb-run() {
  :
}
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
SUPPORT_EMAIL"

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
intraweb-settings-verify-present() {
  local SETTING PROBLEMS

  for SETTING in $INTRAWEB_SITE_SETTINGS; do
    if [[ -z "${!SETTING:-}" ]]; then
      echoerr "Did not find expected setting: '${SETTING}'."
      PROBLEMS=true
    fi
    if [[ "${PROBLEMS}" == true ]]; then
      echoerrandexit "At least one parameter is not set. Try:\n\nintraweb update-settings --site ${SITE}"
    fi
  done
}

intraweb-setting-infer-gcloud-property-scope() {
  local GCLOUD_PROPERTY="${1}"

  GCLOUD_PROPERTY="$(echo "${GCLOUD_PROPERTY}" | tr '[:upper:]' '[:lower:]')"
  case "${GCLOUD_PROPERTY}" in
    region)
      GCLOUD_PROPERTY="compute/${GCLOUD_PROPERTY}" ;;
  esac

  echo "${GCLOUD_PROPERTY}"
}

intraweb-settings-infer-from-gcloud-config() {
  local SETTING NO_SETTING GCLOUD_PROPERTY
  for SETTING in ${INTRAWEB_GCLOUD_PROPERTIES}; do
    NO_SETTING="NO_INFER_${SETTING}"

    if [[ -z "${!SETTING:-}" ]] && [[ -z "${!NO_SETTING:-}" ]]; then
      GCLOUD_PROPERTY="$(intraweb-setting-infer-gcloud-property-scope "${SETTING}")"

      eval "${SETTING}=\$(gcloud config get-value ${GCLOUD_PROPERTY})" || true
      # Note the setting may remain undefined, and that's OK
      [[ -z "${!SETTING:-}" ]] || echofmt "Inferred ${SETTING} '${!SETTING}' from active gcloud conf."
    fi
  done
}

# Examines non-set values and attempts to infer default values. This will update the effective values (e.g.,
# ORGANIZATION, PROJECT, etc.) as well as the 'INTRAWEB_SITE_*' values. We assume that the INTRAWEB_VALUES are not set
# because if they were, then the effective value would have been set by this point.
intraweb-settings-process-assumptions() {
  if [[ -n "${ASSUME_DEFAULTS}" ]]; then
    echofmt "Setting assumable values..."
    if [[ -z "${ORGANIZATION}" ]]; then # let's see if they have access to just one
      local POTENTIAL_IDS ID_COUNT
      POTENTIAL_IDS="$(gcloud organizations list --format 'value(ID)')"
      ID_COUNT=$(echo "${POTENTIAL_IDS}" | wc -l)
      if (( ${ID_COUNT} == 1 )); then
        ORGANIZATION=${POTENTIAL_IDS}
        echofmt "Inferred organization '${ORGANIZATION}' from single access."
      fi
    fi

    # is this a new project?
    local COMPANY_DISPLAY_NAME
    if [[ -z "${PROJECT}" ]]; then
      # TODO: lowercase and '-' case whatever comes out of here... once we move this to node? At that point, we'll wanat # to use the 'project safe' version for the project and the raw version for the application title. (I'm assuming
      # the display name can have spaces. It's 'liquid-labs.com' for LL, but I'm assuming that's just my convention.)
      COMPANY_DISPLAY_NAME="$(gcloud organizations describe ${ORGANIZATION} --format 'value(displayName)')"
      # TODO (cont) for now, we'll just kill it if there's any disallowed characters
      { [[ "${COMPANY_DISPLAY_NAME}" != *' '* ]] && echofmt "Found company name '${COMPANY_DISPLAY_NAME}'..."; } \
        || unset COMPANY_DISPLAY_NAME
    fi

    # no project but we have a company name
    [[ -n "${PROJECT:-}" ]] || [[ -z "${COMPANY_DISPLAY_NAME}" ]] || {
      PROJECT="${COMPANY_DISPLAY_NAME}-intraweb"
      echofmt "Setting project ID to '${PROJECT}'."
    }

    # no application title, but we have a company name
    [[ -n "${APPLICATION_TITLE}" ]] || [[ -z "${COMPANY_DISPLAY_NAME}" ]] || {
      APPLICATION_TITLE="${COMPANY_DISPLAY_NAME} Intraweb"
      echofmt "Setting application title to '${APPLICATION_TITLE}'."
    }


    # bucket ID is same as project ID if not set
    [[ -n "${BUCKET}" ]] || [[ -z "${PROJECT}" ]] || {
      BUCKET="${PROJECT}"
      echofmt "Setting bucket ID to '${BUCKET}'."
    }

    [[ -n "${SUPPORT_EMAIL}" ]] || [[ -z "${INTRAWEB_SITE_SUPPORT_EMAIL}" ]] || {
      SUPPORT_EMAIL="${INTRAWEB_SITE_SUPPORT_EMAIL}"
      echofmt "Setting support email to '${SUPPORT_EMAIL}'."
    }
  fi
}

intraweb-settings-update-settings() {
  ! [[ -f "${SITE_SETTINGS_FILE}" ]] || rm "${SITE_SETTINGS_FILE}"
  local SETTING
  for SETTING in ${INTRAWEB_SITE_SETTINGS}; do
    echo "${SETTING}='${!SETTING}'" >> "${SITE_SETTINGS_FILE}"
  done
}
usage() {
  echo "TODO"
}

usage-bad-action() {
  usage
  echoerrandexit "\nMust specify a valid action as first argument:\n\nintraweb [ $(echo "${VALID_ACTIONS}" | sed 's/ / \| /g') ]\n\nSee usage above for further details."
}
# TODO: we have older gcloud code... somewhere that handles some of this stuff. Like, maybe dealing with the project 'name'

# Utility to robustly create a new Google App. Since projects IDs are (bizarely) both global /and/ entirely
# unreserved, there is often contention for project names and by default the utility will attempt to append random
# numbers in order to locate a free name.
#
# --non-interactive : causes flows that would otherwise result in a user prompt to instead halt with an error
gcloud-app-create() {
  # TODO: the '--non-interactive' setting would be nice to support globally as part of the prompt package
  eval "$(setSimpleOptions \
    $(gcloud-lib-common-core-options-spec) \
    $(gcloud-lib-common-create-options-spec) \
    REGION= \
    -- "$@")"
  # set default and common processing
  ensure-settings PROJECT
  gcloud-lib-common-options-check-access-and-report

  echofmt "Testing if app associated with '${PROJECT}' already exists..."
  if ! gcloud app describe --project "${PROJECT}" >/dev/null 2>&1; then
    [[ -z "${NON_INTERACTIVE}" ]] || [[ -n "${CREATE_IF_NECESSARY}" ]] \
      || echoerrandexit "App does not exist and 'create if necessary' option is not set while invoking gcloud-apps-create in non-interactive mode."
    if [[ -n "${CREATE_IF_NECESSARY}" ]] \
        || yes-no "App for '${PROJECT}' not found. Attempt to create?" 'Y'; then
      local CREATE_OPTS
      [[ -z "${PROJECT}" ]] || CREATE_OPTS="--project ${PROJECT}"
      [[ -z "${REGION}" ]] || CREATE_OPTS="${CREATE_OPS:-} --region ${REGION}"
      echo gcloud app create ${CREATE_OPTS}
      gcloud app create ${CREATE_OPTS} \
        && echo "App created for project '${PROJECT}'" \
        || echoerrandexit "Unable to create app. See above for further details."
    fi # CREATE_IF_NECESSARY
  else # gcloud projects describe found something and the project exists
    echofmt "App for project '${PROJECT}' already exists."
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

  local EFFECTIVE_NAME="${PROJECT}"

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
gcloud-projects-iap-oauth-setup() {
  # TODO: the '--non-interactive' setting would be nice to support globally as part of the prompt package
  eval "$(setSimpleOptions $(gcloud-lib-common-core-options-spec) APPLICATION_TITLE:t= SUPPORT_EMAIL:e= -- "$@")"
  ensure-settings PROJECT

  local IAP_SERVICE='iap.googleapis.com'
  local IAP_STATE
  IAP_STATE=$(gcloud services list --project=${PROJECT} \
    --available \
    --filter="name:${IAP_SERVICE}" \
    --format='value(name)')
  if [[ "${IAP_STATE}" == 'ENABLED' ]]; then
    echofmt "Service '${IAP_SERVICE}' already enabled for project '${PROJECT}'."
  else
    gcloud services enable ${IAP_SERVICE} --project=${PROJECT} \
      && echofmt "IAP service enableled for project '${PROJECT}'..." \
      || echoerrandexit "Error enabling service. Refer to any error report above. Try again later or enable manually."
  fi

  # Check if OAuth brand is configured, and if not, attempt to configure it.
  local BRAND_NAME
  BRAND_NAME=$(gcloud alpha iap oauth-brands list --project=${PROJECT} --format='value(name)')
  [[ -n ${BRAND_NAME} ]] \
    && echofmt "IAP OAuth brand '${BRAND_NAME}' already configured..." \
    || {
      # Check if we have 'non-interactive' set and blow up if we don't have the data we need.
      [[ -z "${NON_INTERACTIVE}" ]] \
        || { [[ -n "${APPLICATION_TITLE}" ]] && [[ -n "${SUPPORT_EMAIL}" ]]; } \
        || echoerrandexit "Must provide application title and support email when running in non-interactive mode."
      # If the defaults are present, then it is considered answered and nothing happens.
      require-answer 'Application title (for OAuth authentication)?' APPLICATION_TITLE "${APPLICATION_TITLE}"
      require-answer 'Support email for for OAuth authentication problems?' SUPPORT_EMAIL "${SUPPORT_EMAIL}"
      # Finally, all the data is gathered and we're ready to actually configure.
      BRAND_NAME=$(gcloud alpha iap oauth-brands create --project=${PROJECT} \
          --application_title="${APPLICATION_TITLE}" \
          --support_email="${SUPPORT_EMAIL}" \
          --format='value(name)') \
        && echofmt "IAP-OAuth brand identify configured for project '${PROJECT}' with title '${APPLICATION_TITLE}' and support email '${SUPPORT_EMAIL}'..." \
        || echoerrandexit "Error configuring OAuth brand identity. Refer to any errors above. Try again later or enable manually.\n\nCommon problems include the use of a non-existent support email. Verify that the email address references a valid user or group."
    } # brand setup

  # now we can setup the intraweb client
  local OAUTH_CLIENT_NAME
  OAUTH_CLIENT_NAME=$(gcloud alpha iap oauth-clients list "${BRAND_NAME}" --format 'value(name)')
  [[ -n "${OAUTH_CLIENT_NAME}" ]] \
    && echofmt "OAuth client '${APPLICATION_TITLE}' already exists for brand '${BRAND_NAME}'..." \
    || {
      echofmt "Attempting to create new OAuth client..."
      OAUTH_CLIENT_NAME=$(gcloud alpha iap oauth-clients create ${BRAND_NAME} \
        --display_name "${APPLICATION_TITLE}" \
        --project ${PROJECT} \
        --format 'value(name)')
    } # oauth client setup
}
gcloud-storage-buckets-configure() {
  eval "$(setSimpleOptions \
    $(gcloud-lib-common-core-options-spec) \
    BUCKET= \
    READER:= \
    DELETE: \
    PUBLIC: \
    PRIVATE: \
    MAKE_UNIFORM: \
    SKIP_UNIFORM_CHECK:U \
    -- "$@")"
  # set default and common processing
  gcloud-lib-common-options-check-access-and-report

  ensure-settings BUCKET

  if [[ -n "${PUBLIC}" ]] && [[ -n "${PRIVATE}" ]]; then
    echoerrandexit "'--public' and '--private' are incompatible. options."
  fi

  local SHOW=true

  if [[ -n "${MAKE_UNIFORM}" ]]; then
    [[ -z "${DELETE}" ]] || echoerrandexit "'--delete' and '--uniform' are incompatible."
    gsutil uniformbucketlevelaccess set on gs://${BUCKET} \
      || echoerrandexit "Failed to configure bucket '${BUCKET}' for public access."
    unset SHOW
  elif [[ -z "${SKIP_UNIFORM_CHECK}" ]]; then # verify that uniformbucketlevelaccess is set
    gsutil uniformbucketlevelaccess get gs://${BUCKET} | grep -qiE 'Enabled:\s *True' \
      || echoerrandexit "It does not appear that bucket '${BUCKET}' is setup for uniform bucket level access. Try:\n$(basename "${0}") --make-uniform"
  fi

  if [[ -n "${PRIVATE}" ]]; then
    [[ -z "${DELETE}" ]] || echoerrandexit "'--delete' and '--private' are incompatible."
    gsutil iam ch -d 'allUsers:objectViewer' gs://${BUCKET} \
      && echofmt "Bucket '${BUCKET}' is now private." \
      || echoerrandexit "Failed to configure bucket '${BUCKET}' for public access."
    unset SHOW
  elif [[ -n "${PUBLIC}" ]]; then
    [[ -z "${DELETE}" ]] || echoerrandexit "'--delete' and '--public' are incompatible."
    gsutil iam ch 'allUsers:objectViewer' gs://${BUCKET} \
      && echofmt "Bucket '${BUCKET}' is now publicly readable." \
      || echoerrandexit "Failed to configure bucket '${BUCKET}' for public access."
    unset SHOW
  fi

  local OPTS=""
  [[ -z "${DELETE}" ]] || OPTS="-d"

  local CHANGE SPEC
  if [[ -n "${READER}" ]]; then
    [[ -n "${DELETE}" ]] && CHANGE="NOT readable" || CHANGE="readable"
    for SPEC in ${READER}; do
      local MEMBER
      MEMEBR="$(echo "${SPEC}" | cut -d: -f2)"
      gsutil iam ch ${OPTS} "${SPEC}:objectViewer" gs://${BUCKET} \
        && echofmt "Bucket '${BUCKET}' is now ${CHANGE} by ${MEMBER}." \
        || echoerrandexit "FAILED to update bucket '${BUCKET}' to ${CHANGE} by ${MEMBER}."
    done
    unset SHOW
  fi

  if [[ -n "${SHOW:-}" ]]; then
    gsutil iam get gs://${BUCKET}
  fi
}
# TODO: we have older gcloud code... somewhere that handles some of this stuff. Like, maybe dealing with the project 'name'

# Utility to robustly create a new Google storage bucket. Since storage buckets IDs are (bizarely) both global /and/ entirely
# unreserved, there is often contention for storage bucket names and by default the utility will attempt to append random
# numbers in order to locate a free name.
#
# --no-retry-names : if storage bucket creation fails possibly because of name collision, then the utility will fail
#   immediately rather than append random number and retry
# --non-interactive : causes flows that would otherwise result in a user prompt to instead halt with an error
gcloud-storage-buckets-create() {
  # TODO: the '--non-interactive' setting would be nice to support globally as part of the prompt package
  eval "$(setSimpleOptions \
    $(gcloud-lib-common-core-options-spec) \
    $(gcloud-lib-common-create-named-options-spec) \
    BUCKET= \
    PUBLIC: \
    -- "$@")"
  # set default and common processing
  ensure-settings PROJECT
  gcloud-lib-common-options-check-access-and-report
  gcloud-lib-common-retry-options-processing

  local TARGET_OPTS=''
  [[ -z "${PROJECT}" ]] || TARGET_OPTS="-p ${PROJECT}"

  if [[ -z "${BUCKET}" ]]; then
    [[ -z "${NON_INTERACTIVE}" ]] \
      || echoerrandexit "Bucket ID not specified while invoking gcloud-storage-buckets in non-interactive mode."
    require-answer 'Bucket ID to create?' BUCKET
  fi

  local EFFECTIVE_NAME="${BUCKET}" # initialize the effective name, which may be updated if unavailable.

  echofmt "Testing if storage bucket '${BUCKET}' already exists..."
  if ! gsutil ls ${TARGET_OPTS} gs://${BUCKET} >/dev/null 2>&1; then
    [[ -z "${NON_INTERACTIVE}" ]] || [[ -n "${CREATE_IF_NECESSARY}" ]] \
      || echoerrandexit "Bucket does not exist and 'create if necessary' option is not set while invoking gcloud-storage-buckets-create in non-interactive mode."
    if [[ -n "${CREATE_IF_NECESSARY}" ]] \
        || yes-no "Storage bucket '${BUCKET}' not found. Attempt to create?" 'Y'; then
      local FINAL_ERROR
      gcloud-storage-buckets-create-helper-command || { # if first attempt doesn't succeed, maybe we can retry?
        [[ -z "${NO_RETRY_NAMES}" ]] && { # retry is allowed
          local I=1
          while (( ${I} <= ${RETRY_COUNT} )); do
            echofmt "There seems to have been a problem; this may be because the global storage bucket ID is taken. Retrying ${I} of ${RETRY_COUNT}..."
            { gcloud-storage-buckets-create-helper-command &&  break; } || {
              I=$(( ${I} + 1 ))
              (( ${I} <= ${RETRY_COUNT} ))
            }
          done
        } # retry allowed block
      } || { # final; we're out of retries
        echoerrandexit "Could not create storage bucket. Error message on last attempt was: $(<"${INTRAWEB_TMP_ERROR}")"
      }
    fi # CREATE_IF_NECESSARY
  else # gcloud projects describe found something and the storage bucket exists
    gcloud-storage-buckets-create-helper-set-var
    echofmt "Bucket '${BUCKET}' already exists."
  fi
}

# helper functions; these functions rely on the parent function variables and are not intended to be called directly by
# anyone else

gcloud-storage-buckets-create-helper-set-var() {
  [[ -z "${ID_OUTPUT_VAR}" ]] || eval "${ID_OUTPUT_VAR}='${EFFECTIVE_NAME}'"
}

gcloud-storage-buckets-create-helper-command() {
  if [[ -z "${I:-}" ]]; then # we are in the first go around
    rm "${INTRAWEB_TMP_ERROR}"
    EFFECTIVE_NAME="${BUCKET}"
  else
    # TODO: make the max string length 'GOOGLE_MAX_PROJECT_LENGTH' or sometihng and load it
    # for every failure, we try a longer random number
    fill-rand --max-string-length 30 --max-number-length $(( 5 * ${I} )) --output-var EFFECTIVE_NAME "${BUCKET}-"
  fi
  echofmt "Attempting to create storage bucket '${EFFECTIVE_NAME}'..."
  # on success, will set ID_OUTPUT_VAR when appropriate; otherwise, exits with a failure code
  echo gsutil mb ${TARGET_OPTS} gs://${EFFECTIVE_NAME} # DEBUG
  gsutil mb ${TARGET_OPTS} gs://${EFFECTIVE_NAME} 2> "${INTRAWEB_TMP_ERROR}" && {
    echofmt "Created storage bucket '${EFFECTIVE_NAME}'."
    gcloud-storage-buckets-create-helper-set-var
  }
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
  echo 'PROJECT= NON_INTERACTIVE: NO_ACCOUNT_REPORT: SKIP_AUTH_CHECK:A'
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
  echo 'NO_RETRY_NAMES: RETRY_COUNT:= ID_OUTPUT_VAR:='
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
# but NOT ./sources; ./sources contains exported 'sourceable' functions

COMMON_OPTIONS="SITE= NON_INTERACTIVE:"

# Options used by add to setup site data. Using these options with other actions will cause an error.
ADD_OPTIONS="APPLICATION_TITLE:t= \
SUPPORT_EMAIL:e= \
ASSUME_DEFAULTS: \
ORGANIZATION= \
NO_INFER_ORGANIZATION: \
PROJECT= \
NO_INFER_PROJECT: \
BUCKET= \
REGION= \
NO_INFER_REGION: \
NO_UPDATE_GCLOUD_CONF: \
FORCE_UPDATE_GCLOUD_CONF:"

BUILD_OPTIONS="CREATE_IF_NECESSARY \
NO_RETRY_NAMES: \
RETRY_COUNT:="

# Options specific to deploy.
DEPLOY_OPTIONS="CONFIRM: \
NO_DEPLOY_APP:A \
NO_DEPLOY_CONTENT:C"

REMOVE_OPTIONS="SHUTDOWN_PROJECT:"

OPTION_GROUPS="ADD_OPTIONS BUILD_OPTIONS DEPLOY_OPTIONS"

eval "$(setSimpleOptions --script \
  ${COMMON_OPTIONS} \
  ${ADD_OPTIONS} \
  ${BUILD_OPTIONS} \
  ${DEPLOY_OPTIONS} \
  ${REMOVE_OPTIONS} \
  -- "$@")"
ACTION="${1:-}"
if [[ -z "${ACTION}" ]]; then
  usage-bad-action # will exit process
else
  # 'add' is fine to re-run, so 'update-settings' is effectively just a semantic alias.
  [[ "${ACTION}" != "update-settings" ]] || ACTION=add

  OPTIONS_VAR="$(echo "${ACTION}" | tr '[[:lower:]]' '[[:upper:]]')_INIT"
  for OPTION_GROUP in ${OPTION_GROUPS}; do
    if [[ "${OPTIONS_VAR}" != "${OPTION_GROUP}" ]]; then
      [[ -z "${!OPTIONS_VAR:-}" ]] || for OPTION in ${!OPTIONS_VAR}; do
        OPTION_VAR=$(echo "${OPTION}" | sed 's/[^A-Z_]//g')
        [[ -z "${!OPTION_VAR}" ]] || {
          CLI_OPTION="$(echo "${!OPTION_VAR}" | tr '[[:upper:]]' '[[:lower:]]')"
          echoerrandexit "Option '--${CLI_OPTION}' cannot be used with action '${ACTION}'."
        }
      done
    fi
  done
fi

if [[ "${ACTION}" != "list" ]]; then
  # TODO: support a (possible) default site link.
  [[ -n "${SITE}" ]] || echoerrandexit "The '--site' option must be specified."

  SITE_SETTINGS_FILE="${INTRAWEB_SITES}/${SITE}/settings.sh"
  if [[ -f "${SITE_SETTINGS_FILE}" ]]; then
    source "${SITE_SETTINGS_FILE}"
  elif [[ "${ACTION}" != 'add' ]]; then
    echoerrandexit "Did not find expected settings file for '${SITE}'. Try:\nintraweb add --site '${SITE}'"
  fi

  # Set the effective parameters from site settings if not set in command options.
  for SETTING in ${INTRAWEB_SETTINGS}; do
    IW_SETTING="INTRAWEB_SITE_${SETTING}"
    # If the setting isn't set, then we set it from the IW setting (which may also be blank)
    [[ -n "${!SETTING:-}" ]] || eval "${SETTING}='${!IW_SETTING:-}'"
  done

  if [[ "${ACTION}" != add ]]; then
    intraweb-settings-verify-present
  fi
fi

case "${ACTION}" in
  add|list|build|deploy|remove|run)
    intraweb-${ACTION} ;;
  *)
    usage-bad-action ;;# will exit process
esac
