import { createRouter, createWebHistory } from 'vue-router'
import Home from '../pages/Home.vue'
import CategoryPage from '../pages/CategoryPage.vue'
import PostPage from '../pages/PostPage.vue'

const routes = [
  { path: '/', component: Home },
  { path: '/category/:categoryId', component: CategoryPage },
  { path: '/post/:postId', component: PostPage },
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router