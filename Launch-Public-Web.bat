@echo off
title ProspectPulse AI - Public Web Launcher
cd /d "%~dp0"

echo Starting ProspectPulse Server...
start "ProspectPulse Backend" /min python server.py
timeout /t 2 /nobreak >nul

echo Starting Public Tunnel...
"C:\Program Files (x86)\cloudflared\cloudflared.exe" tunnel --url http://127.0.0.1:8765
