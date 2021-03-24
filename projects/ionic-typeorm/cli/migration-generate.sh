#!/bin/bash

################################################################
# Creates a migraton based on changes between current migrations
# and the state of entity files. It does this by creating a temp
# database, running all migrations and then working out the delta
# with the current entity files
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
    echo "Usage: migration-generate.sh [migration name]"
    exit 1
fi

CLI="$(dirname "$0")/typeorm-cli.sh"
CONFIG="node_modules/ionic-typeorm/type-orm-db/cli/cli.ormconfig.json"
TEMP_SQLITE_DB="node_modules/ionic-typeorm/type-orm-db/cli/migrations.tmp.sqlite"

NAME="$1"

rm -f "$TEMP_SQLITE_DB"

$CLI "$CONFIG" migration:run
$CLI "$CONFIG" migration:generate -p --connection --name "$NAME"

rm -f "$TEMP_SQLITE_DB"
