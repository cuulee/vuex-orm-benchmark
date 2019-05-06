
import {Model} from '@vuex-orm/core'

export default class EpisodeCharacter extends Model{

  static entity = 'episodeCharacter'
  static primaryKey = ['idEpisode', 'idCharacter']

  static fields(){
    return {
      idEpisode: this.number(0),
      idCharacter: this.number(0),
    }
  }
}
