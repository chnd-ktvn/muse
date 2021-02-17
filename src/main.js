import Vue from 'vue'
import App from './App.vue'
import router from './router'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import store from './store'

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import VueSweetAlert2 from 'vue-sweetalert2'

Vue.use(BootstrapVue)
Vue.use(IconsPlugin)
Vue.use(VueSweetAlert2)
Vue.config.productionTip = false

Vue.directive('sticky', function(el) {
  el.style.position = 'sticky'
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
