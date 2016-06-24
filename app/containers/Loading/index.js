import React from 'react';

import styles from './styles.css';

var nypl = require('images/nypl-white.svg');

export class Loading extends React.Component {

  render() {
    return (
      <div className={styles.container}>
        <div className={styles.loading}>
          <img src={nypl} />
          <span>Loading...</span>
        </div>
      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {
    changeRoute: (url) => dispatch(push(url)),
  };
}

export default Loading;
