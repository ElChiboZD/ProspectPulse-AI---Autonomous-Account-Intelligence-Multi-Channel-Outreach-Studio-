#!/usr/bin/env python3
"""
ProspectPulse AI — GitHub Push Utility
Use this script to push your local repository to GitHub.

Usage:
  python push_to_github.py <github_repo_url> [github_token]

Examples:
  python push_to_github.py https://github.com/ElChiboZD/ProspectPulse-AI---Autonomous-Account-Intelligence-Multi-Channel-Outreach-Studio-.git
  python push_to_github.py https://github.com/ElChiboZD/ProspectPulse-AI---Autonomous-Account-Intelligence-Multi-Channel-Outreach-Studio-.git ghp_yourPersonalAccessTokenHere
"""

import sys
import os
import urllib.parse
from dulwich import porcelain

def main():
    if len(sys.argv) < 2:
        print("Usage: python push_to_github.py <github_repo_url> [github_token]")
        sys.exit(1)

    repo_url = sys.argv[1].strip()
    token = sys.argv[2].strip() if len(sys.argv) > 2 else os.environ.get("GITHUB_TOKEN", "")

    # If token is provided, embed token into HTTPS URL
    if token:
        parsed = urllib.parse.urlparse(repo_url)
        netloc = f"{token}@{parsed.netloc}"
        push_url = urllib.parse.urlunparse((parsed.scheme, netloc, parsed.path, parsed.params, parsed.query, parsed.fragment))
    else:
        push_url = repo_url

    repo_path = os.path.dirname(os.path.abspath(__file__))
    
    print(f"Target repository: {repo_url}")
    print("Pushing 'master' branch to GitHub 'main'...")
    try:
        porcelain.push(repo_path, push_url, "refs/heads/master:refs/heads/main")
        print("\n[SUCCESS] ProspectPulse AI has been pushed to GitHub!")
        print(f"View your repository at: {repo_url.replace('.git', '')}")
    except Exception as e:
        print(f"\nPush details: {e}")
        print("\nAuthentication required. To push with your GitHub Personal Access Token (PAT):")
        print(f"  python push_to_github.py {repo_url} ghp_yourTokenHere")
        print("\nOr install Git for Windows and run:")
        print(f"  git remote add origin {repo_url}")
        print("  git branch -M main")
        print("  git push -u origin main")

if __name__ == "__main__":
    main()
