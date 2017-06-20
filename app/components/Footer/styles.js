/* global __CONFIG__ */

import styled from 'styled-components'

const padding = __CONFIG__.cssVariables.padding
const mobileWidth = __CONFIG__.cssVariables.mobileWidth
const headerColor = __CONFIG__.cssVariables.headerColor
const headerBackground = __CONFIG__.cssVariables.headerBackground

export const StyledFooter = styled.footer`
  width: 100%;
  align-items: center;
  display: flex;
  flex-direction: column;
  margin-top: 1em;
  margin-bottom: 1em;
  // font-size: 0.8rem;

  & nav {
    width: 100%;
    background-color: ${headerBackground};
    display: flex;
    flex-direction: row;
    justify-content: center;
    padding-top: ${padding};
    padding-bottom: ${padding};
    text-align: center;
  }

  & nav,
  & nav a,
  & nav a:visited {
    color: ${headerColor};
    margin: 0 .5em;
  }

  & nav a:hover {
    text-decoration: underline;
  }

  & p {
    text-align: center;
    width: 100%;
    margin: 0;
    margin-bottom: 1rem;
  }

  @media (max-width: ${mobileWidth}) {
    & nav {
      flex-direction: column;
    }
  }
`

export const Logo = styled.img`
  margin: 0 auto;
  width: 55px;
`
