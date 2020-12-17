<template>
  <div class="home">
    <Header />
    <!-- <img alt="Vue logo" src="../assets/logo.png" /> -->
    <!-- <HelloWorld msg="Welcome to Your Vue.js App" /> -->
    <b-container class="bv-example-row">
      <b-row>
        <!-- <Aside b-col md="4" sm="12" bg-variant="info" class="a" /> -->
        <b-col md="4" sm="12" bg-variant="info" class="a">
          <Aside />
        </b-col>
        <b-col md="8" sm="12" bg-variant="primary" class="b">2 of 3</b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
// @ is an alias to /src
import Header from '../components/_base/Header.vue'
import Aside from '../components/Aside.vue'
// import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: 'Home',
  components: {
    Header,
    Aside
  }
}
</script>
<style scoped>
.a {
  background-color: rosybrown;
  border-right: 1px solid red;
}
.b {
  background-color: sandybrown;
}
</style>
