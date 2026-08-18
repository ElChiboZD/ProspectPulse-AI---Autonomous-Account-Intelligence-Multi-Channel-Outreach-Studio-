# ProspectPulse AI - Mobile Build Guide

This document outlines the step-by-step process for installing and building ProspectPulse AI for mobile devices. 

ProspectPulse AI leverages an adaptive web architecture paired with Capacitor, allowing you to install it instantly as a Progressive Web App (PWA) or compile it into a fully native iOS or Android application.

---

## Option A: Instant Install via 1-Tap PWA (No Compilation Required)

The fastest way to get ProspectPulse AI on your phone is via the Progressive Web App standard.

**For iOS (Safari):**
1. Open the ProspectPulse AI web URL in Safari.
2. Tap the **Share** button at the bottom of the screen.
3. Scroll down and tap **"Add to Home Screen"**.
4. Confirm the app name and tap **Add**. The app will now launch full-screen from your home screen.

**For Android (Chrome):**
1. Open the ProspectPulse AI web URL in Chrome.
2. An "Install App" banner should appear at the bottom. Alternatively, tap the **3-dot menu**.
3. Select **"Install app"** or **"Add to Home screen"**.
4. The app is now installed locally on your Android device.

---

## Option B: Compile Native Android (.APK / .AAB)

Use this option to generate a standalone Android build that can be distributed manually or published to the Google Play Store.

### Prerequisites
- Node.js & npm installed
- Android Studio installed

### Build Steps
1. Install project dependencies:
   ```bash
   npm install
   ```
2. Sync the web assets into the Android native project:
   ```bash
   npm run mobile:sync
   ```
3. Open the project in Android Studio:
   ```bash
   npm run build:android
   ```
4. In Android Studio, wait for Gradle to finish syncing.
5. Go to **Build** > **Build Bundle(s) / APK(s)** > **Build APK(s)** (for direct install) OR **Build Bundle(s)** (for Play Store release).
6. Transfer the generated `.apk` to your device and install.

---

## Option C: iPhone install from this Windows PC (Home Screen app)

Apple will not let Windows compile a signed `.ipa`. Use this tonight:

1. Double-click `Install-On-iPhone.bat` on this PC.
2. On the iPhone (same Wi-Fi), open the printed URL in **Safari**.
3. Tap **Share** → **Add to Home Screen**.
4. Launch **ProspectPulse** from the home screen. It runs full-screen with its own icon.

## Option D: Native iOS project (Xcode / TestFlight)

Use this option to create an iOS build for TestFlight beta testing or App Store distribution.

### Prerequisites
- macOS machine
- Node.js & npm installed
- Xcode installed
- Apple Developer Account

### Build Steps
1. Install project dependencies:
   ```bash
   npm install
   ```
2. Sync the web assets into the iOS native project:
   ```bash
   npm run mobile:sync
   ```
3. Open the project in Xcode:
   ```bash
   npm run build:ios
   ```
4. In Xcode, select your target device or generic iOS device.
5. In the **Signing & Capabilities** tab, select your Apple Developer Team.
6. To test on your device, connect your iPhone via USB and click the **Run** (Play) button.
7. For distribution, go to **Product** > **Archive**, and follow the prompts to upload to App Store Connect / TestFlight.
