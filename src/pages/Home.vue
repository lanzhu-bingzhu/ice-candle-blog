<template>
  <div class="home-root min-h-screen bg-linear-to-b from-[#e8f4fd] to-[#f9fcff] text-slate-800">
    <PageHeader />

    <main class="z-10">
      <section class="w-full">
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
      </section>

      <ContentNavigation :topCategories="topCategories" />

      <!-- <Recommendations /> -->

      <RecommendationsV2 />

      <Posts :posts="[]" />

      <!-- 通用楼层循环 -->
<!--      <template v-for="floor in floors" :key="floor.floor_id">-->
<!--        <SectionFloor v-bind="floor" />-->
<!--      </template>-->

    </main>

    <Footer />
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
// import SectionFloor from '@/components/SectionFloor.vue'
import Footer from '@/components/Footer.vue'
import { useHomeData } from '@/composables/useHomeData'
import PageHeader from '@/components/PageHeader.vue'
import ContentNavigation from '@/components/floors/ContentNavigation.vue'
// import Recommendations from '@/components/floors/Recommendations.vue'
import RecommendationsV2 from '@/components/floors/RecommendationsV2.vue'
import Posts from '@/components/floors/Posts.vue'
// import Banner from "@/components/Banner.vue";

const { loadTopCategories, topCategories } = useHomeData()

async function loadTopCategoryData() {
  if (topCategories.value.length == 0) {
    await loadTopCategories()
  }
}

onMounted(() => {
  loadTopCategoryData()
})
</script>

<style scoped>
.animate-float {
  animation: float 6s ease-in-out infinite;
}
@keyframes float {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-8px); }
}
</style>