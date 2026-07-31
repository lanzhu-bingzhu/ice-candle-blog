<template>
  <div class="home-root min-h-screen bg-linear-to-b from-[#e8f4fd] to-[#f9fcff] text-slate-800">
    <PageHeader />

    <main>
      <section>
        <div class="container mx-auto">
          <div class="flex p-16">
            <div class="flex-1">
              <div class="p-8">
                <div class="w-full h-auto bg-ice-900/40"></div>
              </div>
            </div>
            <div class="flex-1">
              <div class="p-8">
                <div class="py-8">
                  <h2 class="text-4xl font-bold">Category Directory</h2>
                </div>
                <ul class="px-8 py-16">
                  <template v-for="item in categoryMap">
                    <li>
                      <h3 class="flex py-2">
                        <span class="pr-4 font-bold">{{ item.name }}</span>
                        <span class="text-dark/60">{{ item.description }}</span>
                        <span class="flex-1 toc-dots"></span>
                        <span>{{ item.category_id }}</span>
                      </h3>
                      <ul>
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
                      </ul>
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

const selectedCategoryId = ref<string | number>(route.params.categoryId as string)
const categoryMap = ref<Category[]>([])
const params = ref<Record<string, any>>({})
const loading = ref(false)

async function loadCategories(params: Record<string, any>): Promise<void> {
  loading.value = true

  try {
    const data = await fetchAllCategories(params)
    categoryMap.value = treeCategory(data, 0)
    console.log(categoryMap.value)
  } catch (e: any) {
    loading.value = false
  }
}

function treeCategory(data: Category[], parent_id: string | number) {
  const treeData: Category[] = []
  for (const i in data) {
    if (data[i].parent_id === parent_id) {
      treeData[i] = data[i]
      treeData[i].children = treeCategory(data, data[i].category_id).filter(item => item)
    }
  }
  return treeData
}

onMounted(() => {
  if (selectedCategoryId.value) {
    params.value.category_id = selectedCategoryId.value
  }
  loadCategories(params.value)
})

watch(() => route.params.categoryId, (newId) => {
  if (newId) {
    selectedCategoryId.value = newId as string
    if (selectedCategoryId.value) {
      params.value.category_id = selectedCategoryId.value
    }
    loadCategories(params.value)
  }
})
</script>

<style scoped>

</style>