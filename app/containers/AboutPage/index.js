import React from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';

import Page from 'components/Page';

var markdown = require('html!./about.md');

export class AboutPage extends React.Component {

  openRoute = (route) => {
    this.props.changeRoute(route);
  };

  toSurveyor = () => {
    this.openRoute('/');
  };

  render() {
    return (
      <Page buttonAction={this.toSurveyor}>
        <div dangerouslySetInnerHTML={{__html: markdown}} />
      </Page>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {
    changeRoute: (url) => dispatch(push(url)),
  };
}

export default connect(null, mapDispatchToProps)(AboutPage);
