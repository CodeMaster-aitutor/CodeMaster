import { test, expect } from "@playwright/test";

const placeholder = "Type or paste Java code here...";

test("supports uninterrupted multi-character input", async ({ page }) => {
  await page.goto("/compiler");
  const textarea = page.getByPlaceholder(placeholder);
  await textarea.click();
  await textarea.type("public class Main { }");
  await expect(textarea).toHaveValue("public class Main { }");
  await expect(textarea).toBeFocused();
});

test("keeps cursor focused until blur", async ({ page }) => {
  await page.goto("/compiler");
  const textarea = page.getByPlaceholder(placeholder);
  await textarea.click();
  await textarea.type("class A {}");
  await expect(textarea).toBeFocused();
});

test("preserves scroll offset after edits", async ({ page }) => {
  await page.goto("/compiler");
  const textarea = page.getByPlaceholder(placeholder);
  const content = Array.from({ length: 120 }, (_, i) => `Line ${i + 1}`).join("\n");
  await textarea.fill(content);
  await page.evaluate(
    ({ selector, scrollTop }) => {
      const element = document.querySelector(selector) as HTMLTextAreaElement | null;
      if (element) {
        element.scrollTop = scrollTop;
        element.setSelectionRange(element.value.length, element.value.length);
      }
    },
    { selector: `textarea[placeholder="${placeholder}"]`, scrollTop: 240 },
  );
  await textarea.type("\nLine 121");
  const currentScroll = await page.evaluate(
    (selector) => (document.querySelector(selector) as HTMLTextAreaElement | null)?.scrollTop ?? 0,
    `textarea[placeholder="${placeholder}"]`,
  );
  expect(currentScroll).toBeGreaterThanOrEqual(240);
});

test("does not auto-scroll to top after typing", async ({ page }) => {
  await page.goto("/compiler");
  const textarea = page.getByPlaceholder(placeholder);
  const content = Array.from({ length: 160 }, (_, i) => `Row ${i + 1}`).join("\n");
  await textarea.fill(content);
  await page.evaluate(
    ({ selector, scrollTop }) => {
      const element = document.querySelector(selector) as HTMLTextAreaElement | null;
      if (element) {
        element.scrollTop = scrollTop;
        element.setSelectionRange(element.value.length, element.value.length);
      }
    },
    { selector: `textarea[placeholder="${placeholder}"]`, scrollTop: 320 },
  );
  await textarea.type("\nRow 161");
  const currentScroll = await page.evaluate(
    (selector) => (document.querySelector(selector) as HTMLTextAreaElement | null)?.scrollTop ?? 0,
    `textarea[placeholder="${placeholder}"]`,
  );
  expect(currentScroll).toBeGreaterThan(0);
});

test("auto-scrolls to keep cursor visible on enter", async ({ page }) => {
  await page.goto("/compiler");
  const textarea = page.getByPlaceholder(placeholder);
  await page.evaluate((selector) => {
    const element = document.querySelector(selector) as HTMLTextAreaElement | null;
    if (element) {
      element.style.fontSize = "18px";
      element.style.lineHeight = "28px";
    }
  }, `textarea[placeholder="${placeholder}"]`);
  const content = Array.from({ length: 200 }, (_, i) => `Line ${i + 1}`).join("\n");
  await textarea.fill(content);
  await textarea.click();
  await textarea.press("End");
  await textarea.type("\n\n\n\n");
  const metrics = await page.evaluate((selector) => {
    const element = document.querySelector(selector) as HTMLTextAreaElement | null;
    if (!element) {
      return null;
    }
    const computed = window.getComputedStyle(element);
    const lineHeight = parseFloat(computed.lineHeight);
    const paddingTop = parseFloat(computed.paddingTop) || 0;
    const lineIndex = element.value.slice(0, element.selectionStart).split("\n").length - 1;
    const caretTop = paddingTop + lineIndex * lineHeight;
    const visibleTop = element.scrollTop;
    const visibleBottom = visibleTop + element.clientHeight;
    return { caretTop, lineHeight, visibleTop, visibleBottom, scrollTop: element.scrollTop };
  }, `textarea[placeholder="${placeholder}"]`);
  expect(metrics).not.toBeNull();
  expect(metrics?.scrollTop).toBeGreaterThan(0);
  expect(metrics?.caretTop).toBeGreaterThan(metrics?.visibleTop ?? 0);
  expect(metrics?.caretTop).toBeLessThan((metrics?.visibleBottom ?? 0) - (metrics?.lineHeight ?? 0));
});
