<template>
  <div>
    <HeaderAdmin class="wrapper" />
    <b-container>
      <b-row>
        <b-col lg="5" md="5" sm="12">
          <CreateProductL />
        </b-col>
        <b-col lg="7" md="7" sm="12">
          <CreateProductR />
        </b-col>
      </b-row>
    </b-container>
    <Footer />
  </div>
</template>

<script>
import HeaderAdmin from '../components/_base/HeaderAdmin.vue'
import CreateProductR from '../components/createProduct/CreateProductR.vue'
import CreateProductL from '../components/createProduct/CreateProductL.vue'
import Footer from '../components/_base/Footer.vue'
export default {
  name: 'CreateProduct',
  components: {
    HeaderAdmin,
    CreateProductR,
    CreateProductL,
    Footer
  }
}
</script>
<style scoped>
.wrapper {
  position: sticky;
  z-index: 10;
  top: 0;
}
.row {
  margin: 20px 0;
  font-family: cursive;
}
</style>
