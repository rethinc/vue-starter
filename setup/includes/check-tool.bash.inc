#!/usr/bin/env bash

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