import { ref } from 'vue'

const loadingCount = ref(0)
const globalLoading = ref(false)
const loadingText = ref('加载中...')

export function useLoading() {
  const show = (text?: string) => {
    if (text) loadingText.value = text
    loadingCount.value++
    globalLoading.value = true
  }
  const hide = () => {
    loadingCount.value = Math.max(0, loadingCount.value - 1)
    if (loadingCount.value === 0) {
      globalLoading.value = false
    }
  }
  return { loading: globalLoading, loadingText, show, hide }
}