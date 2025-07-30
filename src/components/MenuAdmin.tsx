'use client'

import { useState, useEffect } from 'react'
import { MenuItem } from '@/lib/menuData'

interface MenuAdminProps {
  onSave: (menus: MenuItem[]) => void
  initialMenus: MenuItem[]
}

export default function MenuAdmin({ onSave, initialMenus }: MenuAdminProps) {
  const [menus, setMenus] = useState<MenuItem[]>(initialMenus)
  const [editingMenu, setEditingMenu] = useState<MenuItem | null>(null)
  const [isAdding, setIsAdding] = useState(false)

  const categories = [
    { value: 'bento', label: 'お弁当' },
    { value: 'teishoku', label: '定食' },
    { value: 'don', label: '丼物' },
    { value: 'side', label: 'サイドメニュー' }
  ]

  const handleSave = (menu: MenuItem) => {
    if (editingMenu) {
      setMenus(menus.map(m => m.id === menu.id ? menu : m))
    } else {
      setMenus([...menus, { ...menu, id: Date.now().toString() }])
    }
    setEditingMenu(null)
    setIsAdding(false)
  }

  const handleDelete = (id: string) => {
    if (confirm('このメニューを削除しますか？')) {
      setMenus(menus.filter(m => m.id !== id))
    }
  }

  const toggleFlag = (id: string, flag: 'isNew' | 'isRecommended' | 'isPopular') => {
    setMenus(menus.map(m => 
      m.id === id ? { ...m, [flag]: !m[flag] } : m
    ))
  }

  useEffect(() => {
    onSave(menus)
  }, [menus, onSave])

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-red-700">メニュー管理</h2>
        <button 
          onClick={() => setIsAdding(true)}
          className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
        >
          新しいメニューを追加
        </button>
      </div>

      {/* メニューリスト */}
      <div className="grid gap-4">
        {menus.map((menu) => (
          <div key={menu.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
            <div className="flex justify-between items-start">
              <div className="flex-1">
                <div className="flex items-center space-x-2 mb-2">
                  <h3 className="text-lg font-semibold">{menu.name}</h3>
                  <span className="text-red-600 font-bold">¥{menu.price.toLocaleString()}</span>
                  {menu.isNew && <span className="bg-red-600 text-white text-xs px-2 py-1 rounded">NEW</span>}
                  {menu.isRecommended && <span className="bg-orange-500 text-white text-xs px-2 py-1 rounded">おすすめ</span>}
                  {menu.isPopular && <span className="bg-blue-500 text-white text-xs px-2 py-1 rounded">人気</span>}
                </div>
                <p className="text-gray-600 mb-2">{menu.description}</p>
                <span className="text-sm text-gray-500">
                  カテゴリ: {categories.find(c => c.value === menu.category)?.label}
                </span>
              </div>
              <div className="flex space-x-2 ml-4">
                <button
                  onClick={() => toggleFlag(menu.id, 'isNew')}
                  className={`text-xs px-2 py-1 rounded ${menu.isNew ? 'bg-red-600 text-white' : 'bg-gray-200'}`}
                >
                  NEW
                </button>
                <button
                  onClick={() => toggleFlag(menu.id, 'isRecommended')}
                  className={`text-xs px-2 py-1 rounded ${menu.isRecommended ? 'bg-orange-500 text-white' : 'bg-gray-200'}`}
                >
                  おすすめ
                </button>
                <button
                  onClick={() => toggleFlag(menu.id, 'isPopular')}
                  className={`text-xs px-2 py-1 rounded ${menu.isPopular ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
                >
                  人気
                </button>
                <button
                  onClick={() => setEditingMenu(menu)}
                  className="bg-blue-600 text-white px-3 py-1 rounded text-sm hover:bg-blue-700"
                >
                  編集
                </button>
                <button
                  onClick={() => handleDelete(menu.id)}
                  className="bg-red-600 text-white px-3 py-1 rounded text-sm hover:bg-red-700"
                >
                  削除
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* メニュー編集/追加フォーム */}
      {(editingMenu || isAdding) && (
        <MenuForm
          menu={editingMenu}
          categories={categories}
          onSave={handleSave}
          onCancel={() => {
            setEditingMenu(null)
            setIsAdding(false)
          }}
        />
      )}
    </div>
  )
}

interface MenuFormProps {
  menu: MenuItem | null
  categories: { value: string; label: string }[]
  onSave: (menu: MenuItem) => void
  onCancel: () => void
}

function MenuForm({ menu, categories, onSave, onCancel }: MenuFormProps) {
  const [formData, setFormData] = useState<Omit<MenuItem, 'id'>>({
    name: menu?.name || '',
    price: menu?.price || 0,
    description: menu?.description || '',
    category: menu?.category || 'bento',
    image: menu?.image || '/images/placeholder.jpg',
    isNew: menu?.isNew || false,
    isRecommended: menu?.isRecommended || false,
    isPopular: menu?.isPopular || false
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSave({
      ...formData,
      id: menu?.id || Date.now().toString()
    })
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <h3 className="text-xl font-bold mb-4">
          {menu ? 'メニューを編集' : '新しいメニューを追加'}
        </h3>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">メニュー名</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
              className="w-full border rounded px-3 py-2"
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-1">価格</label>
            <input
              type="number"
              value={formData.price}
              onChange={(e) => setFormData({...formData, price: parseInt(e.target.value)})}
              className="w-full border rounded px-3 py-2"
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-1">説明</label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({...formData, description: e.target.value})}
              className="w-full border rounded px-3 py-2"
              rows={3}
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-1">カテゴリ</label>
            <select
              value={formData.category}
              onChange={(e) => setFormData({...formData, category: e.target.value as 'bento' | 'teishoku' | 'don' | 'side'})}
              className="w-full border rounded px-3 py-2"
            >
              {categories.map((cat) => (
                <option key={cat.value} value={cat.value}>{cat.label}</option>
              ))}
            </select>
          </div>
          
          <div className="flex space-x-4">
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={formData.isNew}
                onChange={(e) => setFormData({...formData, isNew: e.target.checked})}
                className="mr-2"
              />
              NEW
            </label>
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={formData.isRecommended}
                onChange={(e) => setFormData({...formData, isRecommended: e.target.checked})}
                className="mr-2"
              />
              おすすめ
            </label>
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={formData.isPopular}
                onChange={(e) => setFormData({...formData, isPopular: e.target.checked})}
                className="mr-2"
              />
              人気
            </label>
          </div>
          
          <div className="flex justify-end space-x-2 pt-4">
            <button
              type="button"
              onClick={onCancel}
              className="px-4 py-2 border rounded hover:bg-gray-50"
            >
              キャンセル
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
            >
              保存
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}