#!/usr/bin/env python3
"""
Android SDK Portable Setup & Native APK Build Script
Downloads official Google Android Command Line Tools, installs platform-tools and android-34, and builds ProspectPulse-AI.apk.
"""

import os
import sys
import urllib.request
import zipfile
import subprocess
import shutil

SDK_DIR = os.path.join(os.environ.get("LOCALAPPDATA", os.path.expanduser("~")), "Android", "Sdk")
CMDLINE_URL = "https://dl.google.com/android/repository/commandlinetools-win-11076708_latest.zip"
ROOT = os.path.dirname(os.path.abspath(__file__))
ANDROID_DIR = os.path.join(ROOT, "android")

def find_java_home():
    candidates = [
        r"C:\Program Files\Microsoft\jdk-17.0.20.8-hotspot",
        r"C:\Program Files\Microsoft\jdk-17",
        r"C:\Program Files\Eclipse Adoptium\jdk-17",
        r"C:\Program Files\Java\jdk-17"
    ]
    for c in candidates:
        if os.path.isdir(c) and os.path.isfile(os.path.join(c, "bin", "java.exe")):
            return c
    return None

def install_sdk():
    print("=" * 65)
    print("  ProspectPulse AI — Android SDK & APK Builder")
    print("=" * 65)

    java_home = find_java_home()
    if not java_home:
        print("[!] Error: Java 17 not found.")
        return False

    os.environ["JAVA_HOME"] = java_home
    os.environ["ANDROID_HOME"] = SDK_DIR
    os.environ["PATH"] = os.path.join(java_home, "bin") + os.pathsep + os.environ.get("PATH", "")

    # 1. Download & Extract Android Command Line Tools
    cmdline_latest = os.path.join(SDK_DIR, "cmdline-tools", "latest")
    sdkmanager = os.path.join(cmdline_latest, "bin", "sdkmanager.bat")

    if not os.path.isfile(sdkmanager):
        print(f"[*] Downloading Google Android Command Line Tools...")
        os.makedirs(SDK_DIR, exist_ok=True)
        zip_path = os.path.join(SDK_DIR, "cmdline-tools.zip")
        urllib.request.urlretrieve(CMDLINE_URL, zip_path)
        
        print("[*] Extracting command line tools...")
        temp_extract = os.path.join(SDK_DIR, "cmdline-tools", "temp")
        with zipfile.ZipFile(zip_path, 'r') as zip_ref:
            zip_ref.extractall(temp_extract)
        
        extracted_cmdline = os.path.join(temp_extract, "cmdline-tools")
        if os.path.exists(cmdline_latest):
            shutil.rmtree(cmdline_latest)
        shutil.move(extracted_cmdline, cmdline_latest)
        shutil.rmtree(temp_extract, ignore_errors=True)
        if os.path.exists(zip_path):
            os.remove(zip_path)
        print("[SUCCESS] Android Command Line Tools installed.")

    # 2. Install Platforms and Build Tools
    print("\n[*] Installing Android Platform 34 and Build-Tools via sdkmanager...")
    packages = ["platforms;android-34", "build-tools;34.0.0", "platform-tools"]
    
    # Auto-accept licenses
    cmd_licenses = [sdkmanager, "--sdk_root=" + SDK_DIR, "--licenses"]
    subprocess.run(cmd_licenses, input=b"y\ny\ny\ny\ny\ny\ny\ny\ny\n", shell=True)

    cmd_install = [sdkmanager, "--sdk_root=" + SDK_DIR] + packages
    subprocess.run(cmd_install, input=b"y\ny\ny\ny\n", shell=True)

    # 3. Create local.properties in android/
    local_props = os.path.join(ANDROID_DIR, "local.properties")
    with open(local_props, "w") as f:
        f.write(f"sdk.dir={SDK_DIR.replace(os.sep, '/')}\n")
    print(f"[*] Updated {local_props} with sdk.dir={SDK_DIR}")

    # 4. Sync Capacitor Web Assets
    print("\n[*] Syncing Capacitor assets...")
    npx_cmd = r"C:\Program Files\nodejs\npx.cmd" if os.path.isfile(r"C:\Program Files\nodejs\npx.cmd") else "npx"
    subprocess.run([npx_cmd, "cap", "sync", "android"], cwd=ROOT, shell=True)

    # 5. Compile Android APK via Gradle
    print("\n[*] Compiling Native Android APK (assembleDebug)...")
    gradlew = os.path.join(ANDROID_DIR, "gradlew.bat")
    ret = subprocess.run([gradlew, "assembleDebug"], cwd=ANDROID_DIR, shell=True)

    if ret.returncode != 0:
        print("[!] Gradle build failed with code:", ret.returncode)
        return False

    output_apk = os.path.join(ANDROID_DIR, "app", "build", "outputs", "apk", "debug", "app-debug.apk")
    dist_dir = os.path.join(ROOT, "dist")
    os.makedirs(dist_dir, exist_ok=True)
    target_apk = os.path.join(dist_dir, "ProspectPulse-AI.apk")

    if os.path.isfile(output_apk):
        shutil.copy(output_apk, target_apk)
        size_mb = os.path.getsize(target_apk) / (1024 * 1024)
        print("\n" + "=" * 65)
        print("  [SUCCESS] Native Android APK Successfully Compiled!")
        print(f"  Location: {target_apk} ({size_mb:.2f} MB)")
        print("=" * 65)
        return True
    else:
        print("[!] Output APK not found at:", output_apk)
        return False

if __name__ == "__main__":
    success = install_sdk()
    sys.exit(0 if success else 1)
