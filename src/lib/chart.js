import { HorizontalBar, mixins } from 'vue-chartjs'
const { reactiveProp } = mixins
import chart from 'chart.js'

chart.plugins.register({
  afterDraw(chartInstance){
    if(chartInstance.config.options.showDatapoints){
      var helpers = Chart.helpers
      var ctx = chartInstance.chart.ctx
      var fontColor = helpers.getValueOrDefault(chartInstance.config.options.showDatapoints.fontColor, chartInstance.config.options.defaultFontColor)

      ctx.font = Chart.helpers.fontString(Chart.defaults.global.defaultFontSize, 'normal', Chart.defaults.global.defaultFontFamily)
      ctx.textAlign = 'center'
      ctx.textBaseline = 'bottom'
      ctx.fillStyle = fontColor

      chartInstance.data.datasets.forEach(function (dataset) {
        for (var i = 0; i < dataset.data.length; i++) {
          var model = dataset._meta[Object.keys(dataset._meta)[0]].data[i]._model
          var scaleMax = dataset._meta[Object.keys(dataset._meta)[0]].data[i]._xScale.maxHeight
          var xPos = (scaleMax - model.x) / scaleMax >= 0.93 ? model.x + 50 : model.x + 20
          ctx.fillText(`${dataset.data[i]}ms`, xPos, model.y + 6)
        }
      })
    }
  }
});

export default {
  extends: HorizontalBar,
  mixins: [reactiveProp],
  props: {
    options: {type: Object},
  },
  mounted () {
    this.renderChart(this.chartData, this.options)
  }
}
