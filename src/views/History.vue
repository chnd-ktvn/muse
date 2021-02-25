<template>
  <div class="history">
    <Header class="wrapper" v-sticky />
    <b-jumbotron class="jumbotron">
      <b-container>
        <h2>Let's see what you have bought</h2>
        <p>
          Click
          <span><b-icon-trash style="color: white;"></b-icon-trash></span> to
          delete
        </p>
        <p class="select" @click="onDeleteUser()">Delete All</p>
        <b-row class="data">
          <b-col
            md="4"
            lg="4"
            sm="6"
            v-for="(item, index) in history"
            :key="index"
          >
            <b-card>
              <h5 style="text-align: center; color: black; ">
                Muse Coffee
              </h5>
              <p style="text-align: center;  color: black">
                Invoice: {{ item.history_invoice }}
              </p>
              <b-row
                style="border-bottom: 2px solid rosybrown; margin-bottom: 10px;"
              >
                <b-col class="transaction">
                  <div v-for="(order, index) in item.orders" :key="index">
                    <b-row>
                      <b-col class="preview">
                        <b-img
                          :src="
                            order.photo === null || order.photo === ''
                              ? require('./../assets/latte.png')
                              : `${env}/fileuploads/product_photo/` +
                                order.photo
                          "
                          alt="Coffee"
                        />
                      </b-col>
                      <b-col class="preview">
                        {{ order.product_name }} ({{ order.qty }})
                      </b-col>
                      <b-col class="preview">
                        Rp {{ order.product_price }}
                      </b-col>
                    </b-row>
                  </div>
                </b-col>
              </b-row>
              <b-row>
                <b-col style="text-align: start;">
                  Orders Date
                </b-col>
                <b-col style="text-align: end;">
                  {{ item.history_created_at.split('T')[0] }}</b-col
                >
              </b-row>
              <b-row style="margin-bottom: 15px;">
                <b-col style="text-align: start;">Total + Tax</b-col>
                <b-col style="text-align: end;">
                  Rp {{ item.history_total }}</b-col
                >
              </b-row>
              <b-row
                style="display: flex;
                justify-content: center; 
                align-items: center; margin-bottom: 30px;"
                @click="onDelete(item.history_id)"
                ><b-icon-trash
                  style="color: 6a4029; cursor: pointer;"
                ></b-icon-trash
              ></b-row>
            </b-card>
          </b-col>
        </b-row>
      </b-container>
    </b-jumbotron>
    <Footer />
  </div>
</template>
<script>
import Header from '../components/_base/Header.vue'
import Footer from '../components/_base/Footer.vue'
import { mapGetters, mapActions } from 'vuex'
import SweetAlert from '.././mixins/SweetAlert.js'
export default {
  name: 'Home',
  components: {
    Header,
    Footer
  },
  mixins: [SweetAlert],
  created() {
    console.log(this.user.user_id)
    this.getHistoryOrder(this.user.user_id)
  },
  computed: {
    ...mapGetters({
      user: 'getDataUser',
      history: 'getHistory'
    })
  },
  data() {
    return {
      env: process.env.VUE_APP_BASE_URL,
      msg: null
    }
  },
  methods: {
    ...mapActions(['getHistoryOrder', 'deleteHistoryById']),
    onDelete(e) {
      console.log(e)
      const payload = {
        user_id: this.user.user_id,
        id: e
      }
      this.deleteHistoryById(payload)
        .then(result => {
          this.msg = result.data.msg
          this.getHistoryOrder(this.user.user_id)
          this.alertSuccess({
            title: '<span style="font-family: cursive;">' + this.msg + '<span>'
          })
        })
        .catch(error => {
          this.msg = error.response.data.msg
          this.alertError({
            title: '<span style="font-family: cursive;">' + this.msg + '<span>'
          })
        })
    },
    onDeleteUser() {
      this.history.forEach(el => {
        console.log(el.history_id)
        const payload = {
          user_id: this.user.user_id,
          id: el.history_id
        }
        this.deleteHistoryById(payload)
          .then(result => {
            this.msg = result.data.msg
            this.getHistoryOrder(this.user.user_id)
            this.alertSuccess({
              title:
                '<span style="font-family: cursive;">' + this.msg + '<span>'
            })
          })
          .catch(error => {
            this.msg = error.response.data.msg
            this.alertError({
              title:
                '<span style="font-family: cursive;">' + this.msg + '<span>'
            })
          })
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
.history {
  font-family: cursive;
  color: black;
}
.jumbotron {
  background-image: url(./../assets/tyler.png);
  background-size: cover;
  margin: -20px 0;
  color: black;
}
h2 {
  color: white;
  margin: 0 0 15px 0;
}
p {
  color: white;
}
p.select {
  text-align: right;
  cursor: pointer;
}
.data {
  margin: 15px 0;
}
.transaction {
  height: 75px;
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
  width: 40px;
  height: 40px;
  object-fit: cover;
}
.card {
  width: 100%;
  height: 90%;
}
.card:hover {
  margin-right: 5px;
  margin-left: -8px;
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
