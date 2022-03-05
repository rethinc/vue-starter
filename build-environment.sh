#!/usr/bin/env bash

set -o errexit
set -o pipefail
set -o nounset

dir=$(cd -P -- "$(dirname -- "$0")" && pwd -P)

main() {
  local project_name="${1:-}"
  if [ -z "${project_name}" ]; then
    echo "USAGE $0 <project-name>"
    exit 1
  fi
  local build_dir="${dir}/build"
  local starter_dir="$(dirname -- "${build_dir}")"
  rm -rf "${build_dir}"

  createNewVueProject "${build_dir}" "${project_name}"
  installStarterDependencies "${build_dir}"
  intallStarterVueApplication "${build_dir}" "${starter_dir}"
}

createNewVueProject() {
  local build_dir="${1}"
  local project_name="${2}"

  mkdir -p "${build_dir}"
  pushd "${build_dir}"
  npm init vite@latest "${project_name}" -- --template vue-ts
  rm -r "${build_dir}/${project_name}"/.vscode
  mv "${build_dir}/${project_name}"/{*,.[^.]*} "${build_dir}"
  rm -r "${project_name}"
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
    vite-plugins \
    "${build_dir}/"

  cp .eslintrc.json \
    .nvmrc \
    .prettierrc.json \
    index.html \
    jest.config.json \
    tsconfig.json \
    vite.config.ts \
    "${build_dir}/"

    node './build-scripts/extendPackageJson.mjs' "${build_dir}/package.json"
  popd
}

main "$@"
