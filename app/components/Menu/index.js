import React from 'react'

import { StyledMenu, Nav, StyledLink } from './styles'

export default function Menu (props) {
  const aboutSelected = props.path === 'about'
  const introSelected = props.path === 'intro'
  const surveySelected = !introSelected && !aboutSelected
  return (
    <StyledMenu>
      {props.children}
      <Nav>
        <StyledLink selected={surveySelected} to='/'>Survey!</StyledLink>
        <StyledLink selected={introSelected} to='/intro'>Intro</StyledLink>
        <StyledLink selected={aboutSelected} to='/about'>About</StyledLink>
      </Nav>
    </StyledMenu>
  )
}
