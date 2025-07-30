export interface MenuItem {
  id: string
  name: string
  price: number
  description: string
  category: 'bento' | 'teishoku' | 'don' | 'side'
  image: string
  isNew?: boolean
  isRecommended?: boolean
  isPopular?: boolean
}

export const defaultMenuItems: MenuItem[] = [
  {
    id: '1',
    name: '特製から揚げ弁当',
    price: 590,
    description: 'ジューシーなから揚げがメインの人気No.1弁当',
    category: 'bento',
    image: '/images/karaage-bento.jpg',
    isRecommended: true,
    isPopular: true
  },
  {
    id: '2', 
    name: 'チキン南蛮定食',
    price: 750,
    description: 'タルタルソースたっぷりのチキン南蛮定食',
    category: 'teishoku',
    image: '/images/chicken-nanban.jpg',
    isNew: true
  },
  {
    id: '3',
    name: '海鮮丼',
    price: 850,
    description: '新鮮な海の幸をたっぷり乗せた海鮮丼',
    category: 'don',
    image: '/images/kaisen-don.jpg',
    isRecommended: true
  },
  {
    id: '4',
    name: 'ハンバーグ弁当',
    price: 650,
    description: '手作りハンバーグの定番弁当',
    category: 'bento',
    image: '/images/hamburg-bento.jpg',
    isPopular: true
  },
  {
    id: '5',
    name: '焼肉弁当',
    price: 720,
    description: '甘辛タレの焼肉弁当',
    category: 'bento',
    image: '/images/yakiniku-bento.jpg'
  },
  {
    id: '6',
    name: 'エビフライ定食',
    price: 800,
    description: 'サクサクのエビフライ定食',
    category: 'teishoku',
    image: '/images/ebi-fry.jpg'
  },
  {
    id: '7',
    name: '親子丼',
    price: 580,
    description: 'ふわとろ卵の親子丼',
    category: 'don',
    image: '/images/oyako-don.jpg',
    isPopular: true
  },
  {
    id: '8',
    name: '鶏の照り焼き弁当',
    price: 620,
    description: '甘辛照り焼きチキン弁当',
    category: 'bento',
    image: '/images/teriyaki-bento.jpg'
  }
]

export const getRecommendedMenus = (): MenuItem[] => {
  return defaultMenuItems.filter(item => item.isRecommended || item.isNew)
}

export const getPopularMenus = (): MenuItem[] => {
  return defaultMenuItems.filter(item => item.isPopular)
}

export const getMenusByCategory = (category: string): MenuItem[] => {
  return defaultMenuItems.filter(item => item.category === category)
}