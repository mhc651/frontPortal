// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store/index'
import { sync } from 'vuex-router-sync'
import iView from 'iview'
import 'iview/dist/styles/iview.css'
// import global css file
import 'babel-polyfill'

// 获得已有的token

sync(store, router)
Vue.use(iView)

// Vue提示
Vue.config.productionTip = true

/* eslint-disable no-new */
if (window.browser) {
  new Vue({
    el: '#app',
    router,
    store,
    components: { App },
    template: '<App/>'
  })
}
