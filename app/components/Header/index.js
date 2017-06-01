import React from 'react'
import { Link } from 'react-router'

import { StyledHeader, Logo, Subtitles } from './styles'

import nypl from 'images/nypl-white.svg'

export default function Header (props) {
  return (
    <StyledHeader className='align-center'>
      <div className='align-center'>
        <Logo style={{backgroundImage: `url(${nypl})`}} href='//nypl.org' target='_blank'>
          <span>The New York Public Library</span>
        </Logo>
        <Subtitles>
          <div>
            <a href='http://nypl.org/' target='_blank'>The New York Public Library</a>
          </div>
          <div>
            <a href='http://spacetime.nypl.org/' target='_blank'>NYC Space/Time Directory</a>
          </div>
        </Subtitles>
        <h1>
          <Link to={props.homepageLink}>
            Surveyor
          </Link>
        </h1>
      </div>
      <div>
        {props.children}
      </div>
    </StyledHeader>
  )
}
