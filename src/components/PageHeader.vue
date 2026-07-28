<template>
  <header class="sticky top-0 z-30 bg-gradient-to-r from-dark-800 to-dark-900 px-4 py-4">
    <div class="w-[1600px] mx-auto">
      <router-link to="/" class="text-2xl font-display font-bold bg-gradient-to-r from-cyan-400 to-ice-400 bg-clip-text text-transparent hover:opacity-80 transition-opacity">
        IceCandle
      </router-link>
      <slot />
    </div>
  </header>
</template>

<script setup lang="ts">
</script>