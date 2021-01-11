import Vue from 'vue'
import Vuex from 'vuex'
import Auth from './modules/auth.js'
import Product from './modules/product.js'
import Coupon from './modules/coupon.js'
import createPersistedState from 'vuex-persistedstate'
Vue.use(Vuex)
export default new Vuex.Store({
  modules: {
    Auth,
    Product,
    Coupon
  },
  state: {},
  mutations: {},
  actions: {},
  getters: {},
  plugins: [
    createPersistedState({
      paths: ['Auth.user']
    })
  ]
})
