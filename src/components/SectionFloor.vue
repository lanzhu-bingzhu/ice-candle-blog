<template>
  <section class="w-full">
    <template v-if="type_id != 3">
      <div class="bg-ice-900 py-16 flex items-center justify-between">
        <div class="w-[1600px] mx-auto">
          <h3 class="text-xl font-bold text-white mb-2">{{ title }}</h3>
          <p class="mt-1 text-slate-300 text-sm">{{ description }}</p>
        </div>
      </div>
    </template>
    <template v-if="type_id == 1">
      <div class="w-[1600px] mx-auto px-4 py-4">
        <div class="w-full flex items-center">
          <div>
            <h3 class="text-3xl font-bold text-ice-900 mb-2">{{ category.name }}</h3>
            <p class="mt-1 text-ice-600 text-xl">{{ category.description }}</p>
          </div>
        </div>
        <div class="w-full">
          <CategoryCard v-for="item in category.children" :key="category_id" :category="item" />
        </div>
      </div>
    </template>
    <template v-if="type_id == 2">
      <div class="py-16 flex items-center justify-between">
        <div class="w-[1600px] mx-auto">
          <h3 class="text-xl font-bold text-ice-900 mb-2">{{ category.name }}</h3>
          <p class="mt-1 text-ice-600 text-sm">{{ category.description }}</p>
        </div>
      </div>
      <div class="w-[1600px] mx-auto">
        <template v-for="item in category.children" :key="category_id">
          <div class="grid grid-cols-3">
            <ImageTextCard :category="item" />
          </div>
        </template>
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