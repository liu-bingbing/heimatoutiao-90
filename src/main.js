import Vue from 'vue'
import App from './App.vue'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'// 引入样式
import './style/index.less'
import axios from 'axios'
Vue.prototype.$axios = axios// 赋值给全局对象;
axios.defaults.baseURL = 'http">http://ttapi.research.itcast.cn/mp/v1_0'// 设置一个常态值;
Vue.use(ElementUI)
Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
