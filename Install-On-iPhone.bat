@echo off
title ProspectPulse — Install on iPhone
cd /d "%~dp0"
echo Starting the iPhone installer server...
python serve_iphone.py
pause
