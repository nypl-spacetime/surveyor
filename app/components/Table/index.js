import React from 'react'
import styled from 'styled-components'

const StyledTable = styled.table`
  width: 100%;

  & tr th,
  & tr td {
    text-align: left;
    border: 0;
    padding: 0.5em;
    vertical-align: top;
  }

  & tr td {
    border-top: 2px solid rgba(0, 0, 0, 0.08);
  }
`

function Table (props) {
  return (
    <StyledTable {...props}>
      {props.children}
    </StyledTable>
  )
}

export default Table
