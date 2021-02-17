import axios from 'axios'
require('dotenv').config
export default {
  modules: {},
  state: {
    products: [],
    category: [],
    totalRows: null,
    limit: 4,
    page: 1,
    sort: '',
    category_id: null,
    product: null,
    form: {
      photo: null,
      start_delivery_hour: null,
      end_delivery_hour: null,
      stock_product: null
    },
    // newProduct: {},
    productId: [],
    deliveryMethods: null,
    nameProduct: '',
    priceProduct: null,
    photoProduct: '',
    sizeProduct: null,
    productById: {}
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
    // settingNewProduct(state, payload) {
    //   state.newProduct = payload
    // },
    getProductId(state, payload) {
      state.productId = payload.data
      state.deliveryMethods = payload.data[0].delivery_methods.split(',')
      state.sizeProduct = payload.data[0].product_size.split(',')
      state.nameProduct = payload.data[0].product_name
      state.priceProduct = payload.data[0].product_price
      state.photoProduct = payload.data[0].photo
    },
    getProductIdAdm(state, payload) {
      state.productById = payload.data[0]
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
            context.commit('setProduct', response.data)
            resolve(response)
          })
          .catch(error => {
            reject(error)
          })
      })
    },
    getProductsAdm(context) {
      return new Promise((resolve, reject) => {
        axios
          .get(
            `${process.env.VUE_APP_BASE_URL}/product/all/?orderBy=${context.state.sort}&page=${context.state.page}&limit=${context.state.limit}`
          )
          .then(response => {
            context.commit('setProduct', response.data)
            resolve(response)
          })
          .catch(error => {
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
            context.commit('setProductByCategoryId', response.data.data[0])
            resolve(response)
          })
          .catch(error => {
            reject(error)
          })
      })
    },
    getProductsByCategoryIdAdm(context) {
      return new Promise((resolve, reject) => {
        axios
          .get(
            `${process.env.VUE_APP_BASE_URL}/product/category/adm?categoryId=${context.state.category_id}&orderBy=${context.state.sort}&page=${context.state.page}&limit=${context.state.limit}`
          )
          .then(response => {
            context.commit('setProductByCategoryId', response.data)
            resolve(response)
          })
          .catch(error => {
            reject(error)
          })
      })
    },
    searchingProduct(context) {
      if (context.state.category_id === null) {
        context.state.page = 1
        // context.state.category_id = 1
      } else {
        context.state.page = 1
      }
      return new Promise((resolve, reject) => {
        // categoryId=${context.state.category_id}
        axios
          .get(
            `${process.env.VUE_APP_BASE_URL}/product/searchByName/?name=${context.state.product}&orderBy=${context.state.sort}&page=${context.state.page}&limit=${context.state.limit}`
          )
          .then(response => {
            context.commit('setProduct', response.data)
            resolve(response)
          })
          .catch(error => {
            reject(error)
          })
      })
    },
    setNewProduct(context, payload) {
      return new Promise((resolve, reject) => {
        axios
          .post(`${process.env.VUE_APP_BASE_URL}/product/`, payload)
          .then(response => {
            // context.commit('settingNewProduct', response.data)
            resolve(response)
          })
          .catch(error => {
            reject(error)
          })
      })
    },
    editProductById(context, payload) {
      console.log(payload)
      return new Promise((resolve, reject) => {
        axios
          .patch(
            `${process.env.VUE_APP_BASE_URL}/product/${payload.id}`,
            payload.data
          )
          .then(response => {
            resolve(response)
          })
          .catch(error => {
            reject(error)
          })
      })
    },
    getProductById(context, payload) {
      return new Promise((resolve, reject) => {
        axios
          .get(`${process.env.VUE_APP_BASE_URL}/product/${payload}`)
          .then(response => {
            context.commit('getProductId', response.data)
            resolve(response)
          })
          .catch(error => {
            reject(error)
          })
      })
    },
    getProductByIdAdm(context, payload) {
      return new Promise((resolve, reject) => {
        axios
          .get(`${process.env.VUE_APP_BASE_URL}/product/adm/${payload}`)
          .then(response => {
            context.commit('getProductIdAdm', response.data)
            resolve(response)
          })
          .catch(error => {
            reject(error)
          })
      })
    },
    deleteProductById(context, payload) {
      return new Promise((resolve, reject) => {
        axios
          .patch(
            `${process.env.VUE_APP_BASE_URL}/product/deleteProduct/${payload}`
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
    },
    getDataProductId(state) {
      return state.productId
    },
    getDatadeliveryMethods(state) {
      return state.deliveryMethods
    },
    getDatanameProduct(state) {
      return state.nameProduct
    },
    getDatapriceProduct(state) {
      return state.priceProduct
    },
    getDataphotoProduct(state) {
      return state.photoProduct
    },
    getsizeProduct(state) {
      return state.sizeProduct
    },
    // productById
    getProductAdm(state) {
      return state.productById
    }
  }
}
