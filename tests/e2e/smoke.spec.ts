import { test, expect } from "@playwright/test";

const routes = [
  { path: "/", titleContains: "Home Page – SUNGROW" },
  { path: "/solution/ci-pv-solution", titleContains: "C&I PV Solution – SUNGROW" },
  {
    path: "/solution/residential-pv-ess-ev-charging-solution",
    titleContains: "Residential PV + ESS + EV Charging Solution – SUNGROW",
  },
  { path: "/about-us/brand-story", titleContains: "Brand Story – SUNGROW" },
  { path: "/sustainability", titleContains: "Sustainability – SUNGROW" },
  { path: "/login", titleContains: "Login – SUNGROW" },
];

for (const { path, titleContains } of routes) {
  test(`Route ${path} returns 200 and has no horizontal overflow`, async ({
    page,
  }) => {
    const response = await page.goto(path);
    expect(response?.status()).toBe(200);

    // Document title
    await expect(page).toHaveTitle(titleContains);

    // Verify h1 presence
    const h1Count = await page.locator("h1").count();
    expect(h1Count).toBeGreaterThanOrEqual(1);

    // Verify no horizontal overflow at current viewport width
    const scrollWidth = await page.evaluate(
      () => document.documentElement.scrollWidth
    );
    const clientWidth = await page.evaluate(
      () => document.documentElement.clientWidth
    );
    expect(scrollWidth).toBeLessThanOrEqual(clientWidth + 2); // allow subpixel margin
  });
}

test("Login page form validation and demo notice", async ({ page }) => {
  await page.goto("/login");

  // Login button should initially be disabled
  const loginButton = page.locator('button:has-text("Login")');
  await expect(loginButton).toBeDisabled();

  // Enter invalid email
  const emailInput = page.locator("#login-email");
  const passwordInput = page.locator("#login-password");
  await emailInput.fill("invalid-email");
  await passwordInput.fill("password123");
  await expect(loginButton).toBeDisabled();

  // Enter valid email and password
  await emailInput.fill("user@sungrow.com");
  await expect(loginButton).toBeEnabled();

  // Click login button -> triggers demo notice
  await loginButton.click();
  const alertNotice = page.locator('.bg-orange-50[role="alert"]');
  await expect(alertNotice).toBeVisible();
  await expect(alertNotice).toContainText("Sign-in is not available in this demo.");
});
