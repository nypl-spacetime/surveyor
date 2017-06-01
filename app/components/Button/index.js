import React from 'react'

import { themes, StyledButton, StyledLink, StyledFakeButton } from './styles'

function Button (props) {
  const theme = Object.assign({}, themes.default, themes[props.type], props.disabled ? themes.disabled : null)

  let onClick
  let tabIndex = -1
  if (!props.disabled) {
    onClick = props.onClick
    tabIndex = 0
  }

  let image
  if (theme.image) {
    image = <img src={theme.image} />
  }

  let contents = (
    <div>
      {image}
      <span>
        {props.children}
      </span>
    </div>
  )

  const style = {
    backgroundColor: theme.backgroundColor,
    cursor: theme.cursor
  }

  if (props.to) {
    return (
      <StyledLink tabIndex={tabIndex} to={props.to}
        style={style}>
        {contents}
      </StyledLink>
    )
  } else if (props.fake) {
    return (
      <StyledFakeButton style={style}>
        {contents}
      </StyledFakeButton>
    )
  } else {
    return (
      <StyledButton tabIndex={tabIndex} onClick={onClick}
        style={style}>
        {contents}
      </StyledButton>
    )
  }
}

export default Button
