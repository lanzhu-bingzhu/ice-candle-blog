<template>
  <div class="flex flex-col min-h-screen bg-gradient-to-b from-[#e8f4fd] to-[#f9fcff] text-slate-800">
    <!-- 顶部：只显示 Logo -->
    <header class="sticky top-0 z-30 bg-white/80 backdrop-blur-md border-b border-slate-200 px-4 py-4">
      <div class="max-w-6xl mx-auto">
        <router-link to="/" class="text-2xl font-display font-bold bg-gradient-to-r from-cyan-500 to-blue-500 bg-clip-text text-transparent">
          IceCandle
        </router-link>
      </div>
    </header>

    <main class="flex-1 max-w-4xl mx-auto w-full px-4 py-8" v-if="post">
      <!-- ========== 文章类型 ========== -->
      <template v-if="post.type === 'article'">
        <!-- 作者信息 -->
        <div class="flex gap-4 mb-8">
          <div class="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center text-xl">
            {{ post.avatar ? '' : '🧊' }}
            <img v-if="post.avatar" :src="post.avatar" class="w-full h-full rounded-full object-cover" />
          </div>
          <div>
            <p class="font-medium text-slate-700">{{ post.author || 'IceCandle' }}</p>
            <p class="text-sm text-slate-400">{{ post.date }}</p>
          </div>
        </div>

        <h1 class="text-4xl font-bold text-slate-800 mb-6">{{ post.title }}</h1>
        <div class="prose prose-slate max-w-none" v-html="post.content"></div>
      </template>

      <!-- ========== 图文类型 ========== -->
      <template v-if="post.type === 'image-text'">
        <h1 class="text-4xl font-bold text-slate-800 mb-6">{{ post.title }}</h1>

        <!-- 图片展示区 -->
        <div class="mb-8">
          <div v-if="post.images && post.images.length" class="grid grid-cols-1 gap-4">
            <img
              v-for="(img, index) in post.images"
              :key="index"
              :src="img"
              :alt="`${post.title} - ${index + 1}`"
              class="w-full rounded-xl shadow-sm bg-slate-100 object-cover"
              style="max-height: 70vh;"
            />
          </div>
          <div v-else class="aspect-video rounded-xl bg-gradient-to-br from-blue-50 to-sky-100 flex items-center justify-center text-6xl">
            🖼️
          </div>
        </div>

        <!-- 作者信息（带背景卡片） -->
        <div class="flex items-center gap-4 mb-8 p-4 rounded-xl bg-white/60 border border-slate-200">
          <div class="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-lg">
            {{ post.avatar ? '' : '🧊' }}
            <img v-if="post.avatar" :src="post.avatar" class="w-full h-full rounded-full object-cover" />
          </div>
          <div>
            <p class="font-medium text-slate-700">{{ post.author || 'IceCandle' }}</p>
            <p class="text-sm text-slate-400">{{ post.date }}</p>
          </div>
        </div>

        <!-- 图片描述 -->
        <div v-if="post.description" class="text-slate-600 leading-relaxed">
          <p>{{ post.description }}</p>
        </div>
      </template>

      <div v-if="!post" class="text-center text-slate-400 py-12">内容不存在</div>
    </main>

    <Footer />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { useHomeData } from '@/composables/useHomeData'
import Footer from '@/components/Footer.vue'

const route = useRoute()
const postId = route.params.postId as string

const { getAllCategories, getPostsByCategory } = useHomeData()
const allCategories = getAllCategories()

// 从所有分类的所有文章中查找匹配的 post
const post = computed(() => {
  for (const cat of allCategories) {
    const posts = getPostsByCategory(cat.id)
    const found = posts.find(p => p.id === postId)
    if (found) return found
  }
  return null
})
</script>