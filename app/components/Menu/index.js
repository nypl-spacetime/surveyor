import React from 'react'

import { Container, MenuContainer, Hamburger, PaneNav, Nav, StyledButton, StyledLink } from './styles'

import iconSinglePane from 'images/icon-single-pane.svg'
import iconTwoPanes from 'images/icon-split-panes.svg'

export default function Menu (props) {
  const aboutSelected = props.path === 'about'
  const introSelected = props.path === 'intro'
  const surveying = !aboutSelected && !introSelected

  return (
    <Container>
      {props.children}
      <MenuContainer>
        <Hamburger>☰</Hamburger>
        <PaneNav>
          <StyledButton selected={surveying && props.paneMode === 'split'} title='Split panes'
            onClick={props.splitPaneClick}><img alt='Switch to split pane mode' src={iconTwoPanes} /></StyledButton>
          <StyledButton selected={surveying && props.paneMode === 'single'} title='Single pane'
            onClick={props.singlePaneClick}><img alt='Switch to single pane mode' src={iconSinglePane} /></StyledButton>
        </PaneNav>
        <Nav>
          <StyledLink selected={introSelected} to='/intro'>Intro</StyledLink>
          <StyledLink selected={aboutSelected} to='/about'>About</StyledLink>
        </Nav>
      </MenuContainer>
    </Container>
  )
}
