#!/usr/bin/env bash
set -euo pipefail

# Ensure essential environment variables are set for cron
export PATH="/root/.local/bin:/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin:$PATH"
export HOME="/root"

REPO_DIR="/root/repos/shopee-sdk"
PROMPT_FILE="$REPO_DIR/scripts/daily-pr-triage-prompt.md"
LOG_FILE="/var/log/shopee-sdk-daily-triage.log"

if [ ! -d "$REPO_DIR" ]; then
  echo "Error: Repository directory $REPO_DIR does not exist." >&2
  exit 1
fi

if [ ! -f "$PROMPT_FILE" ]; then
  echo "Error: Prompt file $PROMPT_FILE does not exist." >&2
  exit 1
fi

cd "$REPO_DIR"

echo "================================================================================" >> "$LOG_FILE"
echo "=== [$(date -u +"%Y-%m-%dT%H:%M:%SZ")] Starting Daily PR Triage & Release Run ===" >> "$LOG_FILE"
echo "================================================================================" >> "$LOG_FILE"

PROMPT_CONTENT=$(cat "$PROMPT_FILE")

/root/.local/bin/agy \
  -p "$PROMPT_CONTENT" \
  --print-timeout 30m \
  --dangerously-skip-permissions >> "$LOG_FILE" 2>&1

EXIT_CODE=$?

echo "" >> "$LOG_FILE"
echo "=== [$(date -u +"%Y-%m-%dT%H:%M:%SZ")] Completed with exit code: $EXIT_CODE ===" >> "$LOG_FILE"
echo "" >> "$LOG_FILE"

exit $EXIT_CODE
