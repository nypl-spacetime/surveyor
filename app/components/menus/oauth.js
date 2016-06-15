import React from 'react';

import './menu.scss'
import './oauth.scss'

const OAuthMenu = React.createClass({

  getInitialState: function() {
    return {}
  },

  render: function() {
    var providerTitle = this.props.oauth.providers
        .filter((provider) => provider.name === this.props.oauth.oauth.provider)
        .map((provider) => provider.title)[0]

    var otherOAuthOptions
    if (!this.state.showOtherOAuthOptions) {
      otherOAuthOptions = (
        <a href='javascript:void()' onClick={this.showOtherOAuthOptions}>
          Log in with a different provider
        </a>
      )
    } else {
      otherOAuthOptions = (
        <ul>
          { this.props.oauth.providers
              .filter((provider) => provider.name !== this.props.oauth.oauth.provider)
              .map((provider) => (
                <li key={provider.name}>Log in with {provider.title}</li>
              ))
          }
        </ul>
      )
    }

    // this.props.oauth

    return (
      <div className='menu' style={{right: '10px'}}>
        <div>
          Logged in with {providerTitle}
        </div>
        <div>
          <a href='javascript:void()' onClick={this.logOut}>Log out</a>
        </div>
        <hr />
        <div>
          {otherOAuthOptions}
        </div>
      </div>
    )
  },

  logOut: function() {
  },

  showOtherOAuthOptions: function() {
    this.setState({
      showOtherOAuthOptions: true
    })
  }

})

export default OAuthMenu
