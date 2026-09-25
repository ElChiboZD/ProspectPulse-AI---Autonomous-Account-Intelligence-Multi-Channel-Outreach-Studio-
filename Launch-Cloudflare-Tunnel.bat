@echo off
title ProspectPulse AI — Cloudflare Tunnel Launcher
echo =====================================================================
echo   ProspectPulse AI — Cloudflare Tunnel Launcher
echo   Exposing local server (port 8765) securely to the public internet
echo =====================================================================
echo.

where cloudflared >nul 2>nul
if %errorlevel% neq 0 (
    echo [*] cloudflared CLI is not found in PATH.
    echo [*] Downloading portable cloudflared.exe...
    powershell -Command "Invoke-WebRequest -Uri 'https://github.com/cloudflare/cloudflared/releases/latest/download/cloudflared-windows-amd64.exe' -OutFile 'cloudflared.exe'"
    if exist cloudflared.exe (
        echo [SUCCESS] cloudflared downloaded!
        set CLOUDFLARED_CMD=.\cloudflared.exe
    ) else (
        echo [!] Failed to download cloudflared. Please install from https://developers.cloudflare.com/cloudflare-one/connections/connect-networks/downloads/
        pause
        exit /b 1
    )
) else (
    set CLOUDFLARED_CMD=cloudflared
)

echo.
echo [*] Starting Cloudflare Tunnel for http://localhost:8765...
echo [*] A public https://*.trycloudflare.com URL will be displayed below.
echo.
%CLOUDFLARED_CMD% tunnel --url http://localhost:8765
pause
