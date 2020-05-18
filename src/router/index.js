import VueRouter from 'vue-router';
import Vue from 'vue';

Vue.use(VueRouter)

// 重写vue-router的push方法，不然会报错
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location, onResolve, onReject) {
  if (onResolve || onReject) return originalPush.call(this, location, onResolve, onReject)
  return originalPush.call(this, location).catch(err => err)
}

// 重写vue-router的replace方法，不然会报错
const originalReplace = VueRouter.prototype.replace
VueRouter.prototype.replace = function replace(location, onResolve, onReject) {
  if (onResolve || onReject) return originalReplace.call(this, location, onResolve, onReject)
  return originalReplace.call(this, location).catch(err => err)
}

// 路由的懒加载
const Home     = () => import('views/home/Home')
const Category = () => import('views/category/Category')
const Cart     = () => import('views/cart/Cart')
const Profile  = () => import('views/profile/Profile')

// 配置路由的映射关系
const routes = [
  {
    path: '',
    // 重定向,设置默认路由
    redirect: '/home'
  },
  {
    path: '/home',
    component: Home
  },
  {
    path: '/category',
    component: Category
  },
  {
    path: '/cart',
    component: Cart
  },
  {
    path: '/profile',
    component: Profile
  }

]

// 创建路由实例
const router = new VueRouter({
  routes,
  // 设置history模式
  mode: 'history',
  // 设置活跃的路由的类名为active
  linkActiveClass: 'active',
})

export default router