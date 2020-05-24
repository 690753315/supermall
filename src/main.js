import Vue from 'vue'
import App from './App'

import router from './router'

// 默认情况下，是不存在$bus的，定义全局bus，Vue实例可以作为事件总线
Vue.prototype.$bus = new Vue()

new Vue({
  el: '#app',
  router,
  render:(h)=> h(App)
})
