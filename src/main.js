/* eslint-disable import/first, no-undef, no-new */

// Vue Setup ==================

  import Vue from 'vue'
  Vue.config.productionTip = false

// Vuex Store =================

  import Vuex from 'vuex'
  Vue.use(Vuex)
  import storeStructure from '@/store'
  const store = new Vuex.Store(storeStructure)
  import {init} from '@/lib/import'
  init(store)

// App ========================

  import App from './App.vue'
  new Vue({
    store,
    render: h => h(App)
  }).$mount('#app')
