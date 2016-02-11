import React from 'react';
import Image from './components/image';
import Header from './components/header';
import Loading from './components/loading';
import GeoTagger from './components/geotagger';
import { findDOMNode } from 'react-dom';

import './app.scss';

const App = React.createClass({

  getInitialState: function() {
    return {
      item: null,
      token: this.getToken(),
      collections: {},
      startedGeoTagging: false,
      error: null
    };
  },

  render: function() {
    if (!this.state.item) {
      return <Loading error={this.state.error} />;
    } else {
      var uuid = this.state.item.uuid;

      return (
        <div id='item'>
          <Image key={'i' + uuid} ref='image' item={this.state.item} draggable={this.state.startedGeoTagging} />
          <Header key={'h' + uuid} collections={this.state.collections} api={this.props.api} item={this.state.item} />
          <GeoTagger defaults={this.props.defaults} uuid={uuid}
            loadItem={this.loadItem} sendData={this.sendData} onStart={this.startGeoTagging} />
        </div>
      );
    }
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

  saveToken(token) {
    try {
      localStorage.setItem('token', token);
    } catch (err) {
      console.error('Error saving token to localStorage', err);
    }
  },

  loadItem: function() {
    // TODO: pass token in promise!
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
      .then(response => {
        token = response.headers.get('Authorization');
        this.saveToken(token);
        return response.json();
      }).then(json => {
        this.setState({
          item: json,
          token: token
        });
      }).catch(err => {
        console.error(err);
        this.setState({
          error: 'could not load image from server'
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
    .then(function(response) {
      return response.json()
    }).then(function(json) {
      callback();
    }).catch(function(err) {
      callback(err);
    });
  },

  fetchCollections: function() {
    fetch(`${this.props.api.url}collections`)
    .then(function(response) {
      return response.json();
    }).then(json => {
      var collections = {};
      json.forEach(c => collections[c.uuid] = c)
      this.setState({
        collections: collections
      });
    }).catch(function(err) {
      console.error(`Error fetching collections`, err);
    });
  }

});

export default App;
