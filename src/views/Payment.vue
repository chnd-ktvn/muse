<template>
  <div class="payment">
    <Header class="wrapper"  v-sticky />
    <b-jumbotron class="jumbotron">
      <b-container>
        <h2>Checkout your <br />item now!</h2>
        <b-col>
          <b-row>
            <b-col sm="12" md="5" class="order">
              <b-container>
                <h4>Order Summary</h4>
                <b-row>
                  <b-col class="transaction">You order is in here</b-col>
                </b-row>
                <b-row>
                  <b-col>
                    <p class="left">SUBTOTAL</p>
                  </b-col>
                  <b-col>
                    <p class="right">SUBTOTAL</p>
                  </b-col>
                </b-row>
                <b-row>
                  <b-col>
                    <p class="left">TAX & FEES</p>
                  </b-col>
                  <b-col>
                    <p class="right">TAX & FEES</p>
                  </b-col>
                </b-row>
                <b-row>
                  <b-col>
                    <p class="left">SHIPPING</p>
                  </b-col>
                  <b-col>
                    <p class="right">SHIPPING</p>
                  </b-col>
                </b-row>
                <b-row>
                  <b-col>
                    <p class="left">TOTAL</p>
                  </b-col>
                  <b-col>
                    <p class="right">TOTAL</p>
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
                  <p class="right title">Edit</p>
                </b-col>
              </b-row>
              <b-row class="data">
                <b-container>
                  <b-col>
                    <b-row
                      ><p><b>Delivery to Iskandar Street</b></p></b-row
                    >
                    <b-row>
                      <p class="address">
                        Km 5 refinery road oppsite re public road, effurun,
                        Jakarta
                      </p>
                    </b-row>
                    <b-row>+62 81348287878</b-row>
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
                        <b-form-radio value="first">pertama</b-form-radio>
                      </b-col>
                      <b-col>
                        <b-form-radio value="first">kedua</b-form-radio>
                      </b-col>
                      <b-col>
                        <b-form-radio value="first">ketiga</b-form-radio>
                      </b-col>
                    </b-form-radio-group>
                  </b-form-group>
                </b-container>
                <b-button block class="btn">
                  <router-link to="/history" class="link"
                    >Confirm and Pay</router-link
                  >
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
export default {
  name: 'Home',
  components: {
    Header,
    Footer
  },
  data() {
    return {
      selected: ''
    }
  }
}
</script>
<style scoped>
.wrapper {
  /* position: sticky; */
  z-index: 10;
  top: 0;
}
.jumbotron {
  background-image: url(./../assets/nathan.png);
  background-size: cover;
  margin: -20px 0;
  color: black;
}
h2 {
  color: white;
  margin-top: -50px;
  margin-bottom: 30px;
  font-family: cursive;
  text-align: left;
}
.jumbotron .order,
.data,
.payment {
  background-color: white;
  border-radius: 20px;
}
.title {
  margin-top: 20px;
}
h4 {
  margin: 20px 0;
  font-weight: 700;
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
  margin-top: 20px;
}
.link {
  color: white;
  text-decoration: none;
}
.transaction {
  overflow: auto;
}
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
