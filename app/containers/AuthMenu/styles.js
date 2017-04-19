/* global __CONFIG__ */

import styled, { keyframes } from 'styled-components'

const mainColor = __CONFIG__.cssVariables.mainColor

const slide = keyframes`
  0% {
    transform: translateY(-4px); }
  100% {
    transform: translateY(0); }
`

export const StyledMenu = styled.ul`
  box-shadow: 0 0 50px rgba(0, 0, 0, 0.5);
  position: absolute;
  list-style-type: none;
  display: block;
  border-radius: 5px;

  margin-top: 10px;
  padding: 0;

  animation: ${slide} 0.1s forwards;

  background: white;
  border: 1px solid black;

  z-index: 9999;

  &:after, &:before {
    bottom: 100%;
    left: 50%;
    border: solid transparent;
    content: ' ';
    height: 0;
    width: 0;
    position: absolute;
    pointer-events: none;
  }

  &:after {
    border-color: rgba(136, 183, 213, 0);
    border-bottom-color: white;
    border-width: 14px;
    margin-left: -14px;
  }

  &:before {
    border-color: rgba(194, 225, 245, 0);
    border-bottom-color: black;
    border-width: 15px;
    margin-left: -15px;
  }
`

export const StyledMenuItem = styled.li`
  padding: 10px;
  border-radius: 5px;

  &:hover {
    background-color: ${mainColor};

  }

  &:hover a {
    color: white;
  }
`
