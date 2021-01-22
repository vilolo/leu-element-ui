import Vue from 'vue'
import App from './App.vue'
import router from './router'

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import { api } from './common/api.js'  // API 链接
import { post, get, put, toJson, isEmpty } from './common/http.js' // 请求方式中间件

//定义全局变量
Vue.prototype.$api = api;
Vue.prototype.$post = post;
Vue.prototype.$get = get;
Vue.prototype.$put = put;
Vue.prototype.$toJson = toJson;
Vue.prototype.$isEmpty = isEmpty;

Vue.config.productionTip = false
Vue.use(ElementUI);

new Vue({
  render: h => h(App),
  router,
}).$mount('#app')
