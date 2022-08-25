<!-- <template>
  <head>
    <link
      rel="stylesheet"
      href="https://use.fontawesome.com/releases/v5.0.8/css/all.css"
    />

  </head>
  <Header />

  <div class="container mt-5">
    <router-view></router-view>
  </div>

  <Footer />
</template> -->


<template>
  <div id="app">
    <Header />

  <div class="container mt-5">
    <router-view></router-view>
  </div>
  </div>
</template>

<script>
import Header from "./components/sections/Header.vue";
import Footer from "./components/sections/Footer";
import { setAuthToken } from "./services/AuthService.js";

export default {
  name: "App",
  components: {
    Header,
    Footer,
  },

  mounted() {
    const token = localStorage.getItem("token");

    setAuthToken(token);
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
@import'~bootstrap/dist/css/bootstrap.css'
</style>
