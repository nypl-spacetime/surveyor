/* global __CONFIG__ */

import styled from 'styled-components'

const padding = __CONFIG__.cssVariables.padding
const headerColor = __CONFIG__.cssVariables.headerColor
const mobileWidth = __CONFIG__.cssVariables.mobileWidth

export const Container = styled.div`
  position: relative;

  & > * {
    position: absolute;
    top: 0;
    transition: opacity 0.5s;

    box-sizing: border-box;
    padding: ${padding};
    width: 80%;

    @media (max-width: ${mobileWidth}) {
      width: 100%;
    }
  }

  & > div > div > * {
    display: inline;
    box-decoration-break: clone;
    -webkit-box-decoration-break: clone;

    padding: 7px 11px;
    line-height: 2em;

    background-color: rgba(30, 30, 30, 0.9);
    color: ${headerColor};
  }

  & a {
    color: ${headerColor};
  }
`

export const Toggle = styled.div`
  opacity: ${(props) => props.show ? 1 : 0};
`

export const Title = styled.h2`
  font-size: ${(props) => props.long ? '1.2rem' : '2rem'};
  font-weight: lighter;
  margin: 0;

  min-height: 1em;

  line-height: 1.6em !important;

  @media (max-width: ${mobileWidth}) {
    font-size: 1.2rem;
  }
`

export const Field = styled.span`
  & img {
    width: 1.1rem;
    margin-right: 2px;
  }
`
