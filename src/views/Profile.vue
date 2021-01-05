<template>
  <div class="profile">
    <Header />
    <b-jumbotron>
      <b-container>
        <b-row style="background-color: silver;">
          <b-col lg="5">fff</b-col>
          <b-col lg="7">
            <b-container style="background-color: white;">
              nih
            </b-container>
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
export default {
  name: 'Profile',
  components: {
    Header,
    Footer
  }
}
</script>
<style scoped>
.jumbotron {
  background-image: url('../assets/latte.png');
  object-fit: cover;
  /* margin-bottom: -40px; */
}
</style>
