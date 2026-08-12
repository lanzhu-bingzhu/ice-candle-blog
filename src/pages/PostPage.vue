<template>
  <div class="bg-linear-to-b from-[#e8f4fd] to-[#f9fcff] text-slate-800">
    <PageHeader />

    <main class="z-10 min-h-screen">
      <template v-if="!loading">
        <section>
          <template v-if="post">
            <div class="container mx-auto">
              <BreadcrumbNav :items="breadcrumbItem" />
              <div class="w-full">
                <div class="w-full h-[360px] mb-8">
                  <img :src="post.cover" alt="alt" class="w-full h-full object-cover aspect-square" />
                </div>
                <div class="flex mb-8">
                  <div class="flex-1 text-ice-50">
                    <div class="bg-candle-600 p-16 mb-2">
                      <div class="w-2/3 mx-auto">
                        <img src="/images/avatar.jpg" alt="alt" class="w-full h-auto rounded-full border-8 border-ice-50 object-cover aspect-square" />
                      </div>
                      <div class="text-2xl text-center mt-8">
                        <span>Ice Candle</span>
                      </div>
                    </div>
                    <div class="bg-ice-600 p-16">
                      <p>{{ post.description ? post.description : post.summary }}</p>
                    </div>
                  </div>
                  <div class="flex-3">
                    <post-detail :post="post" />
                  </div>
                </div>
              </div>
            </div>
          </template>
          <template v-else>
            <div class="flex">
              <div class="flex-1">
                <div class="w-full min-h-screen flex items-center justify-center">
                  <div class="text-center">
                    <h1 class="text-[10dvh] leading-[10dvh] font-extrabold">
                      <span class="block">Article</span>
                      <span class="block">not fount</span>
                    </h1>
                  </div>
                </div>
              </div>
              <div class="flex-1 min-h-screen">
                <div class="w-full h-full bg-candle-600">
                  <router-link to="/catalogue">
                    <h2 class="text-[7dvh] leading-[7dvh] font-extrabold text-ice-50 p-8">
                      <span>Back to</span><br>
                      <span>Contents</span>
                    </h2>
                  </router-link>
                </div>
              </div>
            </div>
          </template>
        </section>
      </template>
    </main>

    <Footer />
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import PageHeader from '@/components/PageHeader.vue'
import Footer from '@/components/Footer.vue'
import PostDetail from "@/components/PostDetail.vue";
import type { Post } from '@/types'
import { fetchPostById } from "@/services/post.ts";
import { useLoading } from "@/composables/useLoading.ts";
import BreadcrumbNav from "@/components/BreadcrumbNav.vue";

const route = useRoute()

const { show, hide } = useLoading()

const post = ref<Post | null>(null)
const loading = ref(true)

const breadcrumbItem = ref([
  { label: 'Home', to: '/' },
  { label: 'Catalogue', to: '/catalogue' },
  { label: 'post' }
])

async function loadPost(postId: string): Promise<void> {
  show('获取文章中......')
  loading.value = true
  if (!postId) {
    post.value = null
    return
  }
  post.value = await fetchPostById(postId)
  loading.value = false
  hide()
}

watch(() => route.params.postId, (postId) => {
  loadPost(postId as string)
},
{
  immediate: true
})
</script>