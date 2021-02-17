<template>
  <b-container>
    <form>
      <b-form-group id="input-group-1" label="ID Product:" label-for="input-id">
        <b-form-input
          id="input-id"
          v-model="form.product_id"
          type="number"
          placeholder="Hit enter to search Product ID"
          v-on:keydown.enter.prevent="searchID(form.product_id)"
          required
        ></b-form-input>
      </b-form-group>
      <b-form-group id="input-group-2" label="Name:" label-for="input-name">
        <b-form-input
          id="input-name"
          v-model="form.product_name"
          type="text"
          :placeholder="name ? name : 'Product Name'"
          readonly
        ></b-form-input>
      </b-form-group>
      <b-form-group id="input-group-3" label="Price:" label-for="input-price">
        <b-form-input
          id="input-price"
          type="number"
          v-model="form.product_price"
          :placeholder="price ? price : 'Product Price'"
          readonly
        ></b-form-input>
      </b-form-group>
      <label class="label" for="textarea-state">Descriptions:</label>
      <b-form-textarea
        id="textarea-state"
        v-model="form.product_detail"
        :state="form.product_detail.length >= 100"
        placeholder="Describe your product min. 100 characters"
        required
      ></b-form-textarea>
      <b-form-group id="input-group-5" label="Input size:">
        <p>Click size you want for this product</p>
        <b-button-group size="sm">
          <div v-if="size">
            <b-button
              v-for="del in size"
              :key="del"
              class="btn-del"
              variant="warning"
            >
              {{ del }}
            </b-button>
          </div>
        </b-button-group>
      </b-form-group>
      <b-form-group id="input-group-6" label="Input delivery methods:">
        <p>Click methods you want for this product</p>
        <b-button-group size="sm">
          <div v-if="delivery_methods">
            <b-button
              v-for="del in delivery_methods"
              :key="del"
              class="btn-del"
              variant="warning"
            >
              {{ del }}
            </b-button>
          </div>
        </b-button-group>
      </b-form-group>
      <b-button style="background-color: #6a4029;" @click="onSubmit" block
        >Submit</b-button
      >
      <b-button style=" background-color: grey;" @click="onReset" block
        >Cancel</b-button
      >
    </form>
  </b-container>
</template>
<script>
import { mapGetters, mapActions } from 'vuex'
export default {
  name: 'RightPart',
  computed: {
    ...mapGetters({
      product: 'getDataProductId',
      photo: 'getPhoto',
      start_delivery_hour: 'getStartDel',
      end_delivery_hour: 'getEndDel',
      stock_product: 'getStock',
      products: 'getDataProduct',
      name: 'getDatanameProduct',
      price: 'getDatapriceProduct',
      delivery_methods: 'getDatadeliveryMethods',
      size: 'getsizeProduct'
    })
  },
  data() {
    return {
      message: null,
      form: {
        product_id: null,
        product_name: '',
        product_price: null,
        product_detail: '',
        category_id: null,
        product_size: [],
        delivery_methods: []
      },
      categories: [
        { text: 'Select One', value: null },
        { text: 'Coffee', value: 2 },
        { text: 'Non Coffee', value: 3 },
        { text: 'Foods', value: 4 },
        { text: 'Add-on', value: 5 }
      ],
      buttonsForDrinks: [
        { caption: 'R', state: false },
        { caption: 'L', state: false },
        { caption: 'XL', state: false }
      ],
      buttonsForFoods: [
        { caption: '250 gr', state: false },
        { caption: '300 gr', state: false },
        { caption: '500 gr', state: false }
      ],
      buttonsForDelivery: [
        { captionDel: 'Home Delivery', stateDel: false },
        { captionDel: 'Dine In', stateDel: false },
        { captionDel: 'Take Away', stateDel: false }
      ]
    }
  },
  methods: {
    ...mapActions(['setNewProduct', 'getProducts', 'getProductById']),
    searchID(e) {
      this.getProductById(e)
    },
    handleCategory(e) {
      console.log(e)
      this.form.product_size = []
      if (this.form.category_id === 2 || this.form.category_id === 3) {
        this.buttonsForDrinks.forEach(btn => {
          btn.state = false
        })
      } else {
        this.buttonsForFoods.forEach(btn => {
          btn.state = false
        })
      }
    },
    handleButton(n) {
      if (n.state === true) {
        this.form.product_size.push(n.caption)
      } else {
        this.form.product_size.splice(
          this.form.product_size.indexOf(n.caption),
          1
        )
      }
    },
    handleButtonDel(del) {
      if (del.stateDel === true) {
        this.form.delivery_methods.push(del.captionDel)
      } else {
        this.form.delivery_methods.splice(
          this.form.delivery_methods.indexOf(del.captionDel),
          1 // 2, 1
        )
      }
    },
    makeToast(variant = null) {
      this.$bvToast.toast(`${this.message}`, {
        title: 'MuseCoffee',
        variant: variant,
        solid: true
      })
    },
    onSubmit(event) {
      event.preventDefault()
      if (
        this.form.product_name.length < 10 &&
        this.form.product_detail.length < 100 &&
        this.form.product_name === '' &&
        this.form.product_price === null &&
        this.form.product_detail === '' &&
        this.form.category_id === null &&
        this.form.product_size.length < 1 &&
        this.form.delivery_methods.length < 1 &&
        this.photo === null &&
        this.start_delivery_hour === null &&
        this.end_delivery_hour === null &&
        this.stock_product === null
      ) {
        this.message = 'Please fill out the form first !'
        this.makeToast('danger')
      } else if (
        this.form.product_name.length < 10 ||
        this.form.product_detail.length < 100 ||
        this.form.product_name === '' ||
        this.form.product_price === null ||
        this.form.product_detail === '' ||
        this.form.category_id === null ||
        this.form.product_size.length < 1 ||
        this.form.delivery_methods.length < 1 ||
        this.photo === null ||
        this.start_delivery_hour === null ||
        this.end_delivery_hour === null ||
        this.stock_product === null
      ) {
        this.message =
          'Please completed all the columns first or check the length of product name or product detail !'
        this.makeToast('danger')
      } else {
        const {
          product_name,
          product_price,
          product_detail,
          product_size,
          delivery_methods
        } = this.form
        const category_id = this.form.category_id.toString()
        const photo = this.photo
        const start_delivery_hour = this.start_delivery_hour
        const end_delivery_hour = this.end_delivery_hour
        const stock_product = this.stock_product

        const data = new FormData()
        data.append('product_name', product_name)
        data.append('product_price', product_price)
        data.append('product_detail', product_detail)
        data.append('category_id', category_id)
        data.append('product_size', product_size)
        data.append('delivery_methods', delivery_methods)
        data.append('photo', photo)
        data.append('start_delivery_hour', start_delivery_hour)
        data.append('end_delivery_hour', end_delivery_hour)
        data.append('stock_product', stock_product)

        this.setNewProduct(data)
          .then(result => {
            this.message = result.data.msg
            this.getProducts()
            this.makeToast('success')
            this.$router.push('/product')
          })
          .catch(error => {
            this.message = error.response.data.msg
            this.makeToast('danger')
          })
      }
    },
    onReset(event) {
      event.preventDefault()
      this.$router.push('/product')
    }
  }
}
</script>
<style scoped>
#input-group-1,
#input-group-2,
#input-group-3,
#input-group-4,
#input-group-5,
#input-group-6 .label {
  color: #6a4029;
  font-weight: 700;
}
p {
  color: grey;
  font-weight: normal;
  font-size: 16px;
}
.btn {
  margin: 0 10px;
  font-weight: 700;
}
.activee {
  background-color: brown;
}
</style>
