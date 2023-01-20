#!/usr/bin/env bash

export STAGE=$1
if [ -z $STAGE ]; then
  echo "You need to pass a stage to deploy (e.g. staging, dev, prod)";
  exit 1;
fi

set -o allexport; source .env; set +o allexport
export SENTRY_AUTH_TOKEN=$(./$(dirname "$BASH_SOURCE")/ssm-get-parameter.sh $SENTRY_AUTH_TOKEN_PATH)

VERSION=$(./$(dirname "$BASH_SOURCE")/version.sh)

npx sentry-cli releases new "$VERSION"
npx sentry-cli releases set-commits "$VERSION" --auto

npx sentry-cli releases files ${VERSION} upload-sourcemaps dist --ignore node_modules --rewrite --url-prefix '/var/task'

npx sentry-cli releases finalize "$VERSION"

npx sentry-cli releases deploys "$VERSION" new -e $STAGE
