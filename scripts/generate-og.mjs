// Renders public/og-default.png (1200x630), the default social-sharing image (tech spec §9).
// Run after changing the name or tagline: node scripts/generate-og.mjs
import { chromium } from "playwright";

const name = "Sathishkumar R";
const tagline = "Building side projects in agentic engineering.";
const html = `<!doctype html><html><body style="margin:0;width:1200px;height:630px;background:#111113;
  color:#fbfbfe;font-family:ui-sans-serif,system-ui,sans-serif;display:flex;flex-direction:column;
  justify-content:center;padding:0 96px;box-sizing:border-box;border-bottom:12px solid #e60012">
  <div style="width:112px;height:112px;border:2px solid #393942;border-radius:16px;display:flex;
    align-items:center;justify-content:center;font:600 44px ui-monospace,monospace;margin-bottom:48px">SR</div>
  <div style="font-size:76px;font-weight:700;letter-spacing:-1px">${name}</div>
  <div style="font-size:36px;color:#ff5a64;margin-top:16px">${tagline}</div>
  <div style="font-size:28px;color:#8c8c98;margin-top:40px">sathishkumar5115.github.io</div>
</body></html>`;

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1200, height: 630 } });
await page.setContent(html);
await page.screenshot({ path: new URL("../public/og-default.png", import.meta.url).pathname });
await browser.close();
console.log("Wrote public/og-default.png");
