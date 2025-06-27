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
          component: () => import('@/views/menu/CreateOrEndit.vue'),
        },
        {
          path: '/menus/:id/edit',
          name: 'menu-edit',
          component: () => import('@/views/menu/CreateOrEndit.vue'),
        },
        {
          path: '/users',
          name: 'users',
          component: () => import('@/views/users/UserIndex.vue'),
        },
        {
          path: '/authors',
          name: 'authors',
          component: () => import('@/views/authors/AuthorIdex.vue'),
        },
        {
          path: '/urltexts',
          name: 'urltexts',
          component: () => import('@/views/urltext/UrlTextIdex.vue'),
        },
        {
          path: '/accounts',
          name: 'accounts',
          component: () => import('@/views/accounts/AccountIdex.vue'),
        },
        {
          path: '/certifiers',
          name: 'certifiers',
          component: () => import('@/views/certifiers/CertifierIdex.vue'),
        },
        {
          path: '/fans',
          name: 'fans',
          component: () => import('@/views/fans/FansIdex.vue'),
        },
        {
          path: '/leads',
          name: 'leads',
          component: () => import('@/views/leads/LeadIdex.vue'),
        },
        {
          path: '/pc',
          name: 'pc',
          component: () => import('@/views/pc/PCIdex.vue'),
        },
        {
          path: '/phonenumber',
          name: 'phonenumber',
          component: () => import('@/views/phonenumber/PNumberIdex.vue'),
        },
        {
          path: '/phones',
          name: 'phones',
          component: () => import('@/views/phones/PhoneIdex.vue'),
        },
        {
          path: '/script',
          name: 'script',
          component: () => import('@/views/script/ScriptIdex.vue'),
        },

        {
          path: '/tasksettings',
          name: 'tasksettings',
          component: () => import('@/views/tasksettings/TaskSettings.vue'),
        },
        {
          path: '/video',
          name: 'video',
          component: () => import('@/views/video/VideoIdex.vue'),
        },
        {
          path: '/videotask',
          name: 'videotask',
          component: () => import('@/views/videotask/VideoTaskIndex.vue'),
        },
        {
          path: '/certifiers',
          name: 'certifiers',
          component: () => import('@/views/certifiers/CertifierIdex.vue'),
        },
        {
          path: '/otherinfo',
          name: 'otherinfo',
          component: () => import('@/views/otherinfo/OtherInfoIdex.vue'),
        },
        {
          path: '/resource-category',
          name: 'resource-category',
          component: () => import('@/views/resource-category/ResourceCategoryIndex.vue'),
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
