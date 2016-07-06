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
import SlidyPane from 'containers/SlidyPane';
import Metadata from 'containers/Metadata';
import Geotagger from 'containers/Geotagger';

import styles from './styles.css';

export class HomePage extends React.Component {

  componentWillMount () {
    if (!this.props.uuid) {
      this.props.loadItem(this.props.params.uuid);
    }
  }

  componentWillReceiveProps (newProps) {
    var uuidChanged = newProps.params.uuid !== this.props.params.uuid
    console.log(uuidChanged ? 'UUID changed! Load this UUID --->>> ' + this.props.params.uuid : 'URL changed but do not do anything')
  }

  render() {
    let mainContent = null;

    if (this.props.error) {
    mainContent = <Error />
    } else if (this.props.loading) {
      mainContent = <Loading />
    } else {
      mainContent = (
        <SlidyPane key={this.props.params.uuid}>
          <Image />
          <div>
            <Metadata />
            <Geotagger />
          </div>
        </SlidyPane>
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
