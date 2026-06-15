<template>
  <router-link :to="to"
    class="group block rounded-xl bg-white/80 border border-slate-200 hover:border-blue-300 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 overflow-hidden"
  >
    <div class="aspect-[4/3] bg-gradient-to-br from-blue-50 to-sky-100 flex items-center justify-center text-4xl relative">
      <img v-if="cover" :src="cover" :alt="title" class="absolute inset-0 w-full h-full object-cover" />
      <span v-else class="text-4xl">{{ placeholder }}</span>
    </div>
    <div class="p-4">
      <h3 class="font-semibold text-slate-800 text-base truncate">{{ title }}</h3>
      <p class="text-sm text-slate-400 mt-1">{{ subtitle }}</p>
    </div>
  </router-link>
</template>

<script setup lang="ts">
defineProps<{
  to: string
  cover?: string
  title: string
  subtitle: string
  placeholder?: string  // 无图片时的占位 emoji
}>()
</script>