<template>
  <div>
    <Header class="wrapper" v-sticky />
    <b-container>
      <b-row>
        <b-col lg="5" md="5" sm="12">
          <EditProductL />
        </b-col>
        <b-col lg="7" md="7" sm="12">
          <EditProductR />
        </b-col>
      </b-row>
    </b-container>
    <Footer />
  </div>
</template>

<script>
import Header from '../components/_base/Header.vue'
import EditProductR from '../components/editProduct/EditProductR.vue'
import EditProductL from '../components/editProduct/EditProductL.vue'
import Footer from '../components/_base/Footer.vue'
// nangkep dari param url
import { mapActions } from 'vuex'
export default {
  name: 'EditProduct',
  components: {
    Header,
    EditProductR,
    EditProductL,
    Footer
  },
  data() {
    return {
      product_id: ''
    }
  },
  created() {
    this.product_id = this.$route.params.id
    this.getProductByIdAdm(this.product_id)
  },
  methods: {
    ...mapActions(['getProductByIdAdm'])
  }
}
</script>
<style scoped>
.wrapper {
  z-index: 10;
  top: 0;
}
.row {
  margin: 20px 0;
  font-family: cursive;
}
</style>
