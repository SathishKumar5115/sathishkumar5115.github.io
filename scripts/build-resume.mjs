// Renders resume/resume.html to public/resume.pdf (A4) and strips its metadata.
// Run after editing the resume: node scripts/build-resume.mjs
import { writeFileSync } from "node:fs";
import { chromium } from "playwright";
import { stripPdf } from "./lib/pdf-metadata.mjs";

const OWNER = "Sathishkumar R";
const source = new URL("../resume/resume.html", import.meta.url);
const target = new URL("../public/resume.pdf", import.meta.url);

const browser = await chromium.launch();
const page = await browser.newPage();
await page.goto(source.href, { waitUntil: "networkidle" });
await page.evaluate(() => document.fonts.ready);
const pdf = await page.pdf({ format: "A4", printBackground: true, preferCSSPageSize: true });
await browser.close();

const clean = await stripPdf(pdf, { title: `${OWNER} – Resume`, author: OWNER });
writeFileSync(target, clean);
console.log(`Wrote public/resume.pdf (${(clean.length / 1024).toFixed(0)} KB).`);
