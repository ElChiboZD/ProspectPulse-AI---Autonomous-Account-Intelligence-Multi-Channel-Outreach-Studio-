#!/usr/bin/env python3
"""
ProspectPulse AI — Native Desktop Application Wrapper
Runs the local intelligence server in a background thread and opens a native Edge WebView2 desktop window.
"""

import os
import sys
import time
import threading
import urllib.request
import urllib.error
import webview

# Import the local server components
import server
import db

PORT = int(os.environ.get("PORT", "8765"))
SERVER_URL = f"http://127.0.0.1:{PORT}"

def start_server():
    """Starts the Python ThreadingHTTPServer in a background daemon thread."""
    try:
        db.init_db()
        srv = server.ThreadingHTTPServer(("127.0.0.1", PORT), server.Handler)
        print(f"[*] ProspectPulse AI Server running at {SERVER_URL}")
        srv.serve_forever()
    except Exception as e:
        print(f"[!] Server error: {e}")

def wait_for_server(url, timeout=10):
    """Waits until the local server responds with HTTP 200."""
    start = time.time()
    while time.time() - start < timeout:
        try:
            with urllib.request.urlopen(url, timeout=1) as resp:
                if resp.status == 200:
                    return True
        except (urllib.error.URLError, ConnectionRefusedError, TimeoutError):
            time.sleep(0.2)
    return False

def main():
    # 1. Start backend server in a background thread
    server_thread = threading.Thread(target=start_server, daemon=True)
    server_thread.start()

    # 2. Ensure server is live before launching window
    if not wait_for_server(SERVER_URL, timeout=8):
        print(f"[!] Warning: Server did not respond within 8s at {SERVER_URL}, launching anyway...")

    # 3. Create native desktop window
    window = webview.create_window(
        title="ProspectPulse AI — Autonomous Account Intelligence & Outreach Studio",
        url=SERVER_URL,
        width=1420,
        height=920,
        min_size=(1100, 720),
        background_color="#08090D",
        confirm_close=False,
        text_select=True
    )

    # 4. Start GUI event loop
    print("[*] Launching Native Desktop Window...")
    webview.start(debug=False)
    print("[*] ProspectPulse AI Desktop Window Closed.")
    sys.exit(0)

if __name__ == "__main__":
    main()
