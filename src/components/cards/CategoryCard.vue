<template>
  <router-link :to="`/category/${category.id}`"
    class="group block p-5 rounded-xl bg-white/80 border border-slate-200 hover:border-blue-300 hover:shadow-md transition-all duration-300 hover:-translate-y-1"
  >
    <div class="flex items-start gap-4">
      <div>
        <h3 class="font-semibold text-slate-800 text-lg group-hover:text-blue-600 transition-colors">
          {{ category.name }}
        </h3>
        <p class="text-sm text-slate-400 mt-1">{{ category.description }}</p>
        <div class="mt-3 flex items-center text-xs text-blue-500 opacity-0 group-hover:opacity-100 transition-opacity">
          <span>{{ category.type === 'article' ? '阅读文章' : '浏览图集' }} →</span>
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