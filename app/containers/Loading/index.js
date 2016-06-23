import React from 'react';

export class Loading extends React.Component {

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

export default Loading;
