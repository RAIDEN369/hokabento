import { MetadataRoute } from 'next'
import { mockCategories, mockMenuItems } from '@/lib/mockData'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://hokabento.com'
  const now = new Date()

  // 静的ページ
  const staticPages = [
    {
      url: baseUrl,
      lastModified: now,
      changeFrequency: 'daily' as const,
      priority: 1.0,
    },
    {
      url: `${baseUrl}/menu`,
      lastModified: now,
      changeFrequency: 'daily' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: now,
      changeFrequency: 'monthly' as const,
      priority: 0.5,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: now,
      changeFrequency: 'monthly' as const,
      priority: 0.5,
    },
  ]

  // カテゴリページ
  const categoryPages = mockCategories.map((category) => ({
    url: `${baseUrl}/menu/${category.slug}`,
    lastModified: now,
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }))

  // 商品ページ
  const itemPages = mockMenuItems.map((item) => ({
    url: `${baseUrl}/item/${item.slug}`,
    lastModified: new Date(item.updatedAt),
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }))

  return [...staticPages, ...categoryPages, ...itemPages]
}