#!/bin/sh
set -e

# Set correct permissions on the workspace
echo "Setting ownership for /workspace..."
chown -R appuser:appgroup /workspace

# Execute the main command as appuser
echo "Executing command as appuser: $@"
exec gosu appuser "$@" 