/**
 * @jsx React.DOM
 */

var React = require('react');
var TemperatureStore = require('../stores/TemperatureStore');

function getStateFromStores() {
  return {
    temperature: TemperatureStore.getTemperature()
  };
}

var TemperatureApp = React.createClass({
  getInitialState: function () {
    return getStateFromStores();
  },

  componentDidMount: function() {
    TemperatureStore.listen(this._onChange);
  },

  componentWillUnmount: function() {
    TemperatureStore.unlisten(this._onChange);
  },

  _onChange: function() {
    this.setState(getStateFromStores());
  },

  render: function() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-xs-12">
            <div className="jumbotron">
              <p>
                Temperature: { this.state.temperature }
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }
});

module.exports = TemperatureApp;
