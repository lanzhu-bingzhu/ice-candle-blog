import { ref, shallowRef } from 'vue'
import { fetchTaskByName } from '@/services/task'
import { useLoading } from '@/composables/useLoading'
import type { Task } from '@/types'

export function useTaskData() {
  const task = shallowRef<Task | null>(null)
  const error = ref<string | null>(null)
  const loading = ref(false)
  const { show, hide } = useLoading()

  // 根据任务名称获取任务
  async function getTask(taskName: string): Promise<Task | null> {
    if (!taskName) {
      task.value = null
      return null
    }

    loading.value = true
    error.value = null
    show('正在获取任务数据...')

    try {
      const data = await fetchTaskByName(taskName)
      task.value = data
      loading.value = false
      hide()
      return data
    } catch (e: any) {
      console.error('获取任务失败', e)
      error.value = e.message || '任务数据加载失败'
      task.value = null
      loading.value = false
      hide()
      return null
    }
  }

  // 获取所有任务（可选）
  const tasks = shallowRef<Task[]>([])
  async function fetchAllTasks() {
    loading.value = true
    error.value = null
    show('正在获取任务列表...')
    try {
      const { fetchAllTasks } = await import('@/services/task')
      const data = await fetchAllTasks()
      tasks.value = data
      loading.value = false
      hide()
      return data
    } catch (e: any) {
      error.value = e.message || '加载失败'
      loading.value = false
      hide()
      return null
    }
  }

  return { task, loading, error, getTask, tasks, fetchAllTasks }
}