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

  componentWillReceiveProps(props) {
    // user types in new route uuid
    var newRouteUuid = this.props.uuid === this.props.params.uuid &&
      props.uuid === this.props.uuid && props.uuid &&
      props.params.uuid !== this.props.params.uuid;

    // path is /:incorrect-uuid, user/app wants to go to /
    var fromIncorrectUuidToRandomUuid = this.props.error && !props.params.uuid && this.props.params.uuid;

    // path is /:incorrect-uuid, user types in new uuid
    var fromIncorrectUuidToNewUuid = this.props.error && props.params.uuid && props.params.uuid !== this.props.params.uuid;

    if (newRouteUuid || fromIncorrectUuidToRandomUuid || fromIncorrectUuidToNewUuid) {
      // Call loadItem with uuid from route (or undefined)
      this.props.loadItem(props.params.uuid);
    }
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
