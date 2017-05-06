/* global __CONFIG__ */

import styled from 'styled-components'

const mobileWidth = __CONFIG__.cssVariables.mobileWidth

export const Container = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
  overflow: hidden;
`

export const Pane = styled.div`
  top: 0;
  height: 100%;
  position: absolute;
  transition: width 0.3s, left 0.3s;

  box-sizing: border-box;

  border-color: #bbb;
  border-width: 3px;

  &:first-child {
    border-right-style: solid;
  }

  &:last-child {
    border-left-style: solid;
  }

  width: ${(props) => props.paneMode === 'single' ? '100%' : props.paneWidth + '%'};
  left: ${(props) => props.paneMode === 'single' ? (props.index - props.currentPaneIndex) * 100 + '%' : props.index * props.paneWidth + '%'};

  @media (max-width: ${mobileWidth}) {
    width: 100%;
    left: ${(props) => (props.index - props.currentPaneIndex) * 100 + '%'};
  }
`
