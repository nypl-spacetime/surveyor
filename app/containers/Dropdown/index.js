import React from 'react'
import { CSSTransitionGroup } from 'react-transition-group'
import { findDOMNode } from 'react-dom'

import { Container } from './styles'

export class Dropdown extends React.Component {

  componentDidMount () {
    this.element = findDOMNode(this.refs.dropdown)
  }

  componentDidUpdate () {
    if (this.props.show && !this.boundOutsideClick && !this.boundOutsideFocus) {
      this.boundOutsideClick = this.outsideClick.bind(this)
      this.boundOutsideFocus = this.outsideFocus.bind(this)

      window.addEventListener('click', this.boundOutsideClick, true)
      window.addEventListener('focus', this.boundOutsideFocus, true)
    } else if (this.boundOutsideClick && this.boundOutsideFocus) {
      window.removeEventListener('click', this.boundOutsideClick, true)
      window.removeEventListener('focus', this.boundOutsideFocus, true)

      this.boundOutsideClick = undefined
      this.boundOutsideFocus = undefined
    }
  }

  render () {
    let dropdown
    if (this.props.show && this.props.children && this.props.children.length) {
      dropdown = (
        <Container>
          {this.props.children}
        </Container>
      )
    }

    return (
      <div ref='dropdown'>
        <CSSTransitionGroup
          transitionName='dropdown'
          transitionEnterTimeout={100}
          transitionLeaveTimeout={100}>
          {dropdown}
        </CSSTransitionGroup>
      </div>
    )
  }

  outsideClick (event) {
    let keepShowDropdown = false

    let element = event.target
    const path = []
    while (element) {
      if (element.classList && element.classList.contains('toggle-dropdown')) {
        keepShowDropdown = true
        break
      }

      path.unshift(element)
      element = element.parentNode
    }

    if (!keepShowDropdown) {
      this.props.onHide()
    }
  }

  outsideFocus (event) {
    let keepShowDropdown = false

    let element = event.target
    const path = []
    while (element) {
      if (this.element === element || (element.classList && element.classList.contains('toggle-dropdown'))) {
        keepShowDropdown = true
        break
      }

      path.unshift(element)
      element = element.parentNode
    }

    if (!keepShowDropdown) {
      this.props.onHide()
    }
  }
}

export default Dropdown
