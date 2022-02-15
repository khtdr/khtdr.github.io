#!/usr/bin/env bash

concurrently
npx concurrently --raw --names "HUGO,HTTP" \
    "hugo -d .build -t terminal -b http://localhost:8080/ -w" \
    "npx static-server -p 8080 .build -o"

echo "Don't forget to build and deploy your new changes"
