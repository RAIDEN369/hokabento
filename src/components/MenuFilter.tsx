'use client'

import { useState, useMemo } from 'react'
import { MenuItem } from '@/lib/microcms'

interface MenuFilterProps {
  items: MenuItem[]
  onFilteredItemsChange: (items: MenuItem[]) => void
}

export default function MenuFilter({ items, onFilteredItemsChange }: MenuFilterProps) {
  const [selectedTags, setSelectedTags] = useState<string[]>([])
  const [priceRange, setPriceRange] = useState<'all' | 'low' | 'medium' | 'high'>('all')
  const [availableOnly, setAvailableOnly] = useState(false)

  // 全てのタグを抽出
  const allTags = useMemo(() => {
    const tagSet = new Set<string>()
    items.forEach(item => {
      if (item.tags) {
        item.tags.forEach(tag => tagSet.add(tag))
      }
    })
    return Array.from(tagSet).sort()
  }, [items])

  // フィルタリング処理
  const filteredItems = useMemo(() => {
    let filtered = items

    // 在庫フィルタ
    if (availableOnly) {
      filtered = filtered.filter(item => item.isAvailable)
    }

    // タグフィルタ
    if (selectedTags.length > 0) {
      filtered = filtered.filter(item => 
        item.tags && item.tags.some(tag => selectedTags.includes(tag))
      )
    }

    // 価格帯フィルタ
    switch (priceRange) {
      case 'low':
        filtered = filtered.filter(item => item.price < 500)
        break
      case 'medium':
        filtered = filtered.filter(item => item.price >= 500 && item.price < 1000)
        break
      case 'high':
        filtered = filtered.filter(item => item.price >= 1000)
        break
    }

    return filtered
  }, [items, selectedTags, priceRange, availableOnly])

  // フィルタ結果を親コンポーネントに通知
  useMemo(() => {
    onFilteredItemsChange(filteredItems)
  }, [filteredItems, onFilteredItemsChange])

  const handleTagToggle = (tag: string) => {
    setSelectedTags(prev => 
      prev.includes(tag) 
        ? prev.filter(t => t !== tag)
        : [...prev, tag]
    )
  }

  const clearFilters = () => {
    setSelectedTags([])
    setPriceRange('all')
    setAvailableOnly(false)
  }

  return (
    <div className="bg-gray-50 rounded-lg p-4 mb-6">
      <div className="flex flex-wrap items-center gap-4">
        <h3 className="font-semibold text-gray-800">絞り込み:</h3>

        {/* 在庫フィルタ */}
        <label className="flex items-center">
          <input
            type="checkbox"
            checked={availableOnly}
            onChange={(e) => setAvailableOnly(e.target.checked)}
            className="mr-2"
          />
          <span className="text-sm">在庫ありのみ</span>
        </label>

        {/* 価格帯フィルタ */}
        <select
          value={priceRange}
          onChange={(e) => setPriceRange(e.target.value as typeof priceRange)}
          className="border border-gray-300 rounded px-3 py-1 text-sm"
        >
          <option value="all">全ての価格</option>
          <option value="low">〜¥500</option>
          <option value="medium">¥500〜¥1000</option>
          <option value="high">¥1000〜</option>
        </select>

        {/* タグフィルタ */}
        {allTags.length > 0 && (
          <div className="flex flex-wrap gap-2">
            <span className="text-sm text-gray-600">タグ:</span>
            {allTags.map(tag => (
              <button
                key={tag}
                onClick={() => handleTagToggle(tag)}
                className={`px-2 py-1 rounded-full text-xs transition-colors ${
                  selectedTags.includes(tag)
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                {tag}
              </button>
            ))}
          </div>
        )}

        {/* クリアボタン */}
        {(selectedTags.length > 0 || priceRange !== 'all' || availableOnly) && (
          <button
            onClick={clearFilters}
            className="text-sm text-blue-600 hover:text-blue-800 underline"
          >
            フィルタをクリア
          </button>
        )}
      </div>

      {/* フィルタ結果表示 */}
      <div className="mt-2 text-sm text-gray-600">
        {filteredItems.length}件の商品が見つかりました
      </div>
    </div>
  )
}