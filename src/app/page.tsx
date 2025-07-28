import FeaturedCarousel from '@/components/FeaturedCarousel'
import { mockFeaturedItems } from '@/lib/mockData'

export const revalidate = 60

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      {/* ヘッダーエリア */}
      <header className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <h1 className="text-2xl font-bold text-gray-800">ほか弁当</h1>
        </div>
      </header>

      {/* メインコンテンツ */}
      <main id="main-content" className="container mx-auto px-4 py-8">
        {/* FeaturedCarousel */}
        <section className="mb-12">
          <FeaturedCarousel items={mockFeaturedItems} />
        </section>

        {/* その他のコンテンツ */}
        <section className="text-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">
            美味しいお弁当をお届けします
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            毎日手作りの温かいお弁当と定食を提供しています。
            新鮮な食材を使用し、心を込めて調理いたします。
          </p>
        </section>
      </main>
    </div>
  )
}
