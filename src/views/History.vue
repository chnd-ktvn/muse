<template>
  <div class="payment">
    <Header class="wrapper" />
    <b-jumbotron class="jumbotron">
      <b-container>
        <h2>Let's see what you have bought</h2>
        <p>Select form to delete</p>
        <p class="select">Select All</p>
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
  position: sticky;
  z-index: 10;
  top: 0;
}
.jumbotron {
  background-image: url(./../assets/tyler.png);
  background-size: cover;
  margin: -20px 0;
  color: black;
}
h2 {
  color: white;
  margin-top: -50px;
  margin-bottom: 30px;
  font-family: cursive;
}
p {
  color: white;
}
p.select {
  text-align: right;
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
