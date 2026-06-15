export interface Game {
  id: string
  title: string
  cover: string
  status: 'playing' | 'completed' | 'planning'
}

export interface Artwork {
  id: string
  title: string
  image: string
  category: string
}

export interface ACGItem {
  id: string
  title: string
  type: 'anime' | 'manga' | 'figure'
  progress: string
}

export interface TechArticle {
  id: string
  title: string
  summary: string
  tags: string[]
  date: string
}

export interface Music {
  id: string
  title: string
  artist: string
  album: string
  cover: string
}

// 小分类
export interface Category {
  id: string
  name: string
  type: 'article' | 'image-text'       // 决定文章列表展示方式
  description: string
  icon: string                         // emoji 图标
  parentCategory: 'games' | 'paintings' | 'acg' | 'tech' | 'music'
}

// 统一文章/图文条目
export interface Post {
  id: string
  categoryId: string
  title: string
  type: 'article' | 'image-text'  // 新增：用于区分文章和图文
  summary?: string
  date?: string
  tags?: string[]
  cover?: string
  images?: string[]   // 图文类型多图
  author?: string
  avatar?: string
  content?: string    // 文章内容（HTML）
  description?: string // 图文描述
}