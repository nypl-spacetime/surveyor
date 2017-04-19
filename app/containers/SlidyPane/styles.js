/* global __CONFIG__ */

import styled from 'styled-components'

const resizerWidth = __CONFIG__.cssVariables.resizerWidth

export const Container = styled.div`
  display: flex;
  flex-direction: row;
  flex-grow: 1;
  height: 100%;
`

export const First = styled.div`
  width: 66%;
  display: flex;
  flex-direction: column;
`

export const Second = styled.div`
  width: 34%;
  min-height: 30px;
  flex-grow: 1;
  display: flex;
  flex-direction: row;
  position: relative;

  & > * {
    max-height: 100%;
    overflow: hidden;
    display: flex;
    flex-grow: 1;

    // .horizontal .second > * {
    padding-left: ${resizerWidth};
    flex-direction: column;
    flex-grow: 1;
  }
`

export const Resizer = styled.div`
  flex-shrink: 0;
  width: ${resizerWidth};
  height: 100%;
  background-color: #76777b;
  color: white;
  cursor: col-resize;
  overflow: hidden;
  position: absolute;
  z-index: 10;
  padding-left: 0;
  left: 0;

  opacity: ${props => props.dragging ? 0.5 : 1};
  transition: opacity 0.3s;

  & span {
    color: #dededf;
    display: block;
    font-size: 3rem;
    margin-top: -25px;
    margin-left: -2px;
    position: absolute;
    text-align: center;
    text-shadow: 0 2px black;
    top: 50%;
    width: 100%;
  }

  & span:after {
    content: '⋮';
  }
`

// .vertical .second {
//   flex-direction: column;
// }

// .vertical .second > * {
//   bottom: 0;
//   flex-direction: column;
//   height: 100%;
//   padding-top: 30px;
// }

// .horizontal .second > .resizer, .vertical .second > .resizer {
//   left: 0;
//   padding-left: 0;
//   top: 0;
//   padding-top: 0;
//   flex-grow: 0;
// }

// .vertical .second > .resizer {
//   height: 30px;
// }

// @media only screen and (max-width: $mobileWidth) {
//   .container {
//     flex-direction: column;
//   }

//   .resizer {
//     height: 30px;
//     width: 100%;
//     cursor: row-resize;
//   }

//   .resizer span {
//     top: 0;
//     left: 50%;
//     width: auto;
//     margin-top: -18px;
//     margin-left: -19px;
//   }

//   .resizer span:after {
//     content: '⋯';
//   }
// }
