// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import { sync } from 'vuex-router-sync'
import App from './App.vue'
import router from './router'
import store from './store'

Vue.config.productionTip = false

sync(store, router)

/* eslint-disable no-new */
const app = new Vue({
  router,
  store,
  render: h => h(App)
})

export { app, router, store }
