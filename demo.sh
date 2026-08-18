#!/usr/bin/env bash
# Portfolio demo launcher — runs the app in DEMO MODE only.
# No accounts, no API calls, no credentials, no live tools. Works on any machine
# with Python 3. This is the safe, self-contained version for showing the tool.
#
# Usage:  ./demo.sh        (from anywhere)

set -e
cd "$(dirname "$0")"

PORT="${PORT:-8765}"

# Free the port if a previous instance is still running.
pkill -f "server.py" 2>/dev/null && echo "Stopped a previous server." || true
PIDS="$(lsof -nP -ti:"$PORT" 2>/dev/null || true)"
[ -n "$PIDS" ] && echo "$PIDS" | xargs kill -9 2>/dev/null || true
sleep 1

echo "Prospect & Outreach Console — DEMO MODE"
echo "Open http://127.0.0.1:$PORT  (then toggle 'Demo mode' in the UI)"
echo "No live tools, no accounts, no API calls. Ctrl-C to stop."
echo

( sleep 2; open "http://127.0.0.1:$PORT" >/dev/null 2>&1 || true ) &

# ENABLE_TOOLS stays OFF — demo replays are static and need nothing external.
ENABLE_TOOLS=0 PORT="$PORT" python3 server.py
