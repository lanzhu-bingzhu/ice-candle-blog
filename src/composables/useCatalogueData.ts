import { ref } from 'vue'
import type { Category } from "@/types"
import { fetchAllCategories } from "@/services/category.ts";

export function useCatalogueData() {
  const categoryMap = ref<Category[]>([])
  const loading = ref(false)

  async function loadCategories(params: Record<string, any>): Promise<void> {
    loading.value = true

    try {
      categoryMap.value = await fetchAllCategories(params)
    } catch (e: any) {
      loading.value = false
    }
  }

  return { loadCategories, categoryMap, loading }
}