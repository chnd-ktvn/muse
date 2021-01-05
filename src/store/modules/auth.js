import axios from 'axios'
require('dotenv').config

export default {
  modules: {},
  state: {
    user: {}
  },
  mutations: {
    // state itu manggil state payload itu data yang mau dibawa
    setUser(state, payload) {
      state.user = payload // ngisi data user
      state.token = payload.token
      // ngisi token di obj user dengan data token yang ada di payload
    }
  },
  actions: {
    // context itu manggil mutasi dan payload itu datanya
    login(context, payload) {
      return new Promise((resolve, reject) => {
        axios
          .post(`http://localhost:3000/user/login`, payload)
          .then(result => {
            context.commit('setUser', result.data.data)
            resolve(result)
          })
          .catch(error => {
            reject(error)
          })
      })
    }
  },
  getters: {}
}
