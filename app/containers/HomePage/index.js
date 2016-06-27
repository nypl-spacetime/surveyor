/*
 * HomePage
 *
 * This is the first thing users see of our App, at the '/' route
 */

import React from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';

import { createSelector } from 'reselect';

import {
  selectUuid,
  selectLoading,
  selectError
} from 'containers/App/selectors';

import {
  loadItem
} from '../App/actions';

import Error from 'containers/Error';
import Loading from 'containers/Loading';

import Image from 'containers/Image';
import Sidebar from 'containers/Sidebar';

import styles from './styles.css';

export class HomePage extends React.Component {

  componentWillMount = () => {
    if (!this.props.uuid) {
      this.props.loadItem(this.props.params.uuid);
    }
  }

  render() {
    let mainContent = null;

    if (this.props.loading) {
      mainContent = <Loading />
    } else if (this.props.error) {
      mainContent = <Error />
    } else {
      mainContent = (
        <div className={`${styles.container}`}>
          <Image />
          <Sidebar />
        </div>
      );
    }

    return mainContent;
  }
}

HomePage.propTypes = {
  loading: React.PropTypes.bool
};

function mapDispatchToProps(dispatch) {
  return {
    loadItem: (uuid) => {
      dispatch(loadItem(uuid));
    },
    dispatch
  };
}

// Wrap the component to inject dispatch and state into it
export default connect(createSelector(
  selectUuid(),
  selectLoading(),
  selectError(),
  (uuid, loading, error) => ({
    uuid, loading, error
  })
), mapDispatchToProps)(HomePage);
