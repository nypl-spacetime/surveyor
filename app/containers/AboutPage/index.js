/*
 * FeaturePage
 *
 * List all the features
 */
/* eslint-disable react/prefer-stateless-function */

import React from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';

import Page from 'components/Page';
import H1 from 'components/H1';

var about = require('html!./about.md');

export class AboutPage extends React.Component {

  /**
   * Changes the route
   *
   * @param  {string} route The route we want to go to
   */
  openRoute = (route) => {
    this.props.changeRoute(route);
  };

  /**
   * Changed route to '/'
   */
  backToHomePage = () => {
    this.openRoute('/');
  };

  render() {
    return (
      <Page buttonAction={this.backToHomePage}>
        <div dangerouslySetInnerHTML={{__html: about}} />
      </Page>
    );
  }
}
AboutPage.propTypes = {
  changeRoute: React.PropTypes.func,
};

function mapDispatchToProps(dispatch) {
  return {
    changeRoute: (url) => dispatch(push(url)),
  };
}

export default connect(null, mapDispatchToProps)(AboutPage);
