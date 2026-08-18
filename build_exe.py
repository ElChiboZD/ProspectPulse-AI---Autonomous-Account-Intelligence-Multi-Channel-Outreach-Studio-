#!/usr/bin/env python3
"""
ProspectPulse AI — Standalone Windows Executable Compiler
Builds:
1. Single-File Portable Executable: dist/ProspectPulse-AI-Standalone.exe
2. Directory Distribution: dist/ProspectPulse-AI/ProspectPulse-AI.exe
"""

import os
import sys
import subprocess
import shutil

ROOT = os.path.dirname(os.path.abspath(__file__))

def build_standalone():
    print("=" * 65)
    print("  ProspectPulse AI — Standalone Windows .EXE Compiler")
    print("=" * 65)

    static_dir = os.path.join(ROOT, "static")
    if not os.path.isdir(static_dir):
        print("[!] Error: static/ directory not found!")
        return False

    # 1. Build Single-File Standalone Portable EXE
    print("\n[*] Building Single-File Standalone Portable Executable (--onefile)...")
    cmd_onefile = [
        sys.executable, "-m", "PyInstaller",
        "--noconfirm",
        "--onefile",
        "--windowed",
        "--name", "ProspectPulse-AI-Standalone",
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
    
    ret = subprocess.run(cmd_onefile, cwd=ROOT)
    if ret.returncode != 0:
        print("[!] Warning: Single-file build encountered an issue.")

    # 2. Build Fast Directory Bundle
    print("\n[*] Building Directory Distribution Bundle (--onedir)...")
    cmd_onedir = [
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
    
    ret_dir = subprocess.run(cmd_onedir, cwd=ROOT)

    standalone_exe = os.path.join(ROOT, "dist", "ProspectPulse-AI-Standalone.exe")
    dir_exe = os.path.join(ROOT, "dist", "ProspectPulse-AI", "ProspectPulse-AI.exe")

    print("\n" + "=" * 65)
    print("  [SUCCESS] Standalone Executables Generated:")
    if os.path.isfile(standalone_exe):
        size_mb = os.path.getsize(standalone_exe) / (1024 * 1024)
        print(f"  1. Portable Single-File EXE: {standalone_exe} ({size_mb:.1f} MB)")
    if os.path.isfile(dir_exe):
        print(f"  2. Directory Distribution:   {dir_exe}")
    print("=" * 65)
    return True

if __name__ == "__main__":
    success = build_standalone()
    sys.exit(0 if success else 1)
