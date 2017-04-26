 /* global __CONFIG__ */

import styled from 'styled-components'

const mobileWidth = __CONFIG__.cssVariables.mobileWidth
const headerHeight = __CONFIG__.cssVariables.headerHeight
const headerBackground = __CONFIG__.cssVariables.headerBackground
const headerColor = __CONFIG__.cssVariables.headerColor
const mainColor = __CONFIG__.cssVariables.mainColor

export const StyledHeader = styled.header`
  background-color: ${headerBackground};
  color: ${headerColor};
  line-height: 1;
  overflow: hidden;
  padding: 5px;
  height: ${headerHeight};

  &,
  & a,
  & a:visited {
    text-decoration: none;
  }

  & h1 {
    margin: 0;
    display: inline-block;
    font-weight: lighter;
    font-size: 40px;
    line-height: 1;
  }

  & h1 a {
    color: ${mainColor};
  }

  @media (max-width: ${mobileWidth}) {
    & > * {
      margin: 0 5px;
    }

    & h1 {
      font-size: 2rem;
    }
  }

  @media (max-width: 500px) {
    & h1 {
      font-size: 1rem;
    }
  }
`

export const Logo = styled.a`
  width: 43px;
  height: 43px;
  background-size: contain;
  background-position: center;
  margin-right: 5px;

  & > span {
    border: 0;
    clip: rect(0 0 0 0);
    margin: -1px;
    padding: 0;
    position: absolute;

    position: absolute;
    left: -10000px;
    top: auto;
    width: 1px;
    height: 1px;
    overflow: hidden;
  }
`

export const Subtitles = styled.div`
  display: flex;
  flex-direction: column;
  margin-right: .7em;
  padding-right: .7em;
  border-right: 1px solid ${headerColor};

  & a {
    color: ${headerColor};
  }

  & > * {
    font-size: 17px;
    line-height: 1.2em;
  }

  & div:first-child {
    font-weight: normal;
  }

  & div:last-child {
    font-weight: 200;
  }

  @media (max-width: ${mobileWidth}) {
    & {
      display: none;
    }
  }
`
