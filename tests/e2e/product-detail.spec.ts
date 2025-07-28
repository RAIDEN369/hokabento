import { test, expect } from '@playwright/test'

test('商品詳細ページでタイトルと価格が表示される', async ({ page }) => {
  // 特製唐揚げ弁当の詳細ページに直接アクセス
  await page.goto('/item/karaage-bento')
  
  // 商品タイトルが表示されている
  await expect(page.locator('h1')).toContainText('特製唐揚げ弁当')
  
  // 価格が表示されている（¥850）
  await expect(page.locator('text=¥850')).toBeVisible()
  
  // 在庫状況が表示されている
  await expect(page.locator('text=在庫あり')).toBeVisible()
  
  // 商品説明が表示されている
  await expect(page.locator('text=商品説明')).toBeVisible()
  await expect(page.locator('text=秘伝のタレに漬け込んだ')).toBeVisible()
  
  // カテゴリリンクが正しい（最初のもののみ）
  await expect(page.locator('a[href="/menu/bento"]').first()).toContainText('弁当')
  
  // ブレッドクラムが正しい
  await expect(page.locator('nav').filter({ hasText: 'ホーム' })).toBeVisible()
  await expect(page.locator('nav').filter({ hasText: 'メニュー' })).toBeVisible()
  await expect(page.locator('nav').filter({ hasText: '弁当' })).toBeVisible()
  await expect(page.locator('nav').filter({ hasText: '特製唐揚げ弁当' })).toBeVisible()
  
  // 「他の商品を見る」ボタンが表示されている
  await expect(page.locator('text=弁当の他の商品を見る')).toBeVisible()
  
  // 関連商品セクションが表示されている
  await expect(page.locator('text=同じカテゴリの商品')).toBeVisible()
})