<template>
  <div class="Product">
    <Header v-on:childToParent="onChildClick" class="wrapper" />
    <b-container class="bv-example-row">
      <b-row>
        <b-col lg="4" md="12" sm="12" class="aside">
          <Aside />
        </b-col>
        <b-col lg="8" md="12" sm="12">
          <main>
            <b-container>
              <b-nav
                tabs
                align="center"
                class="category"
                v-for="(item, index) in category"
                :key="index"
              >
                <b-nav-item
                  active
                  @click="getProductByCategory(item.category_id)"
                  >{{ item.category_name }}</b-nav-item
                >
              </b-nav>
              <b-dropdown
                id="dropdown-dropright"
                dropright
                text="Sort By"
                variant="secondary"
                class="m-2"
              >
                <b-dropdown-item @click="handleName">Name</b-dropdown-item>
                <b-dropdown-item @click="handlePrice">Price</b-dropdown-item>
                <b-dropdown-item @click="handlePosted"
                  >Posted Date</b-dropdown-item
                >
              </b-dropdown>
              <b-button pill>
                <router-link to="/createProduct" class="link"
                  >Create Product
                </router-link></b-button
              >
              <CardButton
                :products="products"
                v-on:childToParentCard="onChildClickCard"
              />
              <b-pagination
                v-model="currentPage"
                :total-rows="rows"
                align="center"
                :per-page="limit"
                @change="handlePageChange"
                aria-controls="my-table"
              ></b-pagination>
            </b-container>
          </main>
        </b-col>
      </b-row>
    </b-container>
    <Footer />
  </div>
</template>

<script>
import Header from '../components/_base/Header.vue'
import Footer from '../components/_base/Footer.vue'
import Aside from '../components/Aside.vue'
import CardButton from '../components/_base/CardButton.vue'
import axios from 'axios'

export default {
  name: 'Product',
  components: {
    Header,
    Aside,
    CardButton,
    Footer
  },
  computed: {
    rows() {
      return this.totalRows
    }
  },
  data() {
    return {
      products: [],
      category: [],
      sortName: 'product_name',
      sortPrice: 'product_price',
      sortPosted: 'product_created_at',
      sort: '',
      fromChild: '',
      currentPage: 1,
      totalRows: null,
      limit: 3,
      page: 1
    }
  },
  created() {
    this.handleName()
    this.getCategory()
  },
  methods: {
    getProduct() {
      axios
        .get(
          `http://localhost:3050/product?orderBy=${this.sort}&page=${this.page}&limit=${this.limit}`
        )
        .then(response => {
          console.log(response)
          this.totalRows = response.data.pagination.totalData
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
    getProductByCategory(category_id) {
      console.log(category_id)
      this.getProductCategory(category_id)
    },
    getProductCategory(category_id) {
      console.log('nyala' + category_id)
      axios
        .get(
          `http://localhost:3050/product/category?categoryId=${category_id}&orderBy=${this.sort}&page=${this.page}&limit=${this.limit}`
        )
        .then(response => {
          console.log(response)
          this.totalRows = response.data.pagination.totalData
          this.products = response.data.data
        })
    },
    handleName() {
      this.sort = this.sortName
      this.getProduct()
    },
    handlePrice() {
      this.sort = this.sortPrice
      this.getProduct()
    },
    handlePosted() {
      this.sort = this.sortPosted
      this.getProduct()
    },
    onChildClick(value) {
      this.fromChild = value
      console.log(value)
      axios
        .get(`http://localhost:3050/product/searchByName/${value}`)
        .then(response => {
          console.log(response)
          this.products = response.data.data
        })
    },
    onChildClickCard(value) {
      console.log(value)
      axios
        .patch(`http://localhost:3050/product/deleteProduct/${value}`)
        .then(response => {
          console.log(response)
          this.products = response.data.data
          this.getProduct()
        })
    },
    handlePageChange(numberPage) {
      console.log(numberPage)
      this.page = numberPage
      this.getProduct()
    }
  }
}
</script>
<style scoped>
.wrapper {
  position: sticky;
  z-index: 10;
  top: 0;
}
.aside {
  border-right: 1px solid rosybrown;
}
main {
  padding: 20px 0;
}
.category {
  display: inline-block;
}
.category:hover {
  font-weight: bold;
}
.link {
  color: white;
  text-decoration: none;
}
@media screen and (max-width: 768px) {
  .aside {
    border: none;
  }
}
@media screen and (max-width: 576px) {
  .aside {
    border: none;
  }
}
</style>
