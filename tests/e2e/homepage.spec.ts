import { test, expect } from '@playwright/test'

test('ホームページでfeatured商品が表示される', async ({ page }) => {
  await page.goto('/')
  
  // ページタイトル確認
  await expect(page.locator('h1')).toContainText('ほか弁当')
  
  // FeaturedCarouselが表示されている
  await expect(page.locator('[aria-label="おすすめ商品"]')).toBeVisible()
  
  // おすすめ商品の要素が存在する
  const featuredSection = page.locator('[aria-label="おすすめ商品"]')
  await expect(featuredSection).toBeVisible()
  
  // 商品タイトルが表示されている（最初の商品）
  await expect(featuredSection.locator('h3').first()).toBeVisible()
  
  // 価格が表示されている
  await expect(featuredSection.locator('p').filter({ hasText: '¥' }).first()).toBeVisible()
  
  // タグが表示されている
  await expect(featuredSection.locator('span').filter({ hasText: /人気|限定|おすすめ/ }).first()).toBeVisible()
})