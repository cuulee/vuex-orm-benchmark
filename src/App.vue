<template>
  <div id="app"><div class="contain" v-if="$store.state.loaded">

    <h1>Number of Entries</h1>
    <div style="display: flex;">
      <div :style="{'flex-basis': `${100 / $store.state.types.length}%`}" class="code" v-for="type in $store.state.types" :key="`info-type-${type.index}`">
        <h3>{{ type.title }}</h3>
        <div><b>Characters:</b> {{ info[type.index].characters }}</div>
        <div><b>Episodes:</b> {{ info[type.index].episodes }}</div>
        <div><b>Locations:</b> {{ info[type.index].locations }}</div>
      </div>
    </div>
    <br>
    <hr>
    <br>

    <h1>Import Data</h1>
    <div style="display: flex;">
      <div :style="{'flex-basis': `${100 / $store.state.types.length}%`}" class="code" v-for="type in $store.state.types" :key="`import-type-${type.index}`">
        <h3>{{ type.title }}</h3>
        <div v-if="typeof $store.state.times.import[type.index] === 'number'">{{ $store.state.times.import[type.index] }}ms</div>
      </div>
    </div>
    <div style="display: flex;">
      <div :style="{'flex-basis': `${100 / $store.state.types.length}%`}">
        <chart metric="Import Data" :amount="amount.listAll" :values="$store.state.types.map(type => $store.state.times.import[type.index])"/>
      </div>
    </div>
    <br>
    <hr>
    <br>

    <div v-for="comparison in comparisons" :key="`comparison-${comparison.index}`">
      <h1>{{ comparison.title }}</h1>
      <div style="display: flex;">
        <div :style="{'flex-basis': `${100 / $store.state.types.length}%`}" class="code" v-for="type in $store.state.types" :key="`info-type-${type.index}`">
          <h3>{{ type.title }}</h3>
          <template v-for="t in times">
            <div :key="`display-${t}-${comparison.index}`" v-if="typeof $store.state.times[`${t}times`][comparison.index][type.index] === 'number'"><b>{{ `${t} Time${t > 1 ? 's' : ''}` }}:</b> {{ $store.state.times[`${t}times`][comparison.index][type.index] }}ms</div>
          </template>
        </div>
      </div>
      <div style="display: flex;">
        <div :style="{'flex-basis': `${100 / $store.state.types.length}%`}" v-for="t in times" :key="`times-${t}-${comparison.index}`">
          <chart v-if="performRuns[comparison.index] === $store.state.types.length" :metric="comparison.title" :amount="t" :values="$store.state.types.map(type => $store.state.times[`${t}times`][comparison.index][type.index])"/>
        </div>
      </div>
      <br>
      <hr>
      <br>
    </div>
<!--
    <h1>List With Relationships <button @click="listWithRelationshipsExec()">Run Once</button>&nbsp;<button @click="listWithRelationshipsExec(25)">Run 25 Times</button></h1>
    <div style="display: flex;">
      <div :style="{'flex-basis': `${100 / $store.state.types.length}%`}" class="code" v-for="type in $store.state.types" :key="`info-type-${type.index}`">
        <h3>{{ type.title }}</h3>
        <div class="limit">{{ listWithRelationships[type.index].length }}</div>
        <div v-if="typeof $store.state.times.listWithRelationships[type.index] === 'number'">{{ $store.state.times.listWithRelationships[type.index] }}ms</div>
      </div>
    </div>
    <chart v-if="loaded.listWithRelationships" metric="List With Relationships" :amount="amount.listWithRelationships" :values="$store.state.types.map(type => $store.state.times.listWithRelationships[type.index])"/>
    <hr>

    <h1>List and Filter <button @click="listFilteredExec()">Run Once</button>&nbsp;<button @click="listFilteredExec(25)">Run 25 Times</button></h1>
    <div style="display: flex;">
      <div :style="{'flex-basis': `${100 / $store.state.types.length}%`}" class="code" v-for="type in $store.state.types" :key="`info-type-${type.index}`">
        <h3>{{ type.title }}</h3>
        <div class="limit">{{ listFiltered[type.index].length }}</div>
        <div v-if="typeof $store.state.times.listFiltered[type.index] === 'number'">{{ $store.state.times.listFiltered[type.index] }}ms</div>
      </div>
    </div>
    <chart v-if="loaded.listFiltered" metric="List and Filter" :amount="amount.listFiltered" :values="$store.state.types.map(type => $store.state.times.listFiltered[type.index])"/>
    <hr>

    <h1>Fetch Character and Relationships By ID <button @click="fetchRandomExec()">Run Once</button>&nbsp;<button @click="fetchRandomExec(25)">Run 25 Times</button></h1>
    <div style="display: flex;">
      <div :style="{'flex-basis': `${100 / $store.state.types.length}%`}" class="code" v-for="type in $store.state.types" :key="`info-type-${type.index}`">
        <h3>{{ type.title }}</h3>7
        <div class="limit">{{ fetchRandom[type.index] && typeof fetchRandom[type.index][0] !== 'undefined' ? fetchRandom[type.index][0] : fetchRandom[type.index] }}</div>
        <div v-if="typeof $store.state.times.fetchRandom[type.index] === 'number'">{{ $store.state.times.fetchRandom[type.index] }}ms</div>
      </div>
    </div>
    <chart v-if="loaded.fetchRandom" metric="Fetch Character and Relationships By ID" :amount="amount.fetchRandom" :values="$store.state.types.map(type => $store.state.times.fetchRandom[type.index])"/>
    <hr>

    <h1>Responsiveness <button @click="fetchRandomExec()">Run Once</button>&nbsp;<button @click="fetchRandomExec(25)">Run 25 Times</button>&nbsp;<button @click="fetchRandomExec(100)">Run 100 Times</button></h1>
    <div style="display: flex;">
    </div>
    <hr>
-->
  </div></div>
</template>

<script>

// Dependencies ===============

  import chart from '@/components/chart.vue'

// App ========================

  let component = {
    data: () => ({
      times: [1, 25],
      comparisons: [
        {index: 'listAll', title: 'List All Characters'},
        {index: 'listWithRelationships', title: 'List With Relationships'},
        {index: 'listFiltered', title: 'List and Filter'},
        {index: 'fetchRandom', title: 'Fetch Character and Relationships By ID'},
      ],
      performs: [
        {name: 'listAll', times: 1},
        {name: 'listAll', times: 25},
        {name: 'listWithRelationships', times: 1},
        {name: 'listWithRelationships', times: 25},
        {name: 'listFiltered', times: 1},
        {name: 'listFiltered', times: 25},
        {name: 'fetchRandom', times: 1},
        {name: 'fetchRandom', times: 25},
      ],
      performRuns: {
        listAll: 0,
        listWithRelationships: 0,
        listFiltered: 0,
        fetchRandom: 0,
      },
      loaded: {
        listAll: false,
        listWithRelationships: false,
        listFiltered: false,
        fetchRandom: false,
      },
      amount: {
        listAll: 0,
        listWithRelationships: 0,
        listFiltered: 0,
        fetchRandom: 0,
      },
      listAll: {
        amount: 0,
        orm: [],
        modules: [],
      },
      listWithRelationships: {
        amount: 0,
        orm: [],
        modules: [],
      },
      listFiltered: {
        amount: 0,
        orm: [],
        modules: [],
      },
      fetchRandom: {
        amount: 0,
        orm: null,
        modules: null,
      },
    }),
    computed: {
      info(){
        return {
          orm: {
            characters: this.$store.getters['entities/characters/all']().length,
            episodes: this.$store.getters['entities/episodes/all']().length,
            locations: this.$store.getters['entities/locations/all']().length,
          },
          modules: {
            characters: Object.values(this.$store.state.characters.all).length,
            episodes: Object.values(this.$store.state.episodes.all).length,
            locations: Object.values(this.$store.state.locations.all).length,
          },
        }
      },
    },
    methods: {
      listAllExec(times = 1){
        this.loaded.listAll = false
        this.$nextTick(() => {
          const startOrm = new Date().getTime()
          console.log('this.listAll', this.listAll)
          for(let i = 0; i < times; i++)
            this.listAll.orm = this.$store.getters['entities/characters/all']()
          this.$store.commit('time', {name: 'listAll', type: 'orm', ms: new Date().getTime() - startOrm, times})
          const startModules = new Date().getTime()
          for(let i = 0; i < times; i++)
            this.listAll.modules = Object.values(this.$store.state.characters.all)
          this.$store.commit('time', {name: 'listAll', type: 'modules', ms: new Date().getTime() - startModules, times})
          this.loaded.listAll = true
        })
      },
      listWithRelationshipsExec(times = 1){
        this.loaded.listWithRelationships = false
        this.$nextTick(() => {
          const startOrm = new Date().getTime()
          for(let i = 0; i < times; i++)
            this.listWithRelationships.orm = this.$store.getters['entities/characters/query']().with('episodes').with('locationOrigin').get()
          this.$store.commit('time', {name: 'listWithRelationships', type: 'orm', ms: new Date().getTime() - startOrm, times})
          const startModules = new Date().getTime()
          for(let i = 0; i < times; i++)
            this.listWithRelationships.modules = Object.values(this.$store.state.characters.all).map((character) => {return {...character, episodes: character.episodes.map(idEpisode => this.$store.state.episodes.all[idEpisode]), locationOrigin: this.$store.state.locations.all[character.idLocationOrigin]}})
          this.$store.commit('time', {name: 'listWithRelationships', type: 'modules', ms: new Date().getTime() - startModules, times})
          this.loaded.listWithRelationships = true
        })
      },
      listFilteredExec(times = 1){
        this.loaded.listFiltered = false
        this.$nextTick(() => {
          const startOrm = new Date().getTime()
          for(let i = 0; i < times; i++)
            this.listFiltered.orm = this.$store.getters['entities/characters/query']().where('status', 'Alive').with('episodes').with('locationOrigin').get()
          this.$store.commit('time', {name: 'listFiltered', type: 'orm', ms: new Date().getTime() - startOrm, times})
          const startModules = new Date().getTime()
          for(let i = 0; i < times; i++)
            this.listFiltered.modules = Object.values(this.$store.state.characters.all).filter(character => character.status === 'Alive').map((character) => {return {...character, episodes: character.episodes.map(idEpisode => this.$store.state.episodes.all[idEpisode]), locationOrigin: this.$store.state.locations.all[character.idLocationOrigin]}})
          this.$store.commit('time', {name: 'listFiltered', type: 'modules', ms: new Date().getTime() - startModules, times})
          this.loaded.listFiltered = true
        })
      },
      fetchRandomExec(times = 1){
        this.loaded.fetchRandom = false
        this.$nextTick(() => {
          let id
          const numCharacters = Object.values(this.$store.state.characters.all).length
          const startOrm = new Date().getTime()
          for(let i = 0; i < times; i++){
            id = Math.round(Math.random() * numCharacters) + 1
            const character = this.$store.getters['entities/characters/query']().where('idCharacter', id).with('episodes').with('locationCurrent').get()
            this.fetchRandom.orm = character
          }
          this.$store.commit('time', {name: 'fetchRandom', type: 'orm', ms: new Date().getTime() - startOrm, times})
          const startModules = new Date().getTime()
          for(let i = 0; i < times; i++){
            id = Math.round(Math.random() * numCharacters) + 1
            const character = this.$store.state.characters.all[id]
            character.episodes = character.episodes.map((idEpisode) => {
              return this.$store.state.episodes.all[idEpisode]
            })
            character.locationCurrent = this.$store.state.locations.all[character.idLocationOrigin]
            this.fetchRandom.modules = character
          }
          this.$store.commit('time', {name: 'fetchRandom', type: 'modules', ms: new Date().getTime() - startModules, times})
          this.loaded.fetchRandom = true
        })
      },
      async perform(){
        const p = this.performs.shift()
        await this[`${p.name}Exec`](p.times)
        this.$nextTick(() => {
          this.performRuns[p.name]++
          if(this.performs.length)
            setTimeout(this.perform, 1000)
        })
      },
    },
    components: {
      chart,
    },
    async created(){
    },
    mounted(){
      setTimeout(this.perform, 1000)
    }
  }

// Export =====================

  export default component

</script>

<style>

  .limit{
    background-color: rgba(0, 0, 0, .15);
    border: 1px solid rgba(0, 0, 0, .25);
    max-height: 100px;
    overflow-y: auto;
    padding: .25rem;
  }

  .results{
    background-color: #FFF8E1;
    border: 1px solid #FFC10755;
    margin: .5rem;
    padding: .5rem;
  }

  button{
    background-color: #17d;
    color: white;
    font-weight: bold;
    padding: .45rem 1.25rem;
    border-radius: 5px;
    border: 0;
    cursor: pointer;
    margin: 0;
  }
  button:active, button:hover{
    background-color: #28e;
  }

/* Container */

  .contain {
    padding-right: .5rem;
    padding-left: .5rem;
    margin-right: auto;
    margin-left: auto;
  }
  @media (max-width: 991px) {
    .contain {
      padding: 2%;
    }
  }
  @media (min-width: 768px) {
  }
  @media (min-width: 992px) {
    .contain {
      padding: 0 2.5%;
    }
  }
  @media (min-width: 1200px) {
    .contain {
      padding: 0 5%;
    }
  }

/* Code Debug */

  div.code{
    max-height: 400px;
    overflow-y: auto;
    background: #f4f4f4;
    border: 1px solid #ddd;
    border-left: 3px solid #f36d33;
    color: #666;
    page-break-inside: avoid;
    font-family: monospace;
    font-size: 13px;
    line-height: 1.5;
    margin: .5em;
    margin-bottom: 1.6em;
    overflow: auto;
    padding: 1em 1.5em;
    display: block;
    word-wrap: break-word;
  }

</style>
