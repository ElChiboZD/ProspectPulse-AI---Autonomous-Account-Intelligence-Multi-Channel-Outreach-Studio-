@echo off
title ProspectPulse AI — Push to GitHub
echo =====================================================================
echo   ProspectPulse AI — Push to GitHub
echo =====================================================================
echo.

set GIT_CMD="C:\Users\travi\AppData\Local\Programs\MinGit\cmd\git.exe"
if not exist %GIT_CMD% set GIT_CMD=git

%GIT_CMD% push origin main
if %errorlevel% equ 0 (
    echo.
    echo [SUCCESS] Changes successfully pushed to GitHub main branch!
    echo Visit your repo: https://github.com/ElChiboZD/ProspectPulse-AI---Autonomous-Account-Intelligence-Multi-Channel-Outreach-Studio-
) else (
    echo.
    echo =====================================================================
    echo [AUTHENTICATION REQUIRED]
    echo GitHub requires your credentials to push changes.
    echo.
    echo Option 1: Provide your GitHub Personal Access Token (Classic or Fine-Grained):
    echo   git push https://YOUR_PAT_TOKEN@github.com/ElChiboZD/ProspectPulse-AI---Autonomous-Account-Intelligence-Multi-Channel-Outreach-Studio-.git main
    echo.
    echo Option 2: Set GITHUB_TOKEN in your .env file and run:
    echo   python push_to_github.py
    echo =====================================================================
)
pause
