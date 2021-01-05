<template>
  <div>
    <form @submit.prevent="" enctype="multipart/form-data">
      <div class="fields">
        <input type="file" ref="camera" accept="image/*" capture="camera" />
      </div>
      <div class="fields">
        <label>Upload File</label><br />
        <video autoplay="true" id="videoElement" ref="video"></video>
        <button @click="onS">Camera neh</button>
        <button @click="capture">Capture</button>
        <button @click="stop">Stop beib</button>
      </div>
      <div class="fields">
        <label>Upload File</label><br />
        <input type="file" ref="file" title="take picture" @change="onSelect" />
      </div>
      <div class="fields">
        <button>Submit</button>
      </div>
      <div class="message">
        <h5>{{ message }}</h5>
      </div>
      <div id="preview">
        <img v-if="url" :src="url" />
      </div>
    </form>
  </div>
</template>
<script>
export default {
  name: 'FileUpload',
  data() {
    return {
      file: '',
      message: '',
      url: null,
      mediaStream: null
    }
  },
  methods: {
    onS() {
      // if (navigator.mediaDevices.getUserMedia) {
      //   navigator.mediaDevices
      //     .getUserMedia({ video: true })
      //     .then(function(stream) {
      //       video.srcObject = stream
      //     })
      //     .catch(function(err0r) {
      //       console.log('Something went wrong!')
      //     })
      // }
      navigator.mediaDevices
        .getUserMedia({ video: true })
        .then(mediaStream => {
          this.mediaStream = mediaStream
          this.$refs.video.srcObject = mediaStream
          this.$refs.video.play()
        })
        .catch(error => console.error('getUserMedia() error:', error))
    },
    capture() {
      console.log(this.mediaStream)
      const mediaStreamTrack = this.mediaStream.getVideoTracks()[0]
      const imageCapture = new window.ImageCapture(mediaStreamTrack)
      // const tracks = this.mediaStream.getTracks()
      // tracks.map(track => track.stop())
      return imageCapture.takePhoto().then(blob => {
        console.log(blob)
      })
    },
    stop(){
      const tracks = this.mediaStream.getTracks()
      tracks.map(track => track.stop())
    },
    onSelect() {
      const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png']
      const file = this.$refs.file.files[0]
      this.url = URL.createObjectURL(file)
      this.file = file
      console.log(this.file.name)
      if (!allowedTypes.includes(file.type)) {
        this.message = 'Filetype is wrong!!'
        console.log(file.type)
      }
      if (file.size > 2 * 1024 * 1024) {
        this.message = 'Too large, max size allowed is 500kb'
        this.url = null
        console.log(file.size)
      }
    }
  }
}
</script>
<style scoped>
body {
  background-color: #e2e2e2;
}

#app {
  padding: 20px;
}

#preview {
  display: flex;
  justify-content: center;
  align-items: center;
}

#preview img {
  max-width: 100%;
  max-height: 500px;
}
</style>
