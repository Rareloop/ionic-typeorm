#!/bin/sh
TS_NODE_PROJECT=tsconfig.ts-node.json TS_NODE_TRANSPILE_ONLY=true npx ts-node ./node_modules/.bin/typeorm --config "$@"
