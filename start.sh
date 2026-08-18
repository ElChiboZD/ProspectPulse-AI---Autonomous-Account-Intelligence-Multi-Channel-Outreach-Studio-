#!/usr/bin/env bash
# Start the Prospect & Outreach Console.
# Usage:  ./start.sh        (from anywhere)
# Stops any old server first, starts a fresh one with live tools enabled,
# and opens the browser.

set -e
cd "$(dirname "$0")"

PORT="${PORT:-8765}"

# Stop stale servers so you never get served an old page (and avoid
# "Address already in use"). Two passes:
#   1) kill every server.py process (catches background test boots on any port)
#   2) kill whatever still holds THIS port (catches servers started another way)
pkill -f "server.py" 2>/dev/null && echo "Stopped previous server.py process(es)." || true
PORT_PIDS="$(lsof -nP -ti:"$PORT" 2>/dev/null || true)"
if [ -n "$PORT_PIDS" ]; then
  echo "Freeing port $PORT (pids: $PORT_PIDS)."
  echo "$PORT_PIDS" | xargs kill -9 2>/dev/null || true
fi
sleep 1

# Confirm the port is actually free before we try to bind it.
if lsof -nP -iTCP:"$PORT" -sTCP:LISTEN >/dev/null 2>&1; then
  echo "ERROR: port $PORT is still in use. Run: lsof -nP -iTCP:$PORT -sTCP:LISTEN" >&2
  exit 1
fi

echo "Starting Prospect & Outreach Console on http://127.0.0.1:$PORT"
echo "(Live tools ON: ZoomInfo, CommonRoom, Sumble, Tavily + web)"
echo "Press Ctrl-C to stop."
echo

# Open the browser shortly after the server comes up.
( sleep 2; open "http://127.0.0.1:$PORT" >/dev/null 2>&1 || true ) &

# ENABLE_TOOLS=1 turns on live MCP research. Runs in the foreground so Ctrl-C stops it.
ENABLE_TOOLS=1 PORT="$PORT" python3 server.py
