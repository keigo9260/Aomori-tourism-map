import { expect, test } from "@playwright/test";

test("destinations load without browser errors and combined filters narrow the list and map", async ({
  page,
}) => {
  const errors: string[] = [];
  page.on("pageerror", (error) => errors.push(error.message));
  await page.goto("/");
  await expect(page.locator(".spot-card")).toHaveCount(12);
  await expect(page.locator(".map-marker")).toHaveCount(12);
  await page.getByRole("button", { name: "温泉 3", exact: true }).click();
  await expect(page.locator(".spot-card")).toHaveCount(3);
  await expect(page.locator(".map-marker")).toHaveCount(3);
  await page.getByLabel("エリアで絞り込む").selectOption("十和田・八甲田");
  await expect(page.locator(".spot-card")).toHaveCount(2);
  await page
    .getByRole("textbox", { name: "スポット名・キーワードで探す" })
    .fill("つた");
  await expect(page.locator(".spot-card")).toHaveCount(1);
  await expect(page.locator(".spot-card h3")).toHaveText("蔦温泉");
  await page.getByRole("textbox").fill("該当なし");
  await expect(page.getByText("スポットが見つかりませんでした")).toBeVisible();
  await expect(page.locator(".map-marker")).toHaveCount(0);
  await page
    .getByRole("button", { name: "条件をクリアする", exact: true })
    .click();
  await expect(page.locator(".spot-card")).toHaveCount(12);
  expect(errors).toEqual([]);
});

test("saved destinations survive a reload and can be removed from the saved view", async ({
  page,
}) => {
  await page.goto("/");
  await page
    .getByRole("button", { name: "奥入瀬渓流を保存", exact: true })
    .click();
  await expect(page.getByRole("status")).toHaveText(
    "行きたい場所に保存しました",
  );
  await page.reload();
  await expect(
    page.getByRole("button", { name: "奥入瀬渓流を保存から削除", exact: true }),
  ).toHaveAttribute("aria-pressed", "true");
  await page
    .getByRole("navigation")
    .getByRole("button", { name: /保存したスポット/ })
    .click();
  await expect(page.locator(".spot-card")).toHaveCount(1);
  await page
    .getByRole("button", { name: "奥入瀬渓流を保存から削除", exact: true })
    .click();
  await expect(page.getByText("気になる場所を、ここに。")).toBeVisible();
  await page
    .getByRole("button", { name: "スポットを見つける", exact: true })
    .click();
  await expect(page.locator(".spot-card")).toHaveCount(12);
});

test("details have useful external links, keyboard dismissal, and focus restoration", async ({
  page,
}) => {
  await page.goto("/");
  const trigger = page.getByRole("button", {
    name: "奥入瀬渓流の詳細を見る",
    exact: true,
  });
  await trigger.click();
  const dialog = page.getByRole("dialog", { name: "奥入瀬渓流", exact: true });
  await expect(
    dialog.getByRole("heading", { name: "奥入瀬渓流", exact: true }),
  ).toBeVisible();
  await expect(
    dialog.getByRole("link", { name: "Google マップで見る" }),
  ).toHaveAttribute("href", /google\.com\/maps\/search/);
  await expect(
    dialog.getByRole("link", { name: "公式・観光案内サイトで詳しく見る" }),
  ).toHaveAttribute("href", "https://towadako.or.jp/");
  await dialog.getByRole("button", { name: "行きたい", exact: true }).click();
  await expect(
    dialog.getByRole("button", { name: "保存済み", exact: true }),
  ).toHaveAttribute("aria-pressed", "true");
  await page.keyboard.press("Escape");
  await expect(dialog).not.toBeVisible();
  await expect(trigger).toBeFocused();
});

test("map markers select a destination, zoom, and open its details", async ({
  page,
}) => {
  await page.goto("/");
  await page
    .getByRole("button", { name: "仏ヶ浦を地図で選択", exact: true })
    .click();
  await expect(page.locator(".map-preview strong")).toHaveText("仏ヶ浦");
  await page.getByRole("button", { name: "地図を拡大", exact: true }).click();
  await expect(page.locator(".map-geography")).toHaveAttribute(
    "transform",
    /scale\(1\.5\)/,
  );
  await page
    .getByRole("button", { name: "地図を全体表示", exact: true })
    .click();
  await expect(page.locator(".map-geography")).toHaveAttribute(
    "transform",
    /scale\(1\)/,
  );
  await page.locator(".map-preview-button").click();
  await expect(
    page.getByRole("dialog", { name: "仏ヶ浦", exact: true }),
  ).toBeVisible();
});

test("prefecture picker distinguishes Aomori from destinations still in preparation", async ({
  page,
}) => {
  await page.goto("/");
  await page.locator(".prefecture-button").click();
  const dialog = page.getByRole("dialog", { name: "旅先を選ぶ" });
  await expect(
    dialog.getByRole("button", { name: "青森県", exact: true }),
  ).toBeEnabled();
  await expect(
    dialog.getByRole("button", { name: "北海道", exact: true }),
  ).toBeDisabled();
  await expect(
    dialog.getByRole("button", { name: "沖縄県", exact: true }),
  ).toBeDisabled();
  await expect(dialog.getByRole("button", { disabled: true })).toHaveCount(46);
  await dialog.getByRole("button", { name: "青森県", exact: true }).click();
  await expect(dialog).not.toBeVisible();
});

test("invalid stored favorites do not prevent startup", async ({ page }) => {
  await page.addInitScript(() =>
    localStorage.setItem("yorimichi.saved.v1", "{invalid json"),
  );
  await page.goto("/");
  await expect(page.locator(".spot-card")).toHaveCount(12);
});

test("mobile layout has no horizontal overflow and switches between list and map", async ({
  page,
}) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/");
  await expect(page.locator(".spot-grid")).toBeVisible();
  await expect(page.locator(".map-column")).not.toBeVisible();
  await page.getByRole("button", { name: "地図を表示", exact: true }).click();
  await expect(page.locator(".map-column")).toBeVisible();
  await expect(page.locator(".results-panel")).not.toBeVisible();
  await page
    .getByRole("button", { name: "弘前公園を地図で選択", exact: true })
    .click();
  await expect(page.locator(".map-preview strong")).toHaveText("弘前公園");
  await page.locator(".map-preview-button").click();
  await expect(
    page.getByRole("dialog", { name: "弘前公園", exact: true }),
  ).toBeVisible();
  await page.getByRole("button", { name: "閉じる", exact: true }).click();
  await page.getByRole("button", { name: "リストを表示", exact: true }).click();
  for (const width of [320, 390, 768]) {
    await page.setViewportSize({ width, height: 844 });
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= innerWidth,
      ),
    ).toBe(true);
  }
});
