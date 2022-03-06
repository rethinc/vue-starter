#!/usr/bin/env bash

set -o errexit
set -o pipefail
set -o nounset

main() {
  local product_name="${1:-}"
  if [ -z "${product_name}" ]; then
    echo "USAGE $0 <product-name>"
    exit 1
  fi

  git clone --depth 1 git@github.com:rethinc/vue-starter.git
  vue-starter/build-environment.sh "${product_name}"
  cp -r vue-starter/build/{*,.[^.]*} .
  rm -rf vue-starter
}

main "$@"