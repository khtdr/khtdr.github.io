#!/usr/bin/env bash
set -euo pipefail

msg="rebuilding site $(date)"
if [ -n "$*" ]; then
	msg="$*"
fi

printf "\033[0;32mBuilding static site on master...\033[0m\n"
hugo -t terminal -d docs

printf "\033[0;32mPublishing updates on master...\033[0m\n"
git add .
git commit -m "$msg"
git push

printf "\033[0;32mDone!\033[0m\n"
cd -
