import Vue from 'vue'

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

// import * as echarts from 'echarts';



import App from './App.vue'
import router from './router'
import store from './store'


Vue.use(ElementUI);

Vue.config.productionTip = false

// Vue.prototype.$echarts = echarts;
// require('echarts-wordcloud');

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
