<template>
  <Teleport to="body">
    <div
      class="fixed inset-0 z-50 flex flex-col items-center justify-center bg-slate-900/60 backdrop-blur-sm transition-opacity duration-300"
      :class="loading ? 'opacity-100' : 'opacity-0 pointer-events-none'"
    >
      <!-- 旋转的冰晶 -->
      <div class="animate-spin-slow text-6xl mb-4 drop-shadow-lg">
        ❄️
      </div>
      <p class="text-white/90 text-lg font-medium">{{ text }}</p>
    </div>
  </Teleport>
</template>

<script setup lang="ts">
defineProps<{
  loading: boolean
  text?: string
}>()
</script>

<style scoped>
.animate-spin-slow {
  animation: spin-slow 2s linear infinite;
}
@keyframes spin-slow {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}
</style>