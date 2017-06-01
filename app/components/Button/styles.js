/* global __CONFIG__ */

import styled, { css } from 'styled-components'

import { Link } from 'react-router'

const padding = __CONFIG__.cssVariables.padding
const mainColor = __CONFIG__.cssVariables.mainColor
const mobileWidth = __CONFIG__.cssVariables.mobileWidth

import iconReload from 'images/icon-reload.svg'
import iconCross from 'images/icon-cross.svg'
import iconCheck from 'images/icon-check.svg'
import iconSurveyor from 'images/icon-crosshair.svg'

export const themes = {
  default: {
    backgroundColor: 'black',
    cursor: 'pointer'
  },
  disabled: {
    cursor: 'inherit',
    backgroundColor: '#ccc'
  },
  skip: {
    backgroundColor: mainColor,
    image: iconCross
  },
  submit: {
    backgroundColor: '#799a05',
    image: iconCheck
  },
  new: {
    backgroundColor: '#0268ca',
    image: iconReload
  },
  surveyor: {
    backgroundColor: '#799a05',
    image: iconSurveyor
  }
}

const button = css`
  box-sizing: border-box;
  border-radius: 3px;

  padding: 7px 8px;
  line-height: 1rem;

  flex-shrink: 0;
  display: inline-block;
  margin: calc(${padding} / 2);

  color: white;
  & span {
    color: white;
  }

  background-color: ${(props) => props.styles && props.styles.backgroundColor};

  text-decoration: none;

  border-width: 2px;
  border-style: solid;
  border-color: rgba(255, 255, 255, 0.8);
  transition: background-color 0.3s, border-color 0.3s;

  &:active {
    border-color: rgba(255, 255, 255, 1);
  }

  &:hover,
  &:focus {
    border-color: rgba(255, 255, 255, 0);
  }

  & img {
    width: 1.1rem;
    margin-top: -.2rem;
  }

  &:hover img,
  &:focus img {
    transition: transform 0.3s;
    transform: rotate(360deg);
  }

  & span {
    padding-left: 0.6rem;
  }

  @media (max-width: ${mobileWidth}) {
    padding: 0.4rem 0.5rem;

    & span {
      padding-left: 0.4rem;
    }
  }
`

export const StyledButton = styled.button`
  ${button}
`

export const StyledFakeButton = styled.div`
  ${button}
`

export const StyledLink = styled(Link)`
  ${button}
`
