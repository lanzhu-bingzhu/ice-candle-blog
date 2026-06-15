<template>
  <router-link :to="to"
    class="group block p-5 rounded-xl bg-white/80 border border-slate-200 hover:border-blue-300 hover:bg-white hover:shadow-md transition-all duration-300 hover:-translate-y-1"
  >
    <!-- 可选封面图 -->
    <div v-if="cover" class="w-full h-32 rounded-lg overflow-hidden mb-4">
      <img :src="cover" :alt="title" class="w-full h-full object-cover" />
    </div>
    <!-- 标签 -->
    <div class="flex flex-wrap gap-2 mb-3">
      <span v-for="tag in tags" :key="tag"
        class="text-xs px-2 py-0.5 rounded-full bg-blue-100 text-blue-600 border border-blue-200"
      >{{ tag }}</span>
    </div>
    <h3 class="text-lg font-semibold text-slate-800 group-hover:text-blue-600 transition-colors">{{ title }}</h3>
    <p class="text-sm text-slate-400 mt-2 line-clamp-2">{{ summary }}</p>
    <div class="mt-4 flex justify-between items-center text-xs text-slate-400">
      <span>{{ date }}</span>
      <span class="opacity-0 group-hover:opacity-100 transition-opacity text-blue-500">阅读 →</span>
    </div>
  </router-link>
</template>

<script setup lang="ts">
defineProps<{
  to: string
  cover?: string
  title: string
  summary: string
  tags: string[]
  date?: string
}>()
</script>