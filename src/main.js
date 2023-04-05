// import modules
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import VueCookies from 'vue-cookies'

// 重置css样式
import '@/assets/css/reset.css'

// 整合 elementUI
import './plugins/element.js'

// 引入 Axios 插件
import './utils/request'

// 引入 VueCookie 处理模块
Vue.use(VueCookies)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
