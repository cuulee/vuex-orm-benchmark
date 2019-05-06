
// Dependencies ===============

  const store = {namespaced: true}

// State ======================

  store.state = {
    all: {},
    active: false,
  }

// Mutations ==================

  store.mutations = {
    active(state, active){
      state.active = active
    },
    flush(state){
      state.all = {}
    },
    add(state, location){
      state.all[location.idLocation] = location
    },
    update(state, {idLocation, location}){
      state.all[idLocation] = location
    },
  }

// Actions ====================

  store.actions = {
    all({commit}, all){
      all.forEach((location) => {
        commit('add', location)
      })
    },
  }

// Getters ====================

  store.getters = {
    active(state){
      return state.active ? state.all[state.active] : false
    },
  }

// Export =====================

  export default store
