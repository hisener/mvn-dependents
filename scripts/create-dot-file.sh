#!/usr/bin/env bash

set -o nounset
set -o errexit

OUTPUT_DIR=/tmp/mvn-dependents-workspace

REPOSITORIES=(
    https://github.com/spring-projects/spring-data-mongodb.git
)

rm -rf ${OUTPUT_DIR}
mkdir -p ${OUTPUT_DIR}
pushd ${OUTPUT_DIR}

for repo in "${REPOSITORIES[@]}"; do
    git clone --single-branch "${repo}" && pushd "$(basename "${repo}" .git)"
    git checkout $(git describe --tags `git rev-list --tags --max-count=1`)

    mvn dependency:tree -Dincludes="org.springframework:*" \
        -DoutputType=dot \
        -DappendOutput=true \
        -DoutputFile=${OUTPUT_DIR}/output.dot
    popd
done

popd
