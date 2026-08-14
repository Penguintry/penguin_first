import Vue from 'vue'
import App from './App.vue'
import 'element-ui/lib/theme-chalk/index.css'
import element from './utils/element-ui'
import '@/css/common.css'
import router  from './router'
import vuex from './store'

Vue.config.productionTip = false
Vue.use(element)

new Vue({
  render: h => h(App),
  router,
  vuex
}).$mount('#app')
