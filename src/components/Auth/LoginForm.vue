<template>
  <b-form @submit.prevent="onSubmit">
    <b-form-group
      id="input-group-1"
      label="Email address:"
      label-for="input-email"
    >
      <b-form-input
        id="input-email"
        v-model="form.user_email"
        type="email"
        placeholder="Enter your email address"
        required
      ></b-form-input>
    </b-form-group>
    <b-form-group
      id="input-group-2"
      label="Password:"
      label-for="input-password"
    >
      <b-form-input
        id="input-password"
        v-model="form.user_password"
        type="password"
        placeholder="Enter your passsword"
        required
      ></b-form-input>
    </b-form-group>
    <b-button
      type="submit"
      class="button"
      style="width: 100%; background-color: #FFBA33; border-radius: 15px; border: none; color: black;"
      >Login</b-button
    >
    <b-button
      class="button"
      style="width: 100%; background-color: white; border: 3px solid silver; color: black; margin: 20px 0; border-radius: 15px;"
      ><img
        class="google-img"
        src="../../assets/google-logo.png"
        alt="Google Logo's"
      />
      Login with google</b-button
    >
    <p style="margin: 20px 0; text-align: center">
      Don't have an account?
    </p>
    <b-button
      class="button"
      style="width: 100%; background-color: #6a4029; border-radius: 15px; margin: 20px 0; border: none;"
      @click="onRegister()"
      >Sign up here</b-button
    >
    <!-- <router-link to="/signup" class="link"
        >Sign up here
      </router-link> -->
    <b-button block style="border-radius: 15px;"
      ><router-link to="/" class="link">Cancel </router-link></b-button
    >
  </b-form>
</template>
<script>
import { mapActions, mapMutations } from 'vuex'
import SweetAlert from '../../mixins/SweetAlert.js'
export default {
  name: 'LoginForm',
  mixins: [SweetAlert],
  data() {
    return {
      form: {
        user_email: '',
        user_password: ''
      },
      msg: ''
    }
  },
  methods: {
    ...mapMutations(['statusRegister']),
    onRegister() {
      this.statusRegister()
    },
    ...mapActions(['login']),
    onSubmit() {
      this.login(this.form)
        .then(result => {
          this.msg = result.data.msg
          this.alertSuccess({
            title: '<span style="font-family: cursive;">' + this.msg + '<span>'
          })
          if (result.data.data.user_role) {
            this.$router.push('/product')
          }
        })
        .catch(error => {
          this.msg = error.response.data.msg
          this.alertError({
            title: '<span style="font-family: cursive;">' + this.msg + '<span>'
          })
        })
    }
  }
}
</script>
<style scoped>
.google-img {
  width: 4vh;
}
.form {
  margin-top: 10vh;
  margin-bottom: 30vh;
}
.button:visited,
.button:hover {
  box-shadow: 0px 6px 25px rgba(106, 64, 41, 0.7);
  border: none;
}
.link {
  color: white;
  text-decoration: none;
}
</style>
