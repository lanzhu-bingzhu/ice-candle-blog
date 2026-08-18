<template>
  <section>
    <div class="container mx-auto">
      <div class="w-full flex">
        <div class="flex-1">
          <div class="my-16 ml-44 py-32">
            <h2 class="text-4xl pb-16 font-bold">
              <span class="text-ice-600 pr-2">1.</span>
              <span>Content Navigation</span>
            </h2>
            <ul class="w-full mx-auto px-8">
              <template v-for="item in topCategories">
                <router-link :to="`/catalogue/${item.category_id}`">
                  <li class="group flex border-b p-4">
                    <div class="flex-1">
                      <p class="text-xl text-dark leading-10 group-hover:text-ice-800">{{ item.name }}</p>
                      <p class="text-sm text-dark/70 group-hover:text-dark/40">
                        <span>{{ item.description }}</span>
                      </p>
                    </div>
                    <div class="flex items-end px-8">
                      <span class="text-sm text-dark/30 group-hover:text-ice-600/70">查看分类</span>
                    </div>
                  </li>
                </router-link>
              </template>
            </ul>
          </div>
        </div>
        <div class="flex-1">
          <div class="ml-[20%] h-full">
            <div class="w-full h-[50%] bg-ice-500 overflow-hidden">
              <img :src="config?.navigation_image" alt="alt" class="w-full h-auto object-cover aspect-square" />
            </div>
            <div class="w-full h-[10%] bg-candle-400"></div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed } from "vue"
import type { Category, Config } from "@/types/index.ts"

const props = defineProps<{
  config?: Config
  topCategories: Array<Category>
}>()

const topCategories = computed(() => {
  return props.topCategories
})

const config = computed(() => {
  return props.config
})
</script>

<style scoped></style>