import { createRouter, createWebHistory } from 'vue-router'
import index from '../pages/index.vue'
import about from '../pages/about.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'index',
      component: index
    },
    {
      path: '/about',
      name: 'about',
      component: about
    }
  ]
})

export default router
