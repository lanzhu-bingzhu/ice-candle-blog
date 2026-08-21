<template>
  <div class="bg-linear-to-b from-[#e8f4fd] to-[#f9fcff] text-slate-800">
    <PageHeader />

    <main class="z-10 min-h-screen ">
      <section>
        <div class="w-full">
          <div class="overflow-hidden w-full h-[80dvh] bg-dark-800 flex">
            <div class="flex-1">
              <img :src="config?.header_image" alt="alt" class="w-full h-auto object-cover aspect-8/21" />
            </div>
            <div class="flex-2 ml-[25%] flex items-center justify-center">
              <div>
                <div class="text-ice-50 p-8 pb-4">
                  <h1 class="text-8xl font-extrabold tracking-widest"><span class="text-ice-600">ICE</span> CANDLE</h1>
                  <h2 class="text-2xl font-bold pt-6 tracking-[.9em] pl-[0.25em]">冰烛的个人网站</h2>
                </div>
                <div class="text-2xl text-ice-50/80 p-8">
                  <p>
                    <span><span class="text-ice-400/60">Ⅰ.</span> Content Navigation</span>
                    <span class="pl-4"><span class="text-ice-400/60">Ⅱ.</span> Recommendations</span>
                    <span class="pl-4"><span class="text-ice-400/60">Ⅲ.</span> Posts</span>
                    <span class="pl-4"><span class="text-ice-400/60">Ⅳ.</span> Website Introduction</span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <ContentNavigation :config="config" :topCategories="topCategories" />

      <!-- <Recommendations /> -->

      <RecommendationsV2 :config="config" />

      <template v-for="item in config?.recommendations_content">
        <RecommendationsContent :content="item"></RecommendationsContent>
      </template>

      <Posts :posts="posts" />

      <section>
        <div class="container mx-auto">
          <div class="p-16">
            <div class="w-full flex">
              <div class="w-full h-auto flex-1 relative">
                <div class="w-full h-9/16 flex items-end justify-end p-2">
                  <h2 class="text-right font-bold leading-normal">
                    <span class="text-6xl text-ice-600">Website</span><br/>
                    <span class="text-4xl">Introduction</span>
                  </h2>
                </div>
                <div class="w-[440px] h-[330px] bg-ice-600 absolute">
                  <div class="w-full h-full p-16 text-ice-50 break-words" v-html="config?.introduction_text"></div>
                </div>
                <div class="w-full h-7/16">
                  <div class="w-full h-full flex items-end">
                    <p class="text-sm text-dark/40 leading-normal font-extrabold">ICE CANDLE</p>
                  </div>
                </div>
              </div>
              <div class="w-full h-full flex-3 overflow-hidden">
                <img :src="config?.introduction_image" alt="alt" class="w-full h-full object-cover aspect-square" />
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>

    <Footer />
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useHomeData } from '@/composables/useHomeData'
import Footer from '@/components/Footer.vue'
import PageHeader from '@/components/PageHeader.vue'
import ContentNavigation from '@/components/floors/ContentNavigation.vue'
import RecommendationsV2 from '@/components/floors/RecommendationsV2.vue'
import Posts from '@/components/floors/Posts.vue'
import { fetchPosts } from "@/services/post.ts";
import { fetchConfig } from "@/services/config.ts";
import type { Post, Config } from "@/types";
import RecommendationsContent from "@/components/floors/RecommendationsContent.vue";

const { loadTopCategories, topCategories } = useHomeData()

const posts = ref<Post[]>([])
const config = ref<Config | any>()

async function loadTopCategoryData(): Promise<void> {
  if (topCategories.value.length == 0) {
    await loadTopCategories()
  }
}

async function loadPosts(params?: Record<string, any>): Promise<void> {
  posts.value = await fetchPosts(params)
}

async function loadConfig(): Promise<void> {
  config.value = await fetchConfig()
}

onMounted(() => {
  loadConfig()
  loadTopCategoryData()
  loadPosts()
})
</script>

<style scoped>
</style>