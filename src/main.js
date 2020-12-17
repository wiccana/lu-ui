import Vue from 'vue'

// import Vuetify from 'vuetify'
// import Vuetify from 'vuetify/lib'

import App from './App.vue'

import vuetify from './plugins/vuetify';
import '@babel/polyfill'
import 'roboto-fontface/css/roboto/roboto-fontface.css'
import '@mdi/font/css/materialdesignicons.css'

// import vuetify from './plugins/vuetify';
// import vuetify from './plugins/vuetify';

//Ajax calls
// import axios from 'axios'
// import VueAxios from 'vue-axios'

//CSS


// path to vuetify export

// Vue.use(Vuetify)
// Vue.component('v-select', vSelect)


Vue.config.productionTip = false

new Vue({
  vuetify,
  render: h => h(App)
}).$mount('#app')
