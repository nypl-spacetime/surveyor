import React from 'react';
import L from 'leaflet';

import {fromFeature} from 'field-of-view';
import turfDistance from 'turf-distance';
import turfBearing from 'turf-bearing';

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

  getFieldOfView: function(origin, target) {
    var originFeature = {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: origin
      }
    }

    var targetFeature = {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: target
      }
    };

    var distance = turfDistance(originFeature, targetFeature) * 1000;
    var bearing = turfBearing(originFeature, targetFeature);

    return fromFeature({
      type: 'Feature',
      properties: {
        distance: distance,
        angle: 30,
        bearing: bearing
      },
      geometry: {
        type: 'Point',
        coordinates: origin
      }
    });
  },

  getPointList: function(map, point) {
    var origin = [map.getCenter().lng, map.getCenter().lat];
    var target = point;

    var vof = this.getFieldOfView(origin, target);

    return [
      [
        vof.geometry.geometries[1].coordinates[0][1],
        vof.geometry.geometries[1].coordinates[0][0]
      ],
      [
        vof.geometry.geometries[0].coordinates[1],
        vof.geometry.geometries[0].coordinates[0]
      ],
      [
        vof.geometry.geometries[1].coordinates[1][1],
        vof.geometry.geometries[1].coordinates[1][0]
      ]
    ];
  },

  mapCreated: function(map) {
    var pointList = this.getPointList(map, this.props.stepData.map.geometry.coordinates);

    // Eerste stap:
    //   Probeer zo precies mogelijk foto in in 't centrum van de cirkel te plaatsen.
    //      - Kaarten of documenten? Knop: kan niet
    //      - Andere knop: ik wil nieuwe!

    // Tweede stap:
    //   Doe de hoek, angle van field-of-view is nog vast
    //     - knop terug naar vorige stap

    // Derde stap:
    //   Doe de angle van field-of-view, met sliders
    //     - knop terug naar vorige stap

    // Twee lijnen: tussen center en twee punten links en rechts van
    //   coordinaten uit map-stap
    // En polygoon tussen dezelfde punten, en polygoon
    //   heeft gradient

    // field-of-view uitbreiden, ook twee punten en angle!
    //   dus van eerste punt naar tweede punt, met angle

    var polyline = L.polyline(pointList, {color: 'red'}).addTo(map);

    // var polygonPointList = [
    //   [
    //     40.760260692426165,
    //     -73.90914916992188
    //   ],
    //   [
    //     mapCoordinates[1],
    //     mapCoordinates[0]
    //   ],
    //   [
    //     40.78989968531352,
    //     -73.96339416503906
    //   ]
    // ];
    //
    // var polygon = L.polygon(polygonPointList, {
    //   className: 'VISSEN'
    // }).addTo(map);

    this.setState({
      map: map,
      polyline: polyline,
      // polygon: polygon
    });

    var svg = document.querySelector('svg.leaflet-zoom-animated');



    var defs = document.createElementNS('http://www.w3.org/2000/svg', 'defs');
    defs.setAttribute('id', 'gradient-defs');

    svg.appendChild(defs);

    var gradient = document.createElementNS('http://www.w3.org/2000/svg', 'linearGradient');
    gradient.setAttribute('id', 'chips');
    gradient.setAttribute('x1', '0%');
    gradient.setAttribute('x2', '0%');
    gradient.setAttribute('y1', '0%');
    gradient.setAttribute('y2', '100%');

    defs.appendChild(gradient);

    //stops
    var stop1 = document.createElementNS('http://www.w3.org/2000/svg', 'stop');
    stop1.setAttribute('offset', '0%');
    stop1.setAttribute("stop-color", 'red');
    gradient.appendChild(stop1);

    var stop2 = document.createElementNS('http://www.w3.org/2000/svg', 'stop');
    stop2.setAttribute('offset', '100%');
    stop2.setAttribute('stop-color', 'yellow');
    gradient.appendChild(stop2);

  },

  onMove: function() {
    if (this.state.polyline) {

      var pointList = this.getPointList(this.state.map, this.props.stepData.map.geometry.coordinates);


      // var hond = document.getElementsByClassName('VISSEN')[0];
      // hond.setAttribute('fill', 'url(#chips)')



      this.state.polyline.setLatLngs(pointList);
      // this.state.polygon.setLatLngs(polygonPointList);

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
