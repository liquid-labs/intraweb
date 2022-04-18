#!/usr/bin/env bash

# This helper script allows us to pass an argument to 'npm start' and also launch the browser. The problem is we want to
# start the browser after the server, but NPM just tacks on additional arguments to the script call, so we use this
# script to effectively capture the arguments and route them to the correct place.
#
# This script expects to be run with PWD set to the intraweb root.

# start the server
cd src/appengine
node app.js "$@" &

# start the web browser
sleep 1 # give the node process a moment to start
PLATFORM="$(uname)"
TARGET_URL="http://127.0.0.1:8080"
case $(uname) in
  Darwin)
    open "${TARGET_URL}" ;;
  *)
    echo "Platform '${PLATFORM}' not currently supported. Point browser to ${TARGET_URL}" >&2 ;;
esac

# TODO: would be nice to not jump user to the browser if startup is bad; tried something like:

# while read -r LINE; do
#   if [[ "${LINE}" == 'PID: ' ]]; then
#     PID="${LINE#PID: }"
#   elif [[ "${LINE}" == 'FAIL: '* ]]; then
#     echo "${LINE}" >&2;
#     exit 1
#   else
#     echo "${LINE}"
#   fi
# done < <({ node app.js "$@"; echo "PID: $!"; } > >(while read -r OUT; do echo "${OUT}"; [[ "${OUT}" == 'To quit'* ]] && break; done) 2> >(read -t 20 ERR; echo "FAIL: ${ERR}"))

# https://stackoverflow.com/questions/2342826/how-can-i-pipe-stderr-and-not-stdout
