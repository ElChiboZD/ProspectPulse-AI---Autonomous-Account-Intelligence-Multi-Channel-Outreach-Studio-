# 🍏 ProspectPulse AI — macOS Desktop Guide

ProspectPulse AI runs natively on macOS (Apple Silicon M1/M2/M3/M4 & Intel x86_64) using Apple's high-performance Cocoa & WebKit (`WKWebView`) engine.

---

### 🚀 3 Ways to Run & Distribute on macOS:

#### Option 1: 1-Click Double-Click Launcher (Fastest for Local Use)
1. Open your project folder in Finder.
2. Double-click **`Launch-Mac.command`**.
3. The native macOS desktop window will open with dark title bars and full Google Workspace authentication.

*(If macOS asks for permission on first run: open Terminal and run `chmod +x Launch-Mac.command`).*

---

#### Option 2: Direct Command Line Launch
```bash
# 1. Install dependencies
pip3 install -r requirements.txt

# 2. Run the application
python3 app.py
```

---

#### Option 3: Compile Standalone macOS Application Bundle (`.app` / `.dmg`)
To create a self-contained macOS `.app` that users can drag into their `/Applications` folder:
```bash
python3 build_mac.py
```
This generates:
* `dist/ProspectPulse-AI.app` (Native macOS Application Bundle)
* Ready to be packaged into a `.dmg` or zipped for distribution.

---

### ⌨️ Native macOS Keyboard Shortcuts:
* **⌘K (Cmd+K)**: Open Global Raycast/Linear Spotlight Command Palette.
* **⌘Enter (Cmd+Enter)**: Run instant omni-search research on the active domain.
* **⌘E (Cmd+E)**: 1-Click copy active outreach sequence to clipboard.
* **1 – 6**: Instant jump between workflow screens (*1: Radar, 2: Intel, 3: Autopsy, 4: Studio, 5: Deal Room, 6: Roleplay*).
* **Escape**: Close any modal or dropdown menu.

---

### 🛡️ Storage & Data Persistence:
* Database and Google user profiles are automatically saved in:
  `~/Library/Application Support/ProspectPulseAI/prospectpulse.db`
* Zero permission issues or conflicts with corporate enterprise security policies.
