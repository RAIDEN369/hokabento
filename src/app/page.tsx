import Header from '@/components/Header'
import { getRecommendedMenus, getPopularMenus } from '@/lib/menuData'

export const revalidate = 60

export default function Home() {
  const recommendedMenus = getRecommendedMenus()
  const popularMenus = getPopularMenus()

  return (
    <div className="min-h-screen bg-gray-50">
      <Header recommendedMenus={recommendedMenus} />

      {/* メインコンテンツ */}
      <main id="main-content" className="container mx-auto px-4 py-8">
        {/* ヒーローセクション */}
        <section className="mb-12 text-center bg-white rounded-lg shadow-md p-8">
          <h2 className="text-4xl font-bold text-red-700 mb-4">
            🍱 ほっかほかの美味しいお弁当 🍱
          </h2>
          <p className="text-gray-600 text-lg max-w-3xl mx-auto mb-6">
            毎日手作りの温かいお弁当と定食を提供しています。<br />
            新鮮な食材を使用し、心を込めて調理いたします。
          </p>
          <div className="flex justify-center space-x-4">
            <a href="/menu" className="bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700 transition-colors font-semibold">
              メニューを見る
            </a>
            <a href="/contact" className="bg-yellow-500 text-red-800 px-6 py-3 rounded-lg hover:bg-yellow-600 transition-colors font-semibold">
              お問い合わせ
            </a>
          </div>
        </section>

        {/* 人気メニュー */}
        <section className="mb-12">
          <h3 className="text-2xl font-bold text-red-700 mb-6 text-center">🔥 人気メニュー</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {popularMenus.map((menu) => (
              <div key={menu.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                <div className="h-48 bg-gray-200 flex items-center justify-center">
                  <span className="text-gray-500">画像準備中</span>
                </div>
                <div className="p-4">
                  <h4 className="font-bold text-lg mb-2">{menu.name}</h4>
                  <p className="text-gray-600 text-sm mb-2">{menu.description}</p>
                  <div className="flex justify-between items-center">
                    <span className="text-xl font-bold text-red-600">¥{menu.price.toLocaleString()}</span>
                    {menu.isPopular && (
                      <span className="bg-orange-500 text-white text-xs px-2 py-1 rounded">人気</span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 特徴セクション */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <div className="text-4xl mb-4">🍚</div>
            <h4 className="text-xl font-bold mb-2 text-red-700">毎日手作り</h4>
            <p className="text-gray-600">新鮮な食材を使用し、毎日心を込めて手作りしています。</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <div className="text-4xl mb-4">🚚</div>
            <h4 className="text-xl font-bold mb-2 text-red-700">配達対応</h4>
            <p className="text-gray-600">ご注文いただければ、温かいお弁当をお届けします。</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <div className="text-4xl mb-4">💰</div>
            <h4 className="text-xl font-bold mb-2 text-red-700">リーズナブル</h4>
            <p className="text-gray-600">美味しくて栄養バランスの良いお弁当をお手頃価格で。</p>
          </div>
        </section>
      </main>
    </div>
  )
}
