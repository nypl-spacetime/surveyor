import React from 'react';

import Map from '../map';

const StepMap = React.createClass({
  getInitialState: function() {
    return {
      hasMoved: false
    };
  },

  render: function() {

    var mapEvents = {
      movestart: this.onMoveStart
    };

    return (
      <div className='geotagger-step opaque'>
        <div>
          Can you pinpoint the location of the subject of image on the map below? Only photos and drawings, no maps.
          Do you want <a href='#'>more information</a>?
          Het is echt leuk als je ons helpt en dit en dat en <a href='http://spacetime.nypl.org'>Space/Time Directory</a>!
        </div>
        <div className='margin-top'>
          <button className='button-red' onClick={this.props.reset}>I cannot locate this image...</button>
        </div>
        <div className='margin-top'>
          <Map ref='map' mapEvents={mapEvents}/>
        </div>
        <div className='margin-top'>
          <button className='button-green' disabled={!this.state.hasMoved} onClick={this.done}>Yes! Here!</button>
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

  done: function() {
    if (this.state.hasMoved) {
      var view = this.refs.map.getView();
      this.props.done({
        type: 'Feature',
        properties: view,
        geometry: {
          type: 'Point',
          coordinates: view.center
        }
      });
    }
  }

});

export default StepMap;
