import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import TheAuth from '../views/TheAuth.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/auth',
    name: 'TheAuth',
    component: TheAuth,
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

export default router
