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
  local starter_dir="$(dirname -- "${build_dir}")"
  rm -rf "${build_dir}"

  createNewVueProject "${build_dir}" "${product_name}"
  installStarterDependencies "${build_dir}"
  intallStarterVueApplication "${build_dir}" "${starter_dir}"
  addDefaults "${build_dir}" "${starter_dir}" "${product_name}"
}

createNewVueProject() {
  local build_dir="${1}"
  local product_name="${2}"

  mkdir -p "${build_dir}"
  pushd "${build_dir}"
  npm init vite@latest "${product_name}" -- --template vue-ts
  rm -r "${build_dir}/${product_name}"/.vscode
  mv "${build_dir}/${product_name}"/{*,.[^.]*} "${build_dir}"
  rm -r "${product_name}"
  npm install
  popd
}

installStarterDependencies() {
  local build_dir="${1}"

  pushd "${build_dir}"
  npm install --save-dev \
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
    vue-router

  npx npm-check-updates -u
  npm update
  popd
}

intallStarterVueApplication() {
  local build_dir="${1}"
  local starter_dir="${2}"

  pushd "${starter_dir}"
  rm -r "${build_dir}/src"
  cp -r src \
    scripts \
    vitePlugins \
    viewExamples \
    "${build_dir}/"

  cp .eslintrc.json \
    .nvmrc \
    .prettierrc.json \
    index.html \
    jest.config.json \
    tsconfig.json \
    vite.config.ts \
    vite.viewExamples.config.ts \
    "${build_dir}/"

    node './build-scripts/extendPackageJson.mjs' "${build_dir}/package.json"
  popd
}

addDefaults() {
    local build_dir="${1}"
    local starter_dir="${2}"
    local product_name="${3}"

    cp -r "${starter_dir}/defaults"/{*,.[^.]*} "${build_dir}"
    sed -i -e "s/{{product-name}}/${product_name}/g" "${build_dir}/README.md"
}

main "$@"
