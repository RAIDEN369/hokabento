import Link from 'next/link'
import Image from 'next/image'
import { mockCategories, mockFeaturedItems, mockRecentItems } from '@/lib/mockData'

export const revalidate = 60

export default function MenuPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* ヘッダー */}
      <header className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <Link href="/" className="text-2xl font-bold text-gray-800 hover:text-gray-600">
            ほか弁当
          </Link>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">メニュー</h1>

        {/* ショートカットセクション */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">ピックアップ</h2>
          <div className="grid md:grid-cols-2 gap-8">
            {/* おすすめ商品 */}
            <div className="bg-gradient-to-r from-orange-50 to-orange-100 rounded-lg p-6">
              <h3 className="text-xl font-bold text-orange-800 mb-4 flex items-center">
                <svg className="w-6 h-6 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                おすすめ商品
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {mockFeaturedItems.slice(0, 3).map((item) => (
                  <Link
                    key={item.id}
                    href={`/item/${item.slug}`}
                    className="bg-white rounded-lg p-3 shadow-sm hover:shadow-md transition-shadow"
                  >
                    <div className="relative aspect-[4/3] mb-2">
                      <Image
                        src={item.image.url}
                        alt={item.title}
                        fill
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        className="object-cover rounded"
                      />
                    </div>
                    <h4 className="font-semibold text-sm mb-1">{item.title}</h4>
                    <p className="text-orange-600 font-bold">¥{item.price.toLocaleString()}</p>
                  </Link>
                ))}
              </div>
            </div>

            {/* 新着商品 */}
            <div className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg p-6">
              <h3 className="text-xl font-bold text-blue-800 mb-4 flex items-center">
                <svg className="w-6 h-6 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.293l-3-3a1 1 0 00-1.414 0l-3 3a1 1 0 001.414 1.414L9 9.414V13a1 1 0 102 0V9.414l1.293 1.293a1 1 0 001.414-1.414z" clipRule="evenodd" />
                </svg>
                新着商品
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {mockRecentItems.map((item) => (
                  <Link
                    key={item.id}
                    href={`/item/${item.slug}`}
                    className="bg-white rounded-lg p-3 shadow-sm hover:shadow-md transition-shadow"
                  >
                    <div className="relative aspect-[4/3] mb-2">
                      <Image
                        src={item.image.url}
                        alt={item.title}
                        fill
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        className="object-cover rounded"
                      />
                    </div>
                    <h4 className="font-semibold text-sm mb-1">{item.title}</h4>
                    <p className="text-blue-600 font-bold">¥{item.price.toLocaleString()}</p>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* カテゴリ一覧 */}
        <section>
          <h2 className="text-2xl font-bold text-gray-800 mb-6">カテゴリから選ぶ</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {mockCategories.map((category) => (
              <Link
                key={category.id}
                href={`/menu/${category.slug}`}
                className="group bg-white border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-all hover:border-gray-300"
              >
                <div className="text-center">
                  <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center group-hover:bg-gray-200 transition-colors">
                    <svg className="w-8 h-8 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v6a2 2 0 002 2h6a2 2 0 002-2V9a2 2 0 00-2-2h-2m-6 6h6m-6-4h6" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-800 group-hover:text-gray-600">
                    {category.name}
                  </h3>
                  <p className="text-sm text-gray-500 mt-2">
                    {category.name}の商品一覧を見る
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </section>
      </main>
    </div>
  )
}