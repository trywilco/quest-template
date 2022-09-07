const puppeteer = require("puppeteer");

const iPhone = puppeteer.devices["iPhone 11"];

describe("Check that the profile page is rendered correctly", () => {
  let browser, page;

  beforeAll(async () => {
    browser = await puppeteer.launch();
    page = await browser.newPage();
    await page.emulate(iPhone);
  });

  afterAll(async () => {
    await page.close();
    await browser.close();
  });

  it("Load Roger's profile page", async () => {
    await page.goto("http://localhost:3001/@roger", {
      waitUntil: "load",
      timeout: 60000,
    });
  }, 60000);

  it("Window width should not exceed mobile client's width", async () => {
    const dimensions = await page.evaluate(() => {
      return {
        width: window.innerWidth,
        clientWidth: document.documentElement.clientWidth,
      };
    });

    await expect(dimensions.width).toBeLessThanOrEqual(dimensions.clientWidth);
  }, 15000);
});
