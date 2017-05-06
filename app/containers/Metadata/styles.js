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
  }
`

export const MetadataToggle = styled.div`
  color: white;
  opacity: ${(props) => props.show ? 1 : 0};
`

export const MetadataContainer = styled.div`
  box-sizing: border-box;
  padding: ${padding};
  width: 80%;

  opacity: ${(props) => props.show ? 1 : 0};

  @media (max-width: ${mobileWidth}) {
    width: 100%;
  }

  & > div > * {
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

export const Title = styled.h2`
  font-size: 2rem;
  font-weight: lighter;
  margin: 0;

  min-height: 1em;

  line-height: 1.6em !important;

  &.longTitle {
    font-size: 20px;
  }

  @media (max-width: ${mobileWidth}) {
    font-size: 1.2rem;
  }
`

export const Field = styled.span`
  & img {
    width: 17px;
  }
`
