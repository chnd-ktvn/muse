import Vue from 'vue'
import Vuex from 'vuex'
import Auth from './modules/auth.js'
import Profile from './modules/profile.js'
Vue.use(Vuex)
export default new Vuex.Store({
  modules: {
    Auth,
    Profile
  },
  state: {
    name: 'pagi chandra semangat yuk yuk'
  },
  mutations: {},
  actions: {},
  getters: {}
})
