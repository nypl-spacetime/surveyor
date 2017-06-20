import React from 'react'
import { connect } from 'react-redux'
import { createSelector } from 'reselect'
import Helmet from 'react-helmet'

import {
  selectItem,
  selectCollections,
  selectAnimals
} from 'containers/App/selectors'

import Button from 'components/Button'
import Page from 'components/Page'
import Footer from 'components/Footer'
import SurveyorButton from 'components/SurveyorButton'
import DigitalCollectionsImage from 'components/DigitalCollectionsImage'

import { Table, KeyboardTable } from './styles'

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
            Help <a href='https://nypl.org/'>The New York Public Library</a> put New York City’s history on the map!
          </p>
          <p>
            Surveyor is a geotagging tool designed to enhance the metadata of items within <a href='https://digitalcollections.nypl.org/'>NYPL
            Digital Collections</a>. It allows you to view and place images on a map of New York City.
            With each contribution through Surveyor, users add new knowledge to the Library's collections!
          </p>
          <p>
            As we receive and analyze Surveyor submissions, we’ll build out mechanisms to address quality
            control issues and develop a new map interface to allow for interactive exploration of geotagged items.
            Moreover, a dataset containing the locations of these items will be made available for download
            in NYPL's <a href='http://spacetime.nypl.org/'>NYC Space/Time Directory</a>.
          </p>
          <h3>Collection Resources</h3>
          <ul>
            {this.props.collections.map((collection) => (
              <li key={collection.uuid}><a href={collection.url}>{collection.title}</a></li>
            ))}
          </ul>
          <SurveyorButton id={this.props.item.id} />

          <h2>
            How-To
          </h2>
          <h3>
            Get Started
          </h3>
          <p>
            Use visual clues, as well as information within each item’s metadata, to place images on the map.
            If you encounter an image containing multiple places or landmarks, geotag the image based on its most
            prominent subject. If an image doesn’t clearly indicate a location, skip it.
          </p>
          <Table>
            <thead>
              <tr>
                <th scope='col'>Button</th>
                <th scope='col'>Description</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <Button fake type='new'>New</Button>
                </td>
                <td>
                  Try a different image. (You might see the current image again.)
                </td>
              </tr>
              <tr>
                <td>
                  <Button fake type='skip'>Skip</Button>
                </td>
                <td>
                  You can skip images that are too difficult to geotag, or images that do not show a clear location. <strong>You will never be presented this image again</strong>.

                  Skip the image. (You won’t see the current image again.)
                </td>
              </tr>
              <tr>
                <td>
                  <Button fake type='submit'>Submit</Button>
                </td>
                <td>
                  If you've found the correct location on the map, click Submit to send this location to the NYPL.
                </td>
              </tr>
            </tbody>
          </Table>
          <SurveyorButton id={this.props.item.id} />
          <h3>Keyboard Navigation</h3>
          <KeyboardTable>
            <thead>
              <tr>
                <th scope='col'>Key</th>
                <th scope='col'>Action</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <kbd aria-label='left key'>←</kbd>
                  <kbd aria-label='up key'>↑</kbd>
                  <kbd aria-label='right key'>→</kbd>
                  <kbd aria-label='down key'>↓</kbd>
                </td>
                <td>
                  Move the map, camera or target east, north, west and south &mdash; hold <kbd>Shift</kbd> for a larger
                  distance. Use <kbd>Tab</kbd> to switch focus between tha map, camera and target.
                </td>
              </tr>
              <tr>
                <td>
                  <kbd aria-label='plus key'>+</kbd>
                  <kbd aria-label='minus key'>-</kbd>
                </td>
                <td>
                  Zoom map in and out
                </td>
              </tr>
              <tr>
                <td>
                  <kbd aria-label='1 key'>1</kbd>
                  <kbd aria-label='2 key'>2</kbd>
                </td>
                <td>
                  Switch between single pane mode and split pane mode
                </td>
              </tr>
              <tr>
                <td>
                  <kbd aria-label='left bracket key'>[</kbd>
                  <kbd aria-label='right bracket key'>]</kbd>
                </td>
                <td>
                  Switch between photo or map pane (only when in single pane mode)
                </td>
              </tr>
              <tr>
                <td>
                  <kbd aria-label='L key'>L</kbd>
                </td>
                <td>
                  Lights out — toggle metadata display. Clicking or tapping the image will also toggle displaying the metadata.
                </td>
              </tr>
            </tbody>
          </KeyboardTable>

          <h2>Frequently Asked Questions</h2>

          <h3>How should I deal with panoramic images?</h3>
          <p>
            Some items will be panoramic in nature, depicting a wide view.
          </p>
          <DigitalCollectionsImage uuid='510d47d9-7aba-a3d9-e040-e00a18064a99'
            imageId='53913' title='The south prospect of the city of New York, in North America' />
          <p>
            When locating such an item on the map, place the map marker in the middle of the image’s view.
            Once you’ve submitted the geotag, you can take the optional step of marking the full width of the image to more accurately represent it.
          </p>

          <h3>How should I handle historic addresses?</h3>
          <p>
            As NYC history buffs know, street addresses aren’t static through time—names and numbers
            have changed through the years. When geotagging items, place them on the map based on
            their physical location rather than their street address.
          </p>
          <h3>How should I geotag an image of something that no longer exists?</h3>
          <p>
            Place the image on the map based on where the building or landmark once existed.
            For instance, this lantern slide of the Crystal Palace should be pinned to the
            area which is now Bryant Park.
          </p>
          <DigitalCollectionsImage uuid='510d47da-ea3d-a3d9-e040-e00a18064a99'
            imageId='465509' title='Crystal Palace, ca. 1853, from an engraving' />

          <h3>What if I need a higher resolution image?</h3>
          <p>
            If the resolution of an image makes it difficult to interpret, look for a higher
            resolution version of it in Digital Collections. Each item in Surveyor has a link to its
            Digital Collections page.
          </p>

          <h3>Where do the “thank you” animals come from?</h3>
          <p>
            Every time you geotag an item, an animal “thanks” you. The images of the animals are sourced from public domain items within Digital Collections.
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

          <h2>GitHub</h2>
          <p>
            Surveyor is open source, and is built using open source libraries and open data.
            It's easy to adapt Surveyor and use it to geotag your own photo collections.
            See <a href='https://github.com/nypl-spacetime/surveyor'>GitHub</a> for more information.
          </p>

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
