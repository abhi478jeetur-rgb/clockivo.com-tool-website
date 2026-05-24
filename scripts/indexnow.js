const fs = require("fs");
const path = require("path");

const INDEXNOW_KEY = "a6d510c85c2c4dfdbbc2df600b3e6481";
const HOST = "www.clockivo.com";
const BASE_URL = `https://${HOST}`;
const KEY_LOCATION = `${BASE_URL}/${INDEXNOW_KEY}.txt`;

// 1. Static pages
const staticPages = [
  "",
  "/alarm-clock",
  "/timer",
  "/stopwatch",
  "/digital-clock",
  "/analog-clock",
  "/world-clock",
  "/help",
  "/about",
  "/contact",
  "/privacy-policy",
  "/terms",
  "/timer-vs-stopwatch"
];

// 2. Programmatic SEO (pSEO) pages
const pSEOPagesList = [
  '5-minutes',
  '10-minutes',
  '15-minutes',
  '20-minutes',
  '25-minutes',
  '30-minutes',
  '45-minutes',
  '1-hour',
  'pomodoro-timer',
  'study-timer',
  'presentation-timer',
  'workout-timer',
  'egg-timer'
];

async function run() {
  console.log("Gathering all URLs for Clockivo indexing submission...");
  const urls = [];

  // Add static page URLs
  staticPages.forEach(p => urls.push(`${BASE_URL}${p}`));

  // Add pSEO page URLs
  pSEOPagesList.forEach(p => urls.push(`${BASE_URL}/timer/${p}`));

  // Add blog index
  urls.push(`${BASE_URL}/blog`);

  // Add blog post URLs by reading content/blog folder
  try {
    const blogDir = path.join(__dirname, "..", "content", "blog");
    if (fs.existsSync(blogDir)) {
      const files = fs.readdirSync(blogDir);
      files.forEach(file => {
        if (file.endsWith(".mdx") || file.endsWith(".md")) {
          const slug = file.replace(/\.mdx?$/, "");
          urls.push(`${BASE_URL}/blog/${slug}`);
        }
      });
    }
  } catch (error) {
    console.error("Error reading blog directory:", error.message);
  }

  console.log(`Gathered ${urls.length} URLs for IndexNow.`);
  console.log("Submitting to IndexNow API...");

  try {
    const response = await fetch("https://api.indexnow.org/IndexNow", {
      method: "POST",
      headers: {
        "Content-Type": "application/json; charset=utf-8",
      },
      body: JSON.stringify({
        host: HOST,
        key: INDEXNOW_KEY,
        keyLocation: KEY_LOCATION,
        urlList: urls,
      }),
    });

    if (response.status === 200 || response.status === 202) {
      console.log(`\n🎉 Success! IndexNow returned status ${response.status} (Accepted).`);
      console.log(`Submitted ${urls.length} URLs successfully to Bing and other IndexNow search engines!`);
    } else {
      const responseText = await response.text();
      console.error(`\n❌ IndexNow failed with status code ${response.status}`);
      console.error(`Response details:`, responseText);
    }
  } catch (err) {
    console.error(`\n❌ Failed to ping IndexNow:`, err.message);
  }
}

run();
