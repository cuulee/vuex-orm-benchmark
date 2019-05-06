
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
    add(state, episode){
      state.all[episode.idEpisode] = episode
    },
    update(state, {idEpisode, episode}){
      state.all[idEpisode] = episode
    },
  }

// Actions ====================

  store.actions = {
    all({commit}, all){
      all.forEach((episode) => {
        commit('add', episode)
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
