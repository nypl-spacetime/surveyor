import React from 'react'
import { connect } from 'react-redux'
import { createSelector } from 'reselect'
import Helmet from 'react-helmet'

import {
  selectItem,
  selectCollections,
  selectAnimals
} from 'containers/App/selectors'

import Page from 'components/Page'
import Footer from 'components/Footer'
import SurveyorButton from 'components/SurveyorButton'
import DigitalCollectionsImage from 'components/DigitalCollectionsImage'
import GetStarted from 'containers/GetStarted'

import { KeyboardTable } from './styles'

export class HelpPage extends React.Component {
  render () {
    return (
      <div>
        <Page>
          <Helmet title='Help' />
          <h2>Get Started</h2>
          <p>
            Help <a href='https://nypl.org/'>The New York Public Library</a> put New York City’s history on the map!
          </p>
          <GetStarted />
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
                  distance. In camera mode, you can use the <kbd>Tab</kbd> key to switch focus between the map and the camera, target and angle markers on the map.
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
                  <kbd aria-label='M key'>M</kbd>
                </td>
                <td>
                  Toggle metadata display (clicking or tapping the image will also toggle displaying the metadata).
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
))(HelpPage)
