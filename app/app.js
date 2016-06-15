import React from 'react';
import Image from './components/image';
import Header from './components/header';
import Details from './components/details';
import Loading from './components/loading';
import GeoTagger from './components/geotagger';
import Help from './components/help';
import { findDOMNode } from 'react-dom';

import './app.scss';

const App = React.createClass({

  getInitialState: function() {
    return {
      item: null,
      collections: {},
      startedGeoTagging: false,
      error: null,
      help: {
        show: false,
        step: ''
      }
    };
  },

  render: function() {
    if (!this.state.item || this.state.error) {
      return <Loading error={this.state.error} />
    } else {
      var uuid = this.state.item.uuid

      var help
      if (this.state.help.show) {
        help = <Help close={this.closeHelp} />
      }

      return (
        <div id='container'>
          <Header api={this.props.api} />
          <div id='item'>
            <Image key={'i' + uuid} ref='image' item={this.state.item} draggable={this.state.startedGeoTagging} />
            <Details key={'h' + uuid} collections={this.state.collections} api={this.props.api} item={this.state.item} />
            <GeoTagger defaults={this.props.defaults} uuid={uuid} showHelp={this.showHelp}
              loadItem={this.loadItem} sendData={this.sendData} onStart={this.startGeoTagging} />
            {help}
          </div>
        </div>
      );
    }
  },

  showHelp: function(step) {
    this.setState({
      help: {
        show: true,
        step: step
      }
    })
  },

  closeHelp: function() {
    this.setState({
      help: {
        show: false,
        step: ''
      }
    })
  },

  startGeoTagging: function() {
    this.setState({
      startedGeoTagging: true
    });
  },

  componentDidMount: function() {
    this.loadItem();
    this.fetchCollections();
  },

  checkStatus: function(response) {
    if (response.status >= 200 && response.status < 300) {
      return response;
    } else {
      var error = new Error(response.statusText);
      error.response = response;
      throw error;
    }
  },

  parseJSON: function(response) {
    return response.json();
  },

  loadItem: function() {
    fetch(this.props.api.url + 'items/random', {
      credentials: 'include'
    })
      .then(this.checkStatus)
      .then(this.parseJSON)
      .then(json => {
        this.setState({
          item: json
        });
      }).catch(err => {
        console.error(err)
        this.setState({
          error: `could not load image from server (${err.message})`
        })
      })
  },

  sendData: function(step, stepIndex, skipped, data, geometry, callback) {
    if (!callback && geometry) {
      callback = geometry;
    }
    if (!callback && data) {
      callback = data;
    }

    var uuid = this.state.item.uuid;

    fetch(this.props.api.url + 'items/' + uuid, {
      credentials: 'include',
      method: 'post',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        type: 'Feature',
        properties: {
          step: step,
          stepIndex: stepIndex,
          skipped: skipped,
          data: data
        },
        geometry: geometry
      })
    })
      .then(this.checkStatus)
      .then(this.parseJSON)
      .then(() => {
        callback();
      }).catch(err => {
        console.error(err)
        this.setState({
          error: `could not send data to server (${err.message})`
        })
      })
  },

  fetchCollections: function() {
    fetch(`${this.props.api.url}collections`, {
      credentials: 'include'
    })
      .then(this.checkStatus)
      .then(this.parseJSON)
      .then(json => {
        var collections = {}
        json.forEach(c => collections[c.uuid] = c)
        this.setState({
          collections: collections
        })
      }).catch(err => {
        console.error(`Error fetching collections`, err)
      })
  }
})

export default App
