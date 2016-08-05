import React from 'react';
import { connect } from 'react-redux';

import { push } from 'react-router-redux';
import { Link } from 'react-router';

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

  openRoute = (route) => {
    this.props.changeRoute(route);
  };

  openAbout = () => {
    this.openRoute('/');
  };

  render() {
    const error = this.props.error

    const wasRandomItem = error && error.error &&
      error.error.status === 404 && error.error.url &&
      error.error.url.endsWith('random')

    var message = error ? error.message : ''

    if (!wasRandomItem) {
      return (
        <CenteredItemPage>
          <div className={styles.container}>
            <div className={styles.lion}>
              <img src={nypl} />
              <img src={eye} className={styles.eye}/>
            </div>
            <div className={styles.error}>{message}</div>
            <Buttons>
              <Button type='primary' onClick={this.reload.bind(this)}>Try again</Button>
            </Buttons>
          </div>
        </CenteredItemPage>
      );
    } else {
      // TODO: if /items/random returns 404,
      // user has geotagged ALL availeble items!
      // this should be celebrated!

      return (
        <CenteredItemPage>
          <div className={styles.container}>
            <div className={styles.lion}>
              <img src={nypl} />
            </div>
            <div className={styles.error}>
              Wow! You've geotagged <b>all</b> available images...
            </div>
            <div className={styles.center}>
              Find other projects to contribute to on the <a href='http://spacetime.nypl.org/'>website of the NYC Space/Time Directory</a>.
            </div>
          </div>
        </CenteredItemPage>
      );

    }
  }

  spacetime() {
    // this.openAbout()
    // location.reload();
  }


  reload() {
    this.openAbout()
    // location.reload();
  }
}

function mapDispatchToProps(dispatch) {
  return {
    changeRoute: (url) => dispatch(push(url)),
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
