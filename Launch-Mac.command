#!/bin/bash
# ProspectPulse AI — macOS 1-Click Desktop Launcher
# Double-click this file on macOS to launch the application.

DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" >/dev/null 2>&1 && pwd )"
cd "$DIR"

echo "=================================================="
echo "  ProspectPulse AI — macOS Desktop Launcher"
echo "=================================================="

# Check if Python 3 is available
if command -v python3 &>/dev/null; then
    python3 app.py
elif command -v python &>/dev/null; then
    python app.py
else
    echo "[!] Error: Python 3 is required to launch ProspectPulse AI."
    echo "    Install Python from https://www.python.org/downloads/ or via Homebrew: brew install python"
    read -p "Press enter to exit..."
fi
