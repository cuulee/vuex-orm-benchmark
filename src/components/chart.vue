<template><div>
    <chart :chart-data="data" :options="options" :width="200" :height="60"></chart>
</div></template>

<script>

// Dependencies ===============

  import chart from '@/lib/chart.js'

// Core =======================

  let component = {
    props: {
      metric: {type: String, required: true},
      amount: {type: Number, required: true},
      values: {type: Array, required: true},
    },
    data: () => ({
    }),
    computed: {
      data(){
        return {
          labels: this.$store.state.types.map(t => t.title),
          datasets: [{
            backgroundColor: ['#2196F3', '#4CAF50', '#4CAF50', '#E91E63', '#673AB7'],
            data: this.values,
          }],
        }
      },
      max(){
        let max = 10
        for(let value of this.values){
          const m = Math.ceil(value / 25) * 25
          if(m > max)
            max = m
        }
        return max
      },
      options(){
        return {
          showDatapoints: true,
          legend: {display: false},
          title: {
            display: true,
            text: `${this.metric} ${this.amount ? '(' + this.amount + ' times)' : ''}`,
          },
          scales: {
            xAxes: [{
              ticks: {
                beginAtZero: true,
                max: this.max,
              },
            }],
          },
          showTooltips: false,
          layout: {
            padding: {
              left: 5,
              right: 25,
              top: 0,
              bottom: 0
            },
          },
        }
      },
    },
    methods: {
    },
    components: {
      chart
    },
    async created(){
    },
  }

// Export =====================

  export default component

</script>

<style>
  .small {
    max-width: 600px;
    margin:  150px auto;
  }
</style>
