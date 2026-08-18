<template>
  <div class="bg-linear-to-b from-[#e8f4fd] to-[#f9fcff] text-slate-800">
    <PageHeader />

    <main class="z-10 min-h-screen">
      <template v-if="!loading">
        <section>
          <template v-if="post">
            <div class="container mx-auto">
              <div class="w-full">
                <BreadcrumbNav :items="breadcrumbItem" />
                <div class="w-full h-[580px] mb-8 bg-white border-4 border-white">
                  <img :src="post.cover" alt="alt" class="w-full h-full object-cover aspect-square" />
                </div>
                <div class="flex mb-8">
                  <div class="flex-1 text-ice-50">
                    <div class="bg-candle-600 p-8 mb-2">
                      <h2 class="font-bold pb-2 border-b-1 border-ice-50 border-dashed">Author information</h2>
                      <div class="w-2/3 mx-auto p-8">
                        <div>
                          <img src="/images/avatar.jpg" alt="alt" class="w-full h-auto rounded-full border-8 border-ice-50 object-cover aspect-square" />
                        </div>
                        <div class="font-bold text-2xl text-center mt-8">
                          <span>Ice Candle</span>
                        </div>
                      </div>
                    </div>
                    <div class="bg-ice-600 p-8">
                      <h2 class="font-bold pb-2 border-b-1 border-ice-50 border-dashed">Content details</h2>
                      <div class="py-4">
                        <div class="p-2">
                          <h3 class="font-bold py-1">Posting time</h3>
                          <p class="text-sm">{{ post.created_at }}</p>
                        </div>
                        <div v-if="post.updated_at" class="p-2">
                          <h3 class="font-bold py-1">Edit time</h3>
                          <p class="text-sm">{{ post.updated_at }}</p>
                        </div>
                        <div class="p-2">
                          <h3 class="font-bold py-1">Description or summary</h3>
                          <p class="text-sm">{{ post.description ? post.description : post.summary }}</p>
                        </div>
                      </div>
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
import { ref, watch, computed } from 'vue'
import { useRoute } from 'vue-router'
import PageHeader from '@/components/PageHeader.vue'
import Footer from '@/components/Footer.vue'
import PostDetail from "@/components/PostDetail.vue";
import type { Post } from '@/types'
import { fetchPostById } from "@/services/post.ts";
import { useLoading } from "@/composables/useLoading.ts";
import BreadcrumbNav from "@/components/BreadcrumbNav.vue";
import { useHead } from "@vueuse/head";
import {fetchCategoryById} from "@/services/category.ts";

const route = useRoute()

const { show, hide } = useLoading()

const post = ref<Post | null>(null)
const selectedCategory = ref<Record<string, any>>()
const loading = ref(true)

const pageTitle = computed(() => {
  return post.value?.title ? `${post.value.title} - Ice Candle` : 'Ice Candle'
})

const pageDescription = computed(() => {
  return post.value?.description || post.value?.summary || 'Ice candle - 个人兴趣分享网站，主要分享有关游戏、绘画和编程的个人心得。'
})

const breadcrumbCatalogueItemLabel = computed(() => {
  return selectedCategory.value?.name ? `Catalogue - ${selectedCategory.value.name}` : 'Catalogue'
})

const breadcrumbCatalogueItemTo = computed(() => {
  return selectedCategory.value?.category_id ? `/catalogue/${selectedCategory.value.category_id}` : '/catalogue'
})

const breadcrumbPostItemLabel = computed(() => {
  return post.value?.title ? `Post - ${post.value.title}` : 'Post'
})

useHead({
  title: pageTitle,
  meta: [
    { name: 'description', content: pageDescription },
    { property: 'og:title', content: pageTitle },
    { property: 'og:description', content: pageDescription },
  ],
})

const breadcrumbItem = ref([
  { label: 'Home', to: '/' },
  { label: breadcrumbCatalogueItemLabel, to: breadcrumbCatalogueItemTo },
  { label: breadcrumbPostItemLabel }
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

async function loadCategoryDetail(categoryId: string): Promise<void> {
  if (categoryId) {
    selectedCategory.value = await fetchCategoryById(categoryId)
  } else {
    selectedCategory.value = {}
  }
}


watch(() => route.params, params => {
  loadPost(params.postId as string).then(() => {
    if (post.value) {
      loadCategoryDetail(post.value.category_id as string)
    }
  })
}, {
  immediate: true
})
</script>