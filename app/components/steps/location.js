import React from 'react';

import Map from '../map';

const Step = React.createClass({
  getInitialState: function() {
    return {
      hasMoved: false
    };
  },

  render: function() {

    var mapEvents = {
      movestart: this.onMoveStart
      // click: this.onClick
    };

    return (
      <div className='geotagger-step opaque all-margin-top'>
        <h1>Where is this?</h1>
        <div>
          Help us build
          a <a href='http://spacetime.nypl.org/' target='_blank'>Space/Time Directory</a> by <a href='https://en.wikipedia.org/wiki/Geotagging' target='_blank'>geotagging</a> our
          collection.
        </div>
        <div>
          Can you center the map as precisely as you can on the location of the image?
        </div>
        <div>
          <Map ref='map' defaults={this.props.defaults} mapEvents={mapEvents} geocoder={true} />
        </div>
        <div className='buttons'>
          <button className='button-red' onClick={this.props.abort}>No location</button>
          <button className='button-green' disabled={!this.state.hasMoved} onClick={this.done}>Yes, here!</button>
        </div>
        <div className='centered'>
          <a href='javascript:;' onClick={this.props.reset}>Skip this image, try another one</a>
        </div>
      </div>
    );
  },

  onMoveStart: function() {
    if (!this.state.hasMoved) {
      this.setState({
        hasMoved: true
      });
    }
  },

  // onClick: function(e) {
  //   this.refs.map.setView(e.latlng);
  // },

  done: function() {
    if (this.state.hasMoved) {
      var view = this.refs.map.getView();
      this.props.done({zoom: view.zoom}, {
        type: 'Point',
        coordinates: view.center
      });
    }
  }

});

export default Step;
