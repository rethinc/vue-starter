#!/usr/bin/env bash

set -o errexit
set -o pipefail
set -o nounset

dir=$(cd -P -- "$(dirname -- "$0")" && pwd -P)

source "${dir}/includes/check-tool.bash.inc"
sed=$(check_tool sed)
npm=$(check_tool npm)
npx=$(check_tool npx)


main() {
  local source_folder="${1:-}"
  if [ -z "${source_folder}" ]; then
	echo "USAGE: $0 <source folder> <destination folder> <product name>"
	exit 1
  fi

  local destination_folder="${2:-}"
  if [ -z "${destination_folder}" ]; then
	echo "USAGE: $0 <source folder> <destination folder> <product name>"
	exit 1
  fi


  local product_name="${3:-}"
  if [ -z "${product_name}" ]; then
	echo "USAGE: $0 <source folder> <destination folder> <product name>"
	exit 1
  fi

  local product_folder="${destination_folder}/${product_name}"
  if [ -e "${product_folder}" ]; then
  	(>&2 echo "Folder ${product_folder} already exists")
  	exit 1
  fi


  cp -r "${source_folder}" "${product_folder}"
  "${sed}" -i'' -e "s/{{productName}}/${product_name}/g" "${product_folder}/README.md"
  "${sed}" -i'' -e "s/{{productName}}/${product_name}/g" "${product_folder}/package.json"
  install_dependencies "${product_folder}"
}

install_dependencies() {
  local product_folder="${1}"

  pushd "${product_folder}"
    "${npm}" install
    "${npx}" npm-check-updates -u
    "${npm}" update
  popd
}

main "$@"