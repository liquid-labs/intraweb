#!/usr/bin/env bash

import strict
import prompt

if [[ -z "${INTRAWEB_PROJECT_ID}" ]]; then
  get-answer "Name for the google project to create for intraweb? (intraweb)" INTRAWEB_PROJECT_ID 'intraweb'
fi

gcloud projects describe PROJECT_ID_OR_NUMBER
