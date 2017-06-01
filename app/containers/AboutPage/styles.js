import styled from 'styled-components'

export const Table = styled.table`
  width: 100%;

  & th,
  & td {
    text-align: left;
    border: 0;
    padding: 0.5em 1em 0.5em 1em;
    vertical-align: top;
  }

  & td {
    border-top: 2px solid rgba(0, 0, 0, 0.08);
  }

  & tr td:first-child {
    min-width: 11em;
  }
`

export const KeyboardTable = styled(Table)`
  & tr td:first-child kbd {
    margin-left: 0.4em;
  }

  & kbd {
    position: relative;
    font-size: 90%;
    top: -2px;
    font-weight: normal;
    font-style: normal;
    text-align: center;
    line-height: 1em;
    text-shadow: 0 1px 0 #fff;
    display: inline;
    padding: .3em .50em;
    display: inline-block;
    border-radius: 6px;
    background-clip: padding-box;
    border: 1px solid #bbb;
    background-color: #f7f7f7;
    background-image: linear-gradient(top, rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0));
    background-repeat: repeat-x;
    box-shadow: 0px 2px 0 #bbbbbb, 0 3px 1px #999999, 0 3px 0 #bbbbbb, inset 0 1px 1px #ffffff, inset 0 -1px 3px #cccccc;
  }

  & kbd:hover {
    top: 0px;
    box-shadow: 0px 2px 0 #bbbbbb, 0 1px 1px #999999, 0 1px 0 #bbbbbb, inset 0 1px 1px #ffffff, inset 0 -1px 3px #cccccc;
  }
`
