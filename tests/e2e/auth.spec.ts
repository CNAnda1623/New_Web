import { test, expect } from "@playwright/test";
import fs from "fs";
import path from "path";

test.describe("Authentication and Redux State Flows", () => {
  test("login, then reload keeps the session", async ({ page }) => {
    // 1. Navigate to login
    await page.goto("/login");

    // 2. Fill credentials for seeded test user
    await page.locator("#login-email").fill("jane@example.com");
    await page.locator("#login-password").fill("Password123!");

    // 3. Submit login form
    const loginButton = page.locator('button:has-text("Login")');
    await expect(loginButton).toBeEnabled();
    await loginButton.click();

    // 4. Redirects to homepage upon authentication
    await page.waitForURL("/");

    // 5. Header shows user name instead of LOGIN link
    const userButton = page.locator('button:has-text("Jane")');
    await expect(userButton).toBeVisible({ timeout: 10000 });
    await expect(page.locator('a:has-text("LOGIN")')).not.toBeVisible();

    // 6. Reload preserves the authenticated session via httpOnly cookie + getMe
    await page.reload();
    await expect(userButton).toBeVisible({ timeout: 10000 });
    await expect(page.locator('a:has-text("LOGIN")')).not.toBeVisible();
  });

  test("logout restores LOGIN in header", async ({ page }) => {
    // 1. Log in
    await page.goto("/login");
    await page.locator("#login-email").fill("jane@example.com");
    await page.locator("#login-password").fill("Password123!");
    await page.locator('button:has-text("Login")').click();
    await page.waitForURL("/");

    // 2. Open User Menu
    const userButton = page.locator('button:has-text("Jane")');
    await expect(userButton).toBeVisible({ timeout: 10000 });
    await userButton.click();

    // 3. Click Log out
    const logoutItem = page.locator('button[role="menuitem"]:has-text("Log out")');
    await expect(logoutItem).toBeVisible();
    await logoutItem.click();

    // 4. Header restores LOGIN link
    const loginLink = page.locator('a:has-text("LOGIN")');
    await expect(loginLink).toBeVisible({ timeout: 10000 });
    await expect(userButton).not.toBeVisible();
  });

  test("opening mobile drawer and navigating closes it", async ({ page }) => {
    // 1. Mobile viewport
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto("/");

    // 2. Open mobile drawer
    const hamburger = page.locator('button[aria-label="Open mobile menu"]');
    await expect(hamburger).toBeVisible();
    await hamburger.click();

    const drawer = page.locator('div[role="dialog"][aria-label="Mobile Navigation"]');
    await expect(drawer).toBeVisible();

    // 3. Navigate to Sustainability from mobile menu
    const sustainabilityLink = drawer.locator('a[href="/sustainability"]').first();
    await sustainabilityLink.click();

    // 4. URL changes and RouteChangeListener dispatches closeAllOverlays
    await page.waitForURL("/sustainability");
    await expect(drawer).not.toBeVisible();
  });

  test("register through to the success dialog", async ({ page }) => {
    const testEmail = `e2e_${Date.now()}@example.com`;

    // 1. Navigate to register
    await page.goto("/register");

    // 2. Fill Step 1
    await page.locator("#register-first-name").fill("Alexander");
    await page.locator("#register-last-name").fill("Hamilton");
    // Check agreement checkbox
    const agreeCheckbox = page.locator('input[type="checkbox"]').first();
    await agreeCheckbox.check();

    // 3. Proceed to Step 2
    const nextStepButton = page.locator('button[type="submit"]:has-text("Next")');
    await expect(nextStepButton).toBeEnabled();
    await nextStepButton.click();

    // 4. Verify Step 2 is active
    await expect(page.locator("#register-email")).toBeVisible();
    await page.locator("#register-email").fill(testEmail);

    // 5. Click Send Code
    const sendCodeButton = page.locator('button:has-text("Send Code")');
    await expect(sendCodeButton).toBeEnabled();
    await sendCodeButton.click();

    // Wait for resend countdown or sending indicator
    await expect(page.locator('button:has-text("Resend in")')).toBeVisible({ timeout: 5000 });

    // 6. Read the verification code written by the test-only email transport
    const lastCodePath = path.join(process.cwd(), ".last_code.json");
    let verificationCode = "";
    for (let attempt = 0; attempt < 20; attempt++) {
      if (fs.existsSync(lastCodePath)) {
        try {
          const content = JSON.parse(fs.readFileSync(lastCodePath, "utf-8"));
          if (content.email === testEmail.toLowerCase()) {
            verificationCode = content.code;
            break;
          }
        } catch {
          // Retry reading if json is being written
        }
      }
      await page.waitForTimeout(250);
    }

    expect(verificationCode).toBeTruthy();

    // 7. Complete registration form
    await page.locator("#register-code").fill(verificationCode);
    await page.locator("#register-password").fill("Password123!");
    await page.locator("#register-confirm-password").fill("Password123!");

    // 8. Submit Registration
    const submitButton = page.locator('button[type="submit"]:has-text("Submit")');
    await expect(submitButton).toBeEnabled();
    await submitButton.click();

    // 9. Success Modal Dialog is displayed
    const successDialog = page.locator('div[role="dialog"]');
    await expect(successDialog).toBeVisible({ timeout: 10000 });
    await expect(page.locator("#success-dialog-title")).toContainText("Registration Successful");

    // 10. Click Back to Previous Page / Login button, resetting register state
    const backToLoginButton = page.locator('button:has-text("Back to Previous Page")');
    await backToLoginButton.click();
    await page.waitForURL("/login");
  });
});
