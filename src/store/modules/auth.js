require('dotenv').config() // process.env.BASE_URL
import router from '../../router/index'
import axios from 'axios'

export default {
  modules: {},
  state: {
    user: {},
    userWIthId: [],
    newUser: {},
    // userId: null,
    vuexDataUser: localStorage.getItem('vuex'),
    token: localStorage.getItem('token') || null
  },
  mutations: {
    // state itu manggil state payload itu data yang mau dibawa
    setUser(state, payload) {
      state.user = payload // ngisi data user
      state.token = payload.token
      // state.photoUser = payload.photo
      // state.userId = payload.user_id
      // console.log(state.userId)
      // ngisi token di obj user dengan data token yang ada di payload
    },
    setNewUser(state, payload) {
      state.newUser = payload
    },
    setUserWithId(state, payload) {
      state.userWIthId = payload
      console.log(state.userWIthId + 'di mutasi set user with id')
    },
    setPhotoUser(state, payload) {
      state.photoUser = payload
      console.log(state.photoUser)
    },
    delUser(state) {
      state.user = {}
      state.token = null
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
    },
    logout(context) {
      localStorage.removeItem('token')
      context.commit('delUser')
      router.push('/login')
    },
    getUserById(context) {
      return new Promise((resolve, reject) => {
        axios
          .get(`${process.env.VUE_APP_BASE_URL}/user/${context.state.userId}`)
          .then(result => {
            console.log(result.data.data)
            console.log(result.data.data[0].photo)
            // context.state.photo = result.data.data.photo/
            context.commit('setPhotoUser', result.data.data[0].photo)
            // context.commit('setPhotoUser', result.data.data.user_photo)
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
      ;('interceptor response works')
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
            // debugging doang
            alert(error.response.data.msg)
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
    getPhotoUser(state) {
      return JSON.parse(state.vuexDataUser).Auth.user.photo
    },
    getUserRole(state){
      return JSON.parse(state.vuexDataUser).Auth.user.user_role
    }
  }
}
