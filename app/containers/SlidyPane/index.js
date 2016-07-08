import { connect } from 'react-redux'
import React, { PropTypes } from 'react'
import { findDOMNode } from 'react-dom'

import { createSelector } from 'reselect'

import {
  selectCSSVariables
} from 'containers/App/selectors'

import styles from './styles.css'

export class SlidyPane extends React.Component {

  // Expects exactly two children
  static propTypes = {
    children: PropTypes.node.isRequired
  }

  static defaultProps = {
    // Establish min size of each pane in each orientation
    // e.g. below specifies pane one has min width of 100px in horizontal orientation
    //      Max width determined by subtracting min width of other pane (200px) from client width
    minSize: {
      horizontal: [200, 300],
      vertical: [0, 60]
    },
    // On load, establish ideal starting size for first pane (second pane gets remainder)
    // e.g. below specifies pane one should occupy 60% of client width in horiz orientation
    firstPaneInitialSize: {
      horizontal: 0.6,
      vertical: 0.50
    }
  }

  constructor (props) {
    super(props)

    this.mobileWidth = parseInt(this.props.cssVariables.mobileWidth)

    this.startPos = 0
    this.children = []
    this.xy = {
      x: -1,
      y: -1
    }

    this.recordContainerBounds()

    this.state = Object.assign({
      minWidth: 300,
      maxWidth: 800,

      height: 450,
      
      resizeMode: 'horizontal',

      dragging: false,
      userFirstPaneSize: null,

      orientation: this.orientation(),
      dimensions: this.getInitialDimensions(),
    })

    window.addEventListener('resize', this.monitorResize)
  }

  componentDidMount () {
    this.recordContainerBounds()
  }

  recordContainerBounds () {
    var el = null
    if (this.refs.container) el = findDOMNode(this.refs.container)
    this.containerWidth = el ? el.clientWidth : window.innerWidth
    this.containerHeight = el ? el.clientHeight : window.innerHeight
  }

  monitorResize = () => {
    this.recordContainerBounds()

    if (this.orientation() !== this.state.orientation) {
      this.setState({ orientation: this.orientation() }, this.updateDimensions)

    // Ignore resize events on mobile for now as they seem to fire when screen pulled
    } else if (this.containerWidth >= this.mobileWidth) {
      this.updateDimensions()
    }

  }

  // TODO: >= or >?
  orientation () {
    return this.containerWidth >= this.mobileWidth ? 'horizontal' : 'vertical'
  }

  dragStart = (e) => {

    this.children = [findDOMNode(this.refs.first), findDOMNode(this.refs.second)]

    this.setState({dragging: true})

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
      this.startPos = xy.x - this.children[1].offsetLeft
    } else {
      this.startPos = xy.y - this.children[1].offsetTop + findDOMNode(this.refs.container).offsetTop
      
    }

    this.xy = xy

    window.addEventListener('mousemove', this.dragMove)
    window.addEventListener('touchmove', this.dragMove)

    window.addEventListener('mouseup', this.dragEnd)
    window.addEventListener('touchend', this.dragEnd)
    // window.addEventListener('resize', this.adjustToWindow)

    e.preventDefault()
  }

  updateDimensions () {
    this.setState({ dimensions: this.getInitialDimensions() })
  }

  getInitialDimensions () {

    var customSize = this.state && this.state.userFirstPaneSize ? this.state.userFirstPaneSize : null

    if (this.orientation() === 'horizontal') {
      var firstRatio = customSize ? customSize : this.props.firstPaneInitialSize.horizontal
      return [
        { width: this.containerWidth * firstRatio, height: 'auto' },
        { width: this.containerWidth - this.containerWidth * firstRatio, height: 'auto' }
      ]
    } else {
      var firstRatio = customSize ? customSize : this.props.firstPaneInitialSize.vertical
      return [
        { width: 'auto', height: this.containerHeight * firstRatio },
        { width: 'auto', height: this.containerHeight - this.containerHeight * firstRatio }
      ]
    }
  }

  /* adjustToWindow = (e) => {
    return false

    if (this.orientation() === 'horizontal') {
      this.setFirstDimensions({ width: window.innerWidth * this.props.firstPaneInitialSize.horizontal })
    } else {
      this.setFirstDimensions({ height: window.innerWidth * this.props.firstPaneInitialSize.vertical })
    }
  } */

  dragEnd = (e) => {

    window.removeEventListener('mousemove', this.dragMove)
    window.removeEventListener('touchmove', this.dragMove)

    this.setState({dragging: false })

    // If touch device, fire click:
    if (e.changedTouches) {
      this.resizerClick(e)
    }
  }

  dragMove = (e) => {
    window.getSelection().removeAllRanges()

    if (!this.state.dragging) return

    var dims = {}

    if (this.orientation() === 'horizontal') {
      var clientX;
      if (e.changedTouches) {
        clientX = e.changedTouches[0].pageX;
      } else {
        clientX = e.clientX ? e.clientX : e.pageX;
      }

      clientX -= this.startPos
      dims.width = clientX
      
    } else {
      var clientY;

      if (e.changedTouches) {
        clientY = e.changedTouches[0].pageY;
      } else {
        clientY = e.clientY ? e.clientY : e.pageY;
      }

      clientY -= this.startPos

      dims.height = clientY
    }

    this.setFirstDimensions(dims, () => {
      var firstRatio = null;
      if (this.orientation() === 'horizontal') firstRatio = parseInt(this.state.dimensions[0].width) / this.containerWidth
      else firstRatio = parseInt(this.state.dimensions[0].height) / this.containerHeight
      this.setState({ userFirstPaneSize: firstRatio })
    })
    e.preventDefault()
  }

  setFirstDimensions = (dims, cb) => {
    var dims = [dims]
    dims.push({
      width: this.containerWidth - dims[0].width,
      height: this.containerHeight - parseInt(dims[0].height)
    })
    this.setDimensions(dims, cb)
  }

  setDimensions = (dims, cb) => {
    var dimensions = [{}, {}]
    ;[0, 1].forEach((ind) => {
      ;['width', 'height'].forEach((prop) => {

        var val = dims[ind] && (typeof dims[ind][prop]) === 'number' ? dims[ind][prop] : null

        var minVal = this.props.minSize[this.orientation()][ind]

        var availPixels = this.orientation() === 'horizontal' ? this.containerWidth : this.containerHeight // window.innerWidth : window.innerHeight
        var maxVal = availPixels - this.props.minSize[this.orientation()][ind === 0 ? 1 : 0]

        if (val && val < minVal) val = minVal
        if (val && val > maxVal) val = maxVal

        if ((typeof val) === 'number') val = `${val}px`
        else val = '100%'

        dimensions[ind][prop] = val
      })
    })
    this.setState({ dimensions: dimensions }, cb)
  }

  render () {
    return (
      <div className={[styles.container, this.state.orientation, styles[this.state.orientation]].join(' ')} ref='container'>
        <div className={styles.first} ref='first' style={{ width: this.state.dimensions[0].width, height: this.state.dimensions[0].height }}>
          {this.props.children[0]}
        </div>
        <div className={styles.second} ref='second' style={{ width: this.state.dimensions[1].width, height: this.state.dimensions[1].height }}>
          <div className={`${styles.resizer}${this.state.dragging ? ` ${styles.resizing}` : ''}`}
            onClick={this.resizerClick}
            onMouseDown={this.dragStart}
            onTouchStart={this.dragStart} >
            <span></span>
          </div>
          {this.props.children[1]}

        </div>
      </div>
    )
  }

  /* 
   * When resizer clicked, toggle active pane
   */
  resizerClick = (e) => {
    if (!this.clickDragged(e)) {

      if (this.expandedPane() === 0) this.expandPane(1)
      else this.expandPane(0)

      this.setState({ userFirstPaneSize: null })
    }
  }

  clickDragged = (e) => {
    var pos;
    if (e.changedTouches) {
      pos = {
        x: e.changedTouches[0].pageX,
        y: e.changedTouches[0].pageY
      }
    } else {
      pos = e.clientY ? {x: e.clientX, y: e.clientY} : {x: e.pageX, y: e.pageY}
    }

    var hasMoved = (pos.x !== this.xy.x || pos.y !== this.xy.y)
    return hasMoved
  }

  getMinSize (paneIndex) {
    return this.props.minSize[this.orientation()][paneIndex]
  }

  getMaxSize (paneIndex) {
    return this.containerSize() - this.props.minSize[this.orientation()][paneIndex]
  }

  containerSize () {
    return this.orientation() === 'horizontal' ? this.containerWidth : this.containerHeight
  }

  expandPane (ind) {
    if (this.orientation() === 'horizontal') {
      if (ind === 0) this.setFirstDimensions({ width: this.getMaxSize(0) })
      else this.setFirstDimensions({ width: this.getMinSize(0) })
    } else {
      if (ind === 0) this.setFirstDimensions({ height: this.getMaxSize(0) })
      else this.setFirstDimensions({ height: this.getMinSize(0) })
    }
  }

  expandedPane () {
    // Find if current size is closer to min or to max dimension for current orientation
    var prop = this.orientation() === 'horizontal' ? 'width' : 'height'
    var s = [this.getMinSize(0), this.getMaxSize(0)]
      .map((boundary) => Math.abs(boundary - parseInt(this.state.dimensions[0][prop])))
      .reduce((iMax, x, i, arr) => x > arr[iMax] ? i : iMax, 0);

    return s
  }

  componentWillUnmount () {
    window.removeEventListener('resize', this.monitorResize)
    window.removeEventListener('mousemove', this.dragMove)
    window.removeEventListener('touchmove', this.dragMove)
    window.removeEventListener('mouseup', this.dragEnd)
    window.removeEventListener('touchend', this.dragEnd)
  }
}

export default connect(createSelector(
  selectCSSVariables(),
  (cssVariables) => ({
    cssVariables
  })
))(SlidyPane)

