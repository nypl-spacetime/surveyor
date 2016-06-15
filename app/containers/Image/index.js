/*
 * Header
 *
 * Header header header
 */
/* eslint-disable react/prefer-stateless-function */

import React from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';

import styles from './styles.css';

export class Image extends React.Component {
  render() {
    var src = null
    if (this.props.item && this.props.item.image_link) {
      src = this.props.item.image_link
    }

    var imageStyle = {
      backgroundImage: `url(${src})`
    };

    return (
      <div className={`${styles.container}`}>
        <div ref='image' className={`${styles.image}`} style={imageStyle} />
      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {
    // changeRoute: (url) => dispatch(push(url)),
  };
}

export default connect(null, mapDispatchToProps)(Image);

//
// import React from 'react';
// import { findDOMNode } from 'react-dom';
//
// import './image.scss';
//
// const Image = React.createClass({
//
//   getInitialState: function() {
//     return {
//       dragoffset: [0, 0]
//     };
//   },
//
//   dragging: false,
//   tempDragoffset: [0, 0],
//   draggingDragoffset: [0, 0],
//
//   render: function() {
//     var uuid = this.props.item.uuid;
//     var url = `http://digitalcollections.nypl.org/items/${uuid}`;
//
//     var imageStyle = {
//       backgroundImage: `url(${this.props.item.image_link})`,
//       transform: `translate(${this.state.dragoffset[0]}px,${this.state.dragoffset[1]}px)`
//     };
//
//     var className = 'item-image' + (this.props.draggable ? ' draggable' : '');
//
//     return (
//       <div className='item-image-container'>
//         <div ref='image' className={className} style={imageStyle}
//           onMouseDown={this.startDrag} />
//       </div>
//     );
//   },
//
//   startDrag: function(e) {
//     if (this.props.draggable) {
//       this.dragging = true;
//       var pageX = e.pageX || e.clientX + (document.documentElement.scrollLeft ?
//         document.documentElement.scrollLeft :
//         document.body.scrollLeft);
//       var pageY = e.pageY || e.clientY + (document.documentElement.scrollTop ?
//         document.documentElement.scrollTop :
//         document.body.scrollTop);
//
//       this.draggingDragoffset = [
//         pageX - this.state.dragoffset[0],
//         pageY - this.state.dragoffset[1]
//       ];
//
//       if (e.stopPropagation) {
//         e.stopPropagation();
//       }
//       if (e.preventDefault) {
//         e.preventDefault();
//       }
//
//       e.cancelBubble = true;
//       e.returnValue = false;
//       return false;
//     }
//
//   },
//
//   endDrag: function() {
//     this.dragging = false;
//
//     this.setState({
//       dragoffset: this.tempDragoffset
//     });
//   },
//
//   moveDrag: function(e) {
//     if (this.props.draggable && this.dragging) {
//       var pageX = e.pageX || e.clientX + (document.documentElement.scrollLeft ?
//         document.documentElement.scrollLeft :
//         document.body.scrollLeft);
//       var pageY = e.pageY || e.clientY + (document.documentElement.scrollTop ?
//         document.documentElement.scrollTop :
//         document.body.scrollTop);
//
//       var top = (pageY - this.draggingDragoffset[0]) + 'px';
//       var left = (pageX - this.draggingDragoffset[1]) + 'px';
//
//       this.tempDragoffset = [
//         e.pageX - this.draggingDragoffset[0],
//         e.pageY - this.draggingDragoffset[1]
//       ];
//
//       var transform = `translate(${this.tempDragoffset[0]}px,${this.tempDragoffset[1]}px)`;
//
//       var node = findDOMNode(this.refs.image);
//       node.style.transform = transform;
//     }
//   },
//
//   componentDidMount: function() {
//     window.addEventListener('mousemove', this.moveDrag);
//     window.addEventListener('mouseup', this.endDrag);
//   },
//
//   componentWillUnmount: function() {
//     window.removeEventListener('mousemove', this.moveDrag);
//     window.removeEventListener('mouseup', this.endDrag);
//   }
//
// });
//
// export default Image;
