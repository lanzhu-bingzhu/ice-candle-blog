<template>
  <template v-if="title == 'banner'">
    <section class="w-full py-20">
      <Banner :image="props.image" :link="props.link" :alt="props.alt" />
    </section>
  </template>
  <template v-else>
   <section class="w-full h-dvh py-20">
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
    </section>
  </template>
</template>

<script setup lang="ts">
import CategoryCard from '@/components/cards/CategoryCard.vue'
import Banner from '@/components/Banner.vue'

defineProps<{
  title: string
  description?: string
  items?: any[]
  props: {
    image: string
    link: string
    alt: string
  } | Record<string, never>
}>()
</script>