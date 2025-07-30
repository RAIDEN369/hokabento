'use client'

import { useState } from 'react'
import MenuAdmin from '@/components/MenuAdmin'
import Header from '@/components/Header'
import { defaultMenuItems, MenuItem } from '@/lib/menuData'

export default function AdminPage() {
  const [menus, setMenus] = useState<MenuItem[]>(defaultMenuItems)
  const [password, setPassword] = useState('')
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    // 簡単な認証（実際の運用では適切な認証システムを使用）
    if (password === 'hokabento2024') {
      setIsAuthenticated(true)
    } else {
      alert('パスワードが間違っています')
    }
  }

  const handleSaveMenus = (updatedMenus: MenuItem[]) => {
    setMenus(updatedMenus)
    // 実際の運用では、ここでデータベースやAPIに保存
    localStorage.setItem('hokabento-menus', JSON.stringify(updatedMenus))
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
          <h1 className="text-2xl font-bold text-red-700 mb-6 text-center">管理者ログイン</h1>
          <form onSubmit={handleLogin}>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">パスワード</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
                placeholder="管理者パスワードを入力"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full bg-red-600 text-white py-2 rounded hover:bg-red-700 transition-colors"
            >
              ログイン
            </button>
          </form>
          <p className="text-sm text-gray-600 mt-4 text-center">
            デモ用パスワード: hokabento2024
          </p>
        </div>
      </div>
    )
  }

  const recommendedMenus = menus.filter(menu => menu.isRecommended || menu.isNew)

  return (
    <div className="min-h-screen bg-gray-50">
      <Header recommendedMenus={recommendedMenus} />
      
      <main className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-red-700">管理者ページ</h1>
          <p className="text-gray-600 mt-2">
            メニューの追加・編集・削除ができます。おすすめメニューの設定も可能です。
          </p>
        </div>
        
        <MenuAdmin 
          initialMenus={menus}
          onSave={handleSaveMenus}
        />
        
        {/* プレビューセクション */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold text-red-700 mb-6">ヘッダープレビュー</h2>
          <div className="bg-white rounded-lg shadow-md p-4">
            <p className="text-gray-600 mb-4">
              現在のおすすめメニューがヘッダーに表示される様子:
            </p>
            <Header recommendedMenus={recommendedMenus} />
          </div>
        </div>
        
        <div className="mt-8 text-center">
          <button
            onClick={() => setIsAuthenticated(false)}
            className="bg-gray-600 text-white px-6 py-2 rounded hover:bg-gray-700"
          >
            ログアウト
          </button>
        </div>
      </main>
    </div>
  )
}