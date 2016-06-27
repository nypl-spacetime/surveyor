import React from 'react';

import styles from './styles.css';

var nypl = require('images/nypl-white.svg');

export class Loading extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      dots: 0,
      maxDots: 3
    };
  }

  render() {
    var text = `Loading${(new Array(this.state.dots + 1).join('.'))}`;
    return (
      <div className={styles.container}>
        <div className={styles.loading}>
          <img src={nypl} />
          <div className={styles.text}>{text}</div>
        </div>
      </div>
    );
  }

  componentDidMount() {
    this.interval = setInterval(()=> {
      this.setState({
        dots: (this.state.dots + 1) % (this.state.maxDots + 1)
      })
    }, 500);
  }

  componentWillUnmount() {
    if (this.interval) {
      clearInterval(this.interval)
    }
  }
}

export default Loading;
