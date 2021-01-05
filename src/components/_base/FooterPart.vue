<template>
  <div>
    <b-row class="footer">
      <b-col sm="7" md="7" lg="7" class="footer-des">
        <b-row class="brand">
          <b-container>
            <img src="../../assets/coffee.png" />
            <h1>MuseCoffee</h1>
          </b-container>
        </b-row>
        <b-container>
          <p class="des">
            MuseCoffee is a store that sells some good meals, and especially
            coffee. We provide high quality beans
          </p>
        </b-container>
        <section class="img">
          <span class="fb"> </span>
          <span class="twitter"> </span>
          <span class="ig"> </span>
        </section>
        <p class="copy">&#169;2020MuseCoffee</p>
      </b-col>
      <b-col sm="5" md="5" lg="5" class="merge">
        <b-container>
          <b-row class="footer-product">
            <b-col lg="6">
              <p><b>Product</b></p>
              <a href="#">Download</a>
              <a href="#">Pricing</a>
              <a href="#">Locations</a>
            </b-col>
            <b-col lg="6">
              <a href="#">Countries</a>
              <a href="#">Blog</a>
            </b-col>
          </b-row>
          <b-row class="footer-engage">
            <b-col lg="6">
              <p><b>Engage</b></p>
              <a href="#">Muse Coffee?</a>
              <a href="#">FAQ</a>
              <a href="#">About Us</a>
            </b-col>
            <b-col lg="6">
              <a href="#">Privacy Policy</a>
              <a href="#">Terms of service</a>
            </b-col>
          </b-row>
        </b-container>
      </b-col>
    </b-row>
  </div>
</template>
<script>
export default {
  name: 'Footer'
}
</script>
<style scoped>
.footer {
  background-color: rosybrown;
  font-family: cursive;
  padding: 20px 0;
  text-align: center;
  font-size: 18px;
  display: flex;
}
h1 {
  margin-top: 3px;
  margin-left: 5px;
  font-size: 25px;
  color: black;
}
.brand {
  display: flex;
  justify-content: start;
  align-content: start;
}
p.des {
  text-align: center;
}
.footer-des .img {
  display: flex;
  justify-content: center;
  margin-top: 20px;
  margin-bottom: 20px;
  cursor: pointer;
}
.footer-des .img span {
  margin: 0 5px;
}
.footer-des .img .fb {
  background-image: url(../../assets/ellipse.png);
  background-size: cover;
  height: 30px;
  width: 30px;
  position: relative;
}
.footer-des .img .fb::after {
  content: '';
  background-image: url(../../assets/fb.png);
  background-size: cover;
  height: 100%;
  width: 100%;
  position: absolute;
  z-index: 1;
  left: 0;
}
.footer-des .img .twitter {
  background-image: url(../../assets/ellipse.png);
  background-size: cover;
  height: 30px;
  width: 30px;
  position: relative;
}
.footer-des .img .twitter::after {
  content: '';
  background-image: url(../../assets/twitter.png);
  background-size: cover;
  height: 100%;
  width: 100%;
  position: absolute;
  z-index: 1;
  left: 0;
}
.footer-des .img .ig {
  background-image: url(../../assets/ellipse.png);
  background-size: cover;
  height: 30px;
  width: 30px;
  position: relative;
}
.footer-des .img .ig::after {
  content: '';
  background-image: url(../../assets/ig.png);
  background-size: cover;
  height: 100%;
  width: 100%;
  position: absolute;
  z-index: 1;
  left: 0;
}
a {
  display: block;
  color: black;
}
a:hover {
  color: whitesmoke;
  text-decoration: none;
}
.merge {
  display: flex;
  flex-direction: column;
  text-align: left;
  /* justify-content: center; */
  /* align-content: center; */
}
.footer-product {
  flex-direction: row;
  /* flex: 3; */
}
.footer-engage {
  flex-direction: row;
  /* flex: 3; */
}
@media screen and (max-width: 992px) {
  .merge {
    display: flex;
    flex-direction: row;
  }
  .footer-product {
    flex-direction: column;
    flex: 3;
  }
  .footer-engage {
    flex-direction: column;
    flex: 3;
  }
}
</style>
