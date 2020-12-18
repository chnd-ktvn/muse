<template>
  <div class="home">
    <Header />
    <!-- <img alt="Vue logo" src="../assets/logo.png" /> -->
    <!-- <HelloWorld msg="Welcome to Your Vue.js App" /> -->
    <b-container class="bv-example-row">
      <b-row>
        <!-- <Aside b-col md="4" sm="12" bg-variant="info" class="a" /> -->
        <b-col lg="4" md="12" sm="12" bg-variant="info" class="a">
          <Aside />
        </b-col>
        <b-col lg="8" sm="12" bg-variant="primary" class="b">
          <main>
            <b-container>
              <b-nav
                tabs
                align="center"
                class="dd"
                v-for="(item, index) in category"
                :key="index"
              >
                <b-nav-item
                  active
                  @click="getProductByCategory(item.category_name)"
                  >{{ item.category_name }}</b-nav-item
                >
                <!-- <b-nav-item-dropdown
                  id="my-nav-dropdown"
                  text="Sort By:"
                  toggle-class="nav-link-custom"
                  right
                >
                  <b-dropdown-item>Name</b-dropdown-item>
                  <b-dropdown-item>Price</b-dropdown-item>
                  <b-dropdown-item>Created By</b-dropdown-item>
                </b-nav-item-dropdown> -->
              </b-nav>
              <b-row>
                <b-col
                  md="3"
                  sm="12"
                  v-for="(item, index) in products"
                  :key="index"
                >
                  <b-card
                    title="Card Title"
                    img-src="https://picsum.photos/600/300/?image=25"
                    img-alt="Image"
                    img-top
                    tag="article"
                    class="mb-2"
                  >
                    <b-card-text>
                      Rp. {{ item.product_price }} <br />
                      {{ item.product_name }}
                    </b-card-text>
                  </b-card>
                </b-col>
              </b-row>
            </b-container>
          </main>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
// @ is an alias to /src
import Header from '../components/_base/Header.vue'
import Aside from '../components/Aside.vue'
// import HelloWorld from '@/components/HelloWorld.vue'
import axios from 'axios'

export default {
  name: 'Home',
  components: {
    Header,
    Aside
  },
  data() {
    return {
      products: [],
      category: []
    }
  },
  created() {
    this.getProduct()
    this.getCategory()
  },
  methods: {
    getProduct() {
      axios
        .get(
          `http://localhost:3050/product?orderBy=product_price&page=1&limit=10`
        )
        .then(response => {
          console.log(response)
          this.products = response.data.data
        })
        .catch(error => {
          console.log(error)
        })
    },
    getCategory() {
      axios
        .get(`http://localhost:3050/category/`)
        .then(response => {
          console.log(response)
          this.category = response.data.data
        })
        .catch(error => {
          console.log(error)
        })
    },
    getProductByCategory(category_name) {
      console.log(category_name)
      this.getProductCategory(category_name)
    },
    getProductCategory(category_name) {
      console.log('nyala' + category_name)
      axios
        .get(`http://localhost:3050/category/${category_name}`)
        .then(response => {
          console.log(response)
        })
    }
  }
}
</script>
<style scoped>
.a {
  background-color: rosybrown;
  border-right: 1px solid red;
}
.b {
  background-color: sandybrown;
}
.dd {
  display: inline-block;
}
</style>
