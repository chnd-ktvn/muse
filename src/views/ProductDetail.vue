<template>
  <div class="detail">
    <Header class="wrapper" v-sticky />
    <b-container class="bv-example-row">
      <div class="router">
        <router-link to="/" class="link">Home > </router-link>
        <router-link to="/product" class="link">Product > </router-link
        ><router-link to="" class="link active">{{
          product.product_name
        }}</router-link>
      </div>
      <b-row>
        <b-col lg="4" md="4" sm="12">
          <b-container>
            <b-col class="preview">
              <b-img
                :src="
                  product.photo === ''
                    ? require('./../assets/latte.png')
                    : `http://${env}/fileuploads/product_photo/` + product.photo
                "
                alt="Coffee"
              />
            </b-col>
            <b-row class="delivery">
              <b-container>
                <p class="p del">Delivery and Time</p>
                <b-row>
                  <b-button-group size="sm">
                    <b-button
                      v-for="btn in product.delivery_methods.split(',')"
                      :key="btn"
                      class="button b-del"
                      @click="handleDel(btn)"
                    >
                      {{ btn }}
                    </b-button>
                  </b-button-group>
                </b-row>
                <b-row class="now">
                  <b-col lg="6" md="6" sm="6"><p>Now</p></b-col>
                  <b-col lg="6" md="6" sm="6">
                    <b-button-group size="sm">
                      <b-button
                        v-for="btn in opt.split(',')"
                        :key="btn"
                        class="button b-del"
                        @click="handleNow(btn)"
                      >
                        {{ btn }}
                      </b-button>
                    </b-button-group>
                  </b-col>
                </b-row>
                <b-row class="set">
                  <b-col lg="6" md="6" sm="6"><p>Set Time</p></b-col>
                  <b-col lg="6" md="6" sm="6">
                    <b-button-group size="sm">
                      <b-button
                        v-for="btn in opt.split(',')"
                        :key="btn"
                        class="button b-del"
                        @click="handleSetTime(btn)"
                      >
                        {{ btn }}
                      </b-button>
                    </b-button-group>
                  </b-col>
                </b-row>
              </b-container>
            </b-row>
          </b-container>
        </b-col>
        <b-col lg="8" md="8" sm="12">
          <h1>{{ product.product_name }}</h1>
          <p>{{ product.product_detail }}</p>
          <p>
            Delivery on <b>Monday</b> to <br /><b>Friday</b> at
            <span
              >{{ product.start_delivery_hour }} -
              {{ product.end_delivery_hour }}</span
            >
          </p>
          <b-row>
            <b-col>
              <b-button-group class="group-btn">
                <b-button v-if="form.qty >= 2" @click="decrement" class="btn"
                  >-</b-button
                >
                <b-button disabled class="btn dis">{{ form.qty }}</b-button>
                <b-button @click="increment" class="btn">+</b-button>
              </b-button-group>
            </b-col>
            <b-col>
              <h4>
                <b>Rp {{ product.product_price }}</b>
              </h4>
            </b-col>
          </b-row>
          <b-button block class="add" @click="addToCart()">
            Add To Cart
          </b-button>
          <b-button block class="ask">Ask a staff</b-button>
        </b-col>
      </b-row>
      <b-row>
        <b-col lg="4" md="4" sm="12">
          <b-container class="size size-part">
            <p class="p-size">Choose size:</p>
            <b-button-group size="sm">
              <b-button
                v-for="btn in product.product_size.split(',')"
                :key="btn"
                pill
                class="sz"
                @click="handleSize(btn)"
              >
                {{ btn }}
              </b-button>
            </b-button-group>
          </b-container>
        </b-col>
        <b-col lg="8" md="8" sm="12">
          <b-container class="size">
            <b-row>
              <b-col class="preview">
                <b-img
                  :src="
                    product.photo === ''
                      ? require('./../assets/latte.png')
                      : `http://${env}/fileuploads/product_photo/` +
                        product.photo
                  "
                  alt="Small Cup of Coffee"
                  class="image"
                />
              </b-col>
              <b-col>
                <b-row>
                  <p>
                    <b>{{ product.product_name }}</b>
                  </p>
                </b-row>
                <b-col>
                  <b-row class="data">
                    <b-col
                      v-if="
                        product.category_id === 2 || product.category_id === 3
                      "
                    >
                      <p v-if="form.dataR.length !== 0">
                        x {{ form.dataR.length }} {{ form.dataR[0] }}
                      </p>
                      <p v-if="form.dataL.length !== 0">
                        x {{ form.dataL.length }} {{ form.dataL[0] }}
                      </p>
                      <p v-if="form.dataXL.length !== 0">
                        x {{ form.dataXL.length }} {{ form.dataXL[0] }}
                      </p>
                    </b-col>
                    <b-col v-else>
                      <p v-if="form.data250gr.length !== 0">
                        x{{ form.data250gr.length }} {{ form.data250gr[0] }}
                      </p>
                      <p v-if="form.data300gr.length !== 0">
                        x{{ form.data300gr.length }} {{ form.data300gr[0] }}
                      </p>
                      <p v-if="form.data500gr.length !== 0">
                        x{{ form.data500gr.length }} {{ form.data500gr[0] }}
                      </p>
                    </b-col>
                  </b-row>
                </b-col>
              </b-col>
              <b-col>
                <b-button pill
                  ><router-link to="/payment" class="linkkk"
                    >Checkout
                  </router-link></b-button
                >
              </b-col>
            </b-row>
          </b-container>
        </b-col>
      </b-row>
    </b-container>
    <Footer />
  </div>
</template>
<script>
import { mapGetters, mapActions } from 'vuex'
import Header from '../components/_base/Header.vue'
import Footer from '../components/_base/Footer.vue'
export default {
  name: 'productDetail',
  components: {
    Header,
    Footer
  },
  data() {
    return {
      env: process.env.VUE_APP_BASE_URL,
      opt: 'Yes,No',
      form: {
        delivery_methods: null,
        now: null,
        set_time: null,
        qty: 1,
        product_size: [],
        dataR: [],
        dataL: [],
        dataXL: [],
        data250gr: [],
        data300gr: [],
        data500gr: []
      },
      cart: [],
      message: null
    }
  },
  computed: {
    ...mapGetters({
      product: 'getDataProductId'
    })
  },
  created() {
    this.product_id = this.$route.params.id
    this.getProductById(this.product_id)
    let getCart = localStorage.getItem('cart')
    getCart = JSON.parse(getCart)
    if (getCart) {
      this.cart = getCart
    } else {
      this.cart = []
    }
  },
  methods: {
    ...mapActions(['getProductById']),
    decrement() {
      this.form.qty -= 1
    },
    increment() {
      this.form.qty += 1
    },
    handleDel(del) {
      console.log(del)
      this.form.delivery_methods = del
    },
    handleNow(now) {
      console.log(now)
      this.form.now = now
    },
    handleSetTime(time) {
      console.log(time)
      this.form.set_time = time
    },
    handleSize(size) {
      console.log(size)
      console.log(this.form.product_size.length, this.form.qty)
      if (this.form.product_size.length < this.form.qty) {
        if (size === 'R') {
          this.form.product_size.push(size)
          this.form.dataR.push('Regular')
        } else if (size === 'L') {
          this.form.product_size.push(size)
          this.form.dataL.push('Large')
        } else if (size === 'XL') {
          this.form.product_size.push(size)
          this.form.dataXL.push('Extra Large')
        } else if (size === '250 gr') {
          this.form.product_size.push(size)
          this.form.data250gr.push('250 gr')
        } else if (size === '300 gr') {
          this.form.product_size.push(size)
          this.form.data300gr.push('300 gr')
        } else if (size === '500 gr') {
          this.form.product_size.push(size)
          this.form.data500gr.push('500 gr')
        }
      } else {
        console.log(size)
      }
    },
    addToCart() {
      if (
        this.form.delivery_methods === null ||
        this.form.now === null ||
        this.form.set_time === null ||
        this.form.product_size.length === 0
      ) {
        this.message = 'Please input your order with correct data!'
        this.makeToast('danger')
      } else {
        const setCart = {
          product_id: this.product.product_id,
          photo: this.product.photo,
          product_name: this.product.product_name,
          product_price: this.product.product_price,
          category_id: this.product.category_id,
          product_qty: 1,
          product_total: this.form.qty * this.product.product_price,
          delivery_methods: this.form.delivery_methods,
          now: this.form.now,
          set_time: this.form.set_time,
          dataR: this.form.dataR,
          dataL: this.form.dataL,
          dataXL: this.form.dataXL,
          data250gr: this.form.data250gr,
          data300gr: this.form.data300gr,
          data500gr: this.form.data500gr
        }
        this.cart = [...this.cart, setCart]
        localStorage.setItem('cart', JSON.stringify(this.cart))
        console.log(this.cart)
        this.message = 'Success added to cart!'
        this.makeToast('success')
      }
    },
    makeToast(variant = null) {
      this.$bvToast.toast(`${this.message}`, {
        title: 'MuseCoffee',
        variant: variant,
        solid: true
      })
    }
  }
}
</script>
<style scoped>
.wrapper {
  z-index: 10;
  top: 0;
}
.bv-example-row {
  font-family: cursive;
}
.router {
  text-align: left;
  padding: 20px 0;
}
.link {
  color: grey;
}
.link:hover {
  text-decoration: none;
  font-weight: 700;
}
.link.active {
  color: black;
  font-weight: normal;
}
.linkk {
  color: white;
  text-decoration: none;
}
.linkkk {
  color: black;
}
.preview {
  margin: 0 auto;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
}
img {
  margin: 0 auto;
  border-radius: 50%;
  width: 200px;
  height: 200px;
  object-fit: cover;
}
.image {
  margin: 10px auto;
  border-radius: 50%;
  width: 70px;
  height: 70px;
  object-fit: cover;
}
p {
  text-align: left;
}
.del {
  padding-top: 15px;
  font-weight: 600;
}
.delivery {
  margin: 20px 0;
  box-shadow: 0px 6px 25px rgba(106, 64, 41, 0.7);
}
.button {
  padding: 5px;
  font-size: 16px;
  background-color: grey;
}
.b-del {
  margin: 0 10px;
}
.button:hover {
  background-color: #6a4029;
}
.now {
  padding: 15px 0;
}
.set {
  padding-bottom: 15px;
}
.now p,
.set p {
  font-size: 18px;
}
h1 {
  color: black;
  font-weight: bold;
}
.group-btn {
  margin-bottom: 25px;
}
.btn {
  background-color: white;
  color: black;
}
.btn.dis {
  background-color: white;
  color: black;
}
.add {
  background-color: #6a4029;
  border: none;
  color: white;
}
.ask {
  background-color: #FFBA33;
  border: none;
  color: white;
}
.ask:hover {
  background-color: #FFBA33;
  box-shadow: 0px 6px 25px rgba(106, 64, 41, 0.7);
}
.add:hover,
.sz:hover {
  background-color: #6a4029;
  box-shadow: 0px 6px 25px rgba(31, 18, 11, 0.7);
}
.sz {
  margin: 0 10px;
  background-color: #6a4029;
  color: white;
  border: none;
}
.size {
  margin: 10px 0;
  padding-top: 10px;
  padding-bottom: 10px;
  box-shadow: 0px 6px 25px rgba(106, 64, 41, 0.7);
}
.size-part {
  padding-bottom: 15px;
}
.data p {
  font-size: 16px;
}
.checkout {
  margin-top: 20px;
}
</style>
