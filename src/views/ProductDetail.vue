<template>
  <div class="detail">
    <Header class="wrapper" v-sticky />
    <b-container
      class="bv-example-row"
      v-for="(item, index) in product"
      :key="index"
    >
      <div class="router">
        <router-link to="/" class="link">Home > </router-link>
        <router-link to="/product" class="link">Product > </router-link
        ><router-link to="" class="link active">{{
          item.product_name
        }}</router-link>
      </div>
      <b-row>
        <b-col lg="4" md="4" sm="12">
          <b-container>
            <img
              :src="
                item.photo === ''
                  ? require('./../assets/latte.png')
                  : `http://${env}/fileuploads/product_photo/` + item.photo
              "
              alt="Coffee"
            />
            <b-row class="delivery">
              <b-container>
                <p class="p del">Delivery and Time</p>
                <b-row>
                  <p>{{ item.delivery_methods }}</p>
                  <b-col lg="4" md="12" sm="12"
                    ><b-button class="button" @click="handle('Dine In')"
                      >Dine In</b-button
                    ></b-col
                  >
                  <b-col lg="4" md="12" sm="12"
                    ><b-button class="button" @click="handle('Door Delivery')"
                      >Door Delivery</b-button
                    ></b-col
                  >
                  <b-col lg="4" md="12" sm="12"
                    ><b-button class="button" @click="handle('Pick Up')"
                      >Pick Up</b-button
                    ></b-col
                  >
                </b-row>
                <b-row class="now">
                  <b-col lg="4" md="12" sm="12"><p>Now</p></b-col>
                  <b-col lg="4" md="12" sm="12"
                    ><b-button class="button" @click="handleSet('Yes')"
                      >Yes</b-button
                    ></b-col
                  >
                  <b-col lg="4" md="12" sm="12"
                    ><b-button class="button" @click="handleSet('No')"
                      >No</b-button
                    ></b-col
                  >
                </b-row>
                <b-row class="set">
                  <b-col lg="4" md="12" sm="12"><p>Set Time</p></b-col>
                  <b-col lg="4" md="12" sm="12"
                    ><b-button class="button" @click="handleSetTime('Yes')"
                      >Yes</b-button
                    ></b-col
                  >
                  <b-col lg="4" md="12" sm="12"
                    ><b-button class="button" @click="handleSetTime('No')"
                      >No</b-button
                    ></b-col
                  >
                </b-row>
              </b-container>
            </b-row>
          </b-container>
        </b-col>
        <b-col lg="8" md="8" sm="12">
          <h1>{{ item.product_name }}</h1>
          <p>{{ item.product_detail }}</p>
          <p>Delivery on <b>Monday</b> to <br /><b>Friday</b> at 1-7 pm</p>
          <b-row>
            <b-col>
              <b-button-group class="group-btn">
                <b-button v-if="qty >= 2" @click="decrement" class="btn"
                  >-</b-button
                >
                <b-button disabled class="btn dis">{{ qty }}</b-button>
                <b-button @click="increment" class="btn">+</b-button>
              </b-button-group>
            </b-col>
            <b-col>
              <h4>
                <b>IDR {{ item.product_price }}</b>
              </h4>
            </b-col>
          </b-row>
          <b-button block class="add" @click="addToCart">
            <router-link to="/payment" class="linkk">Add To Cart </router-link>
          </b-button>
          <b-button block class="ask">Ask a staff</b-button>
        </b-col>
      </b-row>
      <b-row>
        <b-col lg="4" md="4" sm="12" class="size">
          <b-container>
            <p>Choose size:</p>
            <b-button-group>
              <b-button
                v-for="(sz, index) in size"
                :key="index"
                pill
                class="m-1 sz"
                @click="handleClick(sz)"
                >{{ sz }}</b-button
              >
            </b-button-group>
          </b-container>
        </b-col>
        <b-col lg="8" md="8" sm="12">
          <b-container class="size">
            <b-row>
              <b-col><img src="./../assets/image 25.png" alt="Coffee"/></b-col>
              <b-col>
                <b-row>
                  <p>
                    <b>{{ product_name }}</b>
                  </p>
                </b-row>
                <b-col>
                  <b-row class="data">
                    <b-col v-show="product_kind">
                      <p>x{{ data250gr.length }} {{ data250gr[0] }}</p>
                      <p>x{{ data300gr.length }} {{ data300gr[0] }}</p>
                      <p>x{{ data500gr.length }} {{ data500gr[0] }}</p>
                    </b-col>
                    <b-col v-show="product_kind">
                      <p>x {{ dataR.length }} {{ dataR[0] }}</p>
                      <p>x {{ dataL.length }} {{ dataL[0] }}</p>
                      <p>x {{ dataXL.length }} {{ dataXL[0] }}</p>
                    </b-col>
                  </b-row>
                </b-col>
              </b-col>
              <b-col>
                <b-button pill
                  ><router-link to="/product" class="linkkk"
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
// import axios from 'axios'
export default {
  name: 'productDetail',
  components: {
    Header,
    Footer
  },
  data() {
    return {
      env: process.env.VUE_APP_URL,
      product_id: '',
      fromChild: '',
      // products: [],
      qty: 1,
      delivery: '',
      delivery_method: this.deliveryM.split(','),
      product_size: {},
      setNow: '',
      setTime: '',
      product_name: '',
      product_kind: null,
      size: [],
      dataR: [],
      dataL: [],
      dataXL: [],
      data250gr: [],
      data300gr: [],
      data500gr: []
    }
  },
  computed: {
    ...mapGetters({
      product: 'getDataProductId',
      deliveryM: 'getDatadeliveryMethods'
    }),
    btnStates() {
      return this.size.map(sz => sz.state)
    }
  },
  created() {
    this.product_id = this.$route.params.id
    this.getProductById(this.product_id)
    this.setDelivery()
    // console.log(JSON.parse(this.delivery_method))
  },
  methods: {
    ...mapActions(['getProductById']),
    setDelivery() {
      // this.deliveryM.forEach(el => {
      //   this.delivery_method.push(el.toString())
      // })
      // console.log(this.delivery_method)
      // console.log(this.deliveryM.split(','))
      // this.deliveryM.split(',')
      // this.delivery_method = this.deliveryM.toString().split(',')
      // c = JSON.parse(this.deliveryM.toString().split(','))
    },
    // getProductById(id) {
    //   axios.get(`http://localhost:3000/product/${id}`).then(response => {
    //     console.log(response)
    //     this.products = response.data.data
    //     this.product_name = response.data.data[0].product_name
    //     this.product_kind = response.data.data[0].product_kind
    //     this.size = JSON.parse(response.data.data[0].product_size)
    //   })
    // },
    decrement() {
      this.qty -= 1
    },
    increment() {
      this.qty += 1
    },
    handle(value) {
      this.delivery = value
    },
    handleSet(value) {
      this.setNow = value
    },
    handleSetTime(value) {
      this.setTime = value
    },
    handleClick(sz) {
      if (sz === 'R') {
        this.dataR.push('Regular')
      } else if (sz === 'L') {
        this.dataL.push('Large')
      } else if (sz === 'XL') {
        this.dataXL.push('Extra Large')
      } else if (sz === '250') {
        this.data250gr.push('250 gr')
      } else if (sz === '300') {
        this.data300gr.push('300 gr')
      } else if (sz === '500') {
        this.data500gr.push('500 gr')
      }
    },
    addToCart() {
      // this.product_size = {
      //   ...dataR,
      // }
      // if (this.dataR[0]) {
      //   this.product_size.push(this.dataR[0])
      // } else if (this.dataL[0]) {
      //   this.product_size.push(this.dataL[0])
      // } else if (this.dataXL[0]) {
      //   this.product_size.push(this.dataXL[0])
      // } else if (this.data250gr[0]) {
      //   this.product_size.push(this.data250gr[0])
      // } else if (this.data300gr[0]) {
      //   this.product_size.push(this.data300gr[0])
      // } else if (this.data500gr[0]) {
      //   this.product_size.push(this.data500gr[0])
      // }
      let sumif =
        this.dataR.length +
        this.dataL.length +
        this.dataXL.length +
        this.data250gr.length +
        this.data300gr +
        this.data500gr.length
      if (sumif === this.qty) {
        console.log('ok')
      } else {
        console.log('tidak bisa')
      }
    }
  }
}
</script>
<style scoped>
.wrapper {
  z-index: 10;
  top: 0;
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
img {
  border-radius: 50%;
  margin: 0 30px;
  width: 200px;
  height: 200px;
  object-fit: cover;
}
p {
  text-align: left;
}
.del {
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
.button:hover {
  background-color: #6a4029;
}
.now {
  padding-top: 15px;
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
.add,
.ask {
  background-color: #6a4029;
  border: none;
  color: white;
}
b-button.sz {
  background-color: #6a4029;
  color: white;
  border-radius: 50%;
  border: none;
}
.size {
  box-shadow: 0px 6px 25px rgba(106, 64, 41, 0.7);
}
.data p {
  font-size: 16px;
}
.checkout {
  margin-top: 20px;
}
</style>
