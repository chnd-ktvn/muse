<template>
  <b-container>
    <form>
      <b-form-group id="input-group-1" label="Name:" label-for="input-name">
        <b-form-input
          id="input-name"
          v-model="form.product_name"
          type="text"
          :state="form.product_name.length >= 5"
          placeholder="Type product name min. 5 characters"
          required
        ></b-form-input>
      </b-form-group>
      <b-form-group id="input-group-2" label="Price:" label-for="input-price">
        <b-form-input
          id="input-price"
          type="number"
          v-model="form.product_price"
          placeholder="Type the price"
          required
        ></b-form-input>
      </b-form-group>
      <label class="label" for="textarea-state">Descriptions:</label>
      <b-form-textarea
        id="textarea-state"
        v-model="form.product_detail"
        :state="form.product_detail.length >= 15"
        placeholder="Describe your product min. 15 characters"
      ></b-form-textarea>
      <b-form-group
        id="input-group-3"
        label="Category:"
        label-for="input-category"
      >
        <b-form-select
          id="input-category"
          v-model="form.category_id"
          @change="handleCategory"
          :options="categories"
          required
        ></b-form-select>
      </b-form-group>
      <b-form-group id="input-group-4" label="Input product size:">
        <p v-if="form.category_id === null">Choose category first</p>
        <p v-else>Click size you want for this product</p>
        <div id="input-group-4">
          <div v-if="form.category_id === 2 || form.category_id === 3">
            <b-button-group size="sm">
              <b-button
                v-for="(btn, idx) in buttonsForDrinks"
                :key="idx"
                :pressed.sync="btn.state"
                @click="handleButton(btn)"
                class="btn"
                variant="warning"
              >
                {{ btn.caption }}
              </b-button>
            </b-button-group>
          </div>
          <div v-if="form.category_id === 4 || form.category_id === 5">
            <b-button-group size="sm">
              <b-button
                v-for="(btn, idx) in buttonsForFoods"
                :key="idx"
                :pressed.sync="btn.state"
                @click="handleButton(btn)"
                class="btn"
                variant="warning"
              >
                {{ btn.caption }}
              </b-button>
            </b-button-group>
          </div>
        </div>
      </b-form-group>
      <b-form-group id="input-group-5" label="Input delivery methods:">
        <p v-if="form.product_size.length === 0">
          Click size first for this product
        </p>
        <p v-else>Click methods you want for this product</p>
        <div v-if="form.product_size.length > 0">
          <b-button-group size="sm">
            <b-button
              v-for="(del, idxs) in buttonsForDelivery"
              :key="idxs"
              :pressed.sync="del.stateDel"
              @click="handleButtonDel(del)"
              class="btn-del"
              variant="warning"
            >
              {{ del.captionDel }}
            </b-button>
          </b-button-group>
        </div>
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
      photo: 'getPhoto',
      start_delivery_hour: 'getStartDel',
      end_delivery_hour: 'getEndDel',
      stock_product: 'getStock'
    })
  },
  data() {
    return {
      message: null,
      form: {
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
    ...mapActions(['setNewProduct', 'getProducts']),
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
        this.form.product_name.length < 5 &&
        this.form.product_detail.length < 15 &&
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
        this.form.product_name.length < 5 ||
        this.form.product_detail.length < 15 ||
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
.label {
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
</style>
