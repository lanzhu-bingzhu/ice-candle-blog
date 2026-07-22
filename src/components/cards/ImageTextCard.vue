<template>
  <router-link :to="`/category/${category.category_id}`" class="w-full flex items-center justify-center group border-slate-200 duration-300 hover:bg-ice-50/80">
    <div class="pl-16 pr-16 pt-8 pb-4 mx-auto flex-1">
      <div class="block overflow-hidden duration-500">
        <img src="/images/GUMI.jpg" alt="alt" class="w-full h-auto object-cover aspect-[1/1]" />
      </div>
      <div class="pt-4 pb-4">
        <h3 class="font-semibold text-slate-800 text-lg group-hover:text-ice-600 transition-colors">
          {{ category.name }}
        </h3>
        <p class="text-sm text-slate-400 mt-1">{{ category.description }}</p>
        <div class="mt-3 text-xs text-ice-500 opacity-0 group-hover:opacity-100 transition-opacity">
          <span v-if="category.type_id === 1">查看分类</span>
          <span v-if="category.type_id === 2">阅读文章</span>
          <span v-if="category.type_id === 3">浏览图集</span>
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