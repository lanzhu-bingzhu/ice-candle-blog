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
                <li class="border-b p-4">
                  <p class="text-xl text-dark leading-10">{{ item.name }}</p>
                  <p class="text-sm text-dark/70">
                    <span>{{ item.description }}</span>
                    <span class="float-right text-dark/40 hover:text-ice-600/70">
                      <router-link :to="`/category/${item.category_id}`">查看分类</router-link>
                    </span>
                  </p>
                </li>
              </template>
            </ul>
          </div>
        </div>
        <div class="flex-1">
          <div class="ml-[20%] h-full">
            <div class="w-full h-[50%] bg-ice-500 overflow-hidden">
              <img src="/images/04.jpg" alt="alt" class="w-full object-cover aspect-square" />
            </div>
            <div class="w-full h-[10%] bg-candle-400"></div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import type { Category } from "@/types/index.ts"

const props = defineProps<{
  topCategories: Array<Category>
}>()
</script>

<style scoped></style>