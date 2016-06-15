import React from 'react';

import './help.scss';

const Help = React.createClass({

  render: function() {
    return (
      <div className='help' onClick={this.close}>
        <div className='help-contents box' onClick={this.hond}>
          <p>
            HELLEP Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
          </p>
          <p>
            <a href='javascript:void(0)' onClick={this.close}>Close</a>
          </p>
        </div>
      </div>
    )
  },

  hond: function(e) {
    e.stopPropagation()
  },

  close: function(e) {
    e.preventDefault()
    this.props.close()
  },

  componentWillMount:function() {
    document.addEventListener('keydown', this.close, false);
  },

  componentWillUnmount: function() {
    document.removeEventListener('keydown', this.close, false);
  }

})

export default Help
