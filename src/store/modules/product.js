import axios from 'axios'
require('dotenv').config
export default {
  modules: {},
  state: {
    products: [],
    category: [],
    totalRows: null,
    limit: 6,
    page: 1,
    sort: '',
    category_id: null,
    lolo: null,
    product: null,
    form: {
      photo: null,
      start_delivery_hour: null,
      end_delivery_hour: null,
      stock_product: null
    },
    newProduct: {},
    productId: null
  },
  mutations: {
    setProduct(state, payload) {
      state.products = payload.data
      state.totalRows = payload.pagination.totalData
    },
    setProductByCategoryId(state, payload) {
      state.products = payload.data
      state.totalRows = payload.pagination.totalData
    },
    changeSortingBy(state, payload) {
      state.page = 1
      state.sort = payload
    },
    changeCategory(state, payload) {
      state.page = 1
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
    },
    searchProductBy(state, payload) {
      state.page = 1
      state.product = payload
    },
    setForm(state, payload) {
      state.form = payload
      state.form.photo = payload.photo
      state.form.start_delivery_hour = payload.start_delivery_hour
      state.form.end_delivery_hour = payload.end_delivery_hour
      state.form.stock_product = payload.stock_product
    },
    settingNewProduct(state, payload) {
      state.newProduct = payload
    },
    getProductId(state, payload) {
      state.productId = payload
      console.log(state.productId)
    }
  },
  actions: {
    getProducts(context) {
      return new Promise((resolve, reject) => {
        axios
          .get(
            `${process.env.VUE_APP_BASE_URL}/product?orderBy=${context.state.sort}&page=${context.state.page}&limit=${context.state.limit}`
          )
          .then(response => {
            console.log(response.data)
            context.commit('setProduct', response.data)
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
          .get(`${process.env.VUE_APP_BASE_URL}/category/`)
          .then(response => {
            context.commit('setCategory', response.data.data)
            resolve(response)
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
            `${process.env.VUE_APP_BASE_URL}/product/category?categoryId=${context.state.category_id}&orderBy=${context.state.sort}&page=${context.state.page}&limit=${context.state.limit}`
          )
          .then(response => {
            console.log(response.data)
            context.commit('setProductByCategoryId', response.data)
            resolve(response)
          })
          .catch(error => {
            console.log(error)
            reject(error)
          })
      })
    },
    searchingProduct(context) {
      console.log(context.state.category_id)
      if (context.state.category_id === null) {
        context.state.page = 1
        context.state.category_id = 1
      } else {
        context.state.page = 1
      }
      return new Promise((resolve, reject) => {
        axios
          .get(
            `${process.env.VUE_APP_BASE_URL}/product/searchByName/?name=${context.state.product}&categoryId=${context.state.category_id}&orderBy=${context.state.sort}&page=${context.state.page}&limit=${context.state.limit}`
          )
          .then(response => {
            console.log(response.data)
            context.commit('setProduct', response.data)
            resolve(response)
          })
          .catch(error => {
            console.log(error)
            reject(error)
          })
      })
    },
    setNewProduct(context, payload) {
      return new Promise((resolve, reject) => {
        axios
          .post(`${process.env.VUE_APP_BASE_URL}/product/`, payload)
          .then(response => {
            console.log(response.data)
            context.commit('settingNewProduct', response.data)
            resolve(response)
          })
          .catch(error => {
            console.log(error)
            reject(error)
          })
      })
    },
    getProductById(context, payload) {
      return new Promise((resolve, reject) => {
        axios
          .get(`${process.env.VUE_APP_BASE_URL}/product/`, payload)
          .then(response => {
            console.log(response.data)
            context.commit('getProductId', response.data)
            resolve(response)
          })
          .catch(error => {
            console.log(error)
            reject(error)
          })
      })
    },
    // deleteProductById
    deleteProductById(payload) {
      // console.log(context.state.productId)
      // {context.state.productId}
      return new Promise((resolve, reject) => {
        axios
          .patch(
            `${process.env.VUE_APP_BASE_URL}/product/deleteProduct/`,
            payload
          )
          .then(response => {
            console.log(response.data)
            resolve(response)
          })
          .catch(error => {
            console.log(payload)
            console.log(error)
            reject(error)
          })
      })
    }
  },
  getters: {
    getPhoto(state) {
      return state.form.photo
    },
    getStartDel(state) {
      return state.form.start_delivery_hour
    },
    getEndDel(state) {
      return state.form.end_delivery_hour
    },
    getStock(state) {
      return state.form.stock_product
    },
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
    },
    getDataSearchProduct(state) {
      return state.product
    }
  }
}
