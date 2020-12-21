<template>
  <div>
    <b-navbar toggleable="lg" type="light" class="header">
      <b-navbar type="light">
        <b-navbar-brand class="navbar">
          <img
            src="../../assets/coffee.png"
            class="d-inline-block align-top"
            alt="Logo"
          />
          MuseCoffee
        </b-navbar-brand>
      </b-navbar>
      <b-navbar-toggle target="nav-collapse" class="menu"></b-navbar-toggle>

      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav class="nav">
          <router-link to="/" class="link">Home</router-link>
          <router-link to="/product" class="link">Product</router-link>
          <router-link to="/productDetail" class="link">Detail</router-link>
          <router-link to="/productDetail" class="link">Your Cart</router-link>
          <router-link to="/productDetail" class="link">History</router-link>
        </b-navbar-nav>

        <!-- Right aligned nav items -->
        <b-navbar-nav class="ml-auto">
          <button v-on:click="isHidden = !isHidden" class="ic-search">
            <b-icon icon="search"></b-icon>
          </button>
          <b-nav-form v-if="!isHidden" class="nav-form">
            <b-form-input
              size="sm"
              class="mr-sm-2 form-input"
              placeholder="Search"
              name="msg"
              v-model="childMessage"
            ></b-form-input>
            <b-button size="sm" class="my-2 my-sm-0" v-on:click="emitToParent"
              >Search</b-button
            >
          </b-nav-form>
          <span class="chat-notif">
            <img class="img chat" src="../../assets/ic-chat.png" />
          </span>
          <a>
            <img class="img girl-img" src="../../assets/girl.png" />
          </a>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
  </div>
</template>
<script>
export default {
  data() {
    return {
      childMessage: '',
      isHidden: true
    }
  },
  methods: {
    emitToParent() {
      this.$emit('childToParent', this.childMessage)
    }
  }
}
</script>
<style scoped>
.header {
  background-color: white;
  border-bottom: 1px solid rosybrown;
}
.navbar {
  color: black;
  font-family: cursive;
}
.link {
  color: black;
  margin: 0 5px;
}
.link:hover {
  font-weight: bold;
  text-decoration: none;
}
.menu {
  background-color: rosybrown;
  border: none;
}
.ic-search {
  background-color: transparent;
  border: none;
  padding: 0 10px;
}
.form-input:input {
  width: 50px;
}
.chat-notif {
  padding: 5px;
}
.chat {
  height: 20px;
  cursor: pointer;
}
.girl-img {
  border-radius: 100%;
  padding: 0 10px;
  padding-top: 5px;
  height: 25px;
  cursor: pointer;
}
</style>
