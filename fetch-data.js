/* eslint-disable import/first, no-undef, no-new, no-unused-vars */

  console.log('')
  console.log('')

// Dependencies ===============

  const path = require('path')
  const fs = require('fs')
  const request = require('request')
  const moment = require('moment')

// Settings ===================

  const recordsPerPage = 20

  const totalCharacters = 493
  const totalLocations = 18
  const totalEpisodes = 31

  const endpointCharacters = 'https://rickandmortyapi.com/api/character/'
  const endpointLocations = 'https://rickandmortyapi.com/api/location/'
  const endpointEpisodes = 'https://rickandmortyapi.com/api/episode/'

// Predecessor Fetch ==========

  async function init(){
    const characters = await fetchCharacters()
    fs.writeFile(path.join(__dirname, 'src', 'data', 'characters.json'), JSON.stringify(characters), (err) => {if(err)console.log(`Write Error [characters][${err}]`)})
    const locations = await fetchLocations()
    fs.writeFile(path.join(__dirname, 'src', 'data', 'locations.json'), JSON.stringify(locations), (err) => {if(err)console.log(`Write Error [locations][${err}]`)})
    const episodes = await fetchEpisodes()
    fs.writeFile(path.join(__dirname, 'src', 'data', 'episodes.json'), JSON.stringify(episodes), (err) => {if(err)console.log(`Write Error [episodes][${err}]`)})
  }

  async function fetchCharacters(){
    const characters = await list('character/')
    return characters.map((character) => {
      return {
        idCharacter: character.id,
        name: character.name,
        status: character.status,
        species: character.species,
        type: character.type,
        gender: character.gender,
        idLocationCurrent: typeof character.origin.url === 'string' ? urlToId(character.origin.url) : null,
        idLocationOrigin: typeof character.location.url === 'string' ? urlToId(character.origin.url) : null,
        image: character.image,
        episodes: character.episode.map(url => urlToId(url)),
      }
    })
  }
  async function fetchLocations(){
    const locations = await list('location/')
    return locations.map((location) => {
      return {
        idLocation: location.id,
        name: location.name,
        type: location.type,
        dimension: location.dimension,
        idCharacterResidents: location.residents.map(url => urlToId(url)),
      }
    })
  }
  async function fetchEpisodes(){
    const episodes = await list('episode/')
    return episodes.map((episode) => {
      return {
        idEpisode: episode.id,
        name: episode.name,
        dateAir: episode.air_date,
        episode: episode.episode,
        characters: episode.characters.map(url => urlToId(url)),
      }
    })
  }
  async function list(path){
    let results = []
    let page = 1
    let next = true
    while(next){
      const data = await fetch(`${path}?page=${page++}`)
      results = results.concat(data.results)
      next = !!data.info.next
    }
    return results
  }

  async function fetch(path){
    return new Promise((resolve, reject) => {
      const url = `https://rickandmortyapi.com/api/${path}`
      console.log(`Fetching API [${url}]`)
      request(url, function (err, res, data){
        if(err)
          reject(err)
        try{
          data = JSON.parse(data)
          setTimeout(() => {
            resolve(data)
          }, 1000)
        }catch(err){
          reject(err)
        }
      })

    })
  }

  function urlToId(id){
    const index = id.lastIndexOf('/')
    return index !== -1 ? (+id.substr(index + 1)) : null
  }

  init()
