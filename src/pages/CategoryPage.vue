<template>
  <div class="flex flex-col min-h-screen bg-gradient-to-b from-[#e8f4fd] to-[#f9fcff] text-slate-800">
    <!-- 顶部导航 -->
    <div class="sticky top-0 z-30">
      <!-- 第一层：Logo + 大分类 -->
      <PageHeader>
        <nav class="flex gap-1 sm:gap-2">
          <button
            v-for="pc in parentCategories"
            :key="pc.key"
            @click="switchParent(pc.key)"
            class="flex items-center gap-1 px-3 py-1.5 rounded-full text-sm font-medium transition-colors"
            :class="currentParentCategory === pc.key
              ? 'bg-blue-500 text-white shadow-sm'
              : 'text-slate-300 hover:text-white hover:bg-white/10'"
          >
            <span class="hidden sm:inline">{{ pc.name }}</span>
          </button>
        </nav>
      </PageHeader>

      <!-- 第二层：小分类标签条（仅当前大分类下有内容时显示） -->
      <div
        v-if="subCategories.length > 0"
        class="bg-blue-50/80 backdrop-blur-md border-b border-slate-200 px-4 py-2"
      >
        <div class="max-w-6xl mx-auto flex gap-2 overflow-x-auto scrollbar-hide">
          <button
            v-for="cat in subCategories"
            :key="cat.id"
            @click="switchCategory(cat.id)"
            class="flex-shrink-0 px-4 py-2 rounded-full text-sm font-medium transition-colors"
            :class="selectedCategoryId === cat.id
              ? 'bg-blue-500 text-white'
              : 'bg-white border border-slate-200 text-slate-600 hover:border-blue-300'"
          >
            <!-- {{ cat.icon }} --> {{ cat.name }}
          </button>
        </div>
      </div>
    </div>

    <!-- 文章列表（与之前相同） -->
    <main class="flex-1 max-w-6xl mx-auto w-full px-4 py-8">
      <h2 class="text-2xl font-bold text-slate-700 mb-6 pb-2">{{ currentCategory?.name }}</h2>

      <!-- 文章型列表：一行一条 -->
      <div v-if="currentCategory?.type === 'article'" class="space-y-4">
        <router-link
          v-for="post in posts"
          :key="post.id"
          :to="`/post/${post.id}`"
          class="block p-5 rounded-xl bg-white/80 border border-slate-200 hover:border-blue-300 hover:shadow-md transition-all"
        >
          <div class="flex flex-wrap gap-2 mb-2" v-if="post.tags">
            <span v-for="tag in post.tags" :key="tag"
              class="text-xs px-2 py-0.5 rounded-full bg-blue-100 text-blue-600 border border-blue-200"
            >{{ tag }}</span>
          </div>
          <h3 class="text-lg font-semibold text-slate-800">{{ post.title }}</h3>
          <p class="text-sm text-slate-400 mt-2">{{ post.summary }}</p>
          <div class="flex justify-between items-center mt-4 text-xs text-slate-400">
            <span>{{ post.date }}</span>
            <span class="text-blue-500">阅读 →</span>
          </div>
        </router-link>
        <div v-if="posts.length === 0" class="text-center text-slate-400 py-12">暂无文章</div>
      </div>

      <!-- 图文型列表：一行五个 -->
      <div v-else-if="currentCategory?.type === 'image-text'" class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        <router-link
          v-for="post in posts"
          :key="post.id"
          :to="`/post/${post.id}`"
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
        <div v-if="posts.length === 0" class="col-span-full text-center text-slate-400 py-12">暂无内容</div>
      </div>
    </main>

    <Footer />
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useHomeData } from '@/composables/useHomeData'
import Footer from '@/components/Footer.vue'
import PageHeader from '@/components/PageHeader.vue'

const route = useRoute()
const router = useRouter()
const { getAllCategories, getPostsByCategory } = useHomeData()

const allCategories = getAllCategories()
const selectedCategoryId = ref(route.params.categoryId as string)

// 大分类映射
const parentCategoryMeta: Record<string, { name: string; icon: string }> = {
  games: { name: '游戏', icon: '🎮' },
  paintings: { name: '绘画', icon: '🎨' },
  acg: { name: 'ACG', icon: '🍥' },
  music: { name: '音乐', icon: '🎵' },
  tech: { name: '技术', icon: '💻' },
}

// 所有大分类（去重排序）
const parentCategories = computed(() => {
  const keys = [...new Set(allCategories.map(c => c.parentCategory))]
  return keys.map(key => ({
    key,
    name: parentCategoryMeta[key]?.name ?? key,
    icon: parentCategoryMeta[key]?.icon ?? '📌'
  }))
})

// 当前分类对象
const currentCategory = computed(() => allCategories.find(c => c.id === selectedCategoryId.value))

// 当前大分类的 key
const currentParentCategory = computed(() => currentCategory.value?.parentCategory ?? '')

// 当前大分类下的所有小分类
const subCategories = computed(() => allCategories.filter(c => c.parentCategory === currentParentCategory.value))

// 当前分类下的文章
const posts = computed(() => currentCategory.value ? getPostsByCategory(currentCategory.value.id) : [])

function switchCategory(id: string) {
  selectedCategoryId.value = id
  router.replace(`/category/${id}`)
}

// 切换大分类：自动选择该大分类下的第一个小分类
function switchParent(parentKey: string) {
  const firstSub = allCategories.find(c => c.parentCategory === parentKey)
  if (firstSub) {
    switchCategory(firstSub.id)
  }
}

// 监听路由变化
watch(() => route.params.categoryId, (newId) => {
  selectedCategoryId.value = newId as string
})
</script>