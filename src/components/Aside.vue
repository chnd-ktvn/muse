<template>
  <vue-card-stack :cards="cards" :stack-width="240" :card-width="250">
    <template v-slot:card="{ card }">
      <div
        style="width: 100%; height: 100%;"
        :style="{ background: card.background }"
      ></div>
    </template>
  </vue-card-stack>
  <!-- <h1 class="i">You</h1> -->
</template>
<script>
// import Vue from 'vue'
import VueCardStack from 'vue-card-stack'
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
      ]
    }
  }
}
</script>
<style scoped>
.i {
  background-color: seagreen;
  margin: 20px 0;
}
</style>
