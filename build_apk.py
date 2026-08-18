#!/usr/bin/env python3
"""
ProspectPulse AI — Android APK Compiler Script
Synchronizes Capacitor web assets and compiles a native Android APK via Gradle.
"""

import os
import sys
import subprocess
import shutil

ROOT = os.path.dirname(os.path.abspath(__file__))
ANDROID_DIR = os.path.join(ROOT, "android")

def find_java_home():
    # 1. Check existing env
    if os.environ.get("JAVA_HOME") and os.path.isfile(os.path.join(os.environ["JAVA_HOME"], "bin", "java.exe")):
        return os.environ["JAVA_HOME"]
    
    # 2. Check standard install paths
    candidates = [
        r"C:\Program Files\Microsoft\jdk-17.0.20.8-hotspot",
        r"C:\Program Files\Microsoft\jdk-17",
        r"C:\Program Files\Eclipse Adoptium\jdk-17",
        r"C:\Program Files\Java\jdk-17",
        r"C:\Program Files\Java\jdk-21"
    ]
    for c in candidates:
        if os.path.isdir(c) and os.path.isfile(os.path.join(c, "bin", "java.exe")):
            return c
    return None

def build_apk():
    print("=" * 65)
    print("  ProspectPulse AI — Android .APK Native Compiler")
    print("=" * 65)

    java_home = find_java_home()
    if not java_home:
        print("[!] Error: OpenJDK 17 not found. Please install Java JDK.")
        return False

    print(f"[*] Using JAVA_HOME: {java_home}")
    os.environ["JAVA_HOME"] = java_home
    os.environ["PATH"] = os.path.join(java_home, "bin") + os.pathsep + os.environ.get("PATH", "")

    # 1. Sync Capacitor web assets
    print("\n[*] Synchronizing latest static assets with Android platform...")
    npx_cmd = shutil.which("npx") or r"C:\Program Files\nodejs\npx.cmd"
    if not os.path.isfile(npx_cmd) and not shutil.which("npx"):
        npx_cmd = "npx"

    ret_sync = subprocess.run([npx_cmd, "cap", "sync", "android"], cwd=ROOT, shell=True)
    if ret_sync.returncode != 0:
        print("[!] Warning: cap sync returned code:", ret_sync.returncode)

    # 2. Compile APK using Gradle
    print("\n[*] Running Gradle build (assembleDebug)...")
    gradlew = os.path.join(ANDROID_DIR, "gradlew.bat" if sys.platform == "win32" else "gradlew")
    if not os.path.isfile(gradlew):
        print("[!] Error: gradlew not found in android/ directory.")
        return False

    ret_gradle = subprocess.run([gradlew, "assembleDebug"], cwd=ANDROID_DIR, shell=True)
    if ret_gradle.returncode != 0:
        print("[!] Gradle build failed with code:", ret_gradle.returncode)
        return False

    # 3. Locate compiled APK
    output_apk = os.path.join(ANDROID_DIR, "app", "build", "outputs", "apk", "debug", "app-debug.apk")
    dist_dir = os.path.join(ROOT, "dist")
    os.makedirs(dist_dir, exist_ok=True)
    target_apk = os.path.join(dist_dir, "ProspectPulse-AI.apk")

    if os.path.isfile(output_apk):
        shutil.copy(output_apk, target_apk)
        size_mb = os.path.getsize(target_apk) / (1024 * 1024)
        print("\n" + "=" * 65)
        print("  [SUCCESS] Android APK Successfully Compiled!")
        print(f"  APK Location: {target_apk} ({size_mb:.2f} MB)")
        print("=" * 65)
        return True
    else:
        print("[!] Expected APK file not found at:", output_apk)
        return False

if __name__ == "__main__":
    success = build_apk()
    sys.exit(0 if success else 1)
