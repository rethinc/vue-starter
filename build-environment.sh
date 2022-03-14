#!/usr/bin/env bash

set -o errexit
set -o pipefail
set -o nounset

dir=$(cd -P -- "$(dirname -- "$0")" && pwd -P)

main() {
  local product_name="${1:-}"
  if [ -z "${product_name}" ]; then
    echo "USAGE $0 <product-name>"
    exit 1
  fi
  local build_dir="${dir}/build"
  local vue_application_dir="${dir}/vue-application"
  rm -rf "${build_dir}"
  mkdir "${build_dir}"

  installVueApplication "${build_dir}" "${vue_application_dir}" "${product_name}"
  installDependencies "${build_dir}"

}

installVueApplication() {
  local build_dir="${1}"
  local vue_application_dir="${2}"
  local product_name="${3}"
  cp -r "${vue_application_dir}"/{*,.[^.]*} "${build_dir}/"
  sed -i -e "s/{{productName}}/${product_name}/g" "${build_dir}/README.md"
  sed -i -e "s/{{productName}}/${product_name}/g" "${build_dir}/package.json"
}

installDependencies() {
  local build_dir="${1}"

  pushd "${build_dir}"
    npm install
    npx npm-check-updates -u
    npm update
  popd
}

main "$@"
