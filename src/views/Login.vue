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
            <b-navbar-nav v-if="status_reg" style="margin: 0 auto;">
              <h5 style="margin: 20px 0; color: #6a4029;"><b>Register</b></h5>
            </b-navbar-nav>
            <b-navbar-nav v-else style="margin: 0 auto;">
              <h5 style="margin: 20px 0; color: #6a4029;"><b>Login</b></h5>
            </b-navbar-nav>
          </b-row>
          <b-row>
            <b-container v-if="status_reg">
              <RegisterForm class="form" />
            </b-container>
            <b-container v-else>
              <LoginForm class="form" />
            </b-container>
          </b-row>
        </b-container>
        <FooterP />
      </b-col>
    </b-row>
  </div>
</template>
<script>
import LoginForm from '../components/Auth/LoginForm.vue'
import RegisterForm from '../components/Auth/RegisterForm.vue'
import FooterP from '../components/_base/FooterP.vue'
import { mapGetters, mapMutations } from 'vuex'
export default {
  name: 'Login',
  components: {
    LoginForm,
    RegisterForm,
    FooterP
  },
  computed: {
    ...mapGetters({
      status_reg: 'statusReg'
    })
  },
  methods: {
    ...mapMutations(['statusLogin'])
  },
  created() {
    this.statusLogin()
  }
  // data() {
  //   return {
  //     form: {
  //       user_email: '',
  //       user_password: ''
  //     },
  //     msg: ''
  //   }
  // },
  // methods: {
  //   makeToast(variant = null) {
  //     this.$bvToast.toast(`${this.msg}`, {
  //       title: 'MuseCoffee',
  //       variant: variant,
  //       solid: true
  //     })
  //   },
  //   ...mapActions(['login']),
  //   onSubmit() {
  //     this.login(this.form)
  //       .then(result => {
  //         this.msg = result.data.msg
  //         this.makeToast('success')
  //         console.log(result)
  //         if (result.data.data.user_role) {
  //           this.$router.push('/product')
  //         }
  //       })
  //       .catch(error => {
  //         this.msg = error.response.data.msg
  //         this.makeToast('danger')
  //       })
  //   }
  // }
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
@media screen and (max-width: 768px) {
  .img {
    height: 50vh;
    object-fit: cover;
  }
  .form {
    margin: 10vh 0;
  }
}
/* .google-img {
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
} */
</style>
