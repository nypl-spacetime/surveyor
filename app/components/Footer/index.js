import React from 'react'

import Page from 'components/Page'

import { StyledFooter, Logo } from './styles'

import nypl from 'images/nypl.svg'

function Footer (props) {
  return (
    <StyledFooter>
      <nav>
        <a href='http://www.nypl.org/help/about-nypl/legal-notices/privacy-policy' target='_blank'>
          Privacy Policy
        </a>
        <a href='http://www.nypl.org/help/about-nypl/legal-notices/rules-and-regulations' target='_blank'>
          Rules and Regulations
        </a>
        <a href='http://www.nypl.org/policy-patron-generated-web-content' target='_blank'>
          Policy on Patron-Generated Web Content
        </a>
        <a href='http://www.nypl.org/help/about-nypl/legal-notices/website-terms-and-conditions' target='_blank'>
          Terms and Conditions
        </a>
      </nav>
      <Page>
        <p>
          A <a href='http://spacetime.nypl.org/'>NYC Space/Time Directory</a> project
        </p>
        <p>
          © The New York Public Library, Astor, Lenox and Tilden Foundations 2013–2017
        </p>
        <p>
          <Logo src={nypl} alt='The New York Public Library' />
        </p>
      </Page>
    </StyledFooter>
  )
}

export default Footer
