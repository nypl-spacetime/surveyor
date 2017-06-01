/* global __CONFIG__ */

import styled from 'styled-components'

const padding = __CONFIG__.cssVariables.padding
const mobileWidth = __CONFIG__.cssVariables.mobileWidth

export const Container = styled.div`
  flex-shrink: 0;

  & > * {
    display: ${(props) => props.paneMode === 'single' ? 'inline-block' : 'none'};
  }

  @media (max-width: ${mobileWidth}) {
    & > * {
      display: inline-block;
    }
  }
`

export const Button = styled.button`
  position: absolute;
  bottom: 0;
  margin: ${padding};

  width: 150px;
  height: 100px;

  border-radius: 3px;
  background-position: center;
  background-size: cover;

  box-sizing: border-box;
  border-width: 2px;
  border-style: solid;
  border-color: rgba(255, 255, 255, 0.8);
  transition: background-color 0.3s, border-color 0.3s;

  &:active {
    border-color: rgba(255, 255, 255, 1);
  }

  &:hover {
    border-color: rgba(255, 255, 255, 0);
  }

  @media (max-width: ${mobileWidth}) {
    width: 105px;
    height: 70px;
  }
`
