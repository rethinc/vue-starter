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
  echo "Will install vue-starter soon... ${product_name}"
}

main "$@"