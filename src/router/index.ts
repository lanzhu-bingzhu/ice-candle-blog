import { createRouter, createWebHistory } from 'vue-router'
import Home from '../pages/Home.vue'
import CategoryPage from '../pages/CategoryPage.vue'
import PostPage from '../pages/PostPage.vue'
import TaskPage from '@/pages/TaskPage.vue'

const routes = [
  { path: '/', name: 'Home', component: Home },
  { path: '/category/:categoryId', name: 'Category', component: CategoryPage },
  { path: '/post/:postId', name: 'Post', component: PostPage },
  { path: '/task/:taskName', component: TaskPage },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (to.name === 'Home') return false // 不触发路由滚动
    return { top: 0 }
  }
})

export default router