 /* global __CONFIG__ */

import styled from 'styled-components'
import { Link } from 'react-router'

const headerColor = __CONFIG__.cssVariables.headerColor
const mainColor = __CONFIG__.cssVariables.mainColor

export const StyledMenu = styled.div`
  display: flex;
  align-items: center;
`

export const Nav = styled.nav`
  margin: 0 5px;
  display: flex;

  & a {
    color: ${headerColor};
  }

  & > * {
    display: inline-block;
    padding: 5px 12px 5px 12px;
    border-radius: 3px;
  }

  &:hover > * {
    border-radius: 0;
  }

  &:hover > *:first-child {
    border-radius: 3px 0 0 3px;
  }

  &:hover > *:last-child {
    border-radius: 0 3px 3px 0;
  }
`

export const StyledLink = styled(Link)`
  background-color: ${(props) => props.selected ? mainColor : 'none'};

  transition: background-color 0.2s;

  &:hover {
    background-color: ${mainColor};
  }
`
