<template>
  <div class="header">
    <b-navbar toggleable="lg" type="light">
      <b-navbar type="light">
        <b-navbar-brand>
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
          <router-link
            v-if="
              this.user.user_role === 1 || this.user.user_role === undefined
            "
            to="/"
            >Home</router-link
          >
          <router-link
            v-if="
              this.user.user_role === 1 || this.user.user_role === undefined
            "
            to="/product"
            >Product</router-link
          >
          <router-link
            v-if="
              this.user.user_role === 1 || this.user.user_role === undefined
            "
            to="/payment"
            >Your Cart</router-link
          >
          <router-link
            v-if="
              this.user.user_role === 1 || this.user.user_role === undefined
            "
            to="/history"
            >History</router-link
          >
          <router-link v-if="this.user.user_role === 2" to="/"
            >Home</router-link
          >
          <router-link v-if="this.user.user_role === 2" to="/product"
            >Product</router-link
          >
          <router-link v-if="this.user.user_role === 2" to="/orders"
            >Orders</router-link
          >
          <router-link v-if="this.user.user_role === 2" to="/dashboard"
            >Dashboard</router-link
          >
        </b-navbar-nav>

        <div v-if="isLogin">
          <b-navbar-nav class="ml-auto navbar-right">
            <button v-on:click="isHidden = !isHidden" class="ic-search">
              <b-icon icon="search"></b-icon>
            </button>
            <b-nav-form v-if="!isHidden" class="nav-form">
              <b-form-input
                size="sm"
                placeholder="Search"
                style="width: 160px; text-align: center; font-family: Cambria, Cochin, Georgia, Times, 'Times New Roman', serif;"
                name="msg"
                v-model="product"
                v-on:keydown.enter.prevent="searchProduct"
              ></b-form-input>
            </b-nav-form>
            <span class="chat-notif">
              <img class="img chat" src="../../assets/ic-chat.png" />
            </span>
            <b-nav-item-dropdown right>
              <template #button-content>
                <a>
                  <img
                    class="img user-img"
                    :src="
                      user.photo === ''
                        ? require('../../assets/coffee.png')
                        : `http://${env}/fileuploads/user_photo/` + user.photo
                    "
                  />
                </a>
              </template>
              <b-dropdown-item href="#">Profile</b-dropdown-item>
              <b-dropdown-item @click="handleLogout">Sign Out</b-dropdown-item>
            </b-nav-item-dropdown>
          </b-navbar-nav>
        </div>
        <div v-else>
          <b-navbar-nav class="ml-auto navbar-right">
            <button v-on:click="isHidden = !isHidden" class="ic-search">
              <b-icon icon="search"></b-icon>
            </button>
            <b-nav-form v-if="!isHidden" class="nav-form">
              <b-form-input
                size="sm"
                placeholder="Search"
                styl
                e="width: 160px; text-align: center; font-family: Cambria, Cochin, Georgia, Times, 'Times New Roman', serif;"
                name="msg"
                v-model="product"
                v-on:keydown.enter.prevent="searchProduct"
              ></b-form-input>
            </b-nav-form>
            <b-button pill
              ><router-link
                to="/login"
                style="color: white; text-decoration: none;"
                >Login</router-link
              ></b-button
            >
          </b-navbar-nav>
        </div>
      </b-collapse>
    </b-navbar>
  </div>
</template>
<script>
import { mapGetters, mapActions, mapMutations } from 'vuex'
export default {
  name: 'Header',
  data() {
    return {
      env: process.env.VUE_APP_URL,
      product: '',
      isHidden: true
    }
  },
  computed: {
    ...mapGetters({
      isLogin: 'isLogin',
      user: 'getDataUser'
    })
  },
  methods: {
    ...mapActions(['logout']),
    handleLogout() {
      this.logout()
    },
    ...mapMutations(['searchProductBy']),
    searchProduct() {
      this.searchProductBy(this.product)
      this.$emit('childToParent')
    }
  }
}
</script>
<style scoped>
.header {
  background-color: white;
  border-bottom: 1px solid rosybrown;
  color: black;
  font-family: cursive;
  text-align: center;
}
.navbar-brand {
  margin: 0 40px;
}
.navbar-nav {
  margin: 0 40px;
}
.navbar-right {
  justify-content: center;
}
.nav {
  margin: 0 auto;
}
.nav a {
  color: black;
  margin: 0 25px;
}
.nav a:hover,
.nav a.router-link-exact-active {
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
.chat-notif {
  padding: 8px 5px;
  margin-right: -7px;
}
.chat {
  height: 22px;
  cursor: pointer;
}
.user-img {
  border-radius: 50%;
  object-fit: cover;
  width: 25px;
  height: 25px;
  margin: 0 10px;
  margin-bottom: 4px;
}
@media screen and (max-width: 992px) {
  .navbar-brand {
    margin: 0;
  }
  .nav-form {
    margin: 0 auto;
  }
  .header .navbar-right {
    margin: 0 auto;
  }
}
</style>
