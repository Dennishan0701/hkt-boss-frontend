import Vue from 'vue'
import App from './App'
// import router from './router'
import store from '../../store'
import iView from 'iview'
import 'iview/dist/styles/iview.css'
import '@/assets/css/main.less'
import '@/assets/css/standard.less'
import  '@/api/common';
Vue.use(store)
Vue.use(iView)
Vue.config.productionTip = false

new Vue({
  // router,
  store,
  render: h => h(App)
}).$mount('#app')
