#!/usr/bin/env python3
"""
ProspectPulse AI — macOS Application Compiler (.app / .zip / .dmg)
Builds a native macOS Cocoa/WebKit application bundle and distribution archive.
"""

import os
import sys
import subprocess
import shutil

ROOT = os.path.dirname(os.path.abspath(__file__))

def build_mac():
    print("=" * 65)
    print("  ProspectPulse AI — macOS .APP Bundle Compiler")
    print("=" * 65)

    static_dir = os.path.join(ROOT, "static")
    if not os.path.isdir(static_dir):
        print("[!] Error: static/ directory not found!")
        return False

    # Check for PyInstaller
    cmd = [
        sys.executable, "-m", "PyInstaller",
        "--noconfirm",
        "--onedir",
        "--windowed",
        "--name", "ProspectPulse-AI",
        "--add-data", f"{static_dir}:static",
        "--hidden-import", "edge_tts",
        "--hidden-import", "aiohttp",
        "--hidden-import", "cachetools",
        "--hidden-import", "requests",
        "--hidden-import", "dns.resolver",
        "--hidden-import", "dns.rdatatype",
        "--hidden-import", "webview",
        "--hidden-import", "webview.platforms.cocoa",
        "--osx-bundle-identifier", "ai.prospectpulse.desktop",
        os.path.join(ROOT, "app.py")
    ]

    print("[*] Running macOS PyInstaller command...")
    print("    " + " ".join(cmd))
    print()

    ret = subprocess.run(cmd, cwd=ROOT)
    if ret.returncode != 0:
        print("[!] PyInstaller build failed with return code:", ret.returncode)
        return False

    app_path = os.path.join(ROOT, "dist", "ProspectPulse-AI.app")
    print("\n" + "=" * 65)
    print("  [SUCCESS] macOS Application Bundle Built!")
    print(f"  App Bundle: {app_path}")
    print("=" * 65)
    return True

if __name__ == "__main__":
    success = build_mac()
    sys.exit(0 if success else 1)
