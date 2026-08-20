<template>
  <div class="bg-linear-to-b from-[#e8f4fd] to-[#f9fcff] text-slate-800">
    <PageHeader />

    <main class="z-10 min-h-screen">
      <section>
        <div class="container mx-auto">
          <BreadcrumbNav :items="breadcrumbItem"></BreadcrumbNav>
          <div class="flex p-16">
            <div class="flex-2 border-r-1 border-dark-800/10">
              <div class="px-16 py-4">
                <h2 class="text-5xl font-bold pb-4 mb-4 border-b">
                  <span class="block text-ice-600">Category</span>
                  <span class="block">Directory</span>
                </h2>
                <ul>
                  <template v-if="selectedCategory && 'parent_id' in selectedCategory">
                    <li class="border-b border-dark/30 p-4">
                      <router-link :to="selectedCategory.parent_id ? `/catalogue/${selectedCategory.parent_id}` : `/catalogue`">
                        <p class="w-full indent-4 text-xl text-ice-600 hover:text-ice-800">
                          <span>
                            <span class="icon-[material-symbols--arrow-back-ios]"></span> Go back
                          </span>
                        </p>
                      </router-link>
                    </li>
                  </template>
                  <template v-else-if="!categoryMap.length">
                    <li class="border-b border-dark/30 p-4">
                      <router-link to="/catalogue">
                        <p class="w-full indent-4 text-xl text-ice-600 hover:text-ice-800">
                          <span>View all</span>
                        </p>
                      </router-link>
                    </li>
                  </template>
                  <template v-for="item in categoryMap">
                    <li class="border-b border-dark/30 p-4">
                      <router-link :to="`/catalogue/${item.category_id}`">
                        <p class="w-full indent-4 text-xl hover:text-ice-800">
                          <span>{{ item.name }}</span>
                        </p>
                      </router-link>
                    </li>
                  </template>
                </ul>
              </div>
            </div>
            <div class="flex-5">
              <div class="p-16">
                <h2 class="text-4xl pb-8 font-bold">
                  <span>Posts</span>
                  <span v-if="selectedCategory && 'name' in selectedCategory"> from the <span class="font-normal">{{ selectedCategory.name }}</span> category</span>
                  <span v-else> all</span>
                </h2>
                <ul class="w-full mx-auto px-8">
                  <template v-for="post in posts">
                    <router-link :to="`/post/${post.post_id}`">
                      <li class="group flex border-b border-dark/30 p-4">
                        <div class="flex-1">
                          <p class="text-xl text-dark leading-10 group-hover:text-ice-800">{{ post.title }}</p>
                          <p class="text-sm text-dark/70 text-ellipsis line-clamp-2 group-hover:text-dark/40">
                            <span>{{ post.description ? post.description : post.summary }}</span>
                          </p>
                        </div>
                        <div class="flex items-end px-8">
                          <span class="text-sm text-dark/30 group-hover:text-ice-600/70">查看详情</span>
                        </div>
                      </li>
                    </router-link>
                  </template>
                </ul>
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
import PageHeader from "@/components/PageHeader.vue";
import Footer from "@/components/Footer.vue";
import { ref, onMounted, watch, computed } from "vue";
import { useRoute } from 'vue-router'
import { fetchCategories, fetchCategoryById } from "@/services/category.ts";
import { fetchPosts } from "@/services/post.ts";
import type { Category, Post } from "@/types";
import { useLoading } from "@/composables/useLoading.ts";
import BreadcrumbNav from "@/components/BreadcrumbNav.vue";
import { useHead } from '@vueuse/head'

const route = useRoute()

const { show, hide } = useLoading()

const selectedCategoryId = ref<string | number>(route.params.categoryId as string)
const categoryMap = ref<Category[]>([])
const selectedCategory = ref<Record<string, any>>()
const posts = ref<Post[]>([])
const params = ref<Record<string, any>>({})
const postParams = ref<Record<string, any>>({})
const postLoading = ref(false)

const pageTitle = computed(() => {
  return selectedCategory.value && 'name' in selectedCategory.value ? `${selectedCategory.value.name} Catalogue - Ice Candle` : 'Catalogue - Ice Candle'
})

const breadcrumbItemLabel = computed(() => {
  return selectedCategory.value && 'name' in selectedCategory.value ? `Catalogue - ${selectedCategory.value.name}` : 'Catalogue'
})

useHead({
  title: pageTitle
})

const breadcrumbItem = ref([
  { label: 'Home', to: '/' },
  { label: breadcrumbItemLabel }
])

async function loadData(): Promise<void> {
  if (selectedCategoryId.value) {
    selectedCategory.value = await fetchCategoryById(selectedCategoryId.value)
  } else {
    selectedCategory.value = {}
  }
}

async function loadCategories(params?: Record<string, any>): Promise<void> {
  show('loading......')
  try {
    categoryMap.value = await fetchCategories(params)
    hide()
  } catch (e: any) {
    hide()
  }
}

async function loadPosts(params?: Record<string, any>): Promise<void> {
  postLoading.value = true
  try {
    posts.value = await fetchPosts(params)
    postLoading.value = false
  } catch (e: any) {
    postLoading.value = false
  }
}

onMounted(() => {
  loadData()
  params.value.parent_id = 0
  if (selectedCategoryId.value) {
    params.value.parent_id = selectedCategoryId.value
    postParams.value.category_id = selectedCategoryId.value
  }
  loadCategories(params.value)
  loadPosts(postParams.value)
})

watch(() => route.params, newParams => {
  categoryMap.value = []
  posts.value = []
  selectedCategory.value = {}
  if (newParams.categoryId) {
    selectedCategoryId.value = newParams.categoryId as string
    loadData()
    params.value.parent_id = selectedCategoryId.value
    postParams.value.category_id = selectedCategoryId.value
    loadCategories(params.value)
    loadPosts(postParams.value)
  } else {
    selectedCategoryId.value = ''
    loadData()
    params.value.parent_id = 0
    loadCategories(params.value)
    loadPosts()
  }
},{ immediate: true })
</script>

<style scoped>

</style>