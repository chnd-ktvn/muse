<template>
  <div class="payment">
    <Header class="wrapper" v-sticky />
    <b-jumbotron class="jumbotron">
      <b-container>
        <h2>Checkout your <br />item now!</h2>
        <b-col>
          <b-row>
            <b-col sm="12" md="5" class="order">
              <b-container>
                <h4>Order Summary</h4>
                <b-row>
                  <b-col class="transaction">
                    <div
                      class="row orders"
                      v-for="(item, index) in cart"
                      :key="index"
                    >
                      <b-col class="preview">
                        <b-img
                          :src="
                            item.photo === null || item.photo === ''
                              ? require('./../assets/latte.png')
                              : `${env}/fileuploads/product_photo/` +
                                item.photo
                          "
                          alt="Coffee"
                        />
                      </b-col>
                      <b-col>
                        <b-row>
                          <p>
                            <b>{{ item.product_name }}</b>
                          </p>
                        </b-row>
                        <b-row>
                          <b-col
                            v-if="
                              item.category_id === 2 || item.category_id === 3
                            "
                          >
                            <p class="size" v-if="item.dataR.length !== 0">
                              x {{ item.dataR.length }} {{ item.dataR[0] }}
                            </p>
                            <p class="size" v-if="item.dataL.length !== 0">
                              x {{ item.dataL.length }} {{ item.dataL[0] }}
                            </p>
                            <p class="size" v-if="item.dataXL.length !== 0">
                              x {{ item.dataXL.length }} {{ item.dataXL[0] }}
                            </p>
                          </b-col>
                          <b-col v-else>
                            <p class="size" v-if="item.data250gr.length !== 0">
                              x{{ item.data250gr.length }}
                              {{ item.data250gr[0] }}
                            </p>
                            <p class="size" v-if="item.data300gr.length !== 0">
                              x{{ item.data300gr.length }}
                              {{ item.data300gr[0] }}
                            </p>
                            <p class="size" v-if="item.data500gr.length !== 0">
                              x{{ item.data500gr.length }}
                              {{ item.data500gr[0] }}
                            </p>
                          </b-col>
                        </b-row>
                      </b-col>
                      <b-col class="preview">
                        <p>Rp {{ item.product_total }}</p>
                      </b-col>
                    </div>
                  </b-col>
                </b-row>
                <b-row>
                  <b-col>
                    <p class="left">SUBTOTAL</p>
                  </b-col>
                  <b-col>
                    <p class="right">Rp {{ subtotal }}</p>
                  </b-col>
                </b-row>
                <b-row>
                  <b-col>
                    <p class="left">TAX & FEES</p>
                  </b-col>
                  <b-col>
                    <p class="right">Rp {{ tax }}</p>
                  </b-col>
                </b-row>
                <b-row>
                  <b-col>
                    <p class="left">SHIPPING</p>
                  </b-col>
                  <b-col>
                    <p class="right">Rp {{ shipping }}</p>
                  </b-col>
                </b-row>
                <b-row>
                  <b-col>
                    <p class="left">TOTAL</p>
                  </b-col>
                  <b-col>
                    <p class="right">Rp {{ subtotal + tax + shipping }}</p>
                  </b-col>
                </b-row>
              </b-container>
            </b-col>
            <b-col sm="12" md="2"></b-col>
            <b-col sm="12" md="5" class="delivery">
              <b-row>
                <b-col>
                  <p class="left title">Address details</p>
                </b-col>
                <b-col>
                  <p class="right title edit" @click="onInput()">Edit</p>
                </b-col>
              </b-row>
              <b-row class="data" v-if="status_input">
                <b-container>
                  <b-col>
                    <b-row>
                      <p>
                        <b>Delivery to {{ user.user_email }}</b>
                      </p>
                    </b-row>
                    <b-row>
                      <b-form-textarea
                        type="text"
                        placeholder="Enter your address"
                        class="address"
                        v-model="form.address"
                      ></b-form-textarea>
                    </b-row>
                    <b-row>
                      <b-form-input
                        type="number"
                        placeholder="Enter your phone number"
                        class="address"
                        v-model="form.phone_number"
                      ></b-form-input>
                    </b-row>
                  </b-col>
                </b-container>
              </b-row>
              <b-row class="data" v-else>
                <b-container>
                  <b-col>
                    <b-row
                      ><p>
                        <b>Delivery to {{ user.user_email }}</b>
                      </p></b-row
                    >
                    <b-row>
                      <p class="address">
                        Km 5 refinery road oppsite re public road, effurun,
                        Jakarta
                      </p>
                    </b-row>
                    <b-row>6281348287878</b-row>
                  </b-col>
                </b-container>
              </b-row>
              <b-row>
                <b-col class="pay">
                  <p class="left">Payment method</p>
                </b-col>
                <b-container class="payment">
                  <b-form-group v-slot="{ ariaDescribedby }">
                    <b-form-radio-group
                      id="radio-slots"
                      v-model="selected"
                      :aria-describedby="ariaDescribedby"
                      name="radio-options-slots"
                    >
                      <b-col>
                        <b-form-radio value="card">Card</b-form-radio>
                      </b-col>
                      <b-col>
                        <b-form-radio value="bank_account"
                          >Bank Account</b-form-radio
                        >
                      </b-col>
                      <b-col>
                        <b-form-radio value="cod"
                          >Cash on Delivery</b-form-radio
                        >
                      </b-col>
                    </b-form-radio-group>
                  </b-form-group>
                </b-container>
                <b-button block class="btn confirm" @click="confirm()"
                  >Confirm and Pay
                  <!-- <router-link to="/history" class="link"
                    ></router-link
                  > -->
                </b-button>
                <b-button block class="btn cancel" @click="cancelBtn">
                  <router-link to="/product" class="link">Cancel</router-link>
                </b-button>
              </b-row>
            </b-col>
          </b-row>
        </b-col>
      </b-container>
    </b-jumbotron>
    <Footer />
  </div>
</template>
<script>
import Header from '../components/_base/Header.vue'
import Footer from '../components/_base/Footer.vue'
import { mapMutations, mapGetters, mapActions } from 'vuex'
import SweetAlert from '.././mixins/SweetAlert.js'
export default {
  name: 'Home',
  mixins: [SweetAlert],
  components: {
    Header,
    Footer
  },
  data() {
    return {
      env: process.env.VUE_APP_BASE_URL,
      selected: '',
      cart: [],
      tax: 10000,
      shipping: 9000,
      form: {
        address: 'Km 5 refinery road oppsite re public road, effurun, Jakarta',
        phone_number: 6281348287878
      },
      msg: null
    }
  },
  computed: {
    ...mapGetters({
      user: 'getDataUser',
      status_input: 'statusInputAdd'
    }),
    subtotal() {
      let total = 0
      this.cart.forEach(el => {
        total += el.product_total
      })
      return total
    }
  },
  created() {
    let getCart = localStorage.getItem('cart')
    getCart = JSON.parse(getCart)
    if (getCart) {
      this.cart = getCart
    } else {
      this.cart = []
    }
    console.log(this.cart)
    this.statusNonInput()
  },
  methods: {
    ...mapActions(['sendOrder', 'sendDetailOrders']),
    ...mapMutations(['statusNonInput', 'statusInput']),
    cancelBtn() {
      localStorage.removeItem('cart')
      this.$router.push('/product')
    },
    confirm() {
      if (this.cart.length === 0) {
        this.alertError({
          title:
            '<span style="font-family: cursive;">You haven\'t chose any product yet.<span>'
        })
      } else {
        if (this.selected !== '') {
          const data = {
            address: this.form.address,
            phone_number: '+' + this.form.phone_number,
            tax: this.tax,
            shipping: this.shipping,
            payment_method: this.selected,
            user_id: this.user.user_id,
            history_total: this.subtotal + this.tax + this.shipping
          }
          this.sendOrder(data)
            .then(result => {
              this.msg = result.data.msg
              console.log(this.msg)
              if (result.data.data.history_id) {
                let dataDetailHistory = []
                for (let i = 0; i < this.cart.length; i++) {
                  const dataDetail = {
                    user_id: this.user.user_id,
                    product_id: this.cart[i].product_id,
                    qty: this.cart[i].product_qty,
                    photo: this.cart[i].photo,
                    product_name: this.cart[i].product_name,
                    product_price: this.cart[i].product_price,
                    history_id: result.data.data.history_id
                  }
                  dataDetailHistory.push(dataDetail)
                }
                this.sendDetailOrders(dataDetailHistory)
                  .then(result => {
                    this.msg = result.data.msg
                    this.alertSuccess({
                      title:
                        '<span style="font-family: cursive;">' +
                        this.msg +
                        '<span>'
                    })
                    // localStorage.removeItem('cart')
                  })
                  .catch(error => {
                    console.log(error)
                    this.msg = error.response.data.msg
                    this.alertError({
                      title:
                        '<span style="font-family: cursive;">' +
                        this.msg +
                        '<span>'
                    })
                  })
                this.cart = []
                localStorage.removeItem('cart')
              }
            })
            .catch(error => {
              this.msg = error.response.data.msg
              this.alertError({
                title:
                  '<span style="font-family: cursive;">' + this.msg + '<span>'
              })
            })
          // localStorage.removeItem('cart')
        } else {
          this.alertError({
            title:
              '<span style="font-family: cursive;">You haven\'t chose any payment method.<span>'
          })
        }
      }
    },
    onInput() {
      this.statusInput()
    }
  }
}
</script>
<style scoped>
.wrapper {
  z-index: 10;
  top: 0;
}
.jumbotron {
  background-image: url(./../assets/nathan.png);
  background-size: cover;
  margin: -20px 0;
  color: black;
  font-family: cursive;
}
h2 {
  color: white;
  margin: 0 0 15px 0;
  font-family: cursive;
  text-align: left;
}
.jumbotron .order,
.data,
.payment {
  background-color: white;
  border-radius: 20px;
}
.order {
  height: 100%;
}
.title {
  margin-top: 20px;
}
.edit {
  cursor: pointer;
}
h4 {
  margin: 20px 0;
  font-weight: 700;
}
.transaction {
  height: 190px;
  /* 260, 190 */
  overflow: auto;
}
.preview {
  margin: 0 auto;
  display: flex;
  justify-content: center;
  align-items: center;
}
img {
  margin: 0 auto;
  border-radius: 20px;
  width: 60px;
  height: 60px;
  object-fit: cover;
}
.size {
  font-size: 3px;
}
.order p {
  font-size: 16px;
}
p.left {
  text-align: left;
}
p.right {
  text-align: right;
}
.delivery p.left,
.delivery p.right {
  color: white;
}
p.address {
  text-align: left;
}
.pay {
  margin-top: 20px;
}
.btn {
  border: none;
  margin-top: 20px;
}
.confirm {
  background-color: #6a4029;
}
.confirm:hover {
  background-color: #6a4029;
  box-shadow: 0px 6px 25px rgba(106, 64, 41, 0.7);
}
.cancel {
  background-color: #ffba33;
}
.cancel:hover {
  background-color: #ffba33;
  box-shadow: 0px 6px 25px rgba(106, 64, 41, 0.7);
}
.link {
  color: white;
  text-decoration: none;
}
/* .orders {
  border: 1px solid rosybrown;
} */
/* @media screen and (max-width: 768px) {
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
