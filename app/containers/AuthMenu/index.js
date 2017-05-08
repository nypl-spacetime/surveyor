import React from 'react'
import { connect } from 'react-redux'
import { createSelector } from 'reselect'

import {
  selectLoading,
  selectOAuth,
  selectSubmissions
} from 'containers/App/selectors'

import {
  logOut
} from '../App/actions'

import AuthMenuButton from 'components/AuthMenuButton'

import { StyledMenu, StyledMenuItem } from './styles'

export class AuthMenu extends React.Component {

  constructor (props) {
    super(props)
    this.state = {
      width: 0,
      showDropdown: false,
      dropdownWidth: 200,
      clientX: 0,
      shiftKey: false
    }
  }

  render () {
    if (this.props.loading) {
      return null
    }

    // const hasSubmissions = this.props.submissions && this.props.submissions.completed > 0
    const isAuthenicated = this.props.oauth && this.props.oauth.oauth && this.props.oauth.oauth.provider

    let menuItems = []

    const makeProviderList = () => {
      if (!(this.props.oauth && this.props.oauth.providers)) {
        return []
      } else {
        return this.props.oauth.providers
          .map((provider) => (
            <a href={provider.url}>
              Log in with {provider.title}
            </a>
          ))
      }
    }

    if (isAuthenicated) {
      menuItems = [
        ...menuItems,
        <a href='javascript:void(0);' onClick={this.props.logOut}>
          Log out
        </a>
      ]

      if (this.props.shiftKey) {
        menuItems = [
          ...menuItems,
          ...makeProviderList(this.props.oauth.oauth.provider)
        ]
      }
    } else {
      menuItems = [
        ...menuItems,
        ...makeProviderList()
      ]
    }

    const style = {
      left: this.state.clientX - this.state.dropdownWidth / 2,
      width: this.state.dropdownWidth
    }

    let dropdown
    if (this.state.showDropdown) {
      dropdown = (
        <StyledMenu style={style} ref='menu'>
          {menuItems.map((menuItem, i) => (
            <StyledMenuItem key={i}>
              {menuItem}
            </StyledMenuItem>
          ))}
        </StyledMenu>
      )
    }

    // ref='auth-button'
    return (
      <div>
        <AuthMenuButton onClick={this.toggleMenu.bind(this)}
          oauth={this.props.oauth} submissions={this.props.submissions} />
        {dropdown}
      </div>
    )
  }

  closeMenu () {
    this.setState({
      showDropdown: false
    })
  }

  toggleMenu (event) {
    let x = 0
    if (event.clientX) {
      x = event.clientX
    }

    this.setState({
      showDropdown: !this.state.showDropdown,
      clientX: x,
      shiftKey: event.nativeEvent && event.nativeEvent.shiftKey
    })

    event.stopPropagation()
    event.preventDefault()
  }

  componentDidMount () {
    this.boundOutsideClick = this.outsideClick.bind(this)
    window.addEventListener('click', this.boundOutsideClick)
  }

  componentWillUnmount () {
    window.removeEventListener('click', this.boundOutsideClick)
  }

  outsideClick () {
    this.closeMenu()
  }
}

function mapDispatchToProps (dispatch) {
  return {
    logOut: () => dispatch(logOut())
  }
}

export default connect(createSelector(
  selectLoading(),
  selectOAuth(),
  selectSubmissions(),
  (loading, oauth, submissions) => ({
    loading, oauth, submissions
  })
), mapDispatchToProps)(AuthMenu)
