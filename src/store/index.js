/* eslint-disable import/first */

// Vuex ORM Models ============

  const startOrm = new Date().getTime()
  import * as models from './models'
  import VuexORM from '@vuex-orm/core'
  const database = new VuexORM.Database()
  for(var m in models)
    database.register(models[m], {})
  const plugin = VuexORM.install(database)
  const timeOrm = new Date().getTime() - startOrm

// Vanilla Vuex Modules =======

  const startModules = new Date().getTime()
  import * as modules from './modules'
  const timeModules = new Date().getTime() - startModules

// Setup Store ================

  const store = {}

// State ======================

  store.state = {
    loaded: false,
    types: [
      {index: 'orm', title: 'Vuex ORM'},
      {index: 'modules', title: 'Vuex Modules'},
    ],
    times: {
      import: {
        orm: null,
        modules: null,
      },
      '1times': {
        listAll: {
          orm: null,
          modules: null,
        },
        listWithRelationships: {
          orm: null,
          modules: null,
        },
        listFiltered: {
          orm: null,
          modules: null,
        },
        fetchRandom: {
          orm: null,
          modules: null,
        },
      },
      '25times': {
        listAll: {
          orm: null,
          modules: null,
        },
        listWithRelationships: {
          orm: null,
          modules: null,
        },
        listFiltered: {
          orm: null,
          modules: null,
        },
        fetchRandom: {
          orm: null,
          modules: null,
        },
      },
    },
  }

// Mutations ==================

  store.mutations = {
    loaded(state, value){
      state.loaded = value
    },
    time(state, {name, type, ms, times}){
      if(times)
        state.times[`${times}times`][name][type] = ms
      else
        state.times[name][type] = ms
    },
  }

// Actions ====================

  store.actions = {
  }

// Getters ====================

  store.getters = {
  }

// Modules ====================

  store.modules = {
    ...modules
  }

// Plugins ====================

  store.plugins = [plugin]

// Export =====================

  export default store
