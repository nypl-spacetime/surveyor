import React from 'react'
import { connect } from 'react-redux'
import { createSelector } from 'reselect'
import Helmet from 'react-helmet'

import {
  selectItem,
  selectCollections,
  selectAnimals
} from 'containers/App/selectors'

import Table from 'components/Table'
import Page from 'components/Page'
import Footer from 'components/Footer'
import SurveyorButton from 'components/SurveyorButton'

import knightFoundation from 'images/knight-foundation.png'
import bat from 'images/510d47da-9ed9-a3d9-e040-e00a18064a99.large.png'

export class AboutPage extends React.Component {
  render () {
    return (
      <div>
        <Page>
          <Helmet title='About' />
          <h2>About Surveyor</h2>
          <p>
            Surveyor is a geotagging tool designed to enhance the metadata of items
            within <a href='https://digitalcollections.nypl.org/'>NYPL Digital Collections</a>. It allows you to view and place images on a
            map of New York City. With each contribution through Surveyor, users create
            new knowledge about the Library’s collections!
          </p>
          <p>
            As we receive and analyze Surveyor submissions, we’ll build out mechanisms to address quality
            control issues and develop a new map interface to allow for interactive exploration of geotagged items.
            A dataset containing the locations of all geotagged photos and images will be made available for download
            in NYPL’s <a href='http://spacetime.nypl.org/'>NYC Space/Time Directory</a>.
          </p>
          <h3>Collection Resources</h3>
          <p>
            Surveyor currently contains items from the following collections:
          </p>
          <ul>
            {this.props.collections.map((collection) => (
              <li key={collection.uuid}><a href={collection.url}>{collection.title}</a></li>
            ))}
          </ul>
          <h3>Source Code</h3>
          <p>
            Surveyor is open source, and is built using open source libraries and open data.
            It’s easy to adapt Surveyor and use it to geotag your own photo collections.
            See <a href='https://github.com/nypl-spacetime/surveyor'>GitHub</a> for more information.
          </p>
          <h3>“Thank you” Animals</h3>
          <p>
            Every time you geotag an item, an animal “thanks” you. The images of the animals are
            sourced from public domain items within Digital Collections.
          </p>
          <p>
            <img src={bat} alt='Wrinkle-lipped free-tailed bat' style={{width: '50%'}} />
          </p>
          <Table>
            <thead>
              <tr>
                <th scope='col'>Animal</th>
                <th scope='col'>Digital Collections Identifier</th>
              </tr>
            </thead>
            <tbody>
              { this.props.animals.map((animal, index) => (
                <tr key={index}>
                  <td>
                    {animal.name}
                  </td>
                  <td>
                    <a target='_blank' href={`https://digitalcollections.nypl.org/items/${animal.uuid}`}>
                      <code>{animal.uuid}</code>
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
          <h2>Acknowledgements</h2>
          <p>
            Surveyor is part of the <a href='http://spacetime.nypl.org/'>NYC Space/Time
            Directory</a>. The goal of this project is to&mdash;through a
            variety of resources&mdash;unlock the potential of historical maps and provide
            opportunities to explore urban history across space and time.
          </p>
          <p>
            Major support for the NYC Space/Time Directory is provided by
            the <a href='http://www.knightfoundation.org/grants/6715'>Knight News Challenge</a>,
            an initiative of the <a href='http://www.knightfoundation.org/'>John S. and James
            L. Knight Foundation</a>.
          </p>
          <p>
            <img src={knightFoundation} alt='Knight Foundation Logo' style={{width: '50%', opacity: 0.88}} />
          </p>
          <h2>Accessibility</h2>
          <p>
            Surveyor allows users to geotag items within <a href='https://digitalcollections.nypl.org/'>NYPL Digital Collections</a> associated
            with varying levels of descriptive text and metadata. Portions of the Surveyor experience are
            inherently visual, anticipating that users will geotag items based largely on the appearance
            of landscapes or landmarks within images.
          </p>
          <p>
            Tools such as Surveyor enrich our metadata and allow us to use it in different ways to improve
            accessibility. As a result, we are increasingly able to provide better experiences with our
            collections for all users—regardless of their abilities.
          </p>
          <p>
            If you encounter any accessibility shortfalls when using Surveyor, or would like to provide other
            feedback, please email <a href='mailto:spacetime@nypl.org'>spacetime@nypl.org</a> or
            call <a href='tel:9172756975'>917-275-6975</a> (TTY <a href='tel:2129300020'>212-930-0020</a>).
          </p>
          <p>
            To learn more about the accessibility of NYPL websites and mobile applications, see
            our <a href='https://www.nypl.org/policies/web-mobile-accessibility'>Web & Mobile Accessibility Policy</a>.
          </p>
          <SurveyorButton id={this.props.item.id} />
        </Page>
        <Footer />
      </div>
    )
  }
}

export default connect(createSelector(
  selectItem(),
  selectCollections(),
  selectAnimals(),
  (item, collections, animals) => ({
    item, collections, animals
  })
))(AboutPage)
