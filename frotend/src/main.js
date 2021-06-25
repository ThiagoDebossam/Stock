import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import router from './router/router.js'
import axios from 'axios'
import './install/mixin'
// axios.defaults.headers.common['Authorization'] = 'bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6MSwiZW1haWwiOiJ0aGlhZ29kZWJvc3NhbThAZ21haWwuY29tIiwiaWF0IjoxNjI0NDk0NDczLCJleHAiOjE2MjQ0OTgwNzN9.pSJs-oPN0UUSyvsPOTrT-17SYcU2f-HQNu1uRWwRlq4'
const http = axios.create({
  baseURL: 'http://localhost:4000/',
  'Content-Type': 'application/json',
  'accept': '*/*'
})
Vue.prototype.$http = http
Vue.config.productionTip = false

new Vue({
  vuetify,
  router,
  render: h => h(App)
}).$mount('#app')
