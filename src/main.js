import Vue from 'vue'
import App from './App.vue'
import router from './router'
import { post } from './request/axios'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import api from '@/api/index.js';
// 全局引入echarts底层包，按需引入（具体图表在页面上引入）
let echarts = require('echarts/lib/echarts')

Vue.use(ElementUI);
Vue.config.productionTip = false
Vue.prototype.$http = post
Vue.prototype.$echarts = echarts
Vue.prototype.$api = api
new Vue({
  router,
  render: (h) => h(App),
}).$mount('#app')
