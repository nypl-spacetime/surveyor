import React from 'react';
import { connect } from 'react-redux';
import { findDOMNode } from 'react-dom';

import L from 'leaflet';

import { createSelector } from 'reselect';

import {
  selectMapDefaults
} from 'containers/App/selectors';

import '../../../node_modules/leaflet/dist/leaflet.css';
import styles from './styles.css';

export class Map extends React.Component {

  static defaultProps = {
    options: {}
  }

  constructor (props) {
    super(props)

    this.state = {
      dimensions: {
        width: 0,
        height: 0
      }
    }
  }

  render() {
    return (
      <div className={styles.mapContainer} ref='cont'>
        <div className={`${styles.map}`} ref='map' />
      </div>
    )
  }

  roundCoordinate = (coordinate) => Math.round(coordinate * 1000000) / 1000000;

  getView = () => {
    if (this.map) {
      var center = this.map.getCenter();
      return {
        center: [
          center.lng,
          center.lat
        ].map(this.roundCoordinate),
        zoom: this.map.getZoom(),
      };
    } else {
      return null;
    }
  }

  getMap = () => this.map;

  getOptions = (key) => {
    return this.props.options[key] || this.props.defaults[key];
  }

  componentDidMount = () => {
    var node = findDOMNode(this.refs.map);

    var map = L.map(node, {
      center: this.getOptions('center'),
      zoom: this.getOptions('zoom'),
      maxZoom: this.getOptions('maxZoom')
    });

    var layer = L.tileLayer(this.getOptions('tileUrl'), {
      subdomains: this.getOptions('subdomains').toString(),
      attribution: this.getOptions('attribution')
    }).addTo(map);

    if (this.props.mapEvents) {
      Object.keys(this.props.mapEvents).forEach((event) => map.on(event, this.props.mapEvents[event]));
    }

    if (this.props.mapCreated) {
      this.props.mapCreated(map);
    }

    this.map = map;

    setInterval(() => this.checkSize(), 500)
  }

  checkSize = () => {
    var node = findDOMNode(this.refs.cont);
    if (node) {
      var dimensions = { width: node.clientWidth, height: node.clientHeight }
      if (this.state.dimensions.width != dimensions.width || this.state.dimensions.height != dimensions.height) {
        this.map.invalidateSize()
        this.setState({ dimensions })
      }
    }
  }
}

function mapDispatchToProps(dispatch) {
  return {
    dispatch
  };
}

// Wrap the component to inject dispatch and state into it
export default connect(createSelector(
  selectMapDefaults(),
  (defaults) => ({
    defaults
  })
), mapDispatchToProps, null, { withRef: true })(Map);
