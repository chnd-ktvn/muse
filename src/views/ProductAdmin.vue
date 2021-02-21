<template>
  <div class="product">
    <Header v-on:childToParent="onChildClick" class="wrapper" v-sticky />
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
                style="font-size: 18px"
                dropright
                text="Sort By"
                variant="secondary"
                class="m-2"
              >
                <b-dropdown-item style="font-size: 18px" @click="handleName"
                  >A - Z</b-dropdown-item
                >
                <b-dropdown-item style="font-size: 18px" @click="handlePrice"
                  >Lowest to Highest</b-dropdown-item
                >
                <b-dropdown-item style="font-size: 18px" @click="handlePosted"
                  >Oldest to Newest</b-dropdown-item
                >
              </b-dropdown>
              <b-button pill v-if="user.user_role === 2">
                <router-link to="/createProduct" class="link"
                  >Create Product
                </router-link></b-button
              >
              <Card
                v-if="user.user_role === 1 || user.user_role === undefined"
              />
              <CardButton v-if="user.user_role === 2" />
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
import CardButton from '../components/_base/CardButton.vue'
import { mapActions, mapGetters, mapMutations } from 'vuex'

export default {
  name: 'Product',
  components: {
    Header,
    Aside,
    Card,
    CardButton,
    Footer
  },
  computed: {
    ...mapGetters({
      page: 'getPageProduct',
      limit: 'getLimitProduct',
      rows: 'getTotalRowsProduct',
      category: 'getDataCategory',
      search: 'getDataSearchProduct',
      user: 'getDataUser'
    }),
    currentPage: {
      get() {
        return this.page
      },
      set(newPage) {
        return newPage
      }
    }
  },
  data() {
    return {
      categoryId: null,
      sortName: 'product_name',
      sortPrice: 'product_price',
      sortPosted: 'product_created_at',
      fromChild: '',
      active: false
    }
  },
  created() {
    this.handlePosted()
    this.getCategory()
  },
  methods: {
    ...mapActions([
      'getProducts',
      'getProductsAdm',
      'getProductsByCategoryId',
      'getProductsByCategoryIdAdm',
      'getCategory',
      'searchingProduct'
    ]),
    // 'deleteProductById'
    ...mapMutations(['changePage', 'changeSortingBy', 'changeCategory']),

    getProductByCategory(category_id) {
      this.active = !this.active
      if (this.search === null) {
        if (this.user.user_role === 1 || this.user.user_role === undefined) {
          this.categoryId = category_id
          this.changeCategory(category_id)
          this.getProductsByCategoryId()
        } else {
          this.categoryId = category_id
          this.changeCategory(category_id)
          this.getProductsByCategoryIdAdm()
        }
      } else {
        this.categoryId = category_id
        this.changeCategory(category_id)
        this.searchingProduct()
      }
    },
    handleName() {
      if (this.search === null && this.categoryId === null) {
        if (this.user.user_role === 1 || this.user.user_role === undefined) {
          this.changeSortingBy(this.sortName)
          this.getProducts()
        } else {
          this.changeSortingBy(this.sortName)
          this.getProductsAdm()
        }
      } else if (this.search === null && this.categoryId !== null) {
        if (this.user.user_role === 1 || this.user.user_role === undefined) {
          this.changeSortingBy(this.sortName)
          this.getProductsByCategoryId()
        } else {
          this.changeSortingBy(this.sortName)
          this.getProductsByCategoryIdAdm()
        }
      } else if (this.search !== null && this.categoryId === null) {
        this.changeSortingBy(this.sortName)
        this.searchingProduct()
      } else {
        this.changeSortingBy(this.sortName)
        this.searchingProduct()
      }
    },
    handlePrice() {
      if (this.search === null && this.categoryId === null) {
        if (this.user.user_role === 1 || this.user.user_role === undefined) {
          this.changeSortingBy(this.sortPrice)
          this.getProducts()
        } else {
          this.changeSortingBy(this.sortPrice)
          this.getProductsAdm()
        }
      } else if (this.search === null && this.categoryId !== null) {
        if (this.user.user_role === 1 || this.user.user_role === undefined) {
          this.changeSortingBy(this.sortPrice)
          this.getProductsByCategoryId()
        } else {
          this.changeSortingBy(this.sortPrice)
          this.getProductsByCategoryIdAdm()
        }
      } else if (this.search !== null && this.categoryId === null) {
        this.changeSortingBy(this.sortPrice)
        this.searchingProduct()
      } else {
        this.changeSortingBy(this.sortPrice)
        this.searchingProduct()
      }
    },
    handlePosted() {
      if (this.search === null && this.categoryId === null) {
        if (this.user.user_role === 1 || this.user.user_role === undefined) {
          this.changeSortingBy(this.sortPosted)
          this.getProducts()
        } else {
          this.changeSortingBy(this.sortPosted)
          this.getProductsAdm()
        }
      } else if (this.search === null && this.categoryId !== null) {
        if (this.user.user_role === 1 || this.user.user_role === undefined) {
          this.changeSortingBy(this.sortPosted)
          this.getProductsByCategoryId()
        } else {
          this.changeSortingBy(this.sortPosted)
          this.getProductsByCategoryIdAdm()
        }
      } else if (this.search !== null && this.categoryId === null) {
        this.changeSortingBy(this.sortPosted)
        this.searchingProduct()
      } else {
        this.changeSortingBy(this.sortPosted)
        this.searchingProduct()
      }
    },
    onChildClick() {
      this.searchingProduct()
    },
    handlePageChange(numberPage) {
      if (this.search === null && this.categoryId === null) {
        if (this.user.user_role === 1 || this.user.user_role === undefined) {
          this.changePage(numberPage)
          this.getProducts()
        } else {
          this.changePage(numberPage)
          this.getProductsAdm()
        }
      } else if (this.search === null && this.categoryId !== null) {
        if (this.user.user_role === 1 || this.user.user_role === undefined) {
          this.changePage(numberPage)
          this.getProductsByCategoryId()
        } else {
          this.changePage(numberPage)
          this.getProductsByCategoryIdAdm()
        }
      } else if (this.search !== null && this.categoryId === null) {
        this.changePage(numberPage)
        this.searchingProduct()
      } else {
        this.changePage(numberPage)
        this.searchingProduct()
      }
    }
  }
}
</script>
<style scoped>
.wrapper {
  /* position: sticky; */
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
  font-size: 18px;
}
.category:hover,
.activer {
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
