import { ref, computed } from 'vue'
import type { Task } from '@/types'

// 任务字典
const tasks: Record<string, Task> = {
  'personal-website': {
    id: 'task-001',
    title: '个人网站开发',
    headerImage: '/images/02.png',
    deadline: '2026-07-15 23:59:59',
    overallDescription: `
      <p>搭建一个展示个人作品和文章的个人网站，要求：</p>
      <ul>
        <li>采用 Vue 3 + TypeScript 技术栈</li>
        <li>设计风格为明亮冰蓝色系</li>
        <li>包含游戏、绘画、ACG、音乐、技术五大板块</li>
        <li>支持文章和图文两种展示形式</li>
        <li>响应式布局，适配移动端</li>
      </ul>
    `,
    nodes: [
      {
        id: 'node-1',
        title: '项目初始化',
        description: '使用 Vite 创建项目，安装依赖，配置路由、状态管理、Axios',
        details: `
          <p>具体步骤：</p>
          <ol>
            <li>执行 <code>npm create vite@latest</code> 创建项目</li>
            <li>安装 vue-router, pinia, axios, tailwindcss 等依赖</li>
            <li>配置路径别名和全局样式</li>
            <li>搭建基础文件结构</li>
          </ol>
        `,
        status: 'done',
        completedAt: '2026-06-10',
        result: {
          text: '项目初始化完成，所有依赖安装成功，基础结构已搭建。',
          images: ['/images/01.png']
        }
      },
      {
        id: 'node-2',
        title: '首页与导航',
        description: '实现全屏滚动首页、粒子背景、动态状态条',
        details: `
          <p>实现全屏滚动首页，包含五个板块入口，以及侧边导航和 Banner</p>
          <p>注意事项：</p>
          <ul>
            <li>滚动捕捉使用 CSS scroll-snap</li>
            <li>粒子背景不干扰内容交互</li>
            <li>侧边导航在移动端可隐藏或调整位置</li>
          </ul>
        `,
        status: 'done',
        completedAt: '2026-06-14',
        result: {
          images: ['https://placehold.co/600x300/BFE0FF/333?text=首页预览图']
        }
      },
      {
        id: 'node-3',
        title: '分类与文章系统',
        description: '实现分类筛选、文章列表、文章详情页',
        details: `
          <p>需要实现：</p>
          <ul>
            <li>大分类 -> 小分类 -> 文章列表的三级结构</li>
            <li>文章详情页支持 HTML 内容渲染</li>
            <li>图文详情页展示多张图片</li>
          </ul>
        `,
        status: 'doing',
        deadline: '2026-06-20'
      },
      {
        id: 'node-4',
        title: '后端接口对接',
        description: '替换模拟数据，对接真实 API',
        details: '将 composables 中的数据改为从后端获取，并实现基本的增删改查功能。',
        status: 'pending',
        deadline: '2026-06-30'
      }
    ]
  },
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