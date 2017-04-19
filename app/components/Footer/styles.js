/* global __CONFIG__ */

import styled from 'styled-components'

const mobileWidth = __CONFIG__.cssVariables.mobileWidth
const mapColor = __CONFIG__.cssVariables.mapColor

export const StyledFooter = styled.footer`
  width: 100%;
  align-items: center;
  display: flex;
  flex-direction: column;
  margin-top: 1em;
  margin-bottom: 1em;
  font-size: 0.8rem;

  & nav {
    width: 100%;
    background-color: ${mapColor};
    display: flex;
    flex-direction: row;
    justify-content: center;
    padding-top: 12px;
    padding-bottom: 10px;
    text-align: center;
  }

  & nav a,
  & nav a:visited {
    margin: 0 .5em;
  }

  & nav a:hover {
    text-decoration: underline;
  }

  & img {
    margin: 0 auto;
    width: 55px;
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
