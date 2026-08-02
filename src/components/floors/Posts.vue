<template>
  <section>
    <div class="container mx-auto">
      <div class="flex px-32 py-16">
        <div class="flex-1 pt-64">
          <h2 class="text-[6rem] leading-normal font-bold vertical-text">
            Blog post <br />
            display -<br />
            <span class="text-ice-600">ON.3</span>
          </h2>
        </div>
        <div class="flex-1">
          <div class="w-full h-full p-16">
            <h3 class="text-4xl font-bold tracking-widest">Article List</h3>
            <template v-if="posts.length === 0">
              <div class="w-full h-full relative flex justify-center">
                <div class="font-bold text-[11rem] text-dark/10 leading-[11rem] absolute bottom-32">NULL</div>
              </div>
            </template>
            <template v-else>
              <ul class="px-8 py-16">
                <li>占位数据</li>
              </ul>
            </template>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import type { Post } from "@/types/index.ts"

const props = defineProps<{
  posts: Array<Post>
}>()
</script>

<style scoped></style>