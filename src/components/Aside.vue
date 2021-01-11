<template>
  <div>
    <b-container>
      <b-row>
        <b-col sm="12" md="6" lg="12">
          <b-container>
            <b-collapse id="my-collapse">
              <h2>Promo for you</h2>
              <p>Coupons will be updated every weeks.</p>
              <p>{{ coupons }}</p>
              <vue-card-stack
                :cards="coupons"
                :stack-width="240"
                :card-width="250"
                class="card-stack"
                v-if="showCoupon"
              >
                <template v-slot:card="{ card }">
                  <div style="width: 100%; height: 100%; color: white;">
                    <b-card
                      :style="{ background: card.coupon_background_color }"
                    >
                      <b-container class="b-container-card">
                        <img src="../assets/veggie-img.png" alt="product" />
                        <b-card-text class="b-card-text">
                          {{ card.product_name }} <br />{{ card.coupon_disc }}%
                          OFF<br />
                          Buy 1 {{ card.product_name }} and get
                          {{ card.coupon_disc }}% off
                          <br />
                          for {{ card.coupon_detail }}<br />
                          COUPON CODE
                          <br />
                          {{ card.coupon_code }} <br />
                          Valid untill October 10th 2020
                        </b-card-text>
                      </b-container>
                    </b-card>
                  </div>
                </template>
                <template v-slot:nav="{ onNext, onPrevious }">
                  <nav class="nav">
                    <button v-on:click="onPrevious" class="button left">
                      <b-icon icon="chevron-left"></b-icon>
                    </button>
                    <button v-on:click="onNext" class="button right">
                      <b-icon icon="chevron-right"></b-icon>
                    </button>
                    <b-button
                      style="margin-right: 20px; margin-bottom: 20px;"
                      v-if="user.user_role === 2"
                      variant="warning"
                      >Update</b-button
                    >
                    <b-button
                      @click="deleteCoupon(card.coupon_id)"
                      style="margin-left: 20px; margin-bottom: 20px; "
                      v-if="user.user_role === 2"
                      variant="danger"
                      >Delete</b-button
                    >
                    <b-button
                      v-if="user.user_role === 2"
                      style="background-color: #6a4029;"
                      block
                      ><router-link to="/createCoupon" class="link"
                        >Add
                      </router-link></b-button
                    >
                  </nav>
                </template>
              </vue-card-stack>
            </b-collapse>
          </b-container>
        </b-col>
        <b-col sm="12" md="6" lg="12">
          <b-button v-b-toggle.my-collapse class="toggle">Show Coupon</b-button>
          <pre>Terms and Condition <br>1. You can only apply 1 coupon per day <br>2. It only for dine in <br>3. Buy 1 get 1 only for new user <br>4. Should make member card to <br>apply coupon</pre>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>
<script>
import VueCardStack from 'vue-card-stack'
import { mapGetters, mapActions } from 'vuex'
export default {
  components: {
    VueCardStack
  },
  // coupon: 'getDataCoupon',
  // coupons: 'getDataCoupon',
  computed: {
    ...mapGetters({
      user: 'getDataUser',
      coupons: 'getDataCoupon',
      showCoupon: 'getShowCoupon'
    })
  },
  data() {
    return {
      message: null
      // coupon: []
      // showCoupon: false
    }
  },
  created() {
    this.getCoupon()
    // .then(result => {
    //   // this.showCoupon = true
    //   console.log(result)
    // })
    // .catch(error => {
    //   console.log(error)
    // }),
    // console.log(this.coupons)
  },
  methods: {
    ...mapActions(['getCoupon', 'deleteCouponById', 'getProductsAdm']),
    deleteCoupon(couponId) {
      console.log(couponId)
      this.deleteCouponById(couponId)
        .then(result => {
          this.message = result.data.msg
          this.getProductsAdm()
          console.log(result)
          // this.getProducts()
          this.makeToast('success')
          this.$router.push('/product')
        })
        .catch(error => {
          this.message = error.response.data.msg
          this.makeToast('danger')
        })
    },
    makeToast(variant = null) {
      this.$bvToast.toast(`${this.message}`, {
        title: 'MuseCoffee',
        variant: variant,
        solid: true
      })
    }
    // getCoupons() {
    //   this.getCoupon()
    //     // this.showCoupon = true
    //     .then(result => {
    //       this.showCoupon = true
    //       this.coupon = result.data.data
    //       // if (this.coupon.length !== 0) {

    //       // }

    //       console.log(result)
    //       //     this.coupon = response.data.data
    //       // this.showCoupon = true
    //       //     console.log(this.coupon)
    //     })
    //     .catch(error => {
    //       console.log(error)
    //       // this.msg = error.response.data.msg
    //       // this.makeToast('danger')
    //     })
    // axios
    //   .get('http://localhost:3050/coupon/')
    //   .then(response => {
    //     console.log(response)
    //     this.coupon = response.data.data
    //     this.showCoupon = true
    //     console.log(this.coupon)
    //   })
    //   .catch(error => console.log(error))
    // }
  }
}
</script>
<style scoped>
h2,
p {
  font-family: cursive;
}
h2 {
  font-size: 25px;
  margin-top: 20px;
  color: #6a4029;
}
p {
  font-size: 16px;
}
vue-card-stack.card-stack {
  position: relative;
  margin-bottom: 20px;
  border-radius: 20px;
}
.button {
  position: absolute;
  border: none;
}
.left {
  left: 0;
  top: 50%;
  z-index: 9;
}
.right {
  top: 50%;
  z-index: 9;
  margin-left: 200px;
}
.b-container-card {
  margin: 0 7%;
}
.b-card-text {
  font-family: Georgia, 'Times New Roman', Times, serif;
}
img {
  border-radius: 100%;
  object-fit: contain;
  width: 100%;
  object-position: center;
  padding: 0 20%;
}
pre {
  font-size: 15px;
  color: black;
}
.toggle {
  border: none;
  margin: 20px 0;
}
.link {
  color: white;
  text-decoration: none;
}
</style>
