@echo off
.\tools\git\cmd\git.exe add -A
.\tools\git\cmd\git.exe commit -m "Production Release"
.\tools\git\cmd\git.exe push origin master
pause
