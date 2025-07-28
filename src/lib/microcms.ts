import { createClient } from 'microcms-js-sdk'
import { z } from 'zod'

// 環境変数の検証
if (!process.env.MICROCMS_SERVICE_DOMAIN) {
  throw new Error('MICROCMS_SERVICE_DOMAIN is required')
}
if (!process.env.MICROCMS_API_KEY) {
  throw new Error('MICROCMS_API_KEY is required')
}

// microCMS クライアント初期化
export const client = createClient({
  serviceDomain: process.env.MICROCMS_SERVICE_DOMAIN,
  apiKey: process.env.MICROCMS_API_KEY,
})

// Zod スキーマ定義
export const MenuCategorySchema = z.object({
  id: z.string(),
  createdAt: z.string(),
  updatedAt: z.string(),
  publishedAt: z.string().optional(),
  revisedAt: z.string().optional(),
  name: z.string(),
  slug: z.string(),
  order: z.number(),
})

export const MenuItemSchema = z.object({
  id: z.string(),
  createdAt: z.string(),
  updatedAt: z.string(),
  publishedAt: z.string().optional(),
  revisedAt: z.string().optional(),
  title: z.string(),
  slug: z.string(),
  price: z.number(),
  description: z.string().optional(),
  image: z.object({
    url: z.string(),
    height: z.number(),
    width: z.number(),
  }),
  category: MenuCategorySchema,
  tags: z.array(z.string()).optional(),
  isFeatured: z.boolean().optional().default(false),
  featureStart: z.string().optional(),
  featureEnd: z.string().optional(),
  isAvailable: z.boolean().default(true),
})

export const SiteSettingsSchema = z.object({
  id: z.string(),
  createdAt: z.string(),
  updatedAt: z.string(),
  publishedAt: z.string().optional(),
  revisedAt: z.string().optional(),
  brandColor: z.string(),
  heroNote: z.string().optional(),
})

// 型定義
export type MenuCategory = z.infer<typeof MenuCategorySchema>
export type MenuItem = z.infer<typeof MenuItemSchema>
export type SiteSettings = z.infer<typeof SiteSettingsSchema>

// API レスポンス型
export type MenuCategoryListResponse = {
  contents: MenuCategory[]
  totalCount: number
  offset: number
  limit: number
}

export type MenuItemListResponse = {
  contents: MenuItem[]
  totalCount: number
  offset: number
  limit: number
}

// 型安全な fetcher 関数
export const getMenuCategories = async (): Promise<MenuCategoryListResponse> => {
  const response = await client.get({
    endpoint: 'menu_category',
    queries: { orders: 'order' },
  })
  
  return {
    ...response,
    contents: response.contents.map((item: unknown) => MenuCategorySchema.parse(item)),
  }
}

export const getMenuItems = async (queries?: {
  limit?: number
  offset?: number
  filters?: string
}): Promise<MenuItemListResponse> => {
  const response = await client.get({
    endpoint: 'menu_item',
    queries: {
      ...queries,
      orders: '-publishedAt',
    },
  })
  
  return {
    ...response,
    contents: response.contents.map((item: unknown) => MenuItemSchema.parse(item)),
  }
}

export const getMenuItemBySlug = async (slug: string): Promise<MenuItem> => {
  const response = await client.get({
    endpoint: 'menu_item',
    queries: { filters: `slug[equals]${slug}` },
  })
  
  if (response.contents.length === 0) {
    throw new Error(`Menu item with slug "${slug}" not found`)
  }
  
  return MenuItemSchema.parse(response.contents[0])
}

export const getMenuItemsByCategory = async (categorySlug: string): Promise<MenuItemListResponse> => {
  const response = await client.get({
    endpoint: 'menu_item',
    queries: {
      filters: `category.slug[equals]${categorySlug}`,
      orders: '-publishedAt',
    },
  })
  
  return {
    ...response,
    contents: response.contents.map((item: unknown) => MenuItemSchema.parse(item)),
  }
}

export const getFeaturedMenuItems = async (): Promise<MenuItem[]> => {
  const now = new Date().toISOString()
  
  // まず期間指定のおすすめ商品を取得
  const featuredWithDateResponse = await client.get({
    endpoint: 'menu_item',
    queries: {
      filters: `isFeatured[equals]true[and]featureStart[less_than]${now}[and]featureEnd[greater_than]${now}`,
      orders: '-publishedAt',
      limit: 10,
    },
  })
  
  // 期間指定のおすすめが不足している場合は、期間指定なしのおすすめも取得
  if (featuredWithDateResponse.contents.length < 3) {
    const featuredResponse = await client.get({
      endpoint: 'menu_item',
      queries: {
        filters: 'isFeatured[equals]true',
        orders: '-publishedAt',
        limit: 10,
      },
    })
    
    return featuredResponse.contents.map((item: unknown) => MenuItemSchema.parse(item))
  }
  
  return featuredWithDateResponse.contents.map((item: unknown) => MenuItemSchema.parse(item))
}

export const getSiteSettings = async (): Promise<SiteSettings> => {
  const response = await client.getObject({
    endpoint: 'site_settings',
  })
  
  return SiteSettingsSchema.parse(response)
}