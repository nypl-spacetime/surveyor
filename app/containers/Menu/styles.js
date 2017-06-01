 /* global __CONFIG__ */

import styled, { css } from 'styled-components'
import { Link } from 'react-router'

const headerHeight = __CONFIG__.cssVariables.headerHeight
const headerColor = __CONFIG__.cssVariables.headerColor
const mainColor = __CONFIG__.cssVariables.mainColor
const mobileWidth = __CONFIG__.cssVariables.mobileWidth
const hamburgerWidth = headerHeight
const borderRadius = '3px'

export const Container = styled.div`
  display: flex;
  align-items: center;
`

export const Hamburger = styled.button`
  font-size: calc(${hamburgerWidth} - 2 * 10px);
  display: none;

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
  display: inline-block;
  padding: 5px 12px 5px 12px;
  border-radius: ${borderRadius};
  background-color: ${(props) => props.selected ? mainColor : 'none'};
  transition: background-color 0.2s;

  &:hover {
    background-color: ${mainColor};
  }

  & > img {
    width: 17px;
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
