import { createRouter, createWebHistory } from 'vue-router'
import Home from '../pages/Home.vue'
import Catalogue from '../pages/Catalogue.vue'
import PostPage from '../pages/PostPage.vue'
import TaskPage from '@/pages/TaskPage.vue'
import NotFound from '@/pages/NotFound.vue'

const routes = [
  { path: '/', name: 'Home', component: Home },
  { path: '/catalogue/:categoryId(\\d+)?', name: 'Catalogue', component: Catalogue },
  { path: '/post/:postId', name: 'Post', component: PostPage },
  { path: '/task/:taskName', component: TaskPage },
  { path: '/:pathMatch(.*)*', component: NotFound },
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router