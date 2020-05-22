import Vue from 'vue'
import App from './App'

import router from './router'

// 定义全局bus
Vue.prototype.$bus = new Vue()

new Vue({
  el: '#app',
  router,
  render:(h)=> h(App)
})
