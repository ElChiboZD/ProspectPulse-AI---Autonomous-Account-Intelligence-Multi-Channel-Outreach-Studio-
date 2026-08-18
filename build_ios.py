#!/usr/bin/env python3
"""
ProspectPulse AI — iOS project packager.

Windows cannot compile a signed .ipa (needs Xcode on a Mac).
This syncs Capacitor assets, then:
  1) Writes dist/ProspectPulse-iOS-Xcode.zip for opening in Xcode
  2) If xcodebuild exists, archives a debug build
"""

import os
import shutil
import subprocess
import sys
import zipfile

ROOT = os.path.dirname(os.path.abspath(__file__))
IOS_DIR = os.path.join(ROOT, "ios")
DIST = os.path.join(ROOT, "dist")


def run(cmd, cwd=None):
    print("[*]", " ".join(cmd))
    return subprocess.run(cmd, cwd=cwd or ROOT, shell=(os.name == "nt"))


def sync_ios():
    npx = shutil.which("npx") or r"C:\Program Files\nodejs\npx.cmd"
    ret = run([npx, "cap", "sync", "ios"])
    if ret.returncode != 0:
        print("[!] cap sync returned", ret.returncode)
    return os.path.isdir(IOS_DIR)


def zip_xcode_project():
    os.makedirs(DIST, exist_ok=True)
    zip_path = os.path.join(DIST, "ProspectPulse-iOS-Xcode.zip")
    if os.path.isfile(zip_path):
        os.remove(zip_path)
    skip = {".DS_Store"}
    with zipfile.ZipFile(zip_path, "w", zipfile.ZIP_DEFLATED) as zf:
        for folder, _, files in os.walk(IOS_DIR):
            if "Pods" in folder.split(os.sep):
                continue
            for name in files:
                if name in skip:
                    continue
                full = os.path.join(folder, name)
                arc = os.path.relpath(full, ROOT)
                zf.write(full, arc)
        zf.write(os.path.join(ROOT, "capacitor.config.json"), "capacitor.config.json")
        zf.write(os.path.join(ROOT, "package.json"), "package.json")
    return zip_path


def try_xcodebuild():
    if not shutil.which("xcodebuild"):
        return None
    out = os.path.join(DIST, "ProspectPulse-iOS")
    os.makedirs(out, exist_ok=True)
    cmd = [
        "xcodebuild",
        "-workspace", os.path.join(IOS_DIR, "App", "App.xcworkspace"),
        "-scheme", "App",
        "-configuration", "Debug",
        "-destination", "generic/platform=iOS",
        "-archivePath", os.path.join(out, "ProspectPulse.xcarchive"),
        "archive",
        "CODE_SIGNING_ALLOWED=NO",
    ]
    ret = run(cmd)
    if ret.returncode == 0:
        return os.path.join(out, "ProspectPulse.xcarchive")
    return None


def main():
    print("=" * 65)
    print("  ProspectPulse AI — iOS packager")
    print("=" * 65)
    if not sync_ios():
        print("[!] ios/ project missing. Run: npx cap add ios")
        return 1
    zip_path = zip_xcode_project()
    print("[*] Xcode project zip:", zip_path, f"({os.path.getsize(zip_path) / (1024*1024):.1f} MB)")
    archive = try_xcodebuild()
    if archive:
        print("[*] Xcode archive:", archive)
    else:
        print("[*] No Xcode on this PC — that is expected on Windows.")
        print("    Open the zip on a Mac, or install via Safari (Install-On-iPhone.bat).")
    print("=" * 65)
    return 0


if __name__ == "__main__":
    sys.exit(main())
