import React from 'react'

import { StyledButton, StyledLink } from './styles'

function Button (props) {
  const type = props.disabled ? 'disabled' : props.type

  if (props.to) {
    let to
    if (!props.disabled) {
      to = props.to
    }

    return (
      <StyledLink tabIndex='0' to={to}
        disabled={props.disabled} type={type}>
        {props.children}
      </StyledLink>
    )
  } else if (props.onClick) {
    let onClick
    if (!props.disabled) {
      onClick = props.onClick
    }

    return (
      <StyledButton tabIndex='0' onClick={onClick}
        disabled={props.disabled} type={type}>
        {props.children}
      </StyledButton>
    )
  }
}

export default Button
