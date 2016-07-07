/*
 * Header
 *
 * Header header header
 */
/* eslint-disable react/prefer-stateless-function */

import React from 'react';
import { connect } from 'react-redux';
import { findDOMNode } from 'react-dom';


import { createSelector } from 'reselect';

import {
  selectCSSVariables
} from 'containers/App/selectors';

import Metadata from 'containers/Metadata';
import Geotagger from 'containers/Geotagger';

import styles from './styles.css';

export class Sidebar extends React.Component {

  constructor(props) {
    super(props);

    this.state = Object.assign({
      width: 450,
      minWidth: 300,
      maxWidth: 800,

      height: 450,
      
      resizeMode: 'horizontal'
    }, this.getResizeBounds())
  }

  mobileWidth = parseInt(this.props.cssVariables.mobileWidth);

  dragging = false;
  startPos = undefined;
  contentsElement = null;
  xy = {
    x: -1,
    y: -1
  };

  // TODO: >= or >?
  orientation = () => window.innerWidth >= this.mobileWidth ? 'horizontal' : 'vertical'

  render() {
    var style;

    if (this.orientation() === 'horizontal') {
      style = {
        width: `${this.state.width}px`,
        minWidth: `${this.state.minWidth}px`,
        maxWidth: `${this.state.maxWidth}px`
      }
    } else {
      style = {
        height: `${this.state.height}px`,
        minHeight: `${this.state.minHeight}px`,
        maxHeight: `${this.state.maxHeight}px`,
        minWidth: 'none',
        maxWidth: 'none' 
      }
    }
    // console.log('orientation now: ', this.orientation(), style)

    return (
      <div className={`${styles.container}`}>
        <div className={`${styles.resizer}`}
          onClick={this.resizerClick}
          onMouseDown={this.dragStart}
          onTouchStart={this.dragStart} >
          <span></span>
        </div>
        <div className={`${styles.contents}`} ref='contents' style={style}>
          <Metadata />
          <Geotagger />
        </div>
      </div>
    );
  }

  dragStart = (e) => {
    // console.log('STARTEN')

    this.contentsElement = findDOMNode(this.refs.contents);

    this.dragging = true
    // resizer.classList.add("active")

    var xy
    if (e.changedTouches) {
      xy = {
        x: e.changedTouches[0].pageX,
        y: e.changedTouches[0].pageY
      }
    } else {
      xy = e.clientY ? {x: e.clientX, y: e.clientY} : {x: e.pageX, y: e.pageY}
    }

    if (this.orientation() === 'horizontal') {
      this.startPos = xy.x - this.contentsElement.offsetLeft
    } else {
      this.startPos = xy.y - this.contentsElement.offsetTop
    }

    // console.log(xy, this.startPos, this.orientation())
    // console.log(screen.width, this.mobileWidth , window.devicePixelRatio)

    this.xy = xy

    window.addEventListener('mousemove', this.dragMove)
    window.addEventListener('touchmove', this.dragMove)

    window.addEventListener('mouseup', this.dragEnd)
    window.addEventListener('touchend', this.dragEnd)

    window.addEventListener("resize", this.updateResizeBounds)

    e.preventDefault()
  }

  updateResizeBounds = () => {
    this.setState(getResizeBounds())
  }

  getResizeBounds = () => {
    console.log('this.setState(', {
      maxHeight: window.innerHeight * 0.80,
      minHeight: window.innerHeight * 0.20
    })
    return {
      maxHeight: window.innerHeight * 0.80,
      minHeight: window.innerHeight * 0.20
    }
  }

  dragMove = (e) => {
    window.getSelection().removeAllRanges()

    if (!this.dragging) {
      return
    }

    if (this.orientation() === 'horizontal') {
      var clientX;
      if (e.changedTouches) {
        clientX = e.changedTouches[0].pageX;
      } else {
        clientX = e.clientX ? e.clientX : e.pageX;
      }

      var width = window.innerWidth - clientX;

      if (this.startPos !== undefined) {
        width += this.startPos;
      }

      this.contentsElement.style.height = null;
      this.contentsElement.style.width = `${width}px`;
    } else {
      var clientY;

      if (e.changedTouches) {
        clientY = e.changedTouches[0].pageY;
      } else {
        clientY = e.clientY ? e.clientY : e.pageY;
      }

      if (this.startPos !== undefined) {
        clientY -= this.startPos
      }

      console.log('inner y: ', clientY, this.startPos, window.innerHeight)

      this.contentsElement.style.width = null;
      this.contentsElement.style.height = `${window.innerHeight - clientY}px`
    }
    e.preventDefault()
  }

  dragEnd = (e) => {

    // resizer.classList.remove("active")
    window.removeEventListener('mousemove', this.dragMove)
    window.removeEventListener('touchmove', this.dragMove)

    // set state, etc!
    this.dragging = false

  }

  resizerClick = (e) => {
    // console.log('CLICK')
    var pos;
    if (e.changedTouches) {
      pos = {
        x: e.changedTouches[0].pageX,
        y: e.changedTouches[0].pageY
      }
    } else {
      pos = e.clientY ? {x: e.clientX, y: e.clientY} : {x: e.pageX, y: e.pageY}
    }

    var hasMoved = (pos.x !== this.xy.x && pos.y !== this.xy.y)

    if (!hasMoved) {
      // console.log('hasMoved', hasMoved)

      var width = null;
      var height = null;

      if (this.orientation() === 'horizontal') {
        // Find if current width is closer to minWidth or to maxWidth
        var s = [this.state.minWidth, this.state.maxWidth]
          .map((width) => Math.abs(width - this.contentsElement.clientWidth))
          .reduce((iMax, x, i, arr) => x > arr[iMax] ? i : iMax, 0);
        // console.log('which way to go: ', s)

        var currentState = ['expanded', 'collapsed'][s]
        width = currentState === 'collapsed' ? this.state.maxWidth : this.state.minWidth

      // orientation 'vertical'
      } else {
        // Get index of greatest difference from the min/max
        // i.e. 0 indicates contentsEl height is further from minHeight than maxHeight
        //      1 indicates "          width  "  further from maxHeight
        // console.log('comp: ', [this.state.minHeight, this.state.maxHeight], [this.state.minHeight, this.state.maxHeight].map((height) => Math.abs(height - this.contentsElement.clientHeight)))
        var s = [this.state.minHeight, this.state.maxHeight]
          .map((height) => Math.abs(height - this.contentsElement.clientHeight))
          .reduce((iMax, x, i, arr) => x > arr[iMax] ? i : iMax, 0);

        var currentState = ['expanded', 'collapsed'][s]
        // console.log('current state: ', currentState)
        height = currentState === 'collapsed' ? this.state.maxHeight : this.state.minHeight
      }

      this.contentsElement.style.height = height ? `${height}px` : 'auto'
      this.contentsElement.style.width = width ? `${width}px` : 'auto'
      console.log('setting to ', height ? `${height}px` : 'auto', width ? `${width}px` : 'auto')

    }
  }
}

export default connect(createSelector(
  selectCSSVariables(),
  (cssVariables) => ({
    cssVariables
  })
))(Sidebar);









//
//
//
//
// var dragging = false
// var breakpoint = 800
// var resizer
// var item
// var map
// var info
// var step = 0
// var minSize = 500
// var resizeMode = "horizontal"
// var infoSize = 0
// var defaultSize = 0
// var defaultSizeH = 500
// var defaultSizeV = 200
// var resizerSize = 30
// var startPos
// var xy
//
// function init () {
//   item = document.getElementById("item")
//   info = document.getElementById("information")
//   resizer = document.getElementById("resizer")
//   resizer.addEventListener("mousedown", dragStart)
//   resizer.addEventListener("touchstart", dragStart)
//   resizer.addEventListener("click", infoToggle)
//   window.addEventListener("mouseup", dragEnd)
//   window.addEventListener("touchend", dragEnd)
//   window.addEventListener("touchend", infoToggle)
//   window.addEventListener("resize", windowResize)
//   document.getElementById("view-link").addEventListener("click", toggleProviders)
//
//   var steps = document.getElementsByClassName("step")
//
//   for (var i=0; i<steps.length; i++) {
//     steps[i].addEventListener("transitionend", removeHidden)
//   }
//
//   windowResize()
//   createMap()
//   updateDivs()
//   goNextStep()
// }
//
// function goNextStep() {
//   var steps = document.getElementsByClassName("step")
//   step++
//   if (step > steps.length) step = 1
//   var prev = document.getElementById("step" + (step-1))
//   if (prev) {
//     prev.classList.toggle("hidden")
//     prev.classList.toggle("active")
//   }
//   document.getElementById("step" + step).classList.toggle("active")
// }
//
// function removeHidden(e) {
//   if (!e.target.classList.contains("active")) e.target.classList.remove("hidden")
// }
//
// function toggleProviders(e) {
//   document.getElementById("providers").classList.toggle("active")
//   if (e) e.preventDefault()
// }
//
// function updateDivs() {
//   if (infoSize == 0) infoSize = defaultSize
//   if (resizeMode == "horizontal") {
//     item.style.right = infoSize+"px"
//     item.style.bottom = "0"
//     item.style.height = "auto"
//     info.style.width = infoSize+"px"
//     info.style.top = "0"
//   } else {
//     item.style.top = "0"
//     item.style.height = infoSize+"px"
//     item.style.bottom = "0"
//     item.style.right = "0"
//     info.style.top = infoSize+"px"
//     info.style.right = "0"
//     info.style.width = "auto"
//   }
//   if (map) map.invalidateSize()
// }
//
// function dragStart(e) {
//   dragging = true
//   resizer.classList.add("active")
//   xy = e.clientY ? {x:e.clientX, y:e.clientY} : {x:e.pageX, y:e.pageY}
//   startPos = resizeMode == "horizontal" ? xy.x - info.offsetLeft : xy.y - info.offsetTop
//   window.addEventListener("mousemove", dragMove)
//   window.addEventListener("touchmove", dragMove)
//   e.preventDefault()
// }
//
//
// function dragMove(e) {
//   window.getSelection().removeAllRanges()
//   if (!dragging) return
//   if (resizeMode == "horizontal") {
//     var clientX = e.clientX ? e.clientX : e.pageX
//     var width = window.innerWidth - clientX
//     if (startPos != undefined) width += startPos
//     if (width >= minSize && clientX >= minSize) {
//       infoSize = width
//       updateDivs()
//     }
//   } else {
//     minSize = resizerSize
//     var clientY = e.clientY ? e.clientY : e.pageY
//     if (startPos != undefined) clientY -= startPos
//     if (clientY >= minSize && clientY + minSize < window.innerHeight) {
//       infoSize = clientY
//       updateDivs()
//     }
//   }
//   // console.log(resizeMode, infoSize)
//   e.preventDefault()
// }
//
// function dragEnd(e) {
//   dragging = false
//   resizer.classList.remove("active")
//   window.removeEventListener("mousemove", dragMove)
//   window.removeEventListener("touchmove", dragMove)
// }
//
// function infoToggle(e) {
//   var pos = e.clientY ? {x:e.clientX, y:e.clientY} : {x:e.pageX, y:e.pageY}
//   if (pos.x != xy.x && pos.y != xy.y) return
//   if (resizeMode == "horizontal") {
//     var width = info.clientWidth
//     if (width < minSize || width == window.innerWidth - minSize) {
//       infoSize = minSize
//     } else {
//       infoSize = window.innerWidth - minSize
//     }
//   } else {
//     minSize = resizerSize
//     var clientY = info.clientHeight
//     if (clientY < (window.innerHeight - minSize) * 0.5) {
//       infoSize = minSize
//     } else {
//       infoSize = window.innerHeight - minSize
//     }
//   }
//   updateDivs()
// }
//
// function createMap() {
//   var layer = L.tileLayer('http://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png', {
//     attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, &copy; <a href="https://cartodb.com/attributions">CartoDB</a>'
//   })
//
//   map = L.map('map', {
//     center: [40.753621, -73.983230],
//     zoom: 17
//   })
//
//   var hereIcon = L.divIcon({
//     className: 'map-marker',
//     iconSize: [0, 0],
//     iconAnchor: [0, 0],
//     html: '<div class="location"><span class="here">HERE!</span>(I think)</div>'
//   })
//
//   var hereMarker
//
//   map.on('click', function(e) {
//     if (!hereMarker) {
//       hereMarker = L.marker(map.getCenter(), {
//         icon: hereIcon,
//         clickable: false
//       })
//       hereMarker.addTo(map)
//     }
//     hereMarker.setLatLng(map.getCenter())
//     document.getElementById("submit").className = "moved submit"
//     document.getElementById("submit").addEventListener("click", function(e) {
//       e.preventDefault()
//       goNextStep()
//     })
//   })
//
//   map.on('move', function(e) {
//     if (!hereMarker) return
//     hereMarker.setLatLng(map.getCenter())
//   })
//
//   map.addLayer(layer)
// }
//
// function windowResize() {
//   var w = window.innerWidth
//   if (w <= breakpoint) {
//     resizeMode = "vertical"
//     defaultSize = defaultSizeV
//   } else {
//     resizeMode = "horizontal"
//     defaultSize = defaultSizeH
//   }
//   updateDivs()
// }
