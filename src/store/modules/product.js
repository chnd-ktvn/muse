import axios from 'axios'
require('dotenv').config
export default {
  modules: {},
  state: {
    products: [],
    category: [],
    // productsByCategory: [],
    totalRows: null,
    limit: 1,
    page: 1,
    sort: '',
    category_id: null
    // sortName: 'product_name',
    // sortPrice: 'product_price',
    // sortPosted: 'product_created_at'
  },
  mutations: {
    setProduct(state, payload) {
      state.products = payload.data
      state.totalRows = payload.pagination.totalData
      console.log(state.totalRows)
    },
    setProductByCategoryId(state, payload) {
      // productsByCategory
      console.log(payload.data)
      state.products = payload.data
      console.log(state.products)
      state.totalRows = payload.pagination.totalData
      console.log(state.totalRows)
    },
    changeSortingBy(state, payload) {
      state.sort = payload
    },
    changeCategory(state, payload) {
      state.category_id = payload
    },
    changePage(state, payload) {
      state.page = payload // ambil dari andlePageChange(numberPage)
    },
    setCategory(state, payload) {
      state.category = payload
    },
    lala(state, payload) {
      state.lolo = payload
    }
  },
  actions: {
    getProducts(context) {
      return new Promise((resolve, reject) => {
        axios
          .get(
            `http://localhost:3000/product?orderBy=${context.state.sort}&page=${context.state.page}&limit=${context.state.limit}`
          )
          .then(response => {
            console.log(response.data)
            context.commit('setProduct', response.data) //ga data lagi karena mau ngambil data pagination
            resolve(response)
          })
          .catch(error => {
            console.log(error)
            reject(error)
          })
      })
    },
    getCategory(context) {
      return new Promise((resolve, reject) => {
        axios
          .get(`http://localhost:3000/category/`)
          .then(response => {
            context.commit('setCategory', response.data.data)
          })
          .catch(error => {
            reject(error)
          })
      })
    },
    getProductsByCategoryId(context) {
      return new Promise((resolve, reject) => {
        axios
          .get(
            `http://localhost:3000/product/category?categoryId=${context.state.category_id}&orderBy=${context.state.sort}&page=${context.state.page}&limit=${context.state.limit}`
          )
          .then(response => {
            console.log(response.data)
            context.commit('setProductByCategoryId', response.data) //ga data lagi karena mau ngambil data pagination
            resolve(response)
          })
          .catch(error => {
            console.log(error)
            reject(error)
          })
      })
    }
  },
  getters: {
    getApaAja(state) {
      return state.lolo
    },
    getPageProduct(state) {
      return state.page
    },
    getLimitProduct(state) {
      return state.limit
    },
    getTotalRowsProduct(state) {
      return state.totalRows
    },
    getDataProduct(state) {
      return state.products
    },
    getDataCategory(state) {
      return state.category
    },
    getDataProductbyCategory(state) {
      return state.productsByCategory
    }
  }
}
