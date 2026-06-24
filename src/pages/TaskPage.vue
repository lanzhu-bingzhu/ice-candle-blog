<template>
  <div class="flex flex-col min-h-screen bg-gradient-to-b from-[#e8f4fd] to-[#f9fcff] text-slate-800">
    <!-- 顶部导航：只显示 Logo -->
    <PageHeader />

    <!-- 主体内容 -->
    <main class="flex-1 max-w-6xl mx-auto w-full px-4 py-8">
      <!-- 未找到任务 -->
      <div v-if="!task && !loading" class="text-center py-12 text-slate-400">
        <p class="text-lg">任务不存在</p>
        <router-link to="/" class="text-blue-500 hover:underline mt-2 inline-block">返回首页</router-link>
      </div>

      <!-- 任务内容 -->
      <template v-if="task">
        <div class="bg-white/80 backdrop-blur-sm border border-slate-200 rounded-2xl overflow-hidden shadow-sm mb-8">
          <img v-if="task.header_image" :src="task.header_image" alt="头图" class="w-full h-48 object-cover" />
          <div class="p-6">
            <h2 class="text-2xl font-bold text-slate-800 mb-4 flex items-center gap-2">
              <span>📋</span> {{ task.title }}
            </h2>
            <div class="prose prose-slate max-w-none text-slate-600 mb-6" v-html="task.overall_description" />

            <div v-if="task.deadline" class="flex flex-wrap items-center gap-4 text-sm">
              <div class="flex items-center gap-1 text-slate-500">
                <span>📅</span>
                <span>目标完成时间：{{ formatDeadline(task.deadline) }}</span>
              </div>
              <div class="flex items-center gap-1" :class="countdownOver ? 'text-green-600' : 'text-blue-600'">
                <span>⏳</span>
                <span>{{ countdownText }}</span>
              </div>
            </div>
          </div>
        </div>

        <!-- 节点列表 -->
        <div class="space-y-4">
          <div
            v-for="node in task.task_nodes"
            :key="node.id"
            class="bg-white/80 backdrop-blur-sm border border-slate-200 rounded-xl overflow-hidden shadow-sm transition-all"
          >
            <button
              @click="toggleNode(node.id)"
              class="w-full flex items-center justify-between p-5 text-left hover:bg-blue-50/50 transition-colors"
            >
              <div class="flex items-center gap-3 flex-1 min-w-0">
                <span class="text-xl flex-shrink-0">
                  {{ node.status === 'done' ? '✅' : node.status === 'doing' ? '🔄' : '⏳' }}
                </span>
                <div class="flex-1 min-w-0">
                  <h3 class="font-semibold text-slate-800 truncate">{{ node.title }}</h3>
                  <p class="text-sm text-slate-400 mt-1 truncate">{{ node.description }}</p>
                </div>
              </div>
              <div class="flex items-center gap-3 flex-shrink-0 ml-4">
                <span
                  class="text-xs px-2 py-1 rounded-full font-medium"
                  :class="{
                    'bg-green-100 text-green-700': node.status === 'done',
                    'bg-amber-100 text-amber-700': node.status === 'doing',
                    'bg-slate-100 text-slate-500': node.status === 'pending'
                  }"
                >
                  {{ node.status === 'done' ? '已完成' : node.status === 'doing' ? '进行中' : '待开始' }}
                </span>
                <span
                  class="text-slate-400 transition-transform duration-300"
                  :class="expandedNodes.has(node.id) ? 'rotate-180' : ''"
                >
                  ▼
                </span>
              </div>
            </button>

            <div
              v-if="expandedNodes.has(node.id)"
              class="px-5 pb-5 border-t border-slate-100 pt-4 bg-slate-50/50 space-y-3"
            >
              <div class="prose prose-slate max-w-none text-slate-600" v-html="node.details" />
              <div v-if="node.completed_at" class="text-sm text-green-600 flex items-center gap-1">
                <span>✅</span> 完成于 {{ node.completed_at }}
              </div>
              <div v-if="node.status === 'done' && node.result" class="space-y-3">
                <div v-if="node.result.text" class="text-sm text-slate-600 bg-white p-3 rounded-lg">
                  {{ node.result.text }}
                </div>
                <div v-if="node.result.images?.length" class="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <img
                    v-for="(img, idx) in node.result.images"
                    :key="idx"
                    :src="img"
                    alt="结果图片"
                    class="rounded-lg border border-slate-200 shadow-sm w-full"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </template>
    </main>

    <Footer />
  </div>
</template>

<script setup lang="ts">
import { ref, watch, onMounted, computed } from 'vue'
import { useRoute } from 'vue-router'
import Footer from '@/components/Footer.vue'
import { useTaskData } from '@/composables/useTaskData'
import PageHeader from "@/components/PageHeader.vue";

const route = useRoute()
const { task, loading, getTask } = useTaskData()

const expandedNodes = ref(new Set<string>())

const loadTask = async (name: string) => {
  await getTask(name)
}

// 监听路由变化加载任务
watch(() => route.params.taskName, (newName) => {
  if (newName) loadTask(newName as string)
}, { immediate: true })

// 保留原有倒计时、折叠等逻辑（基于 task）
const now = ref(Date.now())
let timer: number

function toggleNode(id: string) {
  if (expandedNodes.value.has(id)) {
    expandedNodes.value.delete(id)
  } else {
    expandedNodes.value.add(id)
  }
  expandedNodes.value = new Set(expandedNodes.value)
}

function formatDeadline(d: string) {
  const date = new Date(d)
  return date.toLocaleDateString('zh-CN', { year: 'numeric', month: 'long', day: 'numeric' })
}

const countdownText = computed(() => {
  if (!task.value?.deadline) return ''
  const target = new Date(task.value.deadline).getTime()
  const diff = target - now.value
  if (diff <= 0) return '已过期'
  const days = Math.floor(diff / (1000 * 60 * 60 * 24))
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))
  const seconds = Math.floor((diff % (1000 * 60)) / 1000)
  return `剩余 ${days} 天 ${hours} 时 ${minutes} 分 ${seconds} 秒`
})

const countdownOver = computed(() => {
  if (!task.value?.deadline) return false
  return new Date(task.value.deadline).getTime() - now.value <= 0
})

onMounted(() => {
  timer = window.setInterval(() => { now.value = Date.now() }, 1000)
})
</script>