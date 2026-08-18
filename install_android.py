#!/usr/bin/env python3
"""
ProspectPulse AI — 1-Click Android Device Installer
Installs and launches ProspectPulse-AI.apk onto a connected Android phone via ADB.
"""

import os
import sys
import subprocess
import time

ADB = r"C:\Users\travi\AppData\Local\Android\Sdk\platform-tools\adb.exe"
ROOT = os.path.dirname(os.path.abspath(__file__))
APK_PATH = os.path.join(ROOT, "dist", "ProspectPulse-AI.apk")

def install_app():
    print("=" * 65)
    print("  ProspectPulse AI — Android 1-Click Phone Installer")
    print("=" * 65)

    if not os.path.isfile(ADB):
        print(f"[!] Error: ADB not found at {ADB}")
        return False

    if not os.path.isfile(APK_PATH):
        print(f"[!] Error: APK not found at {APK_PATH}")
        return False

    print("[*] Checking for connected Android devices...")
    res = subprocess.run([ADB, "devices"], capture_output=True, text=True)
    lines = [line.strip() for line in res.stdout.strip().split("\n") if line.strip() and not line.startswith("List of")]

    if not lines or all(not line for line in lines):
        print("\n[!] No device detected with USB Debugging enabled.")
        print("\n--- To enable USB Debugging on your Pixel 10 Pro XL ---")
        print("1. Open Settings -> About Phone")
        print("2. Tap 'Build Number' 7 times until it says 'You are a developer'")
        print("3. Open Settings -> System -> Developer Options")
        print("4. Turn ON 'USB Debugging'")
        print("5. Look at your phone and tap 'ALLOW' on the popup prompt.")
        print("----------------------------------------------------------\n")
        print("[*] Waiting for device to connect (Plug in USB & allow prompt)...")
        
        # Wait up to 30 seconds
        for _ in range(15):
            time.sleep(2)
            res = subprocess.run([ADB, "devices"], capture_output=True, text=True)
            lines = [l.strip() for l in res.stdout.strip().split("\n") if l.strip() and not l.startswith("List of")]
            if lines and any("device" in l for l in lines):
                break

    # Recheck devices
    res = subprocess.run([ADB, "devices"], capture_output=True, text=True)
    lines = [l.strip() for l in res.stdout.strip().split("\n") if l.strip() and not l.startswith("List of")]

    if not lines:
        print("[!] Still no device detected. Please make sure USB Debugging is ON and phone is unlocked.")
        return False

    print(f"[SUCCESS] Device detected: {lines[0]}")
    print(f"\n[*] Installing {os.path.basename(APK_PATH)} onto your phone...")
    ret_install = subprocess.run([ADB, "install", "-r", "-d", APK_PATH])

    if ret_install.returncode == 0:
        print("\n[SUCCESS] ProspectPulse AI installed on your Android device!")
        print("[*] Launching ProspectPulse AI on phone...")
        subprocess.run([ADB, "shell", "am", "start", "-n", "ai.prospectpulse.app/.MainActivity"])
        print("\n[+] App is now running on your phone!")
        return True
    else:
        print("[!] Install failed. Please unlock your phone and check for confirmation prompts.")
        return False

if __name__ == "__main__":
    success = install_app()
    sys.exit(0 if success else 1)
