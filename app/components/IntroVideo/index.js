import React from 'react';
import { findDOMNode } from 'react-dom';

var tutorial = 'https://s3.amazonaws.com/spacetime-nypl-org/assets/surveyor+tutorial.mp4';

import poster from 'images/tutorial-poster.jpg';

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
