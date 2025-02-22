import { createRouter, createWebHistory } from 'vue-router'
import Layout from '@/views/layout/layout.vue'
import { LANG_PATH_MAP, ZH_CN_LANG, DEFAULT_THEME } from './const'

const Components = () => import('@/views/components-doc/index.vue')
const Docs = () => import('@/views/docs/docs.vue')
const Overview = () => import('@/views/overview.vue')

const context = import.meta.env.VITE_CONTEXT

let routes = [
  // 组件总览
  {
    path: `${context}:all?/zh-CN/:theme/overview`,
    component: Layout,
    name: 'overview',
    children: [{ name: 'Overview', path: '', component: Overview, meta: { title: '组件总览 | TinyVue' } }]
  },
  // 文档
  {
    path: `${context}:all?/:lang/:theme/docs/:docId`,
    component: Layout,
    name: 'docs',
    children: [{ name: 'Docs', path: '', component: Docs }]
  },
  // 组件
  {
    path: `${context}:all?/zh-CN/:theme/components/:cmpId`,
    component: Layout,
    name: 'components',
    children: [{ name: 'Components', path: '', component: Components }]
  },
  // 未匹配到目标地址时，进行路由重定向
  {
    path: '/:pathMatch(.*)*',
    redirect: () => {
      const langPath = LANG_PATH_MAP[ZH_CN_LANG]
      return { path: `${context}${langPath}/${DEFAULT_THEME}/overview` }
    }
  }
]
const router = createRouter({
  history: createWebHistory(),
  routes
})

// 为浏览器添加title
router.afterEach((to, from) => {
  if (to.meta.title) {
    document.title = to.meta.title
  }
})
export { router }
