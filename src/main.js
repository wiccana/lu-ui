import Vue from 'vue'

import App from './App.vue'
import vuetify from './plugins/vuetify';

import '@babel/polyfill'
import '@mdi/font/css/materialdesignicons.css'
import 'roboto-fontface/css/roboto/roboto-fontface.css'

Vue.prototype.$apiUrl = 'http://localhost:8080'
Vue.prototype.$minRisePercent = 0.5
Vue.prototype.$maxRisePercent = 50 
Vue.prototype.$minRentPercent = 55
Vue.prototype.$maxRentPercent = 150

Vue.config.productionTip = false

new Vue({
  vuetify,
  render: h => h(App)
}).$mount('#app')
