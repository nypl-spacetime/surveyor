import React from 'react';
import L from 'leaflet';

import {fromFeature} from 'field-of-view';
import turfDistance from 'turf-distance';
import turfBearing from 'turf-bearing';

var cameraSvg = require('../../images/camera.svg');
var locationSvg = require('../../images/location.svg');

import Map from '../map';

const Step = React.createClass({
  getInitialState: function() {
    var zoom = Math.min(this.props.stepData.location.data.zoom + 2, this.props.defaults.map.maxZoom);
    return {
      hasMoved: false,
      initialView: {
        zoom: zoom,
        center: [
          this.props.stepData.location.geometry.coordinates[1],
          this.props.stepData.location.geometry.coordinates[0]
        ]
      }
    };
  },

  bearing: 0,
  mapMoving: false,
  mapMovingLatLng: null,
  fieldOfView: null,

  render: function() {

    var options = this.state.initialView;

    return (
      <div className='geotagger-step opaque all-margin-top'>
        <h1>Direction</h1>
        <div>
          Can you determine the direction of the image???? TODO: WRITE EXPLANATION!!!!!!
        </div>
        <div>
          <Map ref='map' options={options} defaults={this.props.defaults}
            mapCreated={this.mapCreated} crosshair={false} />
        </div>
        <div className='margin-top buttons'>
          <button className='button-red' onClick={this.props.abort}>Impossible</button>
          <button className='button-green' disabled={!this.state.hasMoved} onClick={this.done}>Yes! Go!</button>
        </div>
        <div className='centered'>
          <a href='javascript:;' onClick={this.props.reset}>No, I&#39;d rather geotag another image!</a>
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

  getPointList: function(fieldOfView) {
    return [
      [
        fieldOfView.geometry.geometries[1].coordinates[0][1],
        fieldOfView.geometry.geometries[1].coordinates[0][0]
      ],
      [
        fieldOfView.geometry.geometries[0].coordinates[1],
        fieldOfView.geometry.geometries[0].coordinates[0]
      ],
      [
        fieldOfView.geometry.geometries[1].coordinates[1][1],
        fieldOfView.geometry.geometries[1].coordinates[1][0]
      ]
    ];
  },

  drawFieldOfView: function(origin, target) {
    if (this.state.polyline) {
      var fieldOfView = this.getFieldOfView(
        [origin.lng, origin.lat],
        [target.lng, target.lat]
      );

      this.fieldOfView = fieldOfView;

      // Store bearing;
      this.bearing = fieldOfView.properties.bearing;

      var pointList = this.getPointList(fieldOfView);

      var polygonSvg = document.getElementsByClassName('field-of-view')[0];
      polygonSvg.setAttribute('fill', 'url(#gradient)')

      this.state.polyline.setLatLngs(pointList);
      this.state.polygon.setLatLngs(pointList);
    }
  },

  updateFieldOfView: function() {
    if (this.state.markers) {
      var origin = this.state.markers.camera.getLatLng();
      var target = this.state.markers.location.getLatLng();
      this.drawFieldOfView(origin, target);
    }
  },

  addRotateTransform: function(element, rotation) {
    var transform = element.style[L.DomUtil.TRANSFORM];
    var rotate = 'rotate(' + rotation + ')';

    if (transform.includes('rotate')) {
      element.style[L.DomUtil.TRANSFORM] = transform.replace(/rotate\(.*?\)/, rotate);
    } else {
      element.style[L.DomUtil.TRANSFORM] = transform + ' ' + rotate;
    }
  },

  updateMarkerBearings: function() {
    if (this.state.markers) {
      this.addRotateTransform(this.state.markers.camera._icon, this.bearing + 'deg');
      this.addRotateTransform(this.state.markers.location._icon, this.bearing + 'deg');
    }
  },

  mapCreated: function(map) {
    var pointList = [];

    var step = this;

    var polyline = L.polyline(pointList, {
      color: 'black',
      opacity: 0.5,
      weight: 2,
    }).addTo(map);

    var polygon = L.polygon(pointList, {
      weight: 0,
      className: 'field-of-view'
    }).addTo(map);

    var cameraIcon = L.icon({
      iconUrl: cameraSvg,
      iconSize: [38, 38],
      iconAnchor: [19, 19]
    });

    var locationIcon = L.icon({
      iconUrl: locationSvg,
      iconSize: [180, 32],
      iconAnchor: [90, 16]
    });

    var protoMarkerSetPos = L.Marker.prototype._setPos;
    L.Marker.include({
      _setPos: function (pos) {
        protoMarkerSetPos.call(this, pos);
        step.updateMarkerBearings();
      }
    });

    var protoMarkerDragOnDrag = L.Handler.MarkerDrag.prototype._onDrag;
    L.Handler.MarkerDrag.include({
      _onDrag: function (e) {
        protoMarkerDragOnDrag.call(this, e);
        step.updateMarkerBearings();
      }
    });

    // Set latLng of image location to the results of previous step
    var locationLatLng = [
      this.props.stepData.location.geometry.coordinates[1],
      this.props.stepData.location.geometry.coordinates[0]
    ];

    // Set latLng of camera south east of map center, three thirds of
    //   map container size
    var element = map.getContainer();
    var point = [
      element.clientWidth * .75,
      element.clientHeight * .75
    ];

    // Convert pixel coordinates to latLng
    var cameraLatLng = map.containerPointToLatLng(point)

    var cameraMarker = L.marker(cameraLatLng, {
      icon: cameraIcon,
      draggable: true
    }).addTo(map);

    var locationMarker = L.marker(locationLatLng, {
      icon: locationIcon,
      draggable: true
    }).addTo(map);

    cameraMarker.on('drag', this.onMarkerDrag);
    locationMarker.on('drag', this.onMarkerDrag);

    cameraMarker.on('dragend', this.onMarkerDragEnd);
    locationMarker.on('dragend', this.onMarkerDragEnd);

    this.setState({
      map: map,
      polyline: polyline,
      polygon: polygon,
      markers: {
        camera: cameraMarker,
        location: locationMarker
      }
    });

    var svg = document.querySelector('svg.leaflet-zoom-animated');

    var defs = document.createElementNS('http://www.w3.org/2000/svg', 'defs');
    defs.setAttribute('id', 'gradient-defs');

    svg.appendChild(defs);

    var gradient = document.createElementNS('http://www.w3.org/2000/svg', 'linearGradient');
    gradient.setAttribute('id', 'gradient');
    gradient.setAttribute('x1', '0%');
    gradient.setAttribute('x2', '0%');
    gradient.setAttribute('y1', '0%');
    gradient.setAttribute('y2', '100%');

    defs.appendChild(gradient);

    // Stops
    var stop1 = document.createElementNS('http://www.w3.org/2000/svg', 'stop');
    stop1.setAttribute('offset', '0%');
    stop1.setAttribute("stop-color", 'red');
    gradient.appendChild(stop1);

    var stop2 = document.createElementNS('http://www.w3.org/2000/svg', 'stop');
    stop2.setAttribute('offset', '100%');
    stop2.setAttribute('stop-color', 'yellow');
    gradient.appendChild(stop2);

    // Update field of view after 25ms, when state change has certainly happened
    setTimeout(() => {
      this.updateFieldOfView();
      this.updateMarkerBearings();
    }, 25);
  },

  roundNumber: function(n) {
    return Math.round(n * 100) / 100;
  },

  onMarkerDrag: function() {
    if (!this.state.hasMoved) {
      this.setState({
        hasMoved: true
      });
    }

    this.updateFieldOfView();
  },

  onMarkerDragEnd: function() {
    this.setState({
      fieldOfView: this.fieldOfView
    });
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
      var fieldOfView = this.state.fieldOfView;
      var data = {
        bearing: this.roundNumber(fieldOfView.properties.bearing),
        distance: this.roundNumber(fieldOfView.properties.distance)
      }
      this.props.done(data, fieldOfView.geometry);
    }
  }

});

export default Step;
