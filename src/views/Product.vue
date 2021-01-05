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
                <b-dropdown-item @click="handleName"
                  >Name (ASC)</b-dropdown-item
                >
                <b-dropdown-item @click="handlePrice"
                  >Price (from lower to highest)</b-dropdown-item
                >
                <b-dropdown-item @click="handlePosted"
                  >Posted Date (from oldest to newest)</b-dropdown-item
                >
              </b-dropdown>
              <Card :products="products" />
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
import Card from '../components/_base/Card.vue'
import axios from 'axios'

export default {
  name: 'Product',
  components: {
    Header,
    Aside,
    Card,
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
      category_id: null,
      sortName: 'product_name',
      sortPrice: 'product_price',
      sortPosted: 'product_created_at',
      sort: '',
      fromChild: '',
      currentPage: 1,
      totalRows: null,
      limit: 6,
      page: 1
    }
  },
  created() {
    this.handlePosted()
    this.getCategory()
  },
  methods: {
    getProduct() {
      axios
        .get(
          `http://localhost:3040/product?orderBy=${this.sort}&page=${this.page}&limit=${this.limit}`
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
        .get(`http://localhost:3040/category/`)
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
      this.category_id = category_id
      // console.log(this.category_id)
      this.getProductCategory(this.category_id)
    },
    getProductCategory(category_id) {
      console.log('nyala' + category_id)
      // ${category_id}
      this.category_id = category_id
      this.page = 1
      // this.limit = 3
      console.log(this.page)
      console.log(this.category_id)
      axios
        .get(
          `http://localhost:3040/product/category?categoryId=${this.category_id}&orderBy=${this.sort}&page=${this.page}&limit=${this.limit}`
        )
        .then(response => {
          console.log(response)
          this.totalRows = response.data.pagination.totalData
          this.products = response.data.data
        })
    },
    onChildClick(value) {
      this.fromChild = value
      this.page = 1
      console.log(value)
      axios
        .get(
          `http://localhost:3040/product/searchByName?name=${value}&orderBy=${this.sort}&page=${this.page}&limit=${this.limit}`
        )
        .then(response => {
          console.log(response)
          this.totalRows = response.data.pagination.totalData
          this.products = response.data.data
        })
    },
    handleName() {
      // yang belom ditambhakan bagaimana menangani klik sort untuk producct all dan untuk product by category
      // this.sort = this.sortName
      // this.category_id = category_id
      // this.getProductCategory(this.category_id)
      // this.getProduct()
      // yang tengah itu tambahan
      if (this.category_id !== null) {
        this.sort = this.sortName
        // this.page = 1
        console.log(this.category_id)
        this.getProductCategory(this.category_id)
      } else if (this.fromChild != '') {
        this.sort = this.sortName
        // this.page = 1
        console.log(this.fromChild)
        this.onChildClick(this.fromChild)
      } else {
        this.sort = this.sortName
        console.log(this.category_id)
        this.getProduct()
      }
    },
    handlePrice() {
      // this.sort = this.sortPrice
      // this.getProduct()
      // if (this.category_id !== null) {
      //   this.sort = this.sortPrice
      //   console.log(this.category_id)
      //   this.getProductCategory(this.category_id)
      // } else {
      //   this.sort = this.sortPrice
      //   console.log(this.category_id)
      //   this.getProduct()
      // }
      if (this.category_id !== null) {
        this.sort = this.sortPrice
        // this.page = 1
        console.log(this.category_id)
        this.getProductCategory(this.category_id)
      } else if (this.fromChild != '') {
        this.sort = this.sortPrice
        // this.page = 1
        console.log(this.fromChild)
        this.onChildClick(this.fromChild)
      } else {
        this.sort = this.sortPrice
        console.log(this.category_id)
        this.getProduct()
      }
    },
    handlePosted() {
      // this.sort = this.sortPosted
      // this.getProduct()
      // if (this.category_id !== null) {
      //   this.sort = this.sortPosted
      //   console.log(this.category_id)
      //   this.getProductCategory(this.category_id)
      // } else {
      //   this.sort = this.sortPosted
      //   console.log(this.category_id)
      //   this.getProduct()
      // }
      if (this.category_id !== null) {
        this.sort = this.sortPosted
        // this.page = 1
        console.log(this.category_id)
        this.getProductCategory(this.category_id)
      } else if (this.fromChild != '') {
        this.sort = this.sortPosted
        // this.page = 1
        console.log(this.fromChild)
        this.onChildClick(this.fromChild)
      } else {
        this.sort = this.sortPosted
        console.log(this.category_id)
        this.getProduct()
      }
    },
    handlePageChange(numberPage) {
      console.log(numberPage)
      // this.page = numberPage
      // this.getProduct()
      if (this.category_id !== null) {
        // this.sort = this.sortName
        this.page = numberPage
        // this.page = 1
        console.log(this.category_id)
        this.getProductCategory(this.category_id)
      } else if (this.fromChild != '') {
        // this.sort = this.sortName
        this.page = numberPage
        // this.page = 1
        console.log(this.fromChild)
        this.onChildClick(this.fromChild)
      } else {
        this.page = numberPage
        console.log(this.category_id)
        this.getProduct()
      }
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
