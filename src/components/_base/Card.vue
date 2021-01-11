<template>
  <b-row class="data">
    <b-col md="4" sm="12" v-for="(item, index) in products" :key="index">
      <b-card class="mb-2 card" @click="detailProduct(item.product_id)">
        <img :src="'http://localhost:3000/' + item.photo" alt="product photo" />
        <b-card-text class="text">
          <b>{{ item.product_name }}</b> <br />
          Rp. {{ item.product_price }}
        </b-card-text>
      </b-card>
    </b-col>
  </b-row>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
  computed: {
    ...mapGetters({
      products: 'getDataProduct'
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
.data {
  margin: 15px 0;
}
img {
  border-radius: 50%;
  object-fit: cover;
  width: 125px;
  height: 125px;
  display: flex;
  margin: 0 auto;
  margin-top: -15px;
  justify-content: center;
  align-items: center;
}
.card {
  box-shadow: 0px 6px 25px rgba(106, 64, 41, 0.7);
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 90%;
}
.card:hover {
  margin-right: 5px;
  margin-left: -8px;
}
.text {
  text-align: center;
  font-family: cursive;
}
</style>
