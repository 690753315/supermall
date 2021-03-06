import Vue from 'vue'
import App from './App'

import router from './router'
import store from './store'

// 默认情况下，是不存在$bus的，定义全局bus，Vue实例可以作为事件总线用来发射事件
Vue.prototype.$bus = new Vue()

new Vue({
  el: '#app',
  router,
  store,
  render:(h)=> h(App)
})
