<template>
  <div>
    <b-container>
      <b-row>
        <b-col sm="12" md="6" lg="12">
          <b-container>
            <b-collapse id="my-collapse">
              <vue-card-stack
                :cards="cards"
                :stack-width="240"
                :card-width="250"
                class="card-stack"
              >
                <template v-slot:card="{ card }">
                  <div
                    style="width: 100%; height: 100%; color: white; border-radius: 20px"
                    v-for="(coupon, index) in coupons"
                    :key="index"
                  >
                    <b-card :style="{ background: card.background }">
                      <b-container class="b-container-card">
                        <img src="../assets/image 2.png" alt="" />
                        <b-card-text class="b-card-text">
                          {{ coupon.coupon_code }} <br />20% OFF<br />
                          Buy 1 Choco Oreo and get 20% off <br />
                          for Beef Spaghetti <br />
                          COUPON CODE <br />
                          FNPR15RG <br />
                          Valid untill October 10th 2020
                        </b-card-text>
                      </b-container>
                    </b-card>
                  </div>
                </template>
                <template v-slot:nav="{ onNext, onPrevious }">
                  <nav class="nav">
                    <button v-on:click="onPrevious" class="button a">
                      <b-icon icon="chevron-left"></b-icon>
                    </button>
                    <button v-on:click="onNext" class="button b">
                      <b-icon icon="chevron-right"></b-icon>
                    </button>
                  </nav>
                </template>
              </vue-card-stack>
            </b-collapse>
          </b-container>
        </b-col>
        <b-col sm="12" md="6" lg="12">
          <b-button v-b-toggle.my-collapse>Apply Coupon</b-button>
          <pre>Terms and Condition <br>1. You can only apply 1 coupon per day <br>2. It only for dine in <br>3. Buy 1 get 1 only for new user <br>4. Should make member card to <br>apply coupon</pre>
        </b-col>
      </b-row>
    </b-container>
  </div>
  <!-- <h1 class="i">You</h1> -->
</template>
<script>
// import Vue from 'vue'
import VueCardStack from 'vue-card-stack'
import axios from 'axios'
export default {
  components: {
    VueCardStack
  },
  data() {
    return {
      cards: [
        { background: '#00659d' },
        { background: '#00abbc' },
        { background: '#e2c58a' },
        { background: '#fc8890' },
        { background: '#b35d7f' }
      ],
      coupons: []
    }
  },
  created() {
    this.getCoupon()
  },
  methods: {
    getCoupon() {
      axios
        .get('http://localhost:3050/coupon/')
        .then(response => {
          console.log(response)
          this.coupons = response.data.data
        })
        .catch(error => console.log(error))
    }
  }
}
</script>
<style scoped>
.i {
  background-color: seagreen;
  margin: 0 20px;
  /* margin-bottom: 20px; */
}
vue-card-stack.card-stack {
  position: relative;
  margin-bottom: 20px;
  border-radius: 20px;
}
.button {
  position: absolute;
  /* background-color: transparent; */
  border: none;
}
.a {
  left: 0;
  top: 50%;
  z-index: 10;
}
.b {
  top: 50%;
  z-index: 10;
  margin-left: 200px;
}
.b-container-card {
  margin: 0 7%;
}
/* .b-card-text {
}*/
img {
  border-radius: 100%;
  object-fit: contain;
  width: 100%;
  object-position: center;
  padding: 0 20%;
}
pre {
  font-size: 15px;
}
</style>
