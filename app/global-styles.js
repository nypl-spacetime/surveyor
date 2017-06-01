/* global __CONFIG__ */

import { injectGlobal } from 'styled-components'

const pageColor = __CONFIG__.cssVariables.pageColor
const outlineColor = __CONFIG__.cssVariables.outlineColor
const mobileWidth = __CONFIG__.cssVariables.mobileWidth
const padding = __CONFIG__.cssVariables.padding

injectGlobal`
  :root {
    overflow-y: auto;
  }

  html,
  body {
    height: 100%;
    width: 100%;
  }

  body {
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
    font-size: 16px;
    line-height: 1.65;
  }

  #app {
    min-height: 100%;
    min-width: 100%;
    height: 100%;
  }

  // ::selection {
  //   background: ${outlineColor};
  // }

  // :focus {
  //   outline: 2px solid ${outlineColor};
  //   outline: auto -webkit-focus-ring-color;
  //   outline-color: ${outlineColor};
  // }

  /* Typography
  –––––––––––––––––––––––––––––––––––––––––––––––––– */
  h1, h2, h3, h4, h5, h6 {
    word-break: break-word;
    margin-top: 0;
    margin-bottom: 2rem;
    font-weight: 300; }
  h1 { font-size: 2.4rem; line-height: 1.35; /*letter-spacing: -.08rem;*/ }
  h2 { font-size: 1.8rem; line-height: 1.5;  /*letter-spacing: -.05rem;*/ }
  h3 { font-size: 1.5rem; line-height: 1.6;  /*letter-spacing: 0;*/ }

  /* Larger than phablet */
  @media (min-width: 550px) {
    h1 { font-size: 3.0rem; }
    h2 { font-size: 2.4rem; }
    h3 { font-size: 1.5rem; }
  }

  p {
    margin-top: 0;
  }

  p, table {
    margin-bottom: 1rem;
  }

  body, a, a:visited {
    color: ${pageColor};
  }

  /* Centering & Padding
  –––––––––––––––––––––––––––––––––––––––––––––––––– */

  .sidebar-padding {
    padding: ${padding};
  }

  .centered {
    text-align: centger;
  }

  .align-center {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  /* Screen Reader
  –––––––––––––––––––––––––––––––––––––––––––––––––– */

  .only-screen-reader {
    position: absolute;
    left: -10000px;
    top: auto;
    width: 1px;
    height: 1px;
    overflow: hidden;
  }

  /* Leaflet
  –––––––––––––––––––––––––––––––––––––––––––––––––– */

  .leaflet-container {
    background: none;
  }

  /* Crosshair
  –––––––––––––––––––––––––––––––––––––––––––––––––– */

  .crosshair {
    width: 100px;
    height: 100px;
  }

  .crosshair-shadow {
    position: absolute;
    top: 42px;
    animation: animation-grow 0.4s forwards ease-out;
  }

  .crosshair-here {
    position: absolute;
    bottom: 50px;
    animation: animation-bounce 0.4s forwards ease-out;
  }

  @keyframes animation-bounce {
    0% {
      transform: translateY(-600px); }
    20%, 100% {
      transform: translateY(0); }
    60% {
      transform: translateY(-30px); }
  }

  @keyframes animation-grow {
    0% {
      transform: scale(0); }
    20%, 100% {
      transform: scale(1); }
    60% {
      transform: scale(0.5); }
  }

  /* Mobile classes
  –––––––––––––––––––––––––––––––––––––––––––––––––– */

  @media (max-width: ${mobileWidth}) {
    .hide-on-mobile {
      display: none;
    }
  }

  @media (min-width: ${mobileWidth}) {
    .show-on-mobile {
      display: none;
    }
  }
`
