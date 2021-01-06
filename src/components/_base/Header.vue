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
          <router-link to="/">Home</router-link>
          <router-link to="/product">Product</router-link>
          <router-link to="/payment">Your Cart</router-link>
          <router-link to="/history">History</router-link>
        </b-navbar-nav>

        <b-navbar-nav class="ml-auto navbar-right">
          <button
            :disabled="isDisabled"
            v-on:click="isHidden = !isHidden"
            class="ic-search"
          >
            <b-icon icon="search"></b-icon>
          </button>
          <b-nav-form v-if="!isHidden" class="nav-form">
            <b-form-input
              size="sm"
              placeholder="Search"
              style="width: 160px; text-align: center; font-family: Cambria, Cochin, Georgia, Times, 'Times New Roman', serif;"
              name="msg"
              v-model="childMessage"
              v-on:keyup.enter="emitToParent"
            ></b-form-input>
          </b-nav-form>
          <span class="chat-notif">
            <img class="img chat" src="../../assets/ic-chat.png" />
          </span>
          <b-nav-item-dropdown right>
            <template #button-content>
              <a>
                <img class="img user-img" src="../../assets/girl.png" />
              </a>
            </template>
            <b-dropdown-item href="#">Profile</b-dropdown-item>
            <b-dropdown-item href="#">Sign Out</b-dropdown-item>
          </b-nav-item-dropdown>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
  name: 'Header',
  data() {
    return {
      childMessage: '',
      isHidden: true,
      isDisabled: null
    }
  },
  computed: {
    // this.lalap()
    // ...mapGetters({
    //   isDisabled: 'getApaAja' || undefined ? true : null
    // })
  },
  created() {
    this.lalap()
  },
  methods: {
    ...mapGetters(['getApaAja']),
    lalap() {
      if (this.getApaAja() === false) {
        console.log(this.getApaAja())
        this.isDisabled = this.getApaAja()
        console.log(this.isDisabled + 'inih')
      } else if (this.getApaAja() === undefined) {
        this.isDisabled = true
      }
      // console.log(this.getApaAja()
      //   this.isDisabled = this.getApaAja()
      //   console.log(this.isDisabled + 'inih')
      // if (this.getApaAja() === false) {

      // } else {
      //   this.isDisabled = true
      // }
    },
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
  padding: 0 10px;
  height: 23px;
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
