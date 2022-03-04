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
  copyAndRemoveBuild "${build_dir}"
}

createNewVueProject() {
  local build_dir="${1}"
  local project_name="${2}"

  mkdir -p "${build_dir}"
  pushd "${build_dir}"
    npm init vite@latest "${project_name}" -- --template vue-ts
    mv "${build_dir}/${project_name}"/{*,.[^.]*} "${build_dir}"
    rm -r "${project_name}"
  popd
}

copyAndRemoveBuild() {
  local build_dir="${1}"
    mv "${build_dir}"/{*,.[^.]*} "${PWD}"
    rm -r "${build_dir}"
}

main "$@"
