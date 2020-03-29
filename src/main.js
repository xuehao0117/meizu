import Vue from 'vue'
import ElementUI from 'element-ui' //新添加
import 'element-ui/lib/theme-chalk/index.css' //新添加，避免后期打包样式不同，要放在import App from './App';之前
import App from './App.vue'
import router from './router'
import 'amfe-flexible';

Vue.use(ElementUI)   //新添加

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
