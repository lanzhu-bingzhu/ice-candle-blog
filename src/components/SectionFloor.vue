<template>
  <section class="w-full min-h-dvh py-20">
    <template v-if="type == 'banner'">
      <Banner :image="image" :link="link" :alt="alt" />
    </template>
    <template v-else>
      <!-- 紧凑标题栏：宽度与内容一致，左标题 + 右按钮 -->
      <div
        class="max-w-6xl mx-auto bg-gradient-to-r from-slate-800 to-slate-900 rounded-2xl px-6 py-5 mb-10 flex items-center justify-between">
        <div>
          <h2 class="text-3xl md:text-4xl font-bold text-white">{{ title }}</h2>
          <p class="mt-1 text-slate-300 text-lg">{{ description }}</p>
        </div>
      </div>

      <div class="max-w-6xl mx-auto">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <CategoryCard v-for="item in items" :key="item.id" :category="item" />
        </div>
      </div>
    </template>
  </section>
</template>

<script setup lang="ts">
import CategoryCard from '@/components/cards/CategoryCard.vue'
import Banner from '@/components/Banner.vue'

defineProps<{
  floor_id: string | number
  category_id: string | number
  type: 'banner' | 'article' | 'image-text'
  title: string
  description: string
  items: any[]
  image: string
  link: string
  alt: string
}>()
</script>