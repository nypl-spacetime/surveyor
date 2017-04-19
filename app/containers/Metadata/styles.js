/* global __CONFIG__ */

import styled from 'styled-components'

const padding = __CONFIG__.cssVariables.padding

export const Container = styled.div`
  box-sizing: border-box;
  overflow: auto;
  font-size: 1rem;
  padding: ${padding};
`

export const Title = styled.h1`
  font-size: 2em;
  font-weight: lighter;
  margin-top: 0;
  margin-bottom: ${padding};
  min-height: 1em;
  line-height: 1.1em;

  overflow: hidden;
  display: block;

  &.longTitle {
    font-size: 20px;
  }
`

// @media only screen and (max-width: $mobileWidth) {
//   .title {
//     font-size: 20px;
//   }
// }
