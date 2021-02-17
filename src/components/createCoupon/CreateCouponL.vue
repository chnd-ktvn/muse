<template>
  <b-container>
    <form>
      <b-col class="preview">
        <b-img
          v-if="img"
          :src="
            img === ''
              ? require('../../assets/coffee.png')
              : 'http://localhost:3000/' + img
          "
          class="img"
        ></b-img>
        <b-img
        
          v-else
          :src="require('../../assets/' + imgDefault)"
          alt="Not rounded image"
        ></b-img>
      </b-col>
      <b-button class="btn-take" block>Take a picture</b-button>
      <label class="btn-handle"
        >Choose from gallery
        <input type="file" v-show="show" />
      </label>
      <b-form-group
        style="margin-top: 25px;"
        id="input-group-6"
        label="Delivery Hour:"
      >
        <b-form-select
          v-model="form.start_delivery_hour"
          @change="handleDel"
          :options="startHours"
          required
        ></b-form-select>
        <b-form-select
          v-model="form.end_delivery_hour"
          @change="handleDel"
          :options="endHours"
          required
        ></b-form-select>
      </b-form-group>
      <b-form-group id="input-group-7" label="Input Stock:">
        <b-form-select
          v-model="form.stock_product"
          @change="handleDel"
          :options="stock"
          required
        ></b-form-select>
      </b-form-group>
    </form>
  </b-container>
</template>
<script>
import { mapGetters, mapMutations } from 'vuex'
export default {
  name: 'LeftPart',
  computed: {
    ...mapGetters({
      img: 'getDataphotoProduct'
    })
  },
  data() {
    return {
      message: '',
      imgDefault: 'photo-camera-black-tool4.png',
      // img: null,
      form: {
        photo: null,
        start_delivery_hour: null,
        end_delivery_hour: null,
        stock_product: null
      },
      startHours: [
        { text: 'Start delivery hour', value: null },
        { text: '8 AM', value: '8 AM' },
        { text: '9 AM', value: '9 AM' },
        { text: '10 AM', value: '10 AM' },
        { text: '11 AM', value: '11 AM' },
        { text: '12 AM', value: '12 AM' }
      ],
      endHours: [
        { text: 'End delivery hour', value: null },
        { text: '5 PM', value: '5 PM' },
        { text: '6 PM', value: '6 PM' },
        { text: '7 PM', value: '7 PM' },
        { text: '8 PM', value: '8 PM' },
        { text: '9 PM', value: '9 PM' }
      ],
      stock: [
        { text: 'Input stock', value: null },
        { text: '50', value: '50' },
        { text: '60', value: '60' },
        { text: '70', value: '70' },
        { text: '80', value: '80' },
        { text: '90', value: '90' },
        { text: '100', value: '100' }
      ],
      show: false,
      mediaStream: null
    }
  },
  methods: {
    // ...mapActions(['getProductById']),
    ...mapMutations(['setForm']),
    handleFile(e) {
      const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png']
      this.img = URL.createObjectURL(e.target.files[0])
      if (!allowedTypes.includes(e.target.files[0].type)) {
        this.message = 'Filetype is wrong!'
        this.img = null
        this.makeToast('danger')
      } else if (e.target.files[0].size > 2 * 1024 * 1024) {
        this.message = 'Too large, max size allowed is 2MB'
        this.img = null
        this.makeToast('danger')
      } else {
        this.form.photo = e.target.files[0]
        this.setForm(this.form)
      }
    },
    makeToast(variant = null) {
      this.$bvToast.toast(`${this.message}`, {
        title: 'MuseCoffee',
        variant: variant,
        solid: true
      })
    },
    handleDel(e) {
      console.log(e)
      this.setForm(this.form)
    },
    onSelect() {
      const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png']
      const file = this.$refs.file.files[0]
      this.url = URL.createObjectURL(file)
      this.file = file
      if (!allowedTypes.includes(file.type)) {
        this.message = 'Filetype is wrong!!'
      }
      if (file.size > 2 * 1024 * 1024) {
        this.message = 'Too large, max size allowed is 500kb'
        this.url = null
      }
    }
  }
}
</script>
<style scoped>
.btn-take {
  background-color: black;
  color: white;
  border-radius: 10px;
  margin-top: 20px;
}
.btn-handle {
  width: 100%;
  background-color: #ffba33;
  border-radius: 10px;
  margin: 10px 0;
  padding: 5px;
  margin-bottom: 10px;
  text-align: center;
  color: black;
  cursor: pointer;
}
.btn-take:hover {
  background-color: black;
  box-shadow: 0px 6px 25px rgba(106, 64, 41, 0.7);
}
.btn-handle:hover {
  box-shadow: 0px 6px 25px rgba(106, 64, 41, 0.7);
}
.preview {
  margin: 0 auto;
  width: 200px;
  height: 200px;
  border-radius: 50%;
  background-color: lightgrey;
  display: flex;
  justify-content: center;
  align-items: center;
}
.img {
  object-fit: cover;
  width: 200px;
  height: 200px;
  border-radius: 50%;
}
</style>
