<template>
  <div class="login">
    <b-row>
      <b-col lg="5" md="5" sm="12" class="img-part">
        <img src="../assets/robert-bye.png" alt="Photo" class="img" />
      </b-col>

      <b-col lg="7" md="7" sm="12" class="input-part">
        <b-container>
          <b-row style="margin: 20px 0;">
            <b-navbar toggleable="lg" type="light">
              <b-navbar-brand>
                <img
                  src="./../assets/coffee.png"
                  class="d-inline-block align-top"
                  alt="Logo"
                />
                MuseCoffee
              </b-navbar-brand>
            </b-navbar>
            <b-navbar-nav style="margin: 0 auto;">
              <h5 style="margin: 20px 0; color: #6a4029;"><b>Login</b></h5>
            </b-navbar-nav>
          </b-row>
          <b-row>
            <b-container>
              <b-form @submit.prevent="onSubmit" class="form">
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
                    src="../assets/google-logo.png"
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
                  ><router-link to="/signup" class="link"
                    >Sign up here
                  </router-link></b-button
                >
                <b-button block style="border-radius: 15px;"
                  ><router-link to="/" class="link"
                    >Cancel
                  </router-link></b-button
                >
              </b-form>
            </b-container>
          </b-row>
        </b-container>
        <FooterP />
      </b-col>
    </b-row>
  </div>
</template>
<script>
import FooterP from '../components/_base/FooterP.vue'
import { mapActions } from 'vuex'
export default {
  name: 'Login',
  components: {
    FooterP
  },
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
    makeToast(variant = null) {
      this.$bvToast.toast(`${this.msg}`, {
        title: 'MuseCoffee',
        variant: variant,
        solid: true
      })
    },
    ...mapActions(['login']),
    onSubmit() {
      this.login(this.form)
        .then(result => {
          this.msg = result.data.msg
          this.makeToast('success')
          console.log(result)
          if (result.data.data.user_role) {
            this.$router.push('/product')
          }
        })
        .catch(error => {
          this.msg = error.response.data.msg
          this.makeToast('danger')
        })
    }
  }
}
</script>
<style scoped>
.login {
  font-family: cursive;
}
.row {
  margin: 0;
  padding: 0;
}
.img-part {
  margin: 0;
  padding: 0;
}
.img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
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
@media screen and (max-width: 768px) {
  .img {
    height: 50vh;
    object-fit: cover;
  }
  .form {
    margin: 10vh 0;
  }
}
</style>
