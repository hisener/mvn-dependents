#!/usr/bin/env bash

set -o nounset
set -o errexit

SCRIPTS_FOLDER=$(dirname ${BASH_SOURCE})

sh ${SCRIPTS_FOLDER}/create-dot-file.sh
node ${SCRIPTS_FOLDER}/transfrom-dot-file-to-json
mv data.json ${SCRIPTS_FOLDER}/../src/
