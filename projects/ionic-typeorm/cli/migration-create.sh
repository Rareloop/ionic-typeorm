#!/bin/bash

################################################################
# Creates an empty TypeORM migration with the provided name
#
# The CLI configuration expects entites;
# src/app/database/orm/entities/*.ts
#
# And migrations:
# src/app/database/orm/migrations/*.ts
#
################################################################

if [[ $# != 1 ]]; then
    echo "Missing arguments"
    echo "Usage: migration-create.sh [migration name]"
    exit 1
fi

CLI="$(dirname "$0")/typeorm-cli.sh"

CONFIG="node_modules/ionic-typeorm/type-orm-db/cli/cli.ormconfig.json"

NAME="$1"

rm -f src/app/database/orm/*.tmp.sqlite
$CLI "$CONFIG" migration:create --name "$NAME"
