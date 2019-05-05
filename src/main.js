/* eslint-disable import/first, no-undef, no-new */

// Vue Setup ==================

  import Vue from 'vue'
  Vue.config.productionTip = false

// Vuex Store =================

  import Vuex from 'vuex'
  Vue.use(Vuex)
  import storeStructure from '@/store'
  const store = new Vuex.Store(storeStructure)

// App ========================

  import App from './App.vue'
  import router from './lib/router'
  new Vue({
    router,
    store,
    render: h => h(App)
  }).$mount('#app')
