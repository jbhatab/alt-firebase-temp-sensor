var alt = require('../alt')
var firebase = require('firebase')

class TemperatureActions {
  constructor() {
    this.generateActions('changeTemperature')
  }
}

module.exports = alt.createActions(TemperatureActions)
