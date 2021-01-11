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
import store from '../store'

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
    component: Login,
    meta: { requiresVisitor: true }
  },
  {
    path: '/signup',
    name: 'SignUp',
    component: SignUp
  },
  {
    path: '/profile',
    name: 'Profile',
    component: Profile,
    meta: { requiresAuth: true }
  },
  {
    path: '/product',
    name: 'Product',
    component: Product
  },
  {
    path: '/productAdmin',
    name: 'productAdmin',
    component: ProductAdmin,
    meta: { requiresAuth: true }
  },
  {
    path: '/createProduct',
    name: 'createProduct',
    component: CreateProduct,
    meta: { requiresAuth: true }
  },
  {
    path: '/productDetail/:id',
    name: 'productDetail',
    component: ProductDetail,
    meta: { requiresAuth: true }
  },
  {
    path: '/payment',
    name: 'payment',
    component: Payment,
    meta: { requiresAuth: true }
  },
  {
    path: '/history',
    name: 'history',
    component: History,
    meta: { requiresAuth: true }
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!store.getters.isLogin) {
      next({ path: './login' })
    } else {
      next()
    }
  } else if (to.matched.some(record => record.meta.requiresVisitor)) {
    if (store.getters.isLogin) { // ini yang
      next({
        path: '/'
      })
    } else {
      next()
    }
  } else {
    next()
  }
})

export default router
