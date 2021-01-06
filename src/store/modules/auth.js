require('dotenv').config() // process.env.BASE_URL
import axios from 'axios'

export default {
  modules: {},
  state: {
    user: {},
    newUser: {},
    token: localStorage.getItem('token') || null
  },
  mutations: {
    // state itu manggil state payload itu data yang mau dibawa
    setUser(state, payload) {
      state.user = payload // ngisi data user
      state.token = payload.token
      // ngisi token di obj user dengan data token yang ada di payload
    },
    setNewUser(state, payload){
      state.newUser = payload
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
            localStorage.setItem('token', result.data.data.token)
            resolve(result)
          })
          .catch(error => {
            reject(error)
          })
      })
    },
    signup(context, payload) {
      return new Promise((resolve, reject) => {
        axios
          .post(`http://localhost:3000/user/register`, payload)
          .then(result => {
            context.commit('setNewUser', result.data.data)
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
