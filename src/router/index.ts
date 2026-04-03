import { createRouter, createWebHistory } from 'vue-router'
import CreateView from '../views/CreateView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: "/create"
    },
    {
      path: '/create',
      name: 'create',
      component: CreateView,
    },
    {
      path: '/:id',
      name: ':id',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue'),
    },
  ],
})

export default router
