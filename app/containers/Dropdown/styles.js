/* global __CONFIG__ */

import styled from 'styled-components'

const padding = __CONFIG__.cssVariables.padding
const headerHeight = __CONFIG__.cssVariables.headerHeight

export const Container = styled.ul`
  position: absolute;
  left: 0;
  top: ${headerHeight};
  width: 100%;
  margin: 0;
  padding: ${padding};
  box-sizing: border-box;
  list-style-type: none;

  background-color: #444;
  box-shadow: 0 2px 15px rgba(0, 0, 0, 0.4);

  z-index: 9999;

  display: flex;
  flex-direction: column;
  align-items: flex-end;

  &.dropdown-enter {
    opacity: 0;
  }

  &.dropdown-enter.dropdown-enter-active {
    opacity: 1;
    transition: opacity 100ms ease-in;
  }

  &.dropdown-leave {
    opacity: 1;
  }

  &.dropdown-leave.dropdown-leave-active {
    opacity: 0;
    transition: opacity 100ms ease-in;
  }

  & a {
    color: white;
  }
`
