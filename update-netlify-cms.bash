#! /bin/env bash
VERSION=
OUTPUT_D="./static/editor"

curl \
  "https://unpkg.com/netlify-cms@$VERSION/dist/netlify-cms.js" \
  -o "$OUTPUT_D/netlify-cms.js"
