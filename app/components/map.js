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
        <div className='map-crosshair-container'>
          <div className='map-crosshair' />
        </div>
      </div>
    );
  },

  componentDidMount: function() {
    var node = findDOMNode(this.refs.map);

    var map = L.map(node, {
      center: this.props.defaults.map.center,
      zoom: this.props.defaults.map.zoom
    });

    var layer = L.tileLayer(this.props.defaults.map.tileUrl, {
      subdomains: this.props.defaults.map.subdomains.toString(),
      attribution: this.props.defaults.map.attribution
    }).addTo(map);

    if (this.props.mapEvents) {
      Object.keys(this.props.mapEvents).forEach(event => map.on(event, this.props.mapEvents[event]));
    }

    // var geoJsonLayer = L.geoJson(null, {
    //   onEachFeature: onEachFeature
    // }).addTo(map);

    if (this.props.mapCreated) {
      this.props.mapCreated(map);
    }

    this.setState({
      map: map
    });
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
