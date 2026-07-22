<template>
  <router-link :to="`/category/${category.category_id}`" class="group block p-5 border-slate-200 duration-300">
    <div class="w-full flex max-w-6xl mx-auto">
      <div class="flex flex-4/5 flex-col justify-center">
        <h3 class="font-semibold text-slate-800 text-lg group-hover:text-ice-600 transition-colors">
          {{ category.name }}
        </h3>
        <p class="text-sm text-slate-400 mt-1">{{ category.description }}</p>
        <div class="mt-3 flex items-center text-xs text-ice-500 opacity-0 group-hover:opacity-100 transition-opacity">
          <span v-if="category.type_id === 1">查看分类</span>
          <span v-if="category.type_id === 2">阅读文章</span>
          <span v-if="category.type_id === 3">浏览图集</span>
        </div>
      </div>
      <div class="flex-1/5">
        <div class="w-80 h-80 overflow-hidden">
          <img :src="category.cover" :alt="category.name" class="w-full h-auto object-cover aspect-[1/1]">
        </div>
      </div>
    </div>
  </router-link>
</template>

<script setup lang="ts">
import type { Category } from '@/types'
defineProps<{
  category: Category
}>()
</script>