<template>
  <div class="p-16">
    <h1 class="text-4xl mb-8">{{ post.title }}</h1>
    <div class="prose prose-slate max-w-none" v-html="post.content"></div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from "vue";
import type { Post } from "@/types";

const props = defineProps<{
  post: Post
}>()

const post = ref<Post>(props.post)

watch(() => props.post, () => {
  post.value = props.post
})
</script>

<style scoped>

</style>