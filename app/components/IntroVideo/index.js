import React from 'react';
import { findDOMNode } from 'react-dom';

// import tutorial from 'video/tutorial.mp4';
var tutorial = 'https://dl.dropboxusercontent.com/u/12905316/space-time/tutorial.mp4';

import poster from 'video/tutorial-poster.jpg';

import styles from './styles.css';

export class IntroVideo extends React.Component {

  render() {
    return (
      <video className={styles.video} poster={poster} ref='video' tabindex='0'
        onEnded={this.ended.bind(this)} onClick={this.play.bind(this)}>
        <source src={tutorial} type='video/mp4'/>
      </video>
    );
  }

  play() {
    var node = findDOMNode(this.refs.video);
    node.play();
    node.setAttribute('controls', 'controls');
  }

  ended() {
    var node = findDOMNode(this.refs.video);
    node.load();
  }
}

export default IntroVideo;
