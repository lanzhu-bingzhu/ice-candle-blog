<template>
  <div class="flex items-center justify-center space-x-4 py-6 px-4 text-slate-500">
    <span class="text-blue-400 text-lg">✦</span>
    <span class="text-base sm:text-lg font-medium text-slate-600">{{ currentStatus }}</span>
    <span class="text-blue-400 text-lg">✦</span>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

const statuses = [
  '🎮 正在玩：星穹铁道',
  '🎨 正在画：原创角色立绘',
  '📚 正在学：Vue 3 源码解读',
  '🍿 正在补：间谍过家家 第二季'
]
const currentStatus = ref(statuses[0])
let index = 0
let timer: number

onMounted(() => {
  timer = window.setInterval(() => {
    index = (index + 1) % statuses.length
    currentStatus.value = statuses[index]
  }, 3000)
})

onUnmounted(() => clearInterval(timer))
</script>