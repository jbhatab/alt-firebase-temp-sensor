var alt = require('../alt')
var TemperatureActions = require('../actions/TemperatureActions')
var firebase = require('firebase')

class TemperatureStore {
  constructor() {
    this.bindActions(TemperatureActions)

    this.temperature = 0.0

    var firebaseTemperature = new firebase("https://kens-test.firebaseio.com/led")

    firebaseTemperature.on('value', (response) => {
      this.changeTemperature(response.val().temperature)
    })
  }

  changeTemperature(temperature) {
    this.temperature = temperature
    this.getInstance().emitChange()
  }

  static getTemperature() {
    return this.getState().temperature
  }
}

module.exports = alt.createStore(TemperatureStore, 'TemperatureStore')