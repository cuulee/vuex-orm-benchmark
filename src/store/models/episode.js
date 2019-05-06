
import {Model} from '@vuex-orm/core'

import Character from './character'
import EpisodeCharacter from './episodeCharacter'

export default class Episode extends Model{

  static entity = 'episodes'
  static primaryKey = 'idEpisode'

  static fields(){
    return {
      // record
      idEpisode: this.number(0),
      name: this.string(''),
      dateAir: this.string(''),
      episode: this.string(''),
      //idCharacters: this.attr([]),
      // relationships
      //characters: this.hasManyBy(Character, 'idCharacters'),
      characters: this.belongsToMany(Character, EpisodeCharacter, 'idEpisode', 'idCharacter')
    }
  }
}

/*
{
  "idEpisode":1,
  "name":"Pilot",
  "dateAir":"December 2, 2013",
  "episode":"S01E01",
  //"idCharacters":[1,2,35,38,62,92,127,144,158,175,179,181,239,249,271,338,394,395,435]
}
*/
