import React from 'react';
import L from 'leaflet';

import {fromFeature} from 'field-of-view';
import turfDistance from 'turf-distance';
import turfBearing from 'turf-bearing';
import turfExtent from 'turf-extent';

var cameraSvg = require('../../images/camera.svg');
var locationSvg = require('../../images/location.svg');

import Map from '../map';

import '../range.scss';

const Step = React.createClass({
  getInitialState: function() {
    var zoom = Math.min(this.props.stepData.location.data.zoom + 2, this.props.defaults.map.maxZoom);
    return {
      hasMoved: false,
      angle: 40,
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
        <h1>What's the direction?</h1>
        <div>
          Thanks! Could you also try to determine
          the direction of the image by dragging and positioning the camera icon and the
          subject icon.
        </div>
        <div className='geotagger-bearing-angle-container'>
          <label htmlFor='geotagger-bearing-angle'>View angle:</label>
          <input id='geotagger-bearing-angle' type='range' min='20' max='120' step='1' defaultValue={this.state.angle} onInput={this.onSliderInput} />
        </div>
        <div>
          <Map ref='map' options={options} defaults={this.props.defaults}
            mapCreated={this.mapCreated} crosshair={false} />
        </div>
        <div className='margin-top buttons'>
          <button className='button-red' onClick={this.props.abort}>Not sure</button>
          <button className='button-green' disabled={!this.state.hasMoved} onClick={this.done}>Yes, done!</button>
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
        angle: this.state.angle,
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

  percentageInRange: function(value, range) {
    var f = (value - range[0]) / (range[1] - range[0]);
    return this.roundNumber(f * 100);
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

      // Compute list of Leaflet points, and update Leaflet geometries
      var pointList = this.getPointList(fieldOfView);
      this.state.polyline.setLatLngs(pointList);
      this.state.polygon.setLatLngs(pointList);

      // Update gradient's origin
      var fieldOfViewBounds = turfExtent(fieldOfView);

      var cx = this.percentageInRange(origin.lng, [fieldOfViewBounds[0], fieldOfViewBounds[2]]);
      var cy = this.percentageInRange(origin.lat, [fieldOfViewBounds[1], fieldOfViewBounds[3]]);

      var gradient = document.getElementById('gradient')
      gradient.setAttribute('cx', `${cx}%`);
      gradient.setAttribute('cy', `${100 - cy}%`);
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
      dashArray: '5, 7',
      lineCap: 'round',
      lineJoin: 'round'
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

    var gradient = document.createElementNS('http://www.w3.org/2000/svg', 'radialGradient');
    gradient.setAttribute('id', 'gradient');
    gradient.setAttribute('cx', '0%');
    gradient.setAttribute('cy', '50%');
    gradient.setAttribute('r', '100%');
    // gradient.setAttribute('fx', '100%');
    // gradient.setAttribute('fy', '100%');

    defs.appendChild(gradient);

    // Stops
    var stop1 = document.createElementNS('http://www.w3.org/2000/svg', 'stop');
    stop1.setAttribute('offset', '0%');
    stop1.setAttribute("stop-color", '#ffd503');
    gradient.appendChild(stop1);

    var stop2 = document.createElementNS('http://www.w3.org/2000/svg', 'stop');
    stop2.setAttribute('offset', '60%');
    stop2.setAttribute("stop-color", '#ffd503');
    gradient.appendChild(stop2);

    var stop3 = document.createElementNS('http://www.w3.org/2000/svg', 'stop');
    stop3.setAttribute('offset', '100%');
    stop3.setAttribute('stop-opacity', 0);
    stop3.setAttribute('stop-color', 'white');
    gradient.appendChild(stop3);

    // Apply gradient to Leaflet polygon
    var polygonSvg = document.getElementsByClassName('field-of-view')[0];
    polygonSvg.setAttribute('fill', 'url(#gradient)');

    // Update field of view after 25ms, when state change has certainly happened
    setTimeout(() => {
      this.updateFieldOfView();
      this.updateMarkerBearings();
    }, 25);
  },

  roundNumber: function(n) {
    return Math.round(n * 100) / 100;
  },

  onSliderInput: function(e) {
    this.setState({
      angle: parseInt(e.target.value)
    });

    this.updateFieldOfView();
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
        angle: fieldOfView.properties.angle,
        bearing: this.roundNumber(fieldOfView.properties.bearing),
        distance: this.roundNumber(fieldOfView.properties.distance)
      }
      this.props.done(data, fieldOfView.geometry);
    }
  }

});

export default Step;
