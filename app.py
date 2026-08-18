#!/usr/bin/env python3
"""
ProspectPulse AI — Standalone Desktop Application
Self-contained native Windows Edge WebView2 desktop application with dynamic port allocation and background server lifecycle.
"""

import os
import sys
import time
import socket
import threading
import urllib.request
import urllib.error
import webview

import server
import db

def find_free_port(start_port=8765, max_attempts=50):
    """Finds an available TCP port starting from start_port."""
    for port in range(start_port, start_port + max_attempts):
        with socket.socket(socket.AF_INET, socket.SOCK_STREAM) as s:
            try:
                s.bind(('127.0.0.1', port))
                return port
            except OSError:
                continue
    return start_port

SERVER_PORT = find_free_port(8765)
SERVER_URL = f"http://127.0.0.1:{SERVER_PORT}"

def start_server():
    """Starts the Python ThreadingHTTPServer in a background daemon thread."""
    try:
        db.init_db()
        srv = server.ThreadingHTTPServer(("127.0.0.1", SERVER_PORT), server.Handler)
        print(f"[*] ProspectPulse AI Standalone Engine running on {SERVER_URL}")
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
            time.sleep(0.15)
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
        title="ProspectPulse AI — Autonomous Account Intelligence Studio",
        url=SERVER_URL,
        width=1420,
        height=920,
        min_size=(1100, 720),
        background_color="#08090D",
        confirm_close=False,
        text_select=True
    )

    # 4. Start GUI event loop
    print("[*] Launching Native Standalone Window...")
    try:
        webview.start(debug=False, gui="edgechromium")
    except Exception:
        # Fallback to default GUI backend
        webview.start(debug=False)

    print("[*] ProspectPulse AI Desktop Application Closed.")
    sys.exit(0)

if __name__ == "__main__":
    main()
