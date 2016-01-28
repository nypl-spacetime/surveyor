import React from 'react';
import { findDOMNode } from 'react-dom';

import L from 'leaflet';

import '../../node_modules/leaflet/dist/leaflet.css';
import './map.scss';

const Map = React.createClass({

  getInitialState: function() {
    return {};
  },

  render: function() {
    return (
      <div className='map-container'>
        <div className='map' ref='map' />
        <div className='map-search'>
          <input type='text' ref='search' placeholder='Search for places…' onKeyUp={this.geocode} />
        </div>
        <div className='map-crosshair-container'>
          <div className='map-crosshair' />
        </div>
      </div>
    );
  },

  componentDidMount: function() {
    var node = findDOMNode(this.refs.map);

    var map = L.map(node, {
      center: [40.7127837, -74.0059413],
      zoom: 12,
      zoomControl: false
    });

    var layer = L.tileLayer('http://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, &copy; <a href="http://cartodb.com/attributions">CartoDB</a>'
    }).addTo(map);

    if (this.props.mapEvents) {
      Object.keys(this.props.mapEvents).forEach(event => map.on(event, this.props.mapEvents[event]));
    }

    // var geoJsonLayer = L.geoJson(null, {
    //   onEachFeature: onEachFeature
    // }).addTo(map);

    this.setState({
      map: map
    });
  },

  geocode: function(e) {
    if (e.keyCode == 13) {
      var node = findDOMNode(this.refs.search);
      var query = encodeURIComponent(node.value);

      var accessToken = 'pk.eyJ1IjoibnlwbGxhYnMiLCJhIjoiSFVmbFM0YyJ9.sl0CRaO71he1XMf_362FZQ';
      var types = [
        'country',
        'region',
        'postcode',
        'place',
        'neighborhood',
        'address'
      ];
      var url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${query}.json?access_token=${accessToken}&types=${types.join(',')}`;

      fetch(url)
        .then(response => {
          return response.json();
        }).then(json => {
          if (json && json.features.length) {
            var result = json.features[0];
            console.log('Found: ', result.place_name);

            if (result.bbox) {
              this.state.map.fitBounds([
                [result.bbox[0], result.bbox[1]],
                [result.bbox[2], result.bbox[3]]
              ]);
            }
            this.state.map.panTo(result.center.reverse());
          }
        }).catch(err => {
          console.error(err);
        });

      // fetch(`http://nominatim.openstreetmap.org/?format=json&q=${query}&format=json&limit=1`)
      //   .then(response => {
      //     return response.json();
      //   }).then(json => {
      //     if (json && json.length) {
      //       var result = json[0];
      //       console.log('Found: ', result.display_name);
      //
      //       var boundingBox = result.boundingbox.map(parseFloat);
      //       this.state.map.fitBounds([
      //         [boundingBox[0], boundingBox[2]],
      //         [boundingBox[1], boundingBox[3]]
      //       ]);
      //       this.state.map.panTo([result.lat, result.lon]);
      //     }
      //   }).catch(err => {
      //     console.error(err);
      //   });
    }
  },

  roundCoordinates: function(coordinate) {
    return Math.round(coordinate * 1000000) / 1000000;
  },

  getView: function() {
    if (this.state.map) {
      var center = this.state.map.getCenter();
      return {
        center: [
          center.lng,
          center.lat
        ].map(this.roundCoordinates),
        zoom: this.state.map.getZoom(),
      };
    } else {
      return null;
    }
  }

});

export default Map;
