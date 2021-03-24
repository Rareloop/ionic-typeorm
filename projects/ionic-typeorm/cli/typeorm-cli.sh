#!/bin/sh
TS_NODE_PROJECT=tsconfig.ts-node.json TS_NODE_TRANSPILE_ONLY=true ./node_modules/ts-node/dist/bin.js ./node_modules/typeorm/cli.js --config "$@"
