import Link from 'next/link'
import Image from 'next/image'
import { mockMenuItems } from '@/lib/mockData'

export const revalidate = 60

interface ItemPageProps {
  params: {
    slug: string
  }
}

export default function ItemPage({ params }: ItemPageProps) {
  // 商品情報を取得
  const item = mockMenuItems.find(item => item.slug === params.slug)

  if (!item) {
    return (
      <div className="min-h-screen bg-white">
        <header className="bg-white shadow-sm">
          <div className="container mx-auto px-4 py-4">
            <Link href="/" className="text-2xl font-bold text-gray-800 hover:text-gray-600">
              ほか弁当
            </Link>
          </div>
        </header>
        <main className="container mx-auto px-4 py-8">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-800 mb-4">商品が見つかりません</h1>
            <Link href="/menu" className="text-blue-600 hover:text-blue-800 underline">
              メニュー一覧に戻る
            </Link>
          </div>
        </main>
      </div>
    )
  }

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
        {/* ブレッドクラム */}
        <nav className="text-sm breadcrumbs mb-6">
          <div className="flex items-center space-x-2 text-gray-500">
            <Link href="/" className="hover:text-gray-700">ホーム</Link>
            <span>/</span>
            <Link href="/menu" className="hover:text-gray-700">メニュー</Link>
            <span>/</span>
            <Link 
              href={`/menu/${item.category.slug}`} 
              className="hover:text-gray-700"
            >
              {item.category.name}
            </Link>
            <span>/</span>
            <span className="text-gray-800">{item.title}</span>
          </div>
        </nav>

        {/* 商品詳細 */}
        <div className="grid lg:grid-cols-2 gap-8 mb-8">
          {/* 商品画像 */}
          <div className="relative aspect-square rounded-lg overflow-hidden bg-gray-100">
            <Image
              src={item.image.url}
              alt={item.title}
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
              priority
            />
            {!item.isAvailable && (
              <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                <span className="bg-red-500 text-white px-4 py-2 rounded-full text-lg font-semibold">
                  売り切れ
                </span>
              </div>
            )}
          </div>

          {/* 商品情報 */}
          <div className="flex flex-col">
            <div className="mb-4">
              <Link 
                href={`/menu/${item.category.slug}`}
                className="inline-block bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm hover:bg-gray-200 transition-colors mb-4"
              >
                {item.category.name}
              </Link>
              <h1 className="text-3xl font-bold text-gray-800 mb-4">{item.title}</h1>
              <div className="flex items-center gap-4 mb-6">
                <span className="text-4xl font-bold text-gray-800">
                  ¥{item.price.toLocaleString()}
                </span>
                <div className={`px-3 py-1 rounded-full text-sm font-semibold ${
                  item.isAvailable 
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-red-100 text-red-800'
                }`}>
                  {item.isAvailable ? '在庫あり' : '売り切れ'}
                </div>
              </div>
            </div>

            {/* タグ */}
            {item.tags && item.tags.length > 0 && (
              <div className="mb-6">
                <h3 className="text-sm font-semibold text-gray-600 mb-2">タグ</h3>
                <div className="flex flex-wrap gap-2">
                  {item.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* 商品説明 */}
            {item.description && (
              <div className="mb-8">
                <h3 className="text-lg font-semibold text-gray-800 mb-3">商品説明</h3>
                <p className="text-gray-600 leading-relaxed">{item.description}</p>
              </div>
            )}

            {/* アクションボタン */}
            <div className="mt-auto">
              <Link
                href={`/menu/${item.category.slug}`}
                className="inline-flex items-center justify-center w-full bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors font-semibold"
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                {item.category.name}の他の商品を見る
              </Link>
            </div>
          </div>
        </div>

        {/* 関連商品 */}
        <section>
          <h2 className="text-2xl font-bold text-gray-800 mb-6">同じカテゴリの商品</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {mockMenuItems
              .filter(relatedItem => 
                relatedItem.category.slug === item.category.slug && 
                relatedItem.id !== item.id
              )
              .slice(0, 4)
              .map((relatedItem) => (
                <Link
                  key={relatedItem.id}
                  href={`/item/${relatedItem.slug}`}
                  className="group bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-all hover:border-gray-300"
                >
                  <div className="relative aspect-[4/3]">
                    <Image
                      src={relatedItem.image.url}
                      alt={relatedItem.title}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    {!relatedItem.isAvailable && (
                      <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                        <span className="bg-red-500 text-white px-2 py-1 rounded text-xs font-semibold">
                          売り切れ
                        </span>
                      </div>
                    )}
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold text-gray-800 mb-2 group-hover:text-gray-600">
                      {relatedItem.title}
                    </h3>
                    <p className="text-lg font-bold text-gray-800">
                      ¥{relatedItem.price.toLocaleString()}
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