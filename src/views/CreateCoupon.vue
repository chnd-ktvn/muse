<template>
  <div>
    <Header class="wrapper" v-sticky />
    <b-container>
      <b-row>
        <b-col lg="5" md="5" sm="12">
          <CreateCouponL />
        </b-col>
        <b-col lg="7" md="7" sm="12">
          <CreateCouponR />
        </b-col>
      </b-row>
    </b-container>
    <Footer />
  </div>
</template>

<script>
import Header from '../components/_base/Header.vue'
import CreateCouponR from '../components/createCoupon/CreateCouponR.vue'
import CreateCouponL from '../components/createCoupon/CreateCouponL.vue'
import Footer from '../components/_base/Footer.vue'
export default {
  name: 'CreateCoupon',
  components: {
    Header,
    CreateCouponR,
    CreateCouponL,
    Footer
  }
}
</script>
<style scoped>
.wrapper {
  /* position: sticky; */
  z-index: 10;
  top: 0;
}
.row {
  margin: 20px 0;
  font-family: cursive;
}
</style>
