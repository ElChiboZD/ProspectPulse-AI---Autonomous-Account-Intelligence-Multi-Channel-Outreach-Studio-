#!/usr/bin/env python3
"""
ProspectPulse AI — Branch Dispatcher
Creates and pushes dedicated branches to GitHub:
- 'desktop-app' (Windows .EXE application, pywebview, launchers)
- 'mobile-apps' (iOS & Android Capacitor, PWA, mobile touch UI)
- 'main' (Universal Production Branch)
"""

import os
import sys
import urllib.parse
from dulwich.repo import Repo
from dulwich import porcelain

ROOT = os.path.dirname(os.path.abspath(__file__))

def get_github_token():
    env_file = os.path.join(ROOT, ".env")
    if os.path.isfile(env_file):
        with open(env_file, "r", encoding="utf-8") as f:
            for line in f:
                if line.startswith("GITHUB_TOKEN="):
                    return line.split("=", 1)[1].strip().strip('"').strip("'")
    return None

def push_branches():
    token = get_github_token()
    if not token:
        print("[!] Error: GITHUB_TOKEN not found in .env")
        return False

    repo = Repo(ROOT)
    current_head = repo.head()
    print("[*] Current HEAD commit:", current_head.decode('ascii') if isinstance(current_head, bytes) else current_head)

    repo_url = "https://github.com/ElChiboZD/ProspectPulse-AI---Autonomous-Account-Intelligence-Multi-Channel-Outreach-Studio-.git"
    parsed = urllib.parse.urlparse(repo_url)
    netloc = f"{token}@{parsed.netloc}"
    push_url = urllib.parse.urlunparse((parsed.scheme, netloc, parsed.path, parsed.params, parsed.query, parsed.fragment))

    # 1. Create and push 'desktop-app' branch
    desktop_branch = b"refs/heads/desktop-app"
    repo.refs[desktop_branch] = current_head
    print("\n[*] Pushing 'desktop-app' branch to GitHub...")
    porcelain.push(ROOT, push_url, refspecs=[b"refs/heads/desktop-app:refs/heads/desktop-app"])
    print("    [SUCCESS] Branch 'desktop-app' is live on GitHub!")

    # 2. Create and push 'mobile-apps' branch
    mobile_branch = b"refs/heads/mobile-apps"
    repo.refs[mobile_branch] = current_head
    print("\n[*] Pushing 'mobile-apps' branch to GitHub...")
    porcelain.push(ROOT, push_url, refspecs=[b"refs/heads/mobile-apps:refs/heads/mobile-apps"])
    print("    [SUCCESS] Branch 'mobile-apps' is live on GitHub!")

    # 3. Create and push 'windows-exe' branch (as an alias for clarity)
    exe_branch = b"refs/heads/windows-exe"
    repo.refs[exe_branch] = current_head
    print("\n[*] Pushing 'windows-exe' branch to GitHub...")
    porcelain.push(ROOT, push_url, refspecs=[b"refs/heads/windows-exe:refs/heads/windows-exe"])
    print("    [SUCCESS] Branch 'windows-exe' is live on GitHub!")

    # 4. Create and push 'macos-app' branch
    mac_branch = b"refs/heads/macos-app"
    repo.refs[mac_branch] = current_head
    print("\n[*] Pushing 'macos-app' branch to GitHub...")
    porcelain.push(ROOT, push_url, refspecs=[b"refs/heads/macos-app:refs/heads/macos-app"])
    print("    [SUCCESS] Branch 'macos-app' is live on GitHub!")

    print("\n" + "=" * 60)
    print("  All branches successfully created and pushed to GitHub!")
    print("  View them at: https://github.com/ElChiboZD/ProspectPulse-AI---Autonomous-Account-Intelligence-Multi-Channel-Outreach-Studio-/branches")
    print("=" * 60)
    return True

if __name__ == "__main__":
    push_branches()
