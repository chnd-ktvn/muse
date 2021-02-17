<template>
  <b-row class="data">
    <b-col md="4" sm="12" v-for="(item, index) in products" :key="index">
      <b-card
        class="mb-2 card"
        :style="[
          item.product_status === 0
            ? { 'background-color': 'lightgrey' }
            : { 'background-color': 'white' }
        ]"
      >
        <img
          :src="
            item.photo === ''
              ? require('../../assets/latte.png')
              : `http://${env}/fileuploads/product_photo/` + item.photo
          "
          alt="product photo"
        />
        <b-card-text class="text">
          <b>{{ item.product_name }}</b> <br />
          Rp. {{ item.product_price }}
        </b-card-text>
        <b-button
          @click="deleteProduct(item.product_id)"
          pill
          block
          class="text del"
          >Delete</b-button
        >
        <b-button
          @click="editProduct(item.product_id)"
          pill
          block
          class="text del"
          >Update</b-button
        >
      </b-card>
    </b-col>
  </b-row>
</template>
<script>
import { mapGetters, mapActions } from 'vuex'
export default {
  computed: {
    ...mapGetters({
      products: 'getDataProduct'
    })
  },
  data() {
    return {
      message: null,
      env: process.env.VUE_APP_URL
    }
  },
  methods: {
    ...mapActions(['deleteProductById', 'getProductsAdm']),
    detailProduct(product_id) {
      this.$router.push({ name: 'productDetail', params: { id: product_id } })
    },
    makeToast(variant = null) {
      this.$bvToast.toast(`${this.message}`, {
        title: 'MuseCoffee',
        variant: variant,
        solid: true
      })
    },
    deleteProduct(product_id) {
      this.deleteProductById(product_id)
        .then(result => {
          this.message = result.data.msg
          this.getProductsAdm()
          // this.getProducts()
          this.makeToast('success')
          this.$router.push('/product')
        })
        .catch(error => {
          this.message = error.response.data.msg
          this.makeToast('danger')
        })
      // console.log(product_id)
      // this.getProductId(product_id)
      // this.$emit('childToParentCard', product_id)
    },
    editProduct(e) {
      this.$router.push({ name: 'editProduct', params: { id: e } })
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
  height: 95%;
}
.card:hover {
  margin-right: 5px;
  margin-left: -8px;
}
.text {
  text-align: center;
  font-family: cursive;
}
.up {
  margin-top: 5px;
}
</style>
