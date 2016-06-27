import React from 'react';

import CenteredItemPage from 'components/CenteredItemPage';

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
    var loading = `Loading${(new Array(this.state.dots + 1).join('.'))}`;
    return (
      <CenteredItemPage>
        <div className={styles.container}>
          <img src={nypl} />
          <div className={styles.loading}>{loading}</div>
        </div>
      </CenteredItemPage>
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
