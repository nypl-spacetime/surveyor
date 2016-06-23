import React from 'react';

export class Error extends React.Component {

  render() {
    return (
      <div>
        LOADING
      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {
    changeRoute: (url) => dispatch(push(url)),
  };
}

export default Error;
