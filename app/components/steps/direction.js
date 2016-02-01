import React from 'react';
import L from 'leaflet';

import Map from '../map';

const Step = React.createClass({
  getInitialState: function() {
    return {
      hasMoved: false
    };
  },

  render: function() {

    var mapEvents = {
      move: this.onMove,
      movestart: this.onMoveStart
    };

    return (
      <div className='geotagger-step opaque'>
        <div>
          Direction! Bearing! Doe het! Grijp Google Street View, desnoods.
        </div>
        <div className='margin-top'>
          <button className='button-red' onClick={this.props.abort}>I cannot set the direction of this image...</button>
        </div>
        <div className='margin-top'>
          <Map ref='map' mapEvents={mapEvents} mapCreated={this.mapCreated} />
        </div>
        <div className='margin-top'>
          <button className='button-green' disabled={!this.state.hasMoved} onClick={this.done}>Yes! Go!</button>
        </div>
      </div>
    );
  },

  mapCreated: function(map) {
    var mapCoordinates = this.props.stepData.map.geometry.coordinates;
    var pointList = [
      [
        mapCoordinates[1],
        mapCoordinates[0]
      ],
      [
        mapCoordinates[1],
        mapCoordinates[0]
      ]
    ];

    var polyline = L.polyline(pointList , {color: 'red'}).addTo(map);

    this.setState({
      map: map,
      polyline: polyline
    });
  },

  onMove: function() {
    if (this.state.polyline) {
      var mapCoordinates = this.props.stepData.map.geometry.coordinates;
      var pointList = [
        [
          mapCoordinates[1],
          mapCoordinates[0]
        ],
        this.state.map.getCenter()
      ];

      this.state.polyline.setLatLngs(pointList);
    }
  },

  onMoveStart: function() {
    if (!this.state.hasMoved) {
      this.setState({
        hasMoved: true
      });
    }
  },

  done: function() {
    if (this.state.hasMoved) {
      // var view = this.refs.map.getView();
      // this.props.done({zoom: view.zoom}, {
      //   type: 'Point',
      //   coordinates: view.center
      // });
      this.props.done();
    }
  }

});

export default Step;
