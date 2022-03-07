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

  createNewVueApplication "${build_dir}" "${product_name}"
  installStarterVueApplication "${build_dir}" "${vue_application_dir}" "${product_name}"
}

createNewVueApplication() {
  local build_dir="${1}"
  local product_name="${2}"

  cp "${dir}/package.template.json" "${build_dir}/package.json"
  sed -i -e "s/{{product-name}}/${product_name}/g" "${build_dir}/package.json"

  pushd "${build_dir}"

  npm install --save-dev \
    vite \
    @vitejs/plugin-vue \
    vue-tsc \
    eslint \
    @typescript-eslint/parser \
    @typescript-eslint/eslint-plugin \
    eslint-plugin-vue \
    vue-eslint-parser \
    prettier \
    eslint-config-prettier \
    eslint-plugin-prettier \
    jest \
    ts-jest \
    @types/jest \
    sass \
    ts-node \
    npm-check-updates \
    svgo \
    @types/svgo

  npm install --save \
    vue \
    vue-router
  popd
}

installStarterVueApplication() {
  local build_dir="${1}"
  local vue_application_dir="${2}"
  local product_name="${3}"
  cp -rn "${vue_application_dir}"/{*,.[^.]*} "${build_dir}/"
  sed -i -e "s/{{product-name}}/${product_name}/g" "${build_dir}/README.md"
}

main "$@"
