<template>
  <router-link
    :to="to"
    class="group block relative overflow-hidden rounded-lg bg-gradient-to-br from-ice-900/60 to-slate-900/80 backdrop-blur-sm border border-ice-500/20 shadow-lg hover:shadow-ice-500/25 transition-all duration-500 hover:-translate-y-1"
  >
    <!-- 光晕装饰 -->
    <div class="absolute inset-0 bg-gradient-to-r from-cyan-400/0 via-cyan-400/10 to-ice-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
    <div class="relative p-6 flex flex-col h-full min-h-[180px]">
      <div class="text-3xl mb-3">{{ icon }}</div>
      <h3 class="text-xl font-semibold text-white mb-2">{{ title }}</h3>
      <p class="text-ice-200/70 text-sm">{{ description }}</p>
      <div class="mt-auto flex items-center text-ice-300 text-sm group-hover:text-cyan-300 transition-colors">
        <span>探索 →</span>
      </div>
    </div>
  </router-link>
</template>

<script setup lang="ts">
defineProps<{
  to: string
  icon: string
  title: string
  description: string
}>()
</script>