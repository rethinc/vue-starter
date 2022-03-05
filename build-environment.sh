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
  rm -rf "${build_dir}"

  createNewVueProject "${build_dir}" "${project_name}"
  installStarterDependencies "${build_dir}"
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
      svgo

      npm install --save \
      vue-router
    popd
}

main "$@"
