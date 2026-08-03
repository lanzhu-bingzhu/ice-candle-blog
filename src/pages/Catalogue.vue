<template>
  <div class="bg-linear-to-b from-[#e8f4fd] to-[#f9fcff] text-slate-800">
    <PageHeader />

    <main class="z-10 min-h-screen">
      <section>
        <div class="container mx-auto">
          <div class="flex p-16">
            <div class="flex-1 border-r-1 border-dark-800/10 p-16">
              <h2 class="text-4xl font-bold pb-8">Category Directory</h2>
              <ul>
                <template v-for="item in categoryMap">
                  <li class="border-b border-dark/60 p-4">
                    <router-link :to="`/catalogue/${item.category_id}`">
                      <p class="w-full indent-4 hover:text-ice-900">
                        <span>{{ item.name }}</span>
                      </p>
                    </router-link>
                  </li>
                </template>
              </ul>
            </div>
            <div class="flex-5 p-16">
              <h2 class="text-4xl font-bold pb-8">
                Posts
                <span v-if="selectedCategory"> - {{ selectedCategory.name }}</span>
              </h2>
              <ul class="w-full mx-auto px-8">
                <template v-for="post in posts">
                  <li class="border-b border-dark/60 p-4">
                    <router-link :to="`/post/${post.post_id}`">
                      <p class="text-xl text-dark leading-10 hover:text-ice-900">{{ post.title }}</p>
                    </router-link>
                    <p class="text-sm text-dark/70">
                      <span>{{ post.description ? post.description : post.summary }}</span>
                      <span class="float-right text-dark/40 hover:text-ice-600/70">
                        <router-link :to="`/post/${post.post_id}`">查看详情</router-link>
                      </span>
                    </p>
                  </li>
                </template>
              </ul>
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
import { ref, onMounted, watch } from "vue";
import { useRoute } from 'vue-router'
import { fetchCategories, fetchCategoryById } from "@/services/category.ts";
import { fetchPosts } from "@/services/post.ts";
import type { Category, Post } from "@/types";

const route = useRoute()

const selectedCategoryId = ref<string | number>(route.params.categoryId as string)
const categoryMap = ref<Category[]>([])
const selectedCategory = ref<Record<string, any>>()
const posts = ref<Post[]>([])
const params = ref<Record<string, any>>({})
const postParams = ref<Record<string, any>>({})
const loading = ref(false)
const postLoading = ref(false)

async function loadData(): Promise<void> {
  if (selectedCategoryId.value) {
    selectedCategory.value = await fetchCategoryById(selectedCategoryId.value)
  }
}

async function loadCategories(params?: Record<string, any>): Promise<void> {
  loading.value = true
  try {
    categoryMap.value = await fetchCategories(params)
    loading.value = false
  } catch (e: any) {
    loading.value = false
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

watch(() => route.params.categoryId, (newId) => {
  if (newId) {
    selectedCategoryId.value = newId as string
    loadData()
    params.value.parent_id = selectedCategoryId.value
    postParams.value.category_id = selectedCategoryId.value
    loadCategories(params.value)
    loadPosts(postParams.value)
  } else {
    loadData()
    params.value.parent_id = 0
    loadCategories(params.value)
    loadPosts()
  }
})
</script>

<style scoped>

</style>