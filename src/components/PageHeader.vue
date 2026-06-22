<template>
  <header class="sticky top-0 z-30 bg-gradient-to-r from-slate-800 to-slate-900 border-b border-slate-700 px-4 py-4">
    <div class="max-w-6xl mx-auto flex items-center justify-between">
      <router-link to="/" class="text-2xl font-display font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent hover:opacity-80 transition-opacity">
        IceCandle
      </router-link>
      <slot />
    </div>
  </header>
</template>

<script setup lang="ts">
</script>