import { createRouter, createWebHistory } from 'vue-router'
import AppLayout from '@/components/layout/AppLayout.vue'
import IndexView from '@/views/IndexView.vue'
import { useTokenStore } from '@/stores/mytoken'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/login/LoginView.vue'),
    },
    {
      path: '/',
      name: 'home',
      component: AppLayout,
      meta: {
        title: '首页',
        requiresAuth: true,
      },
      children: [
        {
          path: '',
          name: 'index',
          component: IndexView,
        },
        {
          path: '/about',
          name: 'about',
          component: () => import('../views/AboutView.vue'),
        },
        {
          path: '/menus',
          name: 'menus',
          component: () => import('@/views/menu/MenuIndex.vue'),
        },
        {
          path: '/menus/create',
          name: 'menu-create',
          component: () => import('@/views/menu/CreateOrendit.vue'),
        },
        {
          path: '/:xxx(.*)*',
          name: 'ErrorPage',
          component: () => import('../views/ErrorPage.vue'),
        },
      ],
    },
  ],
})

router.beforeEach((to, from, next) => {
  if (to.matched.some((r) => r.meta?.requiresAuth)) {
    const store = useTokenStore()
    if (!store.token?.access_token) {
      next({ name: 'login', query: { redirect: to.fullPath } })
      return
    }
  }
  next()
})
export default router
