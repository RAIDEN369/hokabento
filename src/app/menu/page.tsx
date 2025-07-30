import Link from 'next/link'
import Header from '@/components/Header'
import { getRecommendedMenus, getMenusByCategory } from '@/lib/menuData'

export const revalidate = 60

export default function MenuPage() {
  const recommendedMenus = getRecommendedMenus()
  const bentoMenus = getMenusByCategory('bento')
  const teishokuMenus = getMenusByCategory('teishoku')
  const donMenus = getMenusByCategory('don')
  const sideMenus = getMenusByCategory('side')

  const categories = [
    { id: 'bento', name: 'お弁当', items: bentoMenus, color: 'from-red-50 to-red-100', textColor: 'text-red-800' },
    { id: 'teishoku', name: '定食', items: teishokuMenus, color: 'from-blue-50 to-blue-100', textColor: 'text-blue-800' },
    { id: 'don', name: '丼物', items: donMenus, color: 'from-green-50 to-green-100', textColor: 'text-green-800' },
    { id: 'side', name: 'サイドメニュー', items: sideMenus, color: 'from-yellow-50 to-yellow-100', textColor: 'text-yellow-800' }
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      <Header recommendedMenus={recommendedMenus} />

      <main className="container mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-red-700 mb-4">🍱 メニュー一覧</h1>
          <p className="text-gray-600 text-lg">毎日手作りの美味しいお弁当と定食をご用意しています</p>
        </div>

        {/* おすすめメニュー */}
        {recommendedMenus.length > 0 && (
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-red-700 mb-6 flex items-center">
              <span className="mr-2">🔥</span>
              おすすめメニュー
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {recommendedMenus.map((menu) => (
                <div key={menu.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="h-48 bg-gradient-to-br from-red-100 to-red-200 flex items-center justify-center">
                    <span className="text-gray-500">🍱 {menu.name}</span>
                  </div>
                  <div className="p-4">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-bold text-lg">{menu.name}</h3>
                      <div className="flex space-x-1">
                        {menu.isNew && (
                          <span className="bg-red-600 text-white text-xs px-2 py-1 rounded">NEW</span>
                        )}
                        {menu.isRecommended && (
                          <span className="bg-orange-500 text-white text-xs px-2 py-1 rounded">おすすめ</span>
                        )}
                      </div>
                    </div>
                    <p className="text-gray-600 text-sm mb-3">{menu.description}</p>
                    <div className="flex justify-between items-center">
                      <span className="text-2xl font-bold text-red-600">¥{menu.price.toLocaleString()}</span>
                      <button className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition-colors">
                        詳細
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* カテゴリ別メニュー */}
        {categories.map((category) => (
          category.items.length > 0 && (
            <section key={category.id} className="mb-12">
              <div className={`bg-gradient-to-r ${category.color} rounded-lg p-6 mb-6`}>
                <h2 className={`text-2xl font-bold ${category.textColor} mb-2`}>
                  {category.name}
                </h2>
                <p className="text-gray-600">
                  {category.name}の豊富なメニューからお選びください
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {category.items.map((menu) => (
                  <div key={menu.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                    <div className="h-40 bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
                      <span className="text-gray-500">🍱 {menu.name}</span>
                    </div>
                    <div className="p-4">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="font-bold">{menu.name}</h3>
                        <div className="flex space-x-1">
                          {menu.isNew && (
                            <span className="bg-red-600 text-white text-xs px-2 py-1 rounded">NEW</span>
                          )}
                          {menu.isPopular && (
                            <span className="bg-blue-500 text-white text-xs px-2 py-1 rounded">人気</span>
                          )}
                        </div>
                      </div>
                      <p className="text-gray-600 text-sm mb-3">{menu.description}</p>
                      <div className="flex justify-between items-center">
                        <span className="text-xl font-bold text-red-600">¥{menu.price.toLocaleString()}</span>
                        <button className="bg-red-600 text-white px-3 py-1 rounded text-sm hover:bg-red-700">
                          詳細
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )
        ))}
        
        {/* 管理者リンク */}
        <div className="text-center mt-12">
          <Link 
            href="/admin" 
            className="inline-block bg-gray-600 text-white px-6 py-2 rounded hover:bg-gray-700 transition-colors"
          >
            管理者ページ
          </Link>
        </div>
      </main>
    </div>
  )
}