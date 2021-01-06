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
              <h5 style="margin: 20px 0; color: #6a4029;"><b>Sign Up</b></h5>
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
                    :state="validationPassword"
                    type="password"
                    placeholder="Enter your passsword"
                    required
                  ></b-form-input>
                  <b-form-invalid-feedback :state="validationPassword">
                    Your password must be 7-12 characters long !
                  </b-form-invalid-feedback>
                  <b-form-valid-feedback :state="validationPassword">
                    Marvelous !
                  </b-form-valid-feedback>
                </b-form-group>
                <b-form-group
                  id="input-group-3"
                  label="Phone Number:"
                  label-for="input-phone-number"
                >
                  <b-form-input
                    id="input-phone-number"
                    type="number"
                    v-model="form.user_phone_number"
                    :state="validationPhoneNumber"
                    placeholder="Enter your phone number"
                  ></b-form-input>
                  <b-form-invalid-feedback :state="validationPhoneNumber">
                    Your phone number must be 10-13 numbers long & Must contain
                    62 !
                  </b-form-invalid-feedback>
                  <b-form-valid-feedback :state="validationPhoneNumber">
                    Marvelous !
                  </b-form-valid-feedback>
                </b-form-group>
                <b-button
                  type="submit"
                  class="button"
                  :disabled="!validation"
                  style="width: 100%; background-color: #FFBA33; border-radius: 15px; border: none; color: black;"
                  >Sign Up</b-button
                >
                <b-button
                  class="button"
                  style="width: 100%; background-color: white; border: 3px solid silver; color: black; margin: 20px 0; border-radius: 15px;"
                  ><img
                    class="google-img"
                    src="../assets/google-logo.png"
                    alt="Google Logo's"
                  />
                  Sign up with google</b-button
                >
                <p style="margin: 20px 0; text-align: center">
                  Already have an account?
                </p>
                <b-button
                  class="button"
                  style="width: 100%; background-color: #6a4029; border-radius: 15px; margin: 20px 0; border: none;"
                  ><router-link to="/login" class="link"
                    >Login here
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
  name: 'SignUp',
  components: {
    FooterP
  },
  data() {
    return {
      form: {
        user_email: '',
        user_password: '',
        user_phone_number: ''
      },
      msg: ''
    }
  },
  computed: {
    validationPassword() {
      // this.form.user_password.match(/^(?=.*[A-Z])$/) &&
      return (
        this.form.user_password.length > 6 &&
        this.form.user_password.length < 13
      )
    },
    validationPhoneNumber() {
      return (
        this.form.user_phone_number.length > 9 &&
        this.form.user_phone_number.length < 13 &&
        this.form.user_phone_number[0] === '6' &&
        this.form.user_phone_number[1] === '2'
      )
    },
    validation() {
      return this.validationPassword && this.validationPhoneNumber
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
    ...mapActions(['signup']),
    onSubmit() {
      const form = {
        user_email: this.form.user_email,
        user_password: this.form.user_password,
        user_phone_number: '+' + this.form.user_phone_number
      }
      this.signup(form)
        .then(result => {
          this.msg = result.data.msg
          this.makeToast('success')
          //aktivasi via email dulu neh
          this.$router.push('/login')
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
