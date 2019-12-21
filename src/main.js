import Vue from 'vue'
import App from './App.vue'
import './promission'// 引用权限模块；
import router from './router'
import ElementUI from 'element-ui'
import Component from './components'
import 'element-ui/lib/theme-chalk/index.css'// 引入样式
import './style/index.less'
import axios from 'axios'
Vue.prototype.$axios = axios// 赋值给全局对象;
axios.defaults.baseURL = 'http://ttapi.research.itcast.cn/mp/v1_0'// 设置一个常态值;
Vue.use(ElementUI)
Vue.use(Component)
Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
