require('dotenv').config() // process.env.BASE_URL
// import router from '../../router/index'
import axios from 'axios'

export default {
  modules: {},
  state: {
    coupons: [],
    showCoupon: false
  },
  mutations: {
    setCoupon(state, payload) {
      state.showCoupon = true
      state.coupons = payload
      // state.showCoupon = true
      console.log(state.coupons)
    }
  },
  actions: {
    getCoupon(context) {
      return new Promise((resolve, reject) => {
        axios
          .get(`${process.env.VUE_APP_BASE_URL}/coupon/`)
          .then(response => {
            context.commit('setCoupon', response.data.data)
            resolve(response)
          })
          .catch(error => {
            reject(error)
          })
      })
    },
    deleteCouponById(context, payload) {
      return new Promise((resolve, reject) => {
        axios
          .patch(
            `${process.env.VUE_APP_BASE_URL}/coupon/deleteCoupon/${payload}`
          )
          .then(response => {
            resolve(response)
          })
          .catch(error => {
            reject(error)
          })
      })
    }
  },
  getters: {
    getDataCoupon(state) {
      return state.coupons
    },
    getShowCoupon(state) {
      return state.showCoupon
    }
  }
}
