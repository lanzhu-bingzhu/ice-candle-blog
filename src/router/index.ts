import { createRouter, createWebHistory } from 'vue-router'
import Home from '../pages/Home.vue'
// import CategoryPage from '../pages/CategoryPage.vue'
// import PostPage from '../pages/PostPage.vue'
import TaskPage from '@/pages/TaskPage.vue'
import NotFound from '@/pages/NotFound.vue'

const routes = [
  { path: '/', name: 'Home', component: Home },
  { path: '/category/:categoryId', name: 'Category', component: CategoryPage },
  { path: '/post/:postId', name: 'Post', component: PostPage },
  { path: '/task/:taskName', component: TaskPage },
  { path: '/:pathMatch(.*)*', component: NotFound },
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router