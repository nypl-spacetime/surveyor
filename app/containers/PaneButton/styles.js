/* global __CONFIG__ */

import styled from 'styled-components'

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
