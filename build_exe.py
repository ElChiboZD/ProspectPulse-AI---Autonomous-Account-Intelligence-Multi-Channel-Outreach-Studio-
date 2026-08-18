#!/usr/bin/env python3
"""
ProspectPulse AI — Windows Executable Build Script
Compiles app.py, server.py, db.py, demo_data.py, and the static/ assets into a standalone Windows .exe application.
"""

import os
import sys
import subprocess
import shutil

ROOT = os.path.dirname(os.path.abspath(__file__))

def build():
    print("=" * 60)
    print("  ProspectPulse AI — Windows .EXE Compiler")
    print("=" * 60)

    static_dir = os.path.join(ROOT, "static")
    if not os.path.isdir(static_dir):
        print("[!] Error: static/ directory not found!")
        return False

    cmd = [
        sys.executable, "-m", "PyInstaller",
        "--noconfirm",
        "--onedir",
        "--windowed",
        "--name", "ProspectPulse-AI",
        "--add-data", f"{static_dir};static",
        "--hidden-import", "edge_tts",
        "--hidden-import", "aiohttp",
        "--hidden-import", "cachetools",
        "--hidden-import", "requests",
        "--hidden-import", "dns.resolver",
        "--hidden-import", "dns.rdatatype",
        "--hidden-import", "webview",
        "--hidden-import", "webview.platforms.winforms",
        "--hidden-import", "clr_loader",
        "--hidden-import", "pythonnet",
        os.path.join(ROOT, "app.py")
    ]

    print("[*] Running PyInstaller command:")
    print("    " + " ".join(cmd))
    print()

    ret = subprocess.run(cmd, cwd=ROOT)
    if ret.returncode != 0:
        print("[!] PyInstaller build failed with return code:", ret.returncode)
        return False

    dist_exe = os.path.join(ROOT, "dist", "ProspectPulse-AI", "ProspectPulse-AI.exe")
    if os.path.isfile(dist_exe):
        print()
        print("=" * 60)
        print("  [SUCCESS] ProspectPulse AI Windows Executable Built!")
        print(f"  Location: {dist_exe}")
        print("=" * 60)
        return True
    else:
        print("[!] Executable not found at expected location:", dist_exe)
        return False

if __name__ == "__main__":
    success = build()
    sys.exit(0 if success else 1)
