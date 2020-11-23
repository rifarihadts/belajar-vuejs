import Vue from 'vue'
import App from './App.vue'
import Vuelidate from 'vuelidate'
import Xendit from './assets/xendit.js'
import jQuery from 'jquery'
var $ = jQuery;
window.$ = $;

Vue.use(Xendit);
Vue.use(Vuelidate)

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
