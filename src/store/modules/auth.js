require('dotenv').config() // process.env.BASE_URL
import router from '../../router/index'
import axios from 'axios'

export default {
  modules: {},
  state: {
    user: {},
    userWIthId: [],
    status_reg: false,
    status_input: false,
    token: localStorage.getItem('token') || null
  },
  mutations: {
    setUser(state, payload) {
      state.user = payload
      state.token = payload.token
    },
    setNewUser(state, payload) {
      state.newUser = payload
    },
    setUserWithId(state, payload) {
      state.userWIthId = payload
    },
    setPhotoUser(state, payload) {
      state.photoUser = payload
    },
    delUser(state) {
      state.user = {}
      state.token = null
    },
    statusRegister(state) {
      state.status_reg = true
    },
    statusLogin(state) {
      state.status_reg = false
    },
    statusInput(state) {
      state.status_input = true
    },
    statusNonInput(state) {
      state.status_input = false
    }
  },
  actions: {
    login(context, payload) {
      return new Promise((resolve, reject) => {
        axios
          .post(`http://${process.env.VUE_APP_BASE_URL}/user/login`, payload)
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
          .post(`http://${process.env.VUE_APP_BASE_URL}/user/register`, payload)
          .then(result => {
            context.commit('setNewUser', result.data.data)
            resolve(result)
          })
          .catch(error => {
            reject(error)
          })
      })
    },
    deleteAllData() {
      return new Promise((resolve, reject) => {
        axios
          .delete(
            `http://${process.env.VUE_APP_BASE_URL}/user/deleteAllDataRedis`
          )
          .then(response => {
            resolve(response)
          })
          .catch(error => {
            reject(error)
          })
      })
    },
    logout(context) {
      localStorage.removeItem('token')
      localStorage.removeItem('cart')
      context.commit('delUser')
      context.dispatch('deleteAllData')
      router.push('/login')
    },
    activationEmail(context, payload) {
      return new Promise((resolve, reject) => {
        axios
          .patch(
            `http://${process.env.VUE_APP_BASE_URL}/user/activation`,
            payload
          )
          .then(result => {
            resolve(result)
          })
          .catch(error => {
            reject(error)
          })
      })
    },
    getUserById(context) {
      return new Promise((resolve, reject) => {
        axios
          .get(
            `http://${process.env.VUE_APP_BASE_URL}/user/${context.state.userId}`
          )
          .then(result => {
            context.commit('setPhotoUser', result.data.data[0].photo)
            context.commit('setUserWithId', result.data.data)
            resolve(result)
          })
          .catch(error => {
            reject(error)
          })
      })
    },
    interceptorRequest(context) {
      console.log('interceptor request works')
      axios.interceptors.request.use(
        function(config) {
          config.headers.Authorization = `Bearer ${context.state.token}`
          return config
        },
        function(error) {
          return Promise.reject(error)
        }
      )
    },
    interceptorResponse(context) {
      console.log('interceptor response works')
      axios.interceptors.response.use(
        function(response) {
          return response
        },
        function(error) {
          if (
            error.response.data.status === 403 &&
            (error.response.data.msg === 'invalid token' ||
              error.response.data.msg === 'invalid signature' ||
              error.response.msg === 'jwt expired')
          ) {
            context.dispatch('logout')
            // alert(error.response.data.msg)
          }
          return Promise.reject(error)
        }
      )
    }
  },
  getters: {
    isLogin(state) {
      return state.token !== null
    },
    getDataUserById(state) {
      return state.userWIthId
    },
    getDataUser(state) {
      return state.user
    },
    statusReg(state) {
      return state.status_reg
    },
    statusInputAdd(state) {
      return state.status_input
    }
  }
}
