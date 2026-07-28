<template>
  <div class="home-root min-h-screen bg-gradient-to-b from-[#e8f4fd] to-[#f9fcff] text-slate-800">
    <PageHeader />

    <main class="z-10">
      <section class="w-full">
        <div class="overflow-hidden duration-500 w-full h-[80dvh] bg-dark-800 flex">
          <div class="flex-1">
            <img src="/images/header-floor.jpg" alt="alt" class="w-full h-auto object-cover aspect-[8/21]" />
          </div>
          <div class="flex-2 ml-[30%] flex items-center justify-center">
            <div>
              <div class="text-ice-50 p-8">
                <h1 class="text-8xl font-extrabold tracking-widest"><span class="text-ice-600">ICE</span> CANDLE</h1>
                <p class="text-2xl font-bold pt-6 tracking-[.9em] pl-[0.25em]">冰烛的个人网站</p>
              </div>
              <div class="text-2xl text-ice-50/80 p-8">
                <p>
                  <span><span class="text-ice-400/60">Ⅰ.</span> Recommendations</span>
                  <span class="pl-4"><span class="text-ice-400/60">Ⅱ.</span> Content Navigation</span>
                  <span class="pl-4"><span class="text-ice-400/60">Ⅲ.</span> Posts</span>
                  <span class="pl-4"><span class="text-ice-400/60">Ⅳ.</span> Programming</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section class="w-full">
        <div class="p-16">
          <div class="w-full flex">
            <div class="flex-5">
              <Banner image="/images/GUMI.jpg" link="https://www.bilibili.com/video/BV1mx41197L6" aspect="aspect-[16/9]" />
            </div>
            <div class="w-full flex-2 flex items-center justify-center">
              <div>
                <h2 class="text-4xl font-bold">Banner <span class="text-ice-600">NO.1</span></h2>
                <h3 class="text-2xl text-dark/70 mt-4">GUMI</h3>
                <p class="text-xl text-dark/40">GUMI Music Recommendation</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section class="w-full">
        <div class="w-full flex">
          <div class="flex-1">
            <div class="my-16 ml-44 py-32">
              <h2 class="text-4xl pb-16">
                <span class="text-ice-600 font-bold pr-2">2.</span>
                <span>Content Navigation</span>
              </h2>
              <ul class="w-[80%] mx-auto">
                <template v-for="item in topCategories">
                  <li class="border-b-1 p-4">
                    <p class="text-xl text-dark leading-10">{{ item.name }}</p>
                    <p class="text-sm text-dark/70">
                      <span>{{ item.description }}</span>
                      <span class="float-right text-dark/40 hover:text-ice-600/70">
                        <router-link :to="`/category/${item.category_id}`">
                          查看分类
                        </router-link>
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
                <img src="/images/04.jpg" alt="alt" class="w-full object-cover aspect-[1/1]" />
              </div>
              <div class="w-full h-[10%] bg-candle-400"></div>
            </div>
          </div>
        </div>
      </section>

      <section class="w-full">
        <div>

        </div>
      </section>

      <!-- 通用楼层循环 -->
<!--      <template v-for="floor in floors" :key="floor.floor_id">-->
<!--        <SectionFloor v-bind="floor" />-->
<!--      </template>-->

    </main>

    <!-- 备案信息底部 -->
    <Footer />
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
// import SectionFloor from '@/components/SectionFloor.vue'
import Footer from '@/components/Footer.vue'
import { useHomeData } from '@/composables/useHomeData'
import PageHeader from '@/components/PageHeader.vue'
import Banner from "@/components/Banner.vue";

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