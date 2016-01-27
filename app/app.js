import React from 'react';
import GeoTagger from './components/geotagger';

import './app.scss';

const apiUrl = 'http://localhost:3000/';
// const apiUrl = 'http://spacetimewhere.herokuapp.com/';

const App = React.createClass({

  getInitialState: function() {
    return {
      item: null,
      view: null
    };
  },

  render: function() {
    if (!this.state.item) {
      return <div id='item' />
    } else {
      var uuid = this.state.item.uuid;
      var url = `http://digitalcollections.nypl.org/items/${uuid}`;

      var imageStyle = {
        backgroundImage: `url(${this.state.item.imageLink})`
      };

      return (
        <div id='item'>
          <div style={imageStyle} className='item-image' />
          <GeoTagger uuid={uuid} loadItem={this.loadItem} sendFeature={this.sendFeature} />
          <footer>
            <h1>{this.state.item.title}</h1>
            <div className='geotagger-spacer' />
          </footer>
        </div>
      );
    }
  },

  componentDidMount: function() {
    this.loadItem();
  },

  loadItem: function() {
    fetch(apiUrl + 'items/random')
      .then(response => {
        return response.json();
      }).then(json => {
        this.setState({
          item: json
        });
      }).catch(err => {
        console.error(err);
      });
  },

  sendFeature: function(id, feature, callback) {
    var uuid = this.state.item.uuid;
    fetch(apiUrl + 'items/' + uuid, {
      method: 'post',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        step: id,
        feature: feature
      })
    })
    .then(function(response) {
      return response.json()
    }).then(function(json) {
      console.log(json);
      callback();
    }).catch(function(err) {
      callback(err);
    });
  }

});

export default App;
