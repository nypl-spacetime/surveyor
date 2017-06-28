 /* global __CONFIG__ */

import styled, { css } from 'styled-components'
import { Link } from 'react-router'

const headerColor = __CONFIG__.cssVariables.headerColor
const colors = __CONFIG__.cssVariables.colors
const mobileWidth = __CONFIG__.cssVariables.mobileWidth
const borderRadius = '3px'
const menuButtonImageSize = '17px'

export const Container = styled.div`
  display: flex;
  align-items: center;
`

export const Hamburger = styled.button`
  display: none;

  & img {
    width: ${menuButtonImageSize};
    height: ${menuButtonImageSize};
  }

  @media (max-width: ${mobileWidth}) {
    display: block;
  }
`

export const Nav = styled.nav`
  display: flex;
  align-items: center;

  &:hover > * {
    border-radius: 0;
  }

  &:hover > *:first-child {
    border-radius: ${borderRadius} 0 0 ${borderRadius};
  }

  &:hover > *:last-child {
    border-radius: 0 ${borderRadius} ${borderRadius} 0;
  }

  @media (max-width: ${mobileWidth}) {
    display: none;
  }
`

const MenuItem = css`
  text-align: right;
  line-height: 1.5em;
  display: inline-block;
  padding: 5px 12px 5px 12px;
  border-radius: ${borderRadius};
  background-color: ${(props) => props.selected ? colors.red : 'none'};
  transition: background-color 0.2s;

  &:hover {
    background-color: ${colors.red};
  }

  & > img {
    width: ${menuButtonImageSize};
    height: ${menuButtonImageSize};
  }
`

export const StyledButton = styled.button`
  ${MenuItem}
`

export const StyledA = styled.a`
  ${MenuItem}
`

export const StyledLink = styled(Link)`
  ${MenuItem}
  color: ${headerColor} !important;
`

export const DropDownItem = styled.li`
  margin-bottom: 10px;

  &:last-child {
    margin-bottom: 0;
  }
`
