import React from 'react'

import { Container, MenuContainer, Hamburger, Nav, StyledLink } from './styles'

export default function Menu (props) {
  const aboutSelected = props.path === 'about'
  const introSelected = props.path === 'intro'
  return (
    <Container>
      {props.children}
      <MenuContainer>
        <Hamburger>☰</Hamburger>
        <Nav>
          <StyledLink selected={introSelected} to='/intro'>Intro</StyledLink>
          <StyledLink selected={aboutSelected} to='/about'>About</StyledLink>
        </Nav>
      </MenuContainer>
    </Container>
  )
}
