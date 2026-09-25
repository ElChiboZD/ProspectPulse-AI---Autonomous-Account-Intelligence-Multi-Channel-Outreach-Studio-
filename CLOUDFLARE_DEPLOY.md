# 🌐 Hosting ProspectPulse AI on Cloudflare

ProspectPulse AI can be hosted on Cloudflare in two ways depending on how you want to share it:

---

## Method 1: Cloudflare Pages via GitHub (Recommended for Public Access)

This hosts the client console and the Buyer Deal Room on Cloudflare's high-speed global CDN with free SSL, custom domain support, and automated deploys whenever you push to GitHub.

### Step-by-Step Setup:
1. Log in to your [Cloudflare Dashboard](https://dash.cloudflare.com/).
2. In the left navigation, select **Workers & Pages**.
3. Click **Create Application** > **Pages** tab > **Connect to Git**.
4. Authorize your GitHub account and select the repository:  
   `ElChiboZD/ProspectPulse-AI---Autonomous-Account-Intelligence-Multi-Channel-Outreach-Studio-`
5. Configure the build settings:
   * **Framework preset**: `None`
   * **Build command**: *(leave empty)*
   * **Build output directory**: `static`
   * **Root directory**: *(leave empty)*
6. Click **Save and Deploy**.
7. Cloudflare will deploy your site in ~15 seconds to a public URL:  
   `https://prospectpulse-ai.pages.dev` (or your chosen project name).

> **Note**: Whenever you push changes to your `main` branch on GitHub, Cloudflare Pages will automatically rebuild and publish the latest version.

---

## Method 2: Cloudflare Tunnel (For Full Live Python Backend)

If you are running the Python backend (`python server.py`) and want colleagues or clients anywhere in the world to access your live local server with real-time SSE streaming and SQLite persistence:

1. Double-click [`Launch-ProspectPulse.bat`](Launch-ProspectPulse.bat) to start the local backend on port `8765`.
2. Double-click [`Launch-Cloudflare-Tunnel.bat`](Launch-Cloudflare-Tunnel.bat).
3. Cloudflare Tunnel will instantly assign a secure public HTTPS address:  
   `https://<unique-subdomain>.trycloudflare.com`
4. Anyone on the internet can visit that link to use your live instance without port forwarding.

---

## Deployment Configuration Files

* [`wrangler.toml`](wrangler.toml) — Cloudflare Pages configuration settings.
* [`static/_headers`](static/_headers) — Security headers (CORS, frame protection, cache policies).
* [`static/_redirects`](static/_redirects) — SPA route handling (e.g. `/dealroom` -> `/dealroom.html`).
