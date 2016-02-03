import React from 'react';
import Header from './components/header';
import GeoTagger from './components/geotagger';
import { findDOMNode } from 'react-dom';

import './app.scss';

const App = React.createClass({

  getInitialState: function() {
    return {
      item: null,
      token: this.getToken(),
      view: null,
      draggable: false,
      dragoffset: [0, 0]
    };
  },

  dragging: false,
  tempDragoffset: [0, 0],
  draggingDragoffset: [0, 0],

  render: function() {
    if (!this.state.item) {
      return <div id='item' />
    } else {
      var uuid = this.state.item.uuid;
      var url = `http://digitalcollections.nypl.org/items/${uuid}`;

      var imageStyle = {
        backgroundImage: `url(${this.state.item.imageLink})`,
        transform: `translate(${this.state.dragoffset[0]}px,${this.state.dragoffset[1]}px)`
      };

      var className = 'item-image' + (this.state.draggable ? ' draggable' : '');

      return (
        <div id='item'>
          <div className='item-image-container'>
            <div ref='image' className={className} style={imageStyle}
              onMouseDown={this.startDrag} />
          </div>
          <Header api={this.props.api} item={this.state.item} />
          <GeoTagger defaults={this.props.defaults}uuid={uuid}
            loadItem={this.loadItem} sendData={this.sendData} onStart={this.startGeoTagging} />
        </div>
      );
    }
  },

  startGeoTagging: function() {
    this.setState({
      draggable: true
    });
  },

  startDrag: function(e) {
    if (this.state.draggable) {
      this.dragging = true;
      var pageX = e.pageX || e.clientX + (document.documentElement.scrollLeft ?
        document.documentElement.scrollLeft :
        document.body.scrollLeft);
      var pageY = e.pageY || e.clientY + (document.documentElement.scrollTop ?
        document.documentElement.scrollTop :
        document.body.scrollTop);

      this.draggingDragoffset = [
        pageX - this.state.dragoffset[0], //el.offsetLeft,
        pageY - this.state.dragoffset[1] //el.offsetTop;
      ];

      if (e.stopPropagation) {
        e.stopPropagation();
      }
      if (e.preventDefault) {
        e.preventDefault();
      }

      e.cancelBubble = true;
      e.returnValue = false;
      return false;
    }

  },

  endDrag: function() {
    this.dragging = false;

    this.setState({
      dragoffset: this.tempDragoffset
    });
  },

  moveDrag: function(e) {
    if (this.state.draggable && this.dragging) {
      var pageX = e.pageX || e.clientX + (document.documentElement.scrollLeft ?
        document.documentElement.scrollLeft :
        document.body.scrollLeft);
      var pageY = e.pageY || e.clientY + (document.documentElement.scrollTop ?
        document.documentElement.scrollTop :
        document.body.scrollTop);

      var top = (pageY - this.draggingDragoffset[0]) + 'px';
      var left = (pageX - this.draggingDragoffset[1]) + 'px';

      this.tempDragoffset = [
        e.pageX - this.draggingDragoffset[0],
        e.pageY - this.draggingDragoffset[1]
      ];

      var transform = `translate(${this.tempDragoffset[0]}px,${this.tempDragoffset[1]}px)`;

      var node = findDOMNode(this.refs.image);
      node.style.transform = transform;
    }
  },

  componentDidMount: function() {
    this.loadItem();

    window.addEventListener('mousemove', this.moveDrag);
    window.addEventListener('mouseup', this.endDrag);
  },

  getToken: function() {
    try {
      return localStorage.getItem('token');
    } catch (err) {
      console.error('Error reading token from localStorage', err);
      return null;
    }
  },

  saveToken(token) {
    try {
      localStorage.setItem('token', token);
    } catch (err) {
      console.error('Error saving token to localStorage', err);
    }
  },

  loadItem: function() {
    // TODO: pass token in promise!
    var token = this.state.token;

    var options = {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    };

    if (token) {
      options.headers = {
        'Authorization': token
      }
    }
    fetch(this.props.api.url + 'items/random', options)
      .then(response => {
        token = response.headers.get('Authorization');
        this.saveToken(token);
        return response.json();
      }).then(json => {
        this.setState({
          item: json,
          token: token
        });
      }).catch(err => {
        console.error(err);
      });
  },

  sendData: function(step, stepIndex, completed, data, geometry, callback) {
    if (!callback && geometry) {
      callback = geometry;
    }
    if (!callback && data) {
      callback = data;
    }

    var uuid = this.state.item.uuid;

    fetch(this.props.api.url + 'items/' + uuid, {
      method: 'post',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': this.state.token
      },
      body: JSON.stringify({
        type: 'Feature',
        properties: {
          step: step,
          stepIndex: stepIndex,
          completed: completed,
          data: data
        },
        geometry: geometry
      })
    })
    .then(function(response) {
      return response.json()
    }).then(function(json) {
      callback();
    }).catch(function(err) {
      callback(err);
    });
  }

});

export default App;
