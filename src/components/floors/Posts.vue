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
                <template v-for="(post, index) in posts">
                  <router-link :to="`/post/${post.post_id}`">
                    <li v-if="index < 5" class="group flex border-b border-dark/30 p-4">
                      <div class="flex-1">
                        <p class="text-xl text-dark leading-10 group-hover:text-ice-800">{{ post.title }}</p>
                        <p class="text-sm text-dark/70 text-ellipsis line-clamp-2 group-hover:text-dark/40">
                          <span>{{ post.description ? post.description : post.summary }}</span>
                        </p>
                      </div>
                      <div class="flex items-end px-8">
                        <span class="text-sm text-dark/30 group-hover:text-ice-600/70">查看详情</span>
                      </div>
                    </li>
                  </router-link>
                </template>
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
import { ref, watch } from "vue";

const props = defineProps<{
  posts: Array<Post>
}>()

const posts = ref<Array<Post>>(props.posts)

watch(() => props.posts, () => {
  posts.value = props.posts
})
</script>

<style scoped></style>