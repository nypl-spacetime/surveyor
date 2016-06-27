import React from 'react';
import { connect } from 'react-redux';

import CenteredItemPage from 'components/CenteredItemPage';
import Button from 'components/Button';
import Buttons from 'components/Buttons';

import { createSelector } from 'reselect';

import {
  selectError
} from 'containers/App/selectors';

import styles from './styles.css';

var nypl = require('images/nypl-white.svg');
var eye = require('images/error.svg');

export class Error extends React.Component {

  render() {
    const error = this.props.error
    const wasRandomItem = error.error.status === 404 && error.error.url &&
      error.error.url.endsWith('random')

    // TODO: if /items/random returns 404,
    // user has geotagged ALL availeble items!
    // this should be celebrated!

    return (
      <CenteredItemPage>
        <div className={styles.container}>
          <div className={styles.lion}>
            <img src={nypl} />
            <img src={eye} className={styles.eye}/>
          </div>
          <div className={styles.error}>{this.props.error.message}</div>
          <Buttons>
            <Button type='primary' onClick={this.reload}>Try again</Button>
          </Buttons>
        </div>
      </CenteredItemPage>
    );
  }

  reload() {
    location.reload();
  }
}

function mapDispatchToProps(dispatch) {
  return {
    // loadItem: (uuid) => {
    //   dispatch(loadItem(uuid));
    // },
    dispatch
  };
}

// Wrap the component to inject dispatch and state into it
export default connect(createSelector(
  selectError(),
  (error) => ({
    error
  })
), mapDispatchToProps)(Error);
