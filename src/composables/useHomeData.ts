import { ref } from 'vue'
import type { Category, Post } from '@/types'

// 模拟所有小分类
const allCategories: Category[] = [
  { id: 'minecraft', name: '我的世界', type: 'article', description: '沙盒开放游戏', parentCategory: 'games' },
  { id: 'scribble', name: '乱涂乱画', type: 'image-text', description: '随手涂鸦', parentCategory: 'paintings' },
  { id: 'vocaloid', name: 'Vocaloid', type: 'image-text', description: 'Vocaloid', parentCategory: 'music' },
  { id: 'utau', name: 'UTAU', type: 'image-text', description: 'UTAU', parentCategory: 'music' },
]

// 模拟文章，按 categoryId 组织
const allPosts: Record<string, Post[]> = {
  'minecraft': [],
  'scribble': [],
  'vocaloid': [],
  'utau': [],
};

export function useHomeData() {
  // 按大分类获取小分类列表
  const getCategoriesByParent = (parent: Category['parentCategory']) => allCategories.filter(c => c.parentCategory === parent)

  // 根据 categoryId 获取文章
  const getPostsByCategory = (categoryId: string) => allPosts[categoryId] || []

  // 获取所有分类（用于标签条）
  const getAllCategories = () => allCategories

  const loading = ref(false)
  const fetchData = async () => {
    loading.value = true
    await new Promise(resolve => setTimeout(resolve, 300))
    loading.value = false
  }

  return {
    getCategoriesByParent,
    getPostsByCategory,
    getAllCategories,
    loading,
    fetchData
  }
}