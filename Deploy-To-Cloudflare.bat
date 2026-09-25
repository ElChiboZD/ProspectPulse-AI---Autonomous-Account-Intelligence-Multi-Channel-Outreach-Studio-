@echo off
title ProspectPulse AI — 1-Click Cloudflare Pages Deploy
echo =====================================================================
echo   ProspectPulse AI — 1-Click Cloudflare Pages Deployer
echo =====================================================================
echo.
echo [*] Deploying static/ directly to Cloudflare Pages...
echo [*] If this is your first time, a browser window will open to authorize Cloudflare.
echo.

cmd /c npx wrangler pages deploy static --project-name prospectpulse-ai
if %errorlevel% equ 0 (
    echo.
    echo =====================================================================
    echo [SUCCESS] Your site is live on Cloudflare Pages!
    echo =====================================================================
) else (
    echo.
    echo [!] Deployment failed or was cancelled.
)
pause
