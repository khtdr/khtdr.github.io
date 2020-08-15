#!/usr/bin/env bash
set -euo pipefail

printf "\033[0;32mDeploying updates to GitHub...\033[0m\n"

hugo -t termindal

cd public

git add .

msg="rebuilding site $(date)"
if [ -n "$*" ]; then
	msg="$*"
fi
git commit -m "$msg"

git push origin master
