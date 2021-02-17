export default {
  methods: {
    alert(options) {
      this.$swal.fire(options)
    },
    alertSuccess({ title = 'Success!' }) {
      this.$swal({
        icon: 'success',
        title: title,
        showConfirmButton: false,
        timer: 4500
      })
    },
    alertError({ title = 'Something went wrong' }) {
      this.alert({
        icon: 'error',
        title: title,
        showConfirmButton: false,
        timer: 3000
      })
    }
  }
}
