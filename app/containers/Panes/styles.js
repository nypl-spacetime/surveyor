/* global __CONFIG__ */

import styled from 'styled-components'

const mobileWidth = __CONFIG__.cssVariables.mobileWidth

const duration = '0.3s'
const visibleTransition = `width ${duration}, left ${duration}, visibility 0.0s 0.0s;`
const hiddenTransition = `width ${duration}, left ${duration}, visibility ${duration} ${duration};`

export const Container = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
`

export const Pane = styled.div`
  top: 0;
  height: 100%;
  position: absolute;

  box-sizing: border-box;

  width: ${(props) => props.paneMode === 'single' ? '100%' : props.paneWidth + '%'};
  left: ${(props) => props.paneMode === 'single' ? (props.index - props.currentPaneIndex) * 100 + '%' : props.index * props.paneWidth + '%'};

  visibility: ${(props) => (props.paneMode === 'single' && props.index !== props.currentPaneIndex) ? 'hidden' : 'visible'};
  transition: ${(props) => (props.paneMode === 'single' && props.index !== props.currentPaneIndex) ? hiddenTransition : visibleTransition};

  @media (max-width: ${mobileWidth}) {
    width: 100%;
    visibility: ${(props) => props.index === props.currentPaneIndex ? 'visible' : 'hidden'};
    left: ${(props) => (props.index - props.currentPaneIndex) * 100 + '%'};
  }
`
