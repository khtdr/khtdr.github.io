#!/usr/bin/env bash

npx concurrently --raw --names "HUGO,HTTP" \
    "hugo -d .build -t terminal -b http://192.168.64.2:8080/ -w" \
    "npx static-server -p 8080 .build -o"

echo "Don't forget to build and deploy your new changes"
