<template>
  <div class="footer">
    <b-container>
      <b-row>
        <b-col sm="12" md="12" lg="7" class="footer-des">
          <b-row class="brand">
            <b-container>
              <img src="../../assets/coffee.png" />
              <h1>Muse Coffee</h1>
            </b-container>
          </b-row>
          <b-container>
            <p class="des">
              Coffee Shop is a store that sells some good meals, and especially
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
        <b-col sm="12" md="12" lg="5" class="merge">
          <b-row>
            <b-col class="footer-product">
              <p><b>Produk</b></p>
              <a href="#">Download</a>
              <a href="#">Pricing</a>
              <a href="#">Locations</a>
              <a href="#">Countries</a>
              <a href="#">Blog</a>
            </b-col>
            <b-col class="footer-engage">
              <p><b>Engage</b></p>
              <a href="#">Muse Coffee?</a>
              <a href="#">FAQ</a>
              <a href="#">About Us</a>
              <a href="#">Privacy Policy</a>
              <a href="#">Terms of service</a>
            </b-col>
          </b-row>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>
<script></script>
<style scoped>
.footer {
  background-color: rosybrown;
  font-family: cursive;
  padding: 20px 0;
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
  justify-content: center;
  align-content: center;
}
.footer-product {
  flex: 6;
}
.footer-engage {
  flex: 6;
}
</style>
