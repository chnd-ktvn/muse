<template>
  <div class="home">
    <Header class="wrapper" />
    <b-container>
      <b-row>
        <!-- <b-form @submit="onSubmit" @reset="onReset" v-if="show"> -->
        <b-col md="5" class="a">
          <CreateProductL />
        </b-col>
        <b-col md="7" class="w">
          <CreateProductR />
        </b-col>
        <!-- </b-form> -->
      </b-row>
    </b-container>
    <Footer />
  </div>
</template>

<script>
import Header from '../components/_base/Header.vue'
import CreateProductR from '../components/createProduct/CreateProductR.vue'
import CreateProductL from '../components/createProduct/CreateProductL.vue'
import Footer from '../components/_base/Footer.vue'
export default {
  name: 'Home',
  components: {
    Header,
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
.a {
  background-color: blanchedalmond;
}
.w {
  background-color: chartreuse;
}
/* .text-center {
  font-size: 40px;
  font-family: cursive;
}
.button {
  background-color: rosybrown;
}
.link {
  color: white;
  text-decoration: none;
}
@media screen and (max-width: 768px) {
  .text-center {
    font-size: 20px;
  }
}
@media screen and (max-width: 576px) {
  .text-center {
    font-size: 20px;
  }
} */
</style>
