import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'
import 'bootstrap/dist/css/bootstrap.min.css'
import vuetify from './plugins/vuetify'

Vue.use(BootstrapVue)
Vue.use(IconsPlugin)

Vue.config.productionTip = false;

new Vue({
  router,
  vuetify,
  render: (h) => h(App),
  created(){
    let htmlEl=document.querySelector("html");
     htmlEl.setAttribute('dir','rtl');
     htmlEl.setAttribute('lang','fa');
   }
}).$mount("#app");
