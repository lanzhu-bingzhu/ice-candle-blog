<template>
  <section class="screen snap-center relative py-20 px-4 flex flex-col items-center min-h-screen">
    <div class="z-10 w-full max-w-6xl">
      <div class="text-center mb-12">
        <span class="text-5xl block mb-4">🎮</span>
        <h2 class="text-4xl md:text-5xl font-display font-bold text-blue-600">游戏</h2>
        <p class="mt-4 text-slate-500 text-lg">独立游戏、二次元，我玩过的与正在创造的</p>
      </div>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <CategoryCard v-for="cat in gameCategories" :key="cat.id" :category="cat" />
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import CategoryCard from '@/components/cards/CategoryCard.vue'
import { useHomeData } from '@/composables/useHomeData'
const { getCategoriesByParent } = useHomeData()
const gameCategories = getCategoriesByParent('games')
</script>