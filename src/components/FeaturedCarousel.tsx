'use client'

import { useState, useEffect, useCallback } from 'react'
import Image from 'next/image'
import { MenuItem } from '@/lib/microcms'

interface FeaturedCarouselProps {
  items: MenuItem[]
}

export default function FeaturedCarousel({ items }: FeaturedCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isHovered, setIsHovered] = useState(false)
  const [loadedImages, setLoadedImages] = useState(new Set<string>())
  
  // JST現在日時でのフィルタリング
  const getFeaturedItems = useCallback(() => {
    const now = new Date()
    const jstNow = new Date(now.getTime() + (9 * 60 * 60 * 1000)) // JST変換
    const jstIsoString = jstNow.toISOString()
    
    // 期間指定のおすすめ商品を優先
    const timeBoundItems = items.filter(item => 
      item.isFeatured && 
      item.featureStart && 
      item.featureEnd &&
      item.featureStart <= jstIsoString && 
      item.featureEnd >= jstIsoString
    )
    
    if (timeBoundItems.length > 0) {
      return timeBoundItems.slice(0, 10)
    }
    
    // 期間指定なしのおすすめ商品
    return items.filter(item => item.isFeatured).slice(0, 10)
  }, [items])

  const featuredItems = getFeaturedItems()
  
  const handleImageLoad = useCallback((imageUrl: string) => {
    setLoadedImages(prev => new Set(prev).add(imageUrl))
  }, [])
  
  // 自動ローテーション
  useEffect(() => {
    if (featuredItems.length <= 1 || isHovered) return
    
    const interval = setInterval(() => {
      setCurrentIndex(prev => (prev + 1) % featuredItems.length)
    }, 4000)
    
    return () => clearInterval(interval)
  }, [featuredItems.length, isHovered])
  
  // キーボード操作
  const handleKeyDown = useCallback((event: KeyboardEvent) => {
    if (featuredItems.length <= 1) return
    
    switch (event.key) {
      case 'ArrowLeft':
        event.preventDefault()
        setCurrentIndex(prev => prev === 0 ? featuredItems.length - 1 : prev - 1)
        break
      case 'ArrowRight':
        event.preventDefault()
        setCurrentIndex(prev => (prev + 1) % featuredItems.length)
        break
    }
  }, [featuredItems.length])
  
  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [handleKeyDown])
  
  if (featuredItems.length === 0) {
    return null
  }
  
  return (
    <section 
      className="relative w-full bg-gray-50 rounded-lg overflow-hidden"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      aria-label="おすすめ商品"
    >
      {/* メイン画像エリア - アスペクト比固定でCLS防止 */}
      <div className="relative aspect-[16/9] sm:aspect-[21/9] bg-gray-200">
        {/* Skeleton loading */}
        <div 
          className={`absolute inset-0 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 animate-pulse transition-opacity duration-300 ${
            loadedImages.has(featuredItems[currentIndex]?.image.url) ? 'opacity-0' : 'opacity-100'
          }`} 
        />
        {featuredItems.map((item, index) => (
          <div
            key={item.id}
            className={`absolute inset-0 transition-opacity duration-500 ${
              index === currentIndex ? 'opacity-100' : 'opacity-0'
            }`}
            aria-hidden={index !== currentIndex}
          >
            <Image
              src={item.image.url}
              alt={item.title}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 90vw, 80vw"
              className="object-cover"
              priority={index === 0}
              onLoad={() => handleImageLoad(item.image.url)}
            />
            
            {/* オーバーレイ情報 */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent">
              <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6 text-white">
                <h3 className="text-lg sm:text-xl font-bold mb-2 drop-shadow-md">
                  {item.title}
                </h3>
                <p className="text-2xl sm:text-3xl font-bold mb-2 drop-shadow-md">
                  ¥{item.price.toLocaleString()}
                </p>
                {item.tags && item.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {item.tags.slice(0, 3).map((tag, tagIndex) => (
                      <span
                        key={tagIndex}
                        className="px-2 py-1 bg-white/20 backdrop-blur-sm rounded-full text-sm"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {/* インジケーター */}
      {featuredItems.length > 1 && (
        <div className="absolute bottom-4 right-4 flex space-x-2">
          {featuredItems.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-3 h-3 rounded-full transition-colors ${
                index === currentIndex 
                  ? 'bg-white' 
                  : 'bg-white/50 hover:bg-white/75'
              }`}
              aria-label={`${index + 1}番目のおすすめ商品を表示`}
            />
          ))}
        </div>
      )}
      
      {/* ナビゲーションボタン */}
      {featuredItems.length > 1 && (
        <>
          <button
            onClick={() => setCurrentIndex(prev => 
              prev === 0 ? featuredItems.length - 1 : prev - 1
            )}
            className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-colors"
            aria-label="前のおすすめ商品"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          
          <button
            onClick={() => setCurrentIndex(prev => (prev + 1) % featuredItems.length)}
            className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-colors"
            aria-label="次のおすすめ商品"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </>
      )}
      
      {/* タイトル */}
      <div className="absolute top-4 left-4">
        <h2 className="text-white font-bold text-lg sm:text-xl drop-shadow-md">
          おすすめ
        </h2>
      </div>
    </section>
  )
}