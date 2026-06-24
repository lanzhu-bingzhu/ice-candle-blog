<template>
  <div class="flex flex-col min-h-screen bg-gradient-to-b from-[#e8f4fd] to-[#f9fcff] text-slate-800">
    <!-- 顶部：只显示 Logo -->
    <PageHeader />

    <main class="flex-1 max-w-4xl mx-auto w-full px-4 py-8">
      <!-- 加载中 -->
      <div v-if="loading" class="text-center py-12 text-slate-400">加载中...</div>

      <!-- 错误提示 -->
      <div v-else-if="error" class="text-center py-12 text-red-400">
        <p>{{ error }}</p>
        <router-link to="/" class="text-blue-500 hover:underline mt-2 inline-block">返回首页</router-link>
      </div>

      <!-- 文章不存在 -->
      <div v-else-if="!post" class="text-center py-12 text-slate-400">
        <p class="text-lg">文章不存在</p>
        <router-link to="/" class="text-blue-500 hover:underline mt-2 inline-block">返回首页</router-link>
      </div>

      <template v-else>
        <!-- 文章类型 -->
        <template v-if="post.type === 'article'">
          <div class="flex items-center gap-4 mb-8">
            <div class="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center text-xl">
              <img v-if="post.avatar" :src="post.avatar" class="w-full h-full rounded-full object-cover" />
              <span v-else>🧊</span>
            </div>
            <div>
              <p class="font-medium text-slate-700">{{ post.author || 'IceCandle' }}</p>
              <p class="text-sm text-slate-400">{{ post.date }}</p>
            </div>
          </div>

          <h1 class="text-3xl font-bold text-slate-800 mb-6">{{ post.title }}</h1>
          <div class="prose prose-slate max-w-none" v-html="post.content"></div>
        </template>

        <!-- 图文类型 -->
        <template v-if="post.type === 'image-text'">
          <h1 class="text-2xl font-bold text-slate-800 mb-6">{{ post.title }}</h1>

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

          <div class="flex items-center gap-4 mb-8 p-4 rounded-xl bg-white/60 border border-slate-200">
            <div class="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-lg">
              <img v-if="post.avatar" :src="post.avatar" class="w-full h-full rounded-full object-cover" />
              <span v-else>🧊</span>
            </div>
            <div>
              <p class="font-medium text-slate-700">{{ post.author || 'IceCandle' }}</p>
              <p class="text-sm text-slate-400">{{ post.date }}</p>
            </div>
          </div>

          <div v-if="post.description" class="text-slate-600 leading-relaxed">
            <p>{{ post.description }}</p>
          </div>
        </template>
      </template>
    </main>

    <Footer />
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import PageHeader from '@/components/PageHeader.vue'
import Footer from '@/components/Footer.vue'
import { useHomeData } from '@/composables/useHomeData'
import type { Post } from '@/types'

const route = useRoute()
const { loadPost, loading, error } = useHomeData()

const post = ref<Post | null>(null)

// 监听路由参数变化，加载文章
watch(
    () => route.params.postId,
    async (postId) => {
      if (!postId) {
        post.value = null
        return
      }
      post.value = null
      error.value = null
      const data = await loadPost(postId as string)
      post.value = data
    },
    { immediate: true }
)
</script>