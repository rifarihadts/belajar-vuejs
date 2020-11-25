import Vue from 'vue'
import App from './App.vue'
import Vuelidate from 'vuelidate'
import Xendit from './assets/xendit.js'
// import * as VueGoogleMaps from "vue2-google-maps";

Vue.use(Xendit);
Vue.use(Vuelidate)
// Vue.use(VueGoogleMaps, {
//   load: {
//     key: "AIzaSyAu0uPLka24wdeL3y7SsetfwIbhzvu3bow",
//     libraries: "places" // necessary for places input
//   }
// });
Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
