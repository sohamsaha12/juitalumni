#!/bin/bash

ROOT_DIR="$PWD"

(cd "${ROOT_DIR}/client" && npm run start) &
(cd "${ROOT_DIR}/api" && node server.js) &