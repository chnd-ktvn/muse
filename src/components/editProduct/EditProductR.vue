<template>
  <b-container>
    <form>
      <b-form-group id="input-group-1" label="Name:" label-for="input-name">
        <b-form-input
          id="input-name"
          v-model="productByIdAdm.product_name"
          type="text"
          :state="productByIdAdm.product_name.length >= 5"
          placeholder="Type product name min. 5 characters"
          required
        ></b-form-input>
      </b-form-group>
      <b-form-group id="input-group-2" label="Price:" label-for="input-price">
        <b-form-input
          id="input-price"
          type="number"
          v-model="productByIdAdm.product_price"
          placeholder="Type the price"
          required
        ></b-form-input>
      </b-form-group>
      <label class="label" for="textarea-state">Descriptions:</label>
      <b-form-textarea
        id="textarea-state"
        v-model="productByIdAdm.product_detail"
        :state="productByIdAdm.product_detail.length >= 15"
        placeholder="Describe your product min. 15 characters"
      ></b-form-textarea>
      <b-form-group
        id="input-group-3"
        label="Category:"
        label-for="input-category"
      >
        <b-form-select
          id="input-category"
          v-model="productByIdAdm.category_id"
          @change="handleCategory"
          :options="categories"
          required
        ></b-form-select>
      </b-form-group>
      <b-form-group id="input-group-4" label="Input product size:">
        <div v-if="isShow">
          <p>
            Click '<span
              style="color: purple; cursor: pointer;"
              @click="handleEdit"
              >edit</span
            >' to edit size product
          </p>
          <b-button-group size="sm">
            <b-button
              v-for="btn in productByIdAdm.product_size.split(',')"
              :key="btn"
              class="btn"
              variant="warning"
            >
              {{ btn }}
            </b-button>
          </b-button-group>
        </div>
        <div v-else>
          <p v-if="productByIdAdm.category_id">
            Click size you want for this product
          </p>
          <div id="input-group-4">
            <div
              v-if="
                productByIdAdm.category_id === 2 ||
                  productByIdAdm.category_id === 3
              "
            >
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
            <div
              v-if="
                productByIdAdm.category_id === 4 ||
                  productByIdAdm.category_id === 5
              "
            >
              <b-button-group size="sm">
                <b-button
                  v-for="(btn, idx) in buttonsForFoods"
                  :key="idx"
                  :pressed.sync="btn.state"
                  @change="handleButton(btn)"
                  class="btn"
                  variant="warning"
                >
                  {{ btn.caption }}
                </b-button>
              </b-button-group>
            </div>
          </div>
        </div>
      </b-form-group>
      <b-form-group id="input-group-5" label="Input delivery methods:">
        <div v-if="isShowDel">
          <p>
            Click '<span
              style="color: purple; cursor: pointer;"
              @click="handleEditDel"
              >edit</span
            >' to edit delivery method
          </p>
          <b-button-group size="sm">
            <b-button
              v-for="btn in productByIdAdm.delivery_methods.split(',')"
              :key="btn"
              class="btn"
              variant="warning"
            >
              {{ btn }}
            </b-button>
          </b-button-group>
        </div>
        <div v-else>
          <p v-if="productByIdAdm.product_size.length === 0">
            Click size you want for this product
          </p>
          <p v-else>Click methods you want for this product</p>
          <div v-if="productByIdAdm.product_size.length > 0">
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
import SweetAlert from '../../mixins/SweetAlert.js'
export default {
  name: 'RightPart',
  mixins: [SweetAlert],
  computed: {
    ...mapGetters({
      photo: 'getPhoto',
      start_delivery_hour: 'getStartDel',
      end_delivery_hour: 'getEndDel',
      stock_product: 'getStock',
      productByIdAdm: 'getProductAdm'
    })
  },
  data() {
    return {
      message: null,
      isShow: true,
      isShowDel: true,
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
    ...mapActions(['editProductById', 'getProducts']),
    handleCategory(e) {
      console.log(e)
      this.productByIdAdm.product_size = []
      if (
        this.productByIdAdm.category_id === 2 ||
        this.productByIdAdm.category_id === 3
      ) {
        this.buttonsForDrinks.forEach(btn => {
          btn.state = false
        })
      } else {
        this.buttonsForFoods.forEach(btn => {
          btn.state = false
        })
      }
    },
    handleEdit() {
      this.isShow = false
      this.productByIdAdm.product_size = []
    },
    handleEditDel() {
      this.isShow = false
      this.productByIdAdm.delivery_methods = []
    },
    handleButton(n) {
      if (n.state === true) {
        this.productByIdAdm.product_size.push(n.caption)
      } else {
        this.productByIdAdm.product_size.splice(
          this.productByIdAdm.product_size.indexOf(n.caption),
          1
        )
      }
    },
    handleButtonDel(del) {
      if (del.stateDel === true) {
        this.productByIdAdm.delivery_methods.push(del.captionDel)
      } else {
        this.productByIdAdm.delivery_methods.splice(
          this.productByIdAdm.delivery_methods.indexOf(del.captionDel),
          1 // 2, 1
        )
      }
    },
    onSubmit(event) {
      event.preventDefault()
      if (
        this.productByIdAdm.product_name.length < 5 &&
        this.productByIdAdm.product_detail.length < 15 &&
        this.productByIdAdm.product_name === '' &&
        this.productByIdAdm.product_price === null &&
        this.productByIdAdm.product_detail === '' &&
        this.productByIdAdm.category_id === null &&
        this.productByIdAdm.product_size.length < 1 &&
        this.productByIdAdm.delivery_methods.length < 1 &&
        this.productByIdAdm.photo === null &&
        this.productByIdAdm.start_delivery_hour === null &&
        this.productByIdAdm.end_delivery_hour === null &&
        this.productByIdAdm.stock_product === null
      ) {
        this.message = 'Please fill out the form first !'
        this.makeToast('danger')
      } else if (
        this.productByIdAdm.product_name.length < 5 ||
        this.productByIdAdm.product_detail.length < 15 ||
        this.productByIdAdm.product_name === '' ||
        this.productByIdAdm.product_price === null ||
        this.productByIdAdm.product_detail === '' ||
        this.productByIdAdm.category_id === null ||
        this.productByIdAdm.product_size.length < 1 ||
        this.productByIdAdm.delivery_methods.length < 1 ||
        this.productByIdAdm.photo === null ||
        this.productByIdAdm.start_delivery_hour === null ||
        this.productByIdAdm.end_delivery_hour === null ||
        this.productByIdAdm.stock_product === null
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
          delivery_methods,
          photo,
          start_delivery_hour,
          end_delivery_hour,
          stock_product
        } = this.productByIdAdm
        const category_id = this.productByIdAdm.category_id.toString()

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
        for (var pair of data.entries()) {
          console.log(pair[0] + ', ' + pair[1])
        }
        const payload = {
          data: data,
          id: this.productByIdAdm.product_id
        }
        this.editProductById(payload)
          .then(result => {
            this.message = result.data.msg
            this.getProducts()
            this.alertSuccess({
              title:
                '<span style="font-family: cursive;">' + this.message + '<span>'
            })
            this.$router.push('/product')
          })
          .catch(error => {
            this.message = error.response.data.msg
            this.alertError({
              title:
                '<span style="font-family: cursive;">' + this.message + '<span>'
            })
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
