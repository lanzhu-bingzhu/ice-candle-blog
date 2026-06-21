<template>
  <nav class="fixed right-8 top-1/2 -translate-y-1/2 z-40 flex flex-col gap-3 mb-16">
    <button
      v-for="item in sections"
      :key="item.id"
      @click="scrollTo(item.id)"
      class="group relative flex items-center justify-center w-3 h-3 rounded-full transition-all duration-300"
      :class="
        currentId === item.id
          ? 'bg-blue-500 scale-125'
          : 'bg-slate-300 hover:bg-blue-400'
      "
      :title="item.label"
    >
      <span class="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-full ml-[-12px] opacity-0 group-hover:opacity-100 transition-opacity text-xs bg-slate-800 text-white px-2 py-1 rounded whitespace-nowrap pointer-events-none">
        {{ item.label }}
      </span>
    </button>
  </nav>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

const sections = [
  { id: 'hero', label: '首页' },
  { id: 'banner', label: '推荐' },
  { id: 'games', label: '游戏' },
  { id: 'paintings', label: '绘画' },
  { id: 'acg', label: 'ACG' },
  { id: 'music', label: '音乐' },
  { id: 'tech', label: '技术' },
  { id: 'footer', label: '底部' },
]

const currentId = ref('hero')

function scrollTo(id: string) {
  const el = document.getElementById(id)
  if (el) {
    el.scrollIntoView({ behavior: 'smooth' })
  }
}

// 监听滚动以高亮当前 section
const observer = new IntersectionObserver(
  (entries) => {
    for (const entry of entries) {
      if (entry.isIntersecting) {
        currentId.value = entry.target.id
      }
    }
  },
  { threshold: 0.5 }
)

onMounted(() => {
  sections.forEach((s) => {
    const el = document.getElementById(s.id)
    if (el) observer.observe(el)
  })
})

onUnmounted(() => observer.disconnect())
</script>