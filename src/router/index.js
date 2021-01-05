import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/Login.vue'
import SignUp from '../views/SignUp.vue'
import Profile from '../views/Profile.vue'
import Product from '../views/Product.vue'
import ProductAdmin from '../views/ProductAdmin.vue'
import CreateProduct from '../views/CreateProduct.vue'
import ProductDetail from '../views/ProductDetail.vue'
import Payment from '../views/Payment.vue'
import History from '../views/History.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/signup',
    name: 'SignUp',
    component: SignUp
  },
  {
    path: '/profile',
    name: 'Profile',
    component: Profile
  },
  {
    path: '/product',
    name: 'Product',
    component: Product
  },
  {
    path: '/productAdmin',
    name: 'productAdmin',
    component: ProductAdmin
  },
  {
    path: '/createProduct',
    name: 'createProduct',
    component: CreateProduct
  },
  {
    path: '/productDetail/:id',
    name: 'productDetail',
    component: ProductDetail
  },
  {
    path: '/payment',
    name: 'payment',
    component: Payment
  },
  {
    path: '/history',
    name: 'history',
    component: History
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
