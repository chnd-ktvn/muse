<template>
  <b-row class="data">
    <b-col md="4" sm="12" v-for="(item, index) in products" :key="index">
      <b-card class="mb-2 card" @click="detailProduct(item.product_id)">
        <img src="../../assets/veggie-img.png" alt="product photo" />
        <b-card-text class="text">
          {{ item.product_name }} <br />
          Rp. {{ item.product_price }}
        </b-card-text>
      </b-card>
    </b-col>
  </b-row>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
  data() {
    return {
      photo: '../../assets/'
    }
  },
  computed: {
    ...mapGetters({
      products: 'getDataProduct'
      // productsByCategory: 'getDataProductbyCategory'
    })
  },
  methods: {
    detailProduct(product_id) {
      console.log(product_id)
      this.$router.push({ name: 'productDetail', params: { id: product_id } })
    }
  }
}
</script>
<style scoped>
img {
  border-radius: 100%;
  object-fit: contain;
  margin-left: -3px;
}
.card {
  box-shadow: 0px 6px 25px rgba(106, 64, 41, 0.7);
  cursor: pointer;
}
.card:hover {
  margin-right: 5px;
  margin-left: -8px;
}
.text {
  font-family: cursive;
}
</style>
