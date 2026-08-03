<template>
  <div class="bg-linear-to-b from-[#e8f4fd] to-[#f9fcff] text-slate-800">
    <PageHeader />

    <main class="z-10 min-h-screen">
      <section>
        <div class="p-16">

        </div>
      </section>
    </main>

    <Footer />
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import PageHeader from '@/components/PageHeader.vue'
import Footer from '@/components/Footer.vue'
import type { Post } from '@/types'
import { fetchPostById } from "@/services/post.ts";

const route = useRoute()

const post = ref<Post | null>(null)

async function loadPost(postId: string): Promise<void> {
  post.value = await fetchPostById(postId)
}

watch(() => route.params.postId, (postId) => {
  if (!postId) {
    post.value = null
    return
  }
  post.value = null
  loadPost(postId as string)
},
{
  immediate: true
})
</script>