'use client'

import { useState, useEffect } from 'react'

interface RecommendedMenu {
  id: string
  name: string
  price: number
  image: string
  isNew?: boolean
  isRecommended?: boolean
}

interface HeaderProps {
  recommendedMenus?: RecommendedMenu[]
}

export default function Header({ recommendedMenus = [] }: HeaderProps) {
  const [currentMenuIndex, setCurrentMenuIndex] = useState(0)

  useEffect(() => {
    if (recommendedMenus.length > 0) {
      const interval = setInterval(() => {
        setCurrentMenuIndex((prev) => (prev + 1) % recommendedMenus.length)
      }, 4000)
      return () => clearInterval(interval)
    }
  }, [recommendedMenus.length])

  const currentMenu = recommendedMenus[currentMenuIndex]

  return (
    <header className="bg-gradient-to-r from-red-600 to-red-700 text-white shadow-lg">
      {/* メインヘッダー */}
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <h1 className="text-3xl font-bold text-white">ほか弁当</h1>
            <span className="text-sm bg-yellow-400 text-red-800 px-2 py-1 rounded-full font-semibold">
              毎日手作り
            </span>
          </div>
          
          <nav className="hidden md:flex space-x-6">
            <a href="/" className="hover:text-yellow-300 transition-colors">ホーム</a>
            <a href="/menu" className="hover:text-yellow-300 transition-colors">メニュー</a>
            <a href="/about" className="hover:text-yellow-300 transition-colors">店舗情報</a>
            <a href="/contact" className="hover:text-yellow-300 transition-colors">お問い合わせ</a>
          </nav>
        </div>
      </div>

      {/* おすすめメニューバナー */}
      {currentMenu && (
        <div className="bg-yellow-400 text-red-800 py-3">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-center space-x-4 animate-pulse">
              <span className="font-bold text-sm">🔥 本日のおすすめ</span>
              <div className="flex items-center space-x-2">
                <span className="font-bold text-lg">{currentMenu.name}</span>
                <span className="text-sm">¥{currentMenu.price.toLocaleString()}</span>
                {currentMenu.isNew && (
                  <span className="bg-red-600 text-white text-xs px-2 py-1 rounded">NEW</span>
                )}
                {currentMenu.isRecommended && (
                  <span className="bg-orange-500 text-white text-xs px-2 py-1 rounded">おすすめ</span>
                )}
              </div>
              <span className="text-sm">→ 詳細を見る</span>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}