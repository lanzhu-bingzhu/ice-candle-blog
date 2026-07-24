<template>
  <section class="w-full">
    <div class="w-[1600px] mx-auto px-4 py-4 mt-8 mb-8">
      <div class="w-full flex items-center pb-4 pt-4">
        <div>
          <h3 class="text-3xl font-bold text-ice-900 mb-2">全部分类</h3>
        </div>
      </div>
      <div class="w-full grid" :class="`grid-cols-${topCategories.length}`">
        <template v-for="item in topCategories">
          <div class="transition-all w-full bg-ice-50 group border border-white/0 bg-white/0 hover:border-white/70 hover:bg-white/70 px-4 py-4">
            <div class="block overflow-hidden duration-500">
              <img src="/images/GUMI.jpg" alt="alt" class="w-full h-auto object-cover aspect-[5/4]" />
            </div>
            <div class="pt-4 pb-4">
              <h3 class="text-xl font-bold text-ice-900 mb-2">{{ item.name }}</h3>
              <p class="mt-1 text-ice-600/70 text-lg">{{ item.description }}</p>
              <router-link :to="`/category/${item.category_id}`">
                <button class="transition w-full text-ice-700 hover:bg-ice-700 hover:text-white cursor-pointer gap-1 px-3 py-1.5 mt-3">查看更多</button>
              </router-link>
            </div>
          </div>
        </template>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { onMounted } from "vue";
import { useHomeData } from "@/composables/useHomeData.ts";

const { loadTopCategories, topCategories } = useHomeData()

async function loadTopCategoryData() {
  if (topCategories.value.length == 0) {
    await loadTopCategories()
  }
}

onMounted(loadTopCategoryData)
</script>

<style scoped>

</style>