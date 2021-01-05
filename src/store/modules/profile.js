import axios from 'axios'
require('dotenv').config

export default {
  modules: {},
  state: {
    user: {}
  },
  mutations: {
    setUser(state, payload) {
      state.user = payload
    }
  },
  actions: {
    signup(context, payload) {
      return new Promise((resolve, reject) => {
        axios
          .post(`http://localhost:3000/user/register`, payload)
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
