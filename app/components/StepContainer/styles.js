import styled from 'styled-components'

export const Container = styled.div`
  width: 100%;
  height: 100%;
  flex-grow: 2;
  flex-basis: 70%;
  min-height: 300px;

  background-color: #fff;

  display: flex;
  flex-direction: column;


  & > * {
    flex: 1;
  }

  & > *:last-child {
    flex: 0 0 auto;
  }
`
