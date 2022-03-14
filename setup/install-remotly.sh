#!/usr/bin/env bash

# This script is used as a remote install script.
# Therfore it needs to be self contained and can not depend
# on any dependencies (e.g. files in includes).

set -o errexit
set -o pipefail
set -o nounset

dir=$(cd -P -- "$(dirname -- "$0")" && pwd -P)

main() {
  git=$(check_tool git)
    

  local product_name="${1:-}"
  if [ -z "${product_name}" ]; then
    echo "USAGE: $0 <product name>"
    exit 1
  fi

  local download_folder=$(mktemp -d)
  trap "rm -rf \"${download_folder}\"" EXIT
  download "https://github.com/rethinc/vue-starter.git" "${download_folder}"

  "${download_folder}/setup/install.sh" "${download_folder}/vue-application" "${dir}"  "${product_name}"
}

download() {
  local from="${1}"
  local to="${2}"
  "${git}" clone --depth 1 "${from}" "${to}"
  rm -rf "${to}/.git"
}

check_tool() {
  local name="${1}"
  local binary=$(which ${name} || true)

  if [ -z "${binary}" ]; then
    (>&2 echo "ERROR: ${name} not found.")
    (>&2 echo "This script depends on ${name}. Please install it first before executing this scirpt.")
    exit 127
  fi
  echo "${binary}"
}

main "$@"