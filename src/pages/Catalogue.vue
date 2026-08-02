<template>
  <div class="bg-linear-to-b from-[#e8f4fd] to-[#f9fcff] text-slate-800">
    <PageHeader />

    <main class="z-10 min-h-screen ">
      <section v-if="categoryMap.length">
        <div class="container mx-auto">
          <div class="flex p-16">
            <div class="flex-1">
              <div class="p-8">
                <div class="w-full h-auto overflow-hidden bg-ice-900/40">
                  <img src="/images/GUMI.jpg" alt="alt" class="w-full h-full object-cover aspect-square" />
                </div>
              </div>
            </div>
            <div class="flex-1">
              <div class="p-8">
                <div class="py-8">
                  <h2 class="text-4xl font-bold">Category Directory</h2>
                </div>
                <ul class="px-8 py-16">
                  <template v-for="item in categoryMap">
                    <li class="py-4">
                      <router-link :to="`/catalogue/${item.category_id}`">
                        <h3 class="pb-2">
                          <span class="w-full block pr-4 font-bold">{{ item.name }}</span>
                        </h3>
                        <p class="w-full flex">
                          <span class="text-dark/60">{{ item.description }}</span>
                          <span class="flex-1 toc-dots"></span>
                          <span>{{ item.category_id }}</span>
                        </p>
                      </router-link>
                      <!-- <ul>
                        <template v-for="_item in item.children">
                          <li class="pl-4 py-2">
                            <p class="flex">
                              <span class="pr-4">{{ _item.name }}</span>
                              <span class="text-dark/60">{{ _item.description }}</span>
                              <span class="flex-1 toc-dots"></span>
                              <span>{{ _item.category_id }}</span>
                            </p>
                          </li>
                        </template>
                      </ul> -->
                    </li>
                  </template>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section>
        <div class="container mx-auto">

        </div>
      </section>
    </main>

    <Footer />
  </div>
</template>

<script setup lang="ts">
import PageHeader from "@/components/PageHeader.vue";
import Footer from "@/components/Footer.vue";
import { ref, onMounted, watch } from "vue";
import { useRoute } from 'vue-router'
import { fetchAllCategories } from "@/services/category.ts";
import type { Category } from "@/types";

const route = useRoute()

// const categoryId = ref<string | number>(route.params.categoryId as string)
const selectedCategoryId = ref<string | number>(route.params.categoryId as string)
const categoryMap = ref<Category[]>([])
const params = ref<Record<string, any>>({})
const loading = ref(false)

async function loadCategories(params: Record<string, any>): Promise<void> {
  loading.value = true

  try {
    categoryMap.value = await fetchAllCategories(params)
    // categoryMap.value = treeCategory(data, 0)
    console.log(categoryMap.value)
  } catch (e: any) {
    loading.value = false
  }
}

// function treeCategory(data: Category[], parent_id: string | number) {
//   const treeData: Category[] = []
//   for (const i in data) {
//     if (data[i].parent_id === parent_id) {
//       treeData[i] = data[i]
//       treeData[i].children = treeCategory(data, data[i].category_id).filter(item => item)
//     }
//   }
//   return treeData
// }

onMounted(() => {
  // if (categoryId.value) {
  //   params.value.category_id = categoryId.value
  // }
  params.value.parent_id = selectedCategoryId.value
  loadCategories(params.value)
})

watch(() => route.params.categoryId, (newId) => {
  if (newId) {
    selectedCategoryId.value = newId as string
    // if (categoryId.value) {
    //   params.value.category_id = categoryId.value
    // }
    params.value.parent_id = selectedCategoryId.value
    loadCategories(params.value)
  }
})
</script>

<style scoped>

</style>