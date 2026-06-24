<template>
  <div class="flex flex-col min-h-screen bg-gradient-to-b from-[#e8f4fd] to-[#f9fcff] text-slate-800">
    <!-- 顶部导航 -->
    <div class="sticky top-0 z-30">
      <!-- 第一层：Logo + 大分类 -->
      <PageHeader>
        <nav class="flex gap-1 sm:gap-2">
          <button
              v-for="cat in topCategories"
              :key="cat.category_id"
              @click="switchParent(cat.category_id)"
              class="flex items-center gap-1 px-3 py-1.5 rounded-full text-sm font-medium transition-colors"
              :class="currentParentId == cat.category_id
              ? 'bg-blue-500 text-white shadow-sm'
              : 'text-slate-300 hover:text-white hover:bg-white/10'"
          >
            <span class="hidden sm:inline">{{ cat.name }}</span>
          </button>
        </nav>
      </PageHeader>

      <!-- 第二层：小分类标签条 -->
      <div v-if="subCategories.length > 0" class="bg-blue-50/80 backdrop-blur-md border-b border-slate-200 px-4 py-2">
        <div class="max-w-6xl mx-auto flex gap-2 overflow-x-auto scrollbar-hide">
          <button
              v-for="cat in subCategories"
              :key="cat.category_id"
              @click="switchCategory(cat.category_id)"
              class="flex-shrink-0 px-4 py-2 rounded-full text-sm font-medium transition-colors"
              :class="selectedCategoryId == cat.category_id
              ? 'bg-blue-500 text-white'
              : 'bg-white border border-slate-200 text-slate-600 hover:border-blue-300'"
          >
            {{ cat.name }}
          </button>
        </div>
      </div>
    </div>

    <!-- 主体内容 -->
    <main class="flex-1 max-w-6xl mx-auto w-full px-4 py-8">
      <!-- 加载中 -->
      <div v-if="loading" class="text-center py-12 text-slate-400">加载中...</div>

      <!-- 错误提示 -->
      <div v-else-if="error" class="text-center py-12 text-red-400">
        <p>{{ error }}</p>
        <router-link to="/" class="text-blue-500 hover:underline mt-2 inline-block">返回首页</router-link>
      </div>

      <!-- 无数据 -->
      <div v-else-if="!currentCategory" class="text-center py-12 text-slate-400">
        <p class="text-lg">分类不存在</p>
        <router-link to="/" class="text-blue-500 hover:underline mt-2 inline-block">返回首页</router-link>
      </div>

      <template v-else>
        <h2 class="text-2xl font-bold text-slate-700 mb-6">
          {{ currentCategory.name }}
        </h2>

        <!-- 文章型列表：一行一条 -->
        <div v-if="currentCategory.type == 'article'" class="space-y-4">
          <router-link
              v-for="post in posts"
              :key="post.post_id"
              :to="`/post/${post.post_id}`"
              class="block p-5 rounded-xl bg-white/80 border border-slate-200 hover:border-blue-300 hover:shadow-md transition-all"
          >
            <div class="flex flex-wrap gap-2 mb-2" v-if="post.tags">
              <span v-for="tag in post.tags" :key="tag"
                    class="text-xs px-2 py-0.5 rounded-full bg-blue-100 text-blue-600 border border-blue-200"
              >{{ tag.name }}</span>
            </div>
            <h3 class="text-lg font-semibold text-slate-800">{{ post.title }}</h3>
            <p class="text-sm text-slate-400 mt-2">{{ post.summary }}</p>
            <div class="flex justify-between items-center mt-4 text-xs text-slate-400">
              <span>{{ post.date }}</span>
              <span class="text-blue-500">阅读 →</span>
            </div>
          </router-link>
          <div v-if="posts.length == 0" class="text-center text-slate-400 py-12">暂无文章</div>
        </div>

        <!-- 图文型列表：一行五个 -->
        <div v-else-if="currentCategory.type == 'image-text'" class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          <router-link
              v-for="post in posts"
              :key="post.post_id"
              :to="`/post/${post.post_id}`"
              class="group block rounded-xl bg-white/80 border border-slate-200 hover:border-blue-300 hover:shadow-md transition-all overflow-hidden"
          >
            <div class="aspect-square bg-gradient-to-br from-blue-50 to-sky-100 flex items-center justify-center">
              <img v-if="post.cover" :src="post.cover" :alt="post.title" class="w-full h-full object-cover" />
              <span v-else class="text-4xl">🖼️</span>
            </div>
            <div class="p-3">
              <h3 class="font-medium text-sm text-slate-800 truncate">{{ post.title }}</h3>
              <p class="text-xs text-slate-400 mt-1" v-if="post.date">{{ post.date }}</p>
            </div>
          </router-link>
          <div v-if="posts.length == 0" class="col-span-full text-center text-slate-400 py-12">暂无内容</div>
        </div>
      </template>
    </main>

    <Footer />
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import PageHeader from '@/components/PageHeader.vue'
import Footer from '@/components/Footer.vue'
import { useHomeData } from '@/composables/useHomeData'
import type { Category, Post } from '@/types'

const route = useRoute()
const router = useRouter()

const {
  topCategories,
  loadTopCategories,
  loadSubCategories,
  loadPosts,
  getCategoryById,
  loading,
  error,
  loadCategoryById
} = useHomeData()

// 当前选中的分类 ID（从路由参数获取）
const selectedCategoryId = ref<string | number>(route.params.categoryId as string)

// 子分类列表（当前大分类下的所有子分类）
const subCategories = ref<Category[]>([])
// 文章列表
const posts = ref<Post[]>([])

// 当前分类对象
const currentCategory = computed(() => getCategoryById(selectedCategoryId.value))

// 当前大分类的 ID（用来高亮顶部导航）
const currentParentId = computed(() => {
  if (!currentCategory.value) return ''
  // 如果当前分类是顶级分类，则直接返回其 id；否则返回其 parentId
  return (currentCategory.value.parent_id == 0 || currentCategory.value.parent_id == null)
      ? currentCategory.value.category_id
      : currentCategory.value.parent_id
})

// 加载当前分类所需的所有数据
async function loadCategoryData(catId: string | number) {
  // 确保顶级分类已加载
  if (topCategories.value.length == 0) {
    await loadTopCategories()
  }

  let cat = getCategoryById(catId)
  if (!cat) {
    cat = await loadCategoryById(catId)
  }

  if (cat == null) {
    return
  }

  // 确定父级 ID（大分类 ID）
  let parentId: string | number
  if (cat.parent_id == 0 || cat.parent_id == null) {
    parentId = cat.category_id
    // 如果当前分类是顶级分类，则应该跳转到它的第一个子分类（除非它没有子分类）
    const subs = await loadSubCategories(parentId)
    if (subs.length > 0) {
      // 自动跳转到第一个子分类
      router.replace(`/category/${subs[0].category_id}`)
      return
    }
    // 如果没有子分类，直接展示该顶级分类的文章（特殊情况）
  } else {
    parentId = cat.parent_id
  }

  // 加载该大分类下的所有子分类（用于标签条）
  subCategories.value = await loadSubCategories(parentId)

  // 加载当前分类的文章
  posts.value = await loadPosts(catId)
}

// 切换大分类：加载其子分类，并跳转到第一个子分类
async function switchParent(parentId: string | number) {
  const subs = await loadSubCategories(parentId)
  let oldCatId: string | number

  if (subs.length > 0) {
    oldCatId = subs[0].category_id
    router.replace(`/category/${subs[0].category_id}`)
  } else {
    // 如果没有子分类，直接跳转到该大分类（显示其文章）
    oldCatId = parentId
    router.replace(`/category/${parentId}`)
  }

  if (subCategories.value.length == 0 && route.params.categoryId == oldCatId) {
    selectedCategoryId.value = oldCatId
    await loadCategoryData(oldCatId)
  }
}

// 切换小分类
function switchCategory(catId: string | number) {
  router.replace(`/category/${catId}`)
}

// 监听路由变化
watch(() => route.params.categoryId, (newId) => {
  if (newId) {
    selectedCategoryId.value = newId as string
    loadCategoryData(newId as string)
  }
})

// 初始化
onMounted(() => {
  if (route.params.categoryId) {
    loadCategoryData(route.params.categoryId as string)
  }
})
</script>