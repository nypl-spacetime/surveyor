/* global __CONFIG__ */

import styled from 'styled-components'

import Table from 'components/Table'

const colors = __CONFIG__.cssVariables.colors
const pageBackground = __CONFIG__.cssVariables.pageBackground

export const Images = styled.div`
  background-size: contain;
  width: 100%;

  & svg {
    width: 100%;
  }

  & svg rect {
    fill: white;
    fill-opacity: 0;
    stroke: ${colors.red};
    stroke-opacity: 0.5;
    stroke-width: 6;
    stroke-miterlimit: 10;
    cursor: pointer;
  }

  & svg rect.selected,
  & svg rect:hover {
    stroke-opacity: 1;
  }
`

export const ComponentTable = styled(Table)`
  & tr td:first-child {
    border-left-width: 6px;
    border-left-style: solid;
    border-left-color: ${pageBackground};
  }

  & tr.selected td:first-child {
    border-left-color: ${colors.red};
  }
`
