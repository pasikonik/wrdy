import { createRouter, RouteRecordRaw, createWebHistory } from 'vue-router'

import { useAuthStore } from '@/stores/auth'

import Home from './views/Home.vue'
import Login from '@/views/Login.vue'
import SignUp from '@/views/SignUp.vue'
import Lists from '@/views/Lists.vue'
import Import from '@/views/Import.vue'
import Stats from '@/views/Stats.vue'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'home',
    component: Home,
  },
  {
    path: '/login',
    name: 'login',
    component: Login,
  },
  {
    path: '/sign-up',
    name: 'sign-up',
    component: SignUp,
  },
  {
    path: '/lists',
    name: 'lists',
    component: Lists,
    meta: { requiresAuth: true },
  },
  {
    path: '/lists/:id',
    name: 'list',
    component: Lists,
    meta: { requiresAuth: true },
  },
  {
    path: '/import',
    name: 'import',
    component: Import,
    meta: { requiresAuth: true },
  },
  {
    path: '/stats',
    name: 'stats',
    component: Stats,
    meta: { requiresAuth: true },
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

router.beforeEach((to, _from, next) => {
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    const auth = useAuthStore()
    if (auth.isLoggedIn) {
      return next()
    }
    next('/login')
  } else {
    next()
  }
})

export default router
