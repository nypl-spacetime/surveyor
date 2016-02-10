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

    var noLocation = 'No location';

    return (
      <div className='geotagger-step opaque all-margin-top'>
        <h1>Where is this?</h1>
        <div className='light'>
          Help us build
          a <a href='http://spacetime.nypl.org/' target='_blank'>Space/Time Directory</a> by <a href='https://en.wikipedia.org/wiki/Geotagging' target='_blank'>geotagging</a> its
          collection!
        </div>
        <div>
          Can you center the map as precisely as you can on the location of the image?
        </div>

        <div className='light'>
          (Some images, like documents or maps, do not depict a location — in that case,
          you can use the <b>{noLocation.toLowerCase()}</b> button.)
        </div>
        <div>
          <Map ref='map' defaults={this.props.defaults} mapEvents={mapEvents}/>
        </div>
        <div className='buttons'>
          <button className='button-red' onClick={this.props.abort}>{noLocation}</button>
          <button className='button-green' disabled={!this.state.hasMoved} onClick={this.done}>Yes, here!</button>
        </div>
        <div className='centered'>
          <a href='javascript:;' onClick={this.props.reset}>I don&#39;t like this image, show me a new one</a>
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
