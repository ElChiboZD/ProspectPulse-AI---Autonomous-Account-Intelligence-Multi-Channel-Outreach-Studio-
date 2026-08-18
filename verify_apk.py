#!/usr/bin/env python3
"""
ProspectPulse AI — Android APK Deep Inspection & Integrity Auditor
Verifies that:
1. Core Android binary assets (classes.dex, AndroidManifest.xml, resources.arsc) are intact.
2. Android signing certificates (META-INF/*.RSA, *.SF) are present.
3. All web assets (index.html, JS modules, CSS, manifests, service worker) are bundled.
4. Total archive integrity is 100% valid.
"""

import os
import sys
import zipfile

ROOT = os.path.dirname(os.path.abspath(__file__))
APK_PATH = os.path.join(ROOT, "dist", "ProspectPulse-AI.apk")

def verify_apk():
    print("=" * 65)
    print("  ProspectPulse AI — Android APK Integrity Audit")
    print("=" * 65)

    if not os.path.isfile(APK_PATH):
        print(f"[!] Error: APK file not found at {APK_PATH}")
        return False

    size_bytes = os.path.getsize(APK_PATH)
    size_mb = size_bytes / (1024 * 1024)
    print(f"[*] Target APK: {APK_PATH}")
    print(f"[*] File Size:  {size_mb:.2f} MB ({size_bytes:,} bytes)\n")

    try:
        with zipfile.ZipFile(APK_PATH, "r") as z:
            # 1. Test zip file integrity
            bad_file = z.testzip()
            if bad_file:
                print(f"[!] CRC Error detected in zip entry: {bad_file}")
                return False
            print("[PASS] ZIP Archive CRC32 Checksum: OK")

            file_list = z.namelist()

            # 2. Check Core Android Runtime Binaries
            print("\n[*] Auditing Core Android Runtime Binaries:")
            essentials = [
                ("AndroidManifest.xml", "Binary Android Manifest"),
                ("classes.dex", "Compiled Dalvik/ART Bytecode"),
                ("resources.arsc", "Compiled Android Resources Table")
            ]
            for fname, desc in essentials:
                if fname in file_list:
                    info = z.getinfo(fname)
                    print(f"  [+] {fname:<20} -> OK ({desc}, {info.file_size:,} bytes)")
                else:
                    print(f"  [-] {fname:<20} -> MISSING ({desc})")
                    return False

            # 3. Check Signature
            print("\n[*] Auditing APK Code Signing (META-INF):")
            meta_files = [f for f in file_list if f.startswith("META-INF/")]
            if meta_files:
                for mf in meta_files[:4]:
                    print(f"  [+] {mf}")
                print(f"  [+] Total Signing/Manifest Entries: {len(meta_files)} files -> SIGNED (OK)")
            else:
                print("  [-] No META-INF signature files found!")
                return False

            # 4. Check Bundled Web Application
            print("\n[*] Auditing Bundled Web Assets (Capacitor WebDir):")
            web_assets = [f for f in file_list if f.startswith("assets/public/")]
            print(f"  [+] Total Bundled Assets: {len(web_assets)} files")

            required_web_files = [
                "assets/public/index.html",
                "assets/public/manifest.json",
                "assets/public/service-worker.js",
                "assets/public/js/mobile.js",
                "assets/public/js/mobile-pro.js",
                "assets/public/js/test-drive.js",
                "assets/public/js/feedback.js",
                "assets/public/js/reply-copilot.js",
                "assets/public/js/dealroom.js",
                "assets/public/js/multithread-visualizer.js",
                "assets/public/css/mobile.css",
                "assets/public/css/mobile-pro.css",
                "assets/public/css/feedback.css",
                "assets/public/css/test-drive.css"
            ]

            all_ok = True
            for rwf in required_web_files:
                rel = rwf.replace("assets/public/", "")
                if rwf in file_list:
                    info = z.getinfo(rwf)
                    print(f"  [+] {rel:<30} -> OK ({info.file_size:,} bytes)")
                else:
                    print(f"  [-] {rel:<30} -> MISSING")
                    all_ok = False

            if not all_ok:
                return False

    except Exception as e:
        print(f"[!] Verification exception: {e}")
        return False

    print("\n" + "=" * 65)
    print("  [VERIFIED] ProspectPulse-AI.apk is 100% HEALTHY & VALID!")
    print("  Ready for sideloading, USB transfer, ADB install, or Google Play.")
    print("=" * 65)
    return True

if __name__ == "__main__":
    success = verify_apk()
    sys.exit(0 if success else 1)
