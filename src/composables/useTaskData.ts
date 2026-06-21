import { ref } from 'vue'
import type { Task } from '@/types'

// 任务字典
const tasks: Record<string, Task> = {
  'painting-showcase': {
    id: 'task-002',
    title: 'Lolo的绘画挑战',
    headerImage: '/images/paintings.jpg',
    deadline: '2026-12-19 23:59:59',
    overallDescription: `
      <p>来自冰烛的挑战，半年挑战产出三张画，Lolo将展示他的绘画技巧和创意。</p>
      <p>他是否能在时限内完成挑战吗？</p>
    `,
    nodes: [
      {
        id: 'node-1',
        title: '第一张图的需求',
        description: '轻松、惬意',
        details: `
          <p>可选的元素</p>
          <ul>
            <li>应有瀑布袖元素</li>
            <li>女性、头发长度不过肩</li>
            <li>如上色，则已青色为主色</li>
          </ul>
        `,
        status: 'pending',
      }
    ]
  }
}

export function useTaskData() {
  const loading = ref(false)

  // 根据任务名称获取任务数据
  const getTask = (taskName: string): Task | undefined => {
    return tasks[taskName]
  }

  // 获取所有任务名称列表（可选，用于索引页）
  const getAllTaskNames = (): string[] => {
    return Object.keys(tasks)
  }

  // 模拟异步加载
  const fetchTask = async () => {
    loading.value = true
    await new Promise(resolve => setTimeout(resolve, 300))
    loading.value = false
  }

  return { getTask, getAllTaskNames, loading, fetchTask }
}