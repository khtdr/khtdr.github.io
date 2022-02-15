#!/usr/bin/env bash

concurrently
npx concurrently --names "HUGO,HTTP" "hugo -t terminal -b http://localhost:8080 -w" "npx static-serve -p 8080 public -o"
