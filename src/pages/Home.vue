<template>
  <div class="bg-linear-to-b from-[#e8f4fd] to-[#f9fcff] text-slate-800">
    <PageHeader />

    <main class="z-10 min-h-screen ">
      <section>
        <div class="w-full">
          <div class="overflow-hidden duration-500 w-full h-[80dvh] bg-dark-800 flex">
            <div class="flex-1">
              <img src="/images/header-floor.jpg" alt="alt" class="w-full h-auto object-cover aspect-8/21" />
            </div>
            <div class="flex-2 ml-[25%] flex items-center justify-center">
              <div>
                <div class="text-ice-50 p-8">
                  <h1 class="text-8xl font-extrabold tracking-widest"><span class="text-ice-600">ICE</span> CANDLE</h1>
                  <p class="text-2xl font-bold pt-6 tracking-[.9em] pl-[0.25em]">冰烛的个人网站</p>
                </div>
                <div class="text-2xl text-ice-50/80 p-8">
                  <p>
                    <span><span class="text-ice-400/60">Ⅰ.</span> Content Navigation</span>
                    <span class="pl-4"><span class="text-ice-400/60">Ⅱ.</span> Recommendations</span>
                    <span class="pl-4"><span class="text-ice-400/60">Ⅲ.</span> Posts</span>
                    <span class="pl-4"><span class="text-ice-400/60">Ⅳ.</span> Programming</span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <ContentNavigation :topCategories="topCategories" />

      <!-- <Recommendations /> -->

      <RecommendationsV2 />

<!--      <section>-->
<!--        <div class="container mx-auto">-->
<!--          <div class="px-16">-->
<!--            <div class="w-full flex py-16">-->
<!--              <div class="flex-5 mr-[10%]">-->
<!--                <div class="pb-8">-->
<!--                  <h2 class="text-4xl font-bold">Hatsune Miku</h2>-->
<!--                  <p class="text-dark/40">The best of Hatsune Miku form Ice Candle</p>-->
<!--                </div>-->
<!--                <ul class="px-8">-->
<!--                  <li class="border-b p-4">-->
<!--                    <p class="text-xl text-dark leading-10">占位内容</p>-->
<!--                    <p class="text-sm text-dark/70">-->
<!--                      <span>占位内容</span>-->
<!--                      <span class="float-right text-dark/40 hover:text-ice-600/70">-->
<!--                        <a href="">查看</a>-->
<!--                      </span>-->
<!--                    </p>-->
<!--                  </li>-->
<!--                </ul>-->
<!--              </div>-->
<!--              <div class="flex-7 overflow-hidden bg-ice-600">-->
<!--                <img src="/images/miku.jpg" alt="alt" class="w-full h-full object-cover aspect-square" />-->
<!--              </div>-->
<!--            </div>-->
<!--          </div>-->
<!--        </div>-->
<!--      </section>-->
<!--      -->
<!--      <section>-->
<!--        <div class="container mx-auto">-->
<!--          <div class="px-16">-->
<!--            <div class="w-full flex py-16">-->
<!--              <div class="flex-7 overflow-hidden bg-candle-500">-->
<!--                <img src="/images/teto.jpg" alt="alt" class="w-full h-full object-cover aspect-square" />-->
<!--              </div>-->
<!--              <div class="flex-5 ml-[10%]">-->
<!--                <div class="text-right pb-8">-->
<!--                  <h2 class="text-4xl font-bold">Kasane Teto</h2>-->
<!--                  <p class="text-dark/40">The best of Kasane Teto form Ice Candle</p>-->
<!--                </div>-->
<!--                <ul class="w-full px-8 float-right">-->
<!--                  <li class="border-b p-4">-->
<!--                    <p class="text-xl text-dark leading-10">占位内容</p>-->
<!--                    <p class="text-sm text-dark/70">-->
<!--                      <span>占位内容</span>-->
<!--                      <span class="float-right text-dark/40 hover:text-ice-600/70">-->
<!--                        <a href="">查看</a>-->
<!--                      </span>-->
<!--                    </p>-->
<!--                  </li>-->
<!--                </ul>-->
<!--              </div>-->
<!--            </div>-->
<!--          </div>-->
<!--        </div>-->
<!--      </section>-->

<!--      <section>-->
<!--        <div class="container mx-auto">-->
<!--          <div class="px-16">-->
<!--            <div class="w-full flex py-16">-->
<!--              <div class="flex-5 mr-[10%]">-->
<!--                <div class="pb-8">-->
<!--                  <h2 class="text-4xl font-bold">GUMI</h2>-->
<!--                  <p class="text-dark/40">The best of GUMI form Ice Candle</p>-->
<!--                </div>-->
<!--                <ul class="full px-8">-->
<!--                  <li class="border-b p-4">-->
<!--                    <p class="text-xl text-dark leading-10">占位内容</p>-->
<!--                    <p class="text-sm text-dark/70">-->
<!--                      <span>占位内容</span>-->
<!--                      <span class="float-right text-dark/40 hover:text-ice-600/70">-->
<!--                        <a href="">查看</a>-->
<!--                      </span>-->
<!--                    </p>-->
<!--                  </li>-->
<!--                </ul>-->
<!--              </div>-->
<!--              <div class="flex-7 overflow-hidden bg-ice-600">-->
<!--                <img src="/images/GUMI.jpg" alt="alt" class="w-full h-full object-cover aspect-square" />-->
<!--              </div>-->
<!--            </div>-->
<!--          </div>-->
<!--        </div>-->
<!--      </section>-->

      <Posts :posts="posts" />

      <section>
        <div class="container mx-auto">
          <div class="p-16">
            <div class="w-full flex">
              <div class="w-full h-auto flex-1">
                <div class="w-full h-9/16 flex items-end justify-end p-2">
                  <h2 class="text-right font-bold leading-normal">
                    <span class="text-6xl text-ice-600">Website</span><br/>
                    <span class="text-4xl">Introduction</span>
                  </h2>
                </div>
                <div class="w-[150%] h-6/16 bg-ice-600 relative">
                  <div class="p-16 text-ice-50">
                    <p>一个记录兴趣爱好和杂事的个人小站。</p>
                    <p>冰不冷，烛有光。</p>
                  </div>
                </div>
                <div class="w-full h-1/16">
                  <div class="w-full h-full flex items-end">
                    <p class="text-sm text-dark/40 leading-normal font-extrabold">ICE CANDLE</p>
                  </div>
                </div>
              </div>
              <div class="w-full h-full flex-3 overflow-hidden">
                <img src="/images/footer.jpeg" alt="alt" class="w-full h-full object-cover aspect-square" />
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
import type { Post } from "@/types";
// import SectionFloor from '@/components/SectionFloor.vue'
// import Recommendations from '@/components/floors/Recommendations.vue'

const { loadTopCategories, topCategories } = useHomeData()

const posts = ref<Post[]>([])

async function loadTopCategoryData() {
  if (topCategories.value.length == 0) {
    await loadTopCategories()
  }
}

async function loadPosts(params?: Record<string, any>): Promise<void> {
  posts.value = await fetchPosts(params)
}

onMounted(() => {
  loadTopCategoryData()
  loadPosts()
})
</script>

<style scoped>
</style>