import { test, expect } from '@playwright/test'

test('カテゴリページが200ステータスで表示される', async ({ page }) => {
  // 弁当カテゴリページに直接アクセス
  const response = await page.goto('/menu/bento')
  
  // ステータスコード200確認
  expect(response?.status()).toBe(200)
  
  // ページが正しく表示されている
  await expect(page.locator('h1')).toContainText('弁当')
  
  // ブレッドクラムが正しい
  await expect(page.locator('nav').filter({ hasText: 'ホーム' })).toBeVisible()
  await expect(page.locator('nav').filter({ hasText: 'メニュー' })).toBeVisible()
  await expect(page.locator('nav').filter({ hasText: '弁当' })).toBeVisible()
  
  // フィルター機能が表示されている
  await expect(page.locator('text=絞り込み')).toBeVisible()
  
  // 商品一覧が表示されている（弁当カテゴリの商品）
  const productCards = page.locator('a[href*="/item/"]')
  await expect(productCards.first()).toBeVisible()
  
  // 商品カードに価格が表示されている（商品カード内の価格要素）
  await expect(page.locator('a[href*="/item/"] p').filter({ hasText: '¥' }).first()).toBeVisible()
})