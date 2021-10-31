
import { createRouter, createWebHashHistory } from 'vue-router'
import Index from './pages/index'
import Add from './pages/add'

// 2. 定义一些路由
// 每个路由都需要映射到一个组件。
// 我们后面再讨论嵌套路由。
const routes = [
  { path: '/', component: Index, meta: { title: 'TodoList' }, name: Index.name },
  { path: '/add', component: Add, meta: { title: 'Add Todo' }, name: Add.name }
]

const router = createRouter({
  // 4. 内部提供了 history 模式的实现。为了简单起见，我们在这里使用 hash 模式。
  history: createWebHashHistory(),
  routes, // `routes: routes` 的缩写
})
router.afterEach((to, from) => {
  if (to.meta && to.meta.title) {
    document.title = to.meta.title
  }
})

export default router