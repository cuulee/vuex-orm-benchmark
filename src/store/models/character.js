
import {Model} from '@vuex-orm/core'

import Episode from './episode'
import EpisodeCharacter from './episodeCharacter'
import Location from './location'

export default class Character extends Model{

  static entity = 'characters'
  static primaryKey = 'idCharacter'

  static fields(){
    return {
      // record
      idCharacter: this.number(0),
      name: this.string(''),
      status: this.string(''),
      species: this.string(''),
      type: this.string(''),
      gender: this.string(''),
      idLocationCurrent: this.number(0),
      idLocationOrigin: this.number(0),
      // relationships
      locationCurrent: this.belongsTo(Location, 'idLocationCurrent'),
      locationOrigin: this.belongsTo(Location, 'idLocationOrigin'),
      episodes: this.belongsToMany(Episode, EpisodeCharacter, 'idCharacter', 'idEpisode')
    }
  }
}
