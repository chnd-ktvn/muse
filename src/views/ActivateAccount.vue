<template>
  <div class="home">
    <b-container>
      <b-col>
        <b-card
          bg-variant="secondary"
          text-variant="white"
          header="Thank you for choosing us. Happy Shopping!"
          style="border-radius: 20px; width: 80%; margin: 20vh auto;"
          class="text-center"
        >
          <b-button
            block
            pill
            style="border-radius: 15px; background-color: rosybrown;"
            ><router-link to="/login" class="link"
              >You can login here</router-link
            ></b-button
          >
        </b-card>
      </b-col>
    </b-container>
  </div>
</template>
<script>
import { mapActions } from 'vuex'
import SweetAlert from '../mixins/SweetAlert.js'
export default {
  name: 'ActivateAccount',
  mixins: [SweetAlert],
  data() {
    return {
      msg: ''
    }
  },
  created() {
    this.user_id = this.$route.params.id
    const form = {
      id: this.user_id
    }
    this.activationEmail(form)
      .then(result => {
        this.msg = result.data.msg
        this.alertSuccess({
          title: '<span style="font-family: cursive;">' + this.msg + '<span>'
        })
      })
      .catch(error => {
        this.msg = error.response.data.msg
        this.alertError({
          title: '<span style="font-family: cursive;">' + this.msg + '<span>'
        })
      })
  },
  methods: {
    ...mapActions(['activationEmail'])
  }
}
</script>
<style scoped>
.text-center {
  font-size: 40px;
  font-family: cursive;
}
.button {
  background-color: rosybrown;
}
.link {
  color: white;
  text-decoration: none;
}
@media screen and (max-width: 768px) {
  .text-center {
    font-size: 25px;
  }
}
@media screen and (max-width: 576px) {
  .text-center {
    font-size: 25px;
  }
}
</style>
