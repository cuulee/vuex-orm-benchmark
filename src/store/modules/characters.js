
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
    add(state, character){
      state.all[character.idCharacter] = character
    },
    update(state, {idCharacter, character}){
      state.all[idCharacter] = character
    },
  }

// Actions ====================

  store.actions = {
    all({commit}, all){
      all.forEach((character) => {
        commit('add', character)
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
