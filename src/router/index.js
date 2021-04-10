import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'/'el-icon-x' the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },

  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },

  {
    path: '/register',
    component: () => import('@/views/register/index'),
    hidden: true
  },

  {
    path: '/password',
    component: () => import('@/views/password/index'),
    hidden: true
  },

  {
    path: '/personal',
    component: () => import('@/views/personal/index'),
    hidden: true
  },

  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [{
      path: 'dashboard',
      name: 'Dashboard',
      component: () => import('@/views/dashboard/index'),
      meta: { title: '主页', icon: 'dashboard' }
    }]
  },
  {
    path: '/gcms',
    component: Layout,
    redirect: '/gcms/garbage',
    name: 'classification',
    meta: { title: '垃圾分类管理', icon: 'el-icon-s-help' },
    children: [
      {
        path: '/garbage',
        name: 'garbage',
        component: () => import('@/views/garbage/index'),
        meta: { title: '垃圾管理', icon: 'table' }
      },
      {
        path: '/classfy',
        name: 'classfy',
        component: () => import('@/views/classification/index'),
        meta: { title: '分类管理', icon: 'example' }
      }
    ]
  },

  {
    path: '/shopms',
    component: Layout,
    redirect: '/shopms/shop',
    name: 'shopms',
    meta: { title: '回收站', icon: 'el-icon-s-help' },
    children: [
      {
        path: '/shop',
        name: 'shop',
        component: () => import('@/views/shop/index'),
        meta: { title: '回收站管理', icon: 'table' }
      }
    ]
  },
  {
    path: '/orderms',
    component: Layout,
    redirect: '/orderms/order',
    name: 'orderms',
    meta: { title: '订单管理', icon: 'el-icon-order' },
    children: [
      {
        path: '/order',
        name: 'order',
        component: () => import('@/views/order/index'),
        meta: { title: '订单管理', icon: 'table' }
      }
    ]
  },
  {
    path: '/commentms',
    component: Layout,
    redirect: '/commentms/comment',
    name: 'commentms',
    meta: { title: '评论管理', icon: 'el-icon-order' },
    children: [
      {
        path: '/comment',
        name: 'comment',
        component: () => import('@/views/comment/index'),
        meta: { title: '评论列表', icon: 'table' }
      }
    ]
  },

  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
