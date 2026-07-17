<template>
  <section class="w-full">
    <template v-if="type_id == 1">
      <div class="bg-ice-900 py-16 flex items-center justify-between">
        <div class="max-w-6xl mx-auto w-4/6">
          <h3 class="text-xl font-bold text-white mb-2">{{ category.name }}</h3>
          <p class="mt-1 text-slate-300 text-sm">{{ category.description }}</p>
        </div>
      </div>
      <div class="bg-white/80">
        <CategoryCard v-for="item in category.children" :key="category_id" :category="item" />
      </div>
    </template>
    <template v-if="type_id == 2">
      <div class="bg-ice-900 py-16 flex items-center justify-between">
        <div class="max-w-6xl mx-auto w-4/6">
          <h3 class="text-xl font-bold text-white mb-2">{{ category.name }}</h3>
          <p class="mt-1 text-slate-300 text-sm">{{ category.description }}</p>
        </div>
      </div>
      <div class="bg-white/80">
        <div class="flex w-full h-3/4 items-center justify-center relative overflow-hidden">
          <img v-if="image" :src="image" :alt="title" class="min-w-dvw h-auto object-cover aspect-[21/9]" />
          <span v-else class="text-4xl">{{ category.description }}</span>
          <div class="absolute h-full inset-0 w-1/2 bg-white/80 flex flex-col">
            <template v-for="(item, index) in category.children" :key="category_id">
              <div v-if="index < 4" class="flex-1">
                <ImageTextCard :category="item" />
              </div>
            </template>
          </div>
        </div>
      </div>
    </template>
    <template v-if="type_id == 3">
      <Banner :image="image" :link="link" :alt="alt" />
    </template>
  </section>
</template>

<script setup lang="ts">
import CategoryCard from '@/components/cards/CategoryCard.vue'
import ImageTextCard from "@/components/cards/ImageTextCard.vue";
import Banner from '@/components/Banner.vue'
import type { Category } from "@/types";

defineProps<{
  floor_id: string | number
  category_id: string | number
  type_id: number
  title: string
  description: string
  items: any[]
  image: string
  link: string
  alt: string,
  category: Category
}>()
</script>