import { expect, test, type Page } from "@playwright/test";

const servicePath = "/services/erpnext-frappe-development/";

async function readCanvasPixels(page: Page) {
  return page.locator("[data-testid='erpnext-scene'] canvas").evaluate((canvasElement) => {
    const canvas = canvasElement as HTMLCanvasElement;
    const gl = canvas.getContext("webgl2") ?? canvas.getContext("webgl");

    if (!gl) return { samples: 0, visiblePixels: 0 };

    const pixel = new Uint8Array(4);
    let samples = 0;
    let visiblePixels = 0;

    for (let xIndex = 1; xIndex < 8; xIndex += 1) {
      for (let yIndex = 1; yIndex < 6; yIndex += 1) {
        const x = Math.floor((canvas.width * xIndex) / 8);
        const y = Math.floor((canvas.height * yIndex) / 6);
        gl.readPixels(x, y, 1, 1, gl.RGBA, gl.UNSIGNED_BYTE, pixel);
        samples += 1;

        const colorRange = Math.max(pixel[0], pixel[1], pixel[2]) - Math.min(pixel[0], pixel[1], pixel[2]);
        if (pixel[3] > 5 && (colorRange > 8 || Math.min(pixel[0], pixel[1], pixel[2]) < 235)) {
          visiblePixels += 1;
        }
      }
    }

    return { samples, visiblePixels };
  });
}

test("desktop service page renders its scene and interactions", async ({ page }, testInfo) => {
  const consoleErrors: string[] = [];
  page.on("console", (message) => {
    if (message.type() === "error") consoleErrors.push(message.text());
  });

  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto(servicePath, { waitUntil: "networkidle" });
  await expect(page.getByRole("heading", { level: 1 })).toContainText("ERPNext built around your business");
  await expect(page.locator("[data-testid='erpnext-scene'] canvas")).toBeVisible();
  await page.waitForTimeout(1_500);

  const pixels = await readCanvasPixels(page);
  expect(pixels.samples).toBeGreaterThan(0);
  expect(pixels.visiblePixels).toBeGreaterThan(2);

  const accountingModule = page.getByRole("button", { name: /Accounting/ }).first();
  await accountingModule.hover();
  await expect(page.getByText(/Connect invoicing, payments, journals/)).toBeVisible();

  await expect(page.getByRole("link", { name: /Get a 14-Day Trial/ })).toHaveAttribute("href", "https://frappe.io/cloud");
  await page.getByRole("button", { name: "Book a Demo" }).click();
  await expect(page.locator("#erpnext-contact")).toBeInViewport();
  await expect(page.getByRole("combobox", { name: "Project Type" })).toHaveValue("ERPNext / Frappe");
  await page.screenshot({ path: testInfo.outputPath("erpnext-desktop.png"), fullPage: true });

  expect(consoleErrors.filter((message) => !message.includes("webpack-hmr"))).toEqual([]);
});

test("mobile service page has no overflow and modules expand on tap", async ({ page }, testInfo) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto(servicePath, { waitUntil: "networkidle" });

  const layoutWidth = await page.evaluate(() => ({
    viewport: window.innerWidth,
    document: document.documentElement.scrollWidth,
  }));
  expect(layoutWidth.document).toBeLessThanOrEqual(layoutWidth.viewport);

  const accountingModule = page.getByRole("button", { name: /Accounting/ }).first();
  await accountingModule.click();
  await expect(page.getByText(/Connect invoicing, payments, journals/)).toBeVisible();
  await page.screenshot({ path: testInfo.outputPath("erpnext-mobile.png"), fullPage: true });
});

test("service navigation returns to a home section without a hash", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto(servicePath, { waitUntil: "networkidle" });
  await page.getByRole("button", { name: "Tech Stack", exact: true }).click();
  await expect(page).toHaveURL("http://127.0.0.1:3000/", { timeout: 15_000 });
  await expect(page.locator("#tech-stack")).toBeInViewport({ timeout: 15_000 });
  expect(new URL(page.url()).hash).toBe("");
});
