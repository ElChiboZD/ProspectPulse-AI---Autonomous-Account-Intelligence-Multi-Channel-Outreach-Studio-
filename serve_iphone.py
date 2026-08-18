#!/usr/bin/env python3
"""Serve ProspectPulse so an iPhone on the same Wi-Fi can Add to Home Screen."""

import os
import socket
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer

ROOT = os.path.dirname(os.path.abspath(__file__))
STATIC = os.path.join(ROOT, "static")
PORT = int(os.environ.get("IPHONE_PORT", "8766"))


def lan_ip():
    sock = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
    try:
        sock.connect(("8.8.8.8", 80))
        return sock.getsockname()[0]
    except Exception:
        return "127.0.0.1"
    finally:
        sock.close()


class Handler(SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=STATIC, **kwargs)

    def end_headers(self):
        self.send_header("Cache-Control", "no-cache")
        super().end_headers()

    def log_message(self, fmt, *args):
        print("[iphone]", fmt % args)


def main():
    ip = lan_ip()
    url = f"http://{ip}:{PORT}/mobile.html"
    print("=" * 65)
    print("  ProspectPulse — install on iPhone (Home Screen app)")
    print("=" * 65)
    print(f"  1. Phone and this PC must be on the same Wi-Fi")
    print(f"  2. On iPhone Safari open:")
    print(f"     {url}")
    print("  3. Tap Share (square with arrow)")
    print("  4. Tap Add to Home Screen")
    print("  5. Open ProspectPulse from the home screen like a normal app")
    print("=" * 65)
    print("  Leave this window open while you use the phone.")
    print("  Ctrl+C to stop.")
    print("=" * 65)
    httpd = ThreadingHTTPServer(("0.0.0.0", PORT), Handler)
    try:
        httpd.serve_forever()
    except KeyboardInterrupt:
        print("\nStopped.")


if __name__ == "__main__":
    main()
