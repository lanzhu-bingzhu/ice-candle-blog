import { ref, reactive } from 'vue'
import { useLoading } from './useLoading'
import { fetchTopCategories, fetchSubCategories, fetchCategoryById } from '@/services/category'
import { fetchPostsByCategory, fetchPostById } from '@/services/post'
import { fetchFloors } from '@/services/floor'
import type { Category, Post, FloorConfig } from '@/types'

export function useHomeData() {
  const { show, hide } = useLoading()

  const topCategories = ref<Category[]>([])   // 顶级分类
  const postsMap = reactive<Record<string, Post[]>>({})
  const loading = ref(false)
  const error = ref<string | null>(null)
  const categoryMap = reactive<Record<string, Category>>({})

  // 加载顶级分类（大分类）
  async function loadTopCategories() {
    if (topCategories.value.length) return
    show('加载导航...')
    try {
      const data = await fetchTopCategories()
      topCategories.value = data
      data.forEach(c => categoryMap[c.category_id] = c)
    } catch (e: any) {
      error.value = e.message || '分类加载失败'
    } finally {
      hide()
    }
  }

  // 加载指定父分类下的子分类
  async function loadSubCategories(parentId: string | number): Promise<Category[]> {
    show('加载分类...')
    try {
      const sub = await fetchSubCategories(parentId)
      sub.forEach(c => categoryMap[c.category_id] = c)
      hide()
      return sub
    } catch (e: any) {
      error.value = e.message || '子分类加载失败'
      hide()
      return []
    }
  }

  // 加载指定分类下的文章（带缓存）
  async function loadPosts(categoryId: string | number): Promise<Post[]> {
    const idStr = String(categoryId)
    if (postsMap[idStr]) return postsMap[idStr]
    show('加载文章...')
    try {
      const posts = await fetchPostsByCategory(categoryId)
      postsMap[idStr] = posts
      hide()
      return posts
    } catch (e: any) {
      error.value = e.message || '文章加载失败'
      hide()
      return []
    }
  }

  // 根据 ID 获取单篇文章（优先查缓存，再请求）
  async function loadPost(postId: string | number): Promise<Post | null> {
    for (const catPosts of Object.values(postsMap)) {
      const found = catPosts.find(p => p.post_id == postId)
      if (found) return found
    }
    show('加载文章...')
    try {
      const post = await fetchPostById(postId)
      if (post) {
        const catId = String(post.category_id)
        if (!postsMap[catId]) postsMap[catId] = []
        postsMap[catId].push(post)
      }
      hide()
      return post
    } catch (e: any) {
      error.value = e.message || '加载失败'
      hide()
      return null
    }
  }

  // 根据 ID 加载单个分类（优先从缓存获取，否则请求接口）
  async function loadCategoryById(id: string | number): Promise<Category | null> {
    if (categoryMap[id]) return categoryMap[id]
    show('加载分类...')
    try {
      const cat = await fetchCategoryById(id)
      if (cat) {
        categoryMap[cat.category_id] = cat
      }
      return cat
    } catch (e: any) {
      error.value = e.message || '分类加载失败'
      return null
    } finally {
      hide()
    }
  }

  // 根据大分类获取其子分类列表（从接口）
  const getSubCategoriesByParent = async (parentId: string | number) => {
    return await loadSubCategories(parentId)
  }

  // 静态方法：获取已缓存的文章（同步）
  const getPostsByCategory = (categoryId: string | number): Post[] =>
      postsMap[String(categoryId)] || []

  const floors = ref<FloorConfig[]>([])

  async function loadFloors() {
    show('加载首页…')
    try {
      floors.value = await fetchFloors()
    } catch (e: any) {
      error.value = e.message || '首页加载失败'
    } finally {
      hide()
    }
  }

  const getCategoryById = (id: string | number): Category | null => categoryMap[id]

  return {
    topCategories,
    postsMap,
    loading,
    error,
    categoryMap,
    loadTopCategories,
    loadSubCategories,
    loadPosts,
    loadPost,
    getSubCategoriesByParent,
    getPostsByCategory,
    floors,
    loadFloors,
    getCategoryById,
    loadCategoryById
  }
}