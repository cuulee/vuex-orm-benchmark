
import {Model} from '@vuex-orm/core'

import Character from './character'

export default class Location extends Model{

  static entity = 'locations'
  static primaryKey = 'idLocation'

  static fields(){
    return {
      // record
      idLocation: this.number(0),
      name: this.string(''),
      type: this.string(''),
      dimension: this.string(''),
      idCharacterResidents: this.attr([]),
      // relationships
      charactersCurrent: this.hasMany(Character, 'idLocationCurrent'),
      charactersOrigin: this.hasMany(Character, 'idLocationOrigin'),
    }
  }
}

/*
{
  "idLocation":1,
  "name":"Earth (C-137)",
  "type":"Planet",
  "dimension":"Dimension C-137",
  "idCharacterResidents":[38,45,71,82,83,92,112,114,116,117,120,127,155,169,175,179,186,201,216,239,271,302,303,338,343,356,394]
}
*/
