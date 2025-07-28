'use client'

import { useState, useMemo } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { mockCategories, mockMenuItems } from '@/lib/mockData'
import MenuFilter from '@/components/MenuFilter'
import { MenuItem } from '@/lib/microcms'

interface CategoryPageProps {
  params: {
    category: string
  }
}

const ITEMS_PER_PAGE = 12

export default function CategoryPage({ params }: CategoryPageProps) {
  const [currentPage, setCurrentPage] = useState(1)
  const [filteredItems, setFilteredItems] = useState<MenuItem[]>([])

  // カテゴリ情報を取得
  const category = mockCategories.find(cat => cat.slug === params.category)
  
  // カテゴリの商品を取得
  const categoryItems = useMemo(() => {
    return mockMenuItems.filter(item => item.category.slug === params.category)
  }, [params.category])

  // ページネーション処理
  const totalPages = Math.ceil(filteredItems.length / ITEMS_PER_PAGE)
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE
  const currentItems = filteredItems.slice(startIndex, startIndex + ITEMS_PER_PAGE)

  // ページ変更時の処理
  const handlePageChange = (page: number) => {
    setCurrentPage(page)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  // フィルタ変更時の処理
  const handleFilteredItemsChange = (items: MenuItem[]) => {
    setFilteredItems(items)
    setCurrentPage(1) // フィルタ変更時は1ページ目に戻る
  }

  if (!category) {
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
            <h1 className="text-2xl font-bold text-gray-800 mb-4">カテゴリが見つかりません</h1>
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
            <span className="text-gray-800">{category.name}</span>
          </div>
        </nav>

        {/* タイトル */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">{category.name}</h1>
          <p className="text-gray-600">{category.name}の商品一覧です</p>
        </div>

        {/* フィルタ */}
        <MenuFilter 
          items={categoryItems} 
          onFilteredItemsChange={handleFilteredItemsChange}
        />

        {/* 商品一覧 */}
        {currentItems.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
            {currentItems.map((item) => (
              <Link
                key={item.id}
                href={`/item/${item.slug}`}
                className="group bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-all hover:border-gray-300"
              >
                <div className="relative aspect-[4/3]">
                  <Image
                    src={item.image.url}
                    alt={item.title}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  {!item.isAvailable && (
                    <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                      <span className="bg-red-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                        売り切れ
                      </span>
                    </div>
                  )}
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-gray-800 mb-2 group-hover:text-gray-600">
                    {item.title}
                  </h3>
                  <p className="text-2xl font-bold text-gray-800 mb-2">
                    ¥{item.price.toLocaleString()}
                  </p>
                  {item.tags && item.tags.length > 0 && (
                    <div className="flex flex-wrap gap-1">
                      {item.tags.slice(0, 2).map((tag, index) => (
                        <span
                          key={index}
                          className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">条件に一致する商品が見つかりませんでした</p>
          </div>
        )}

        {/* ページネーション */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center space-x-2">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="px-3 py-2 rounded border border-gray-300 text-gray-600 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              前へ
            </button>
            
            {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
              <button
                key={page}
                onClick={() => handlePageChange(page)}
                className={`px-3 py-2 rounded border ${
                  currentPage === page
                    ? 'bg-blue-500 text-white border-blue-500'
                    : 'border-gray-300 text-gray-600 hover:bg-gray-50'
                }`}
              >
                {page}
              </button>
            ))}
            
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="px-3 py-2 rounded border border-gray-300 text-gray-600 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              次へ
            </button>
          </div>
        )}
      </main>
    </div>
  )
}