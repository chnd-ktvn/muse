<template>
  <div class="home">
    <Header class="wrapper" />
    <b-container>
      <b-col>
        <b-card
          bg-variant="secondary"
          text-variant="white"
          header="Welcome to Muse Coffee!"
          class="text-center"
        >
          <b-card-text>The leading innovator of Coffee Technology.</b-card-text>
          <b-button pill class="button">
            <router-link to="/product" class="link"
              >Login As A Customer</router-link
            >
          </b-button>
          |
          <b-button pill class="button">
            <router-link to="/productAdmin" class="link"
              >Login As An Admin
            </router-link>
          </b-button>
        </b-card>
      </b-col>
    </b-container>
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
  }
}
</script>
<style scoped>
.wrapper {
  position: sticky;
  z-index: 10;
  top: 0;
}
.text-center {
  font-size: 40px;
  font-family: cursive;
}
.button {
  background-color: rosybrown;
}
.link {
  color: white;
  text-decoration: none;
}
@media screen and (max-width: 768px) {
  .text-center {
    font-size: 20px;
  }
}
@media screen and (max-width: 576px) {
  .text-center {
    font-size: 20px;
  }
}
</style>
