/* eslint-disable import/first */

// Dependencies ===============

// Data Import ================

  import characters from '@/data/characters.json'
  import episodes from '@/data/episodes.json'
  import locations from '@/data/locations.json'

// Export Router ==============

  export const init = async (store) => {

    store.commit('loaded', false)

    let start = new Date().getTime()
    await importVuexOrm(store)
    store.commit('time', {name: 'import', type: 'orm', ms: new Date().getTime() - start})

    start = new Date().getTime()
    await importVuexModules(store)
    store.commit('time', {name: 'import', type: 'modules', ms: new Date().getTime() - start})

    store.commit('loaded', true)

  }

  import {Character, Episode, EpisodeCharacter, Location} from '@/store/models'
  async function importVuexOrm(store){

    characters.forEach(async (character) => {
      Character.insert({data: character})
    })
    episodes.forEach(async (episode) => {
      await Episode.insert({data: {
        idEpisode: episode.idEpisode,
        name: episode.name,
        dateAir: episode.dateAir,
        episode: episode.episode,
        //idCharacters: episode.characters, //renaming for vuex orm relationship
      }})
      //populate many to many table
      for(let idCharacter of episode.characters){
        await EpisodeCharacter.insert({data: {idEpisode: episode.idEpisode, idCharacter: idCharacter}})
      }
    })
    locations.forEach(async (location) => {
      await Location.insert({data: location})
    })
  }

  async function importVuexModules(store){
    await store.dispatch('characters/all', characters)
    await store.dispatch('episodes/all', episodes)
    await store.dispatch('locations/all', locations)
  }
