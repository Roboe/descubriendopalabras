#! /bin/env bash
VERSION=2.10.57
OUTPUT_D="./static/editor"

curl \
  "https://unpkg.com/netlify-cms@$VERSION/dist/netlify-cms.js" \
  -o "$OUTPUT_D/netlify-cms.js"
