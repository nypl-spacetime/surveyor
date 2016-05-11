import React from 'react';
import Image from './components/image';
import Header from './components/header';
import Loading from './components/loading';
import GeoTagger from './components/geotagger';
import Help from './components/help';
import { findDOMNode } from 'react-dom';

import './app.scss';

const App = React.createClass({

  getInitialState: function() {
    return {
      item: null,
      token: this.getToken(),
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
        <div id='item'>
          <Image key={'i' + uuid} ref='image' item={this.state.item} draggable={this.state.startedGeoTagging} />
          <Header key={'h' + uuid} collections={this.state.collections} api={this.props.api} item={this.state.item} />
          <GeoTagger defaults={this.props.defaults} uuid={uuid} showHelp={this.showHelp}
            loadItem={this.loadItem} sendData={this.sendData} onStart={this.startGeoTagging} />
          {help}
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

  getToken: function() {
    try {
      return localStorage.getItem('token');
    } catch (err) {
      console.error('Error reading token from localStorage', err);
      return null;
    }
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

  saveToken: function(response) {
    var token = response.headers.get('Authorization');
    localStorage.setItem('token', token);

    return response;
  },

  parseJSON: function(response) {
    return response.json();
  },

  loadItem: function() {
    var token = this.state.token;

    var options = {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    };

    if (token) {
      options.headers = {
        'Authorization': token
      }
    }
    fetch(this.props.api.url + 'items/random', options)
      .then(this.checkStatus)
      .then(this.saveToken)
      .then(this.parseJSON)
      .then(json => {
        this.setState({
          item: json,
          token: token
        });
      }).catch(err => {
        console.error(err);
        this.setState({
          error: `could not load image from server (${err.message})`
        });
      });
  },

  sendData: function(step, stepIndex, completed, data, geometry, callback) {
    if (!callback && geometry) {
      callback = geometry;
    }
    if (!callback && data) {
      callback = data;
    }

    var uuid = this.state.item.uuid;

    fetch(this.props.api.url + 'items/' + uuid, {
      method: 'post',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': this.state.token
      },
      body: JSON.stringify({
        type: 'Feature',
        properties: {
          step: step,
          stepIndex: stepIndex,
          completed: completed,
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
        console.error(err);
        this.setState({
          error: `could not send data to server (${err.message})`
        });
      });
  },

  fetchCollections: function() {
    fetch(`${this.props.api.url}collections`)
      .then(this.checkStatus)
      .then(this.parseJSON)
      .then(json => {
        var collections = {};
        json.forEach(c => collections[c.uuid] = c)
        this.setState({
          collections: collections
        });
      }).catch(err => {
        console.error(`Error fetching collections`, err);
      });
  }

});

export default App;
