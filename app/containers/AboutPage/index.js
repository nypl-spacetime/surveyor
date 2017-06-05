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
            Welcome! Through mobile apps, online maps, and serendipity, we discover new things in our
            geography everyday. At NYPL, we're inviting you to discover our collections through the
            lens of geography and, in the process, allow others to discover geographically as well!
            How? NYPL Surveyor is an experiment in geotagging NYPL's Digital Collections. We've built
            an interactive interface for viewing and locating items from our rich collections. With
            each contribution, you're creating new knowledge around the Library's collections. We’ve
            selected the following collections to start:
          </p>
          <ul>
            {this.props.collections.map((collection) => (
              <li key={collection.uuid}><a href={collection.url}>{collection.title}</a></li>
            ))}
          </ul>
          <p>
            After we analyze the initial wave of submissions, we will build out quality control mechanisms
            and a map interface for discovering the geotagged collections.
          </p>
          <p>
            NYPL Surveyor is project in the <a href='http://spacetime.nypl.org/'>NYC Space/Time Directory</a>,
            a major civic initiative aimed at turning historical maps and other geographic sources into
            a digital time-travel service for New York City. <a href='http://pages.email.nypl.org/spacetimeupdates/'>
            Sign up for our mailing list</a> to receive updates about the NYC Space/Time Directory.
          </p>
          <SurveyorButton id={this.props.item.id} />

          <h2>
            Introduction
          </h2>
          <p>
            Help The New York Public Library put New York City's history on the map!
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
                  Want to try a different image?
                </td>
              </tr>
              <tr>
                <td>
                  <Button fake type='skip'>Skip</Button>
                </td>
                <td>
                  You can skip images that are too difficult to geotag, or images that do not show a clear location. <strong>You will never be presented this image again</strong>.
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

          <p>
            You'll be presented with an item from the Library's digitized collections, use clues
            in the item's metadata and the image itself to locate on a map of New York City. Some
            you might recognize instantly while others can require a bit of investigation. Visit
            the item in our <a href='https://digitalcollections.nypl.org/'>Digital Collections</a> for
            more clues and to view the image in high resolution. Use outside resources
            like <a href='https://www.wikipedia.org/'>Wikipedia</a> and <a href='https://www.google.com/maps/@40.7520018,-73.9834879,15.5z'>Google Maps</a> to scout out the location.
          </p>
          <p><strong>TODO: Instruct people to geotag most prominent subject.</strong></p>
          <p>
            Click submit once you've identified the item's location and you'll have the optional
            step of marking the direction and angle of the view. Not sure about the location or
            want a different challenge? It's always okay to skip!
          </p>
          <SurveyorButton id={this.props.item.id} />

          <h2>Rules &amp; Guidance</h2>
          <p>
            There are two guiding principles of geotagging in NYPL Surveyor: <strong>take your best
            guess</strong> and remember <strong>it’s okay to skip</strong>! With Surveyor, we’re
            starting from scratch so even getting an item in the right time zone is helpful! This
            project is a shared effort and if you don’t recognize a location, others might.
          </p>
          <p>
            With those two tenets in
            mind, you’re all set to start surveying. You’ll find that some items require a little
            research to pin correctly. For each item, we’ve included links to useful resources like
            our <a href='http://digitalcollections.nypl.org/'>Digital Collections</a> and <a href='http://maps.nypl.org/warper/'>Map Warper</a>.
          </p>
          <h2>Contact Information</h2>
          <p>
            Questions? Comments? Contact us at <a href='mailto:oralhistory@nypl.org?Subject=Surveyor'>spacetime@nypl.org</a>.
          </p>
          <h2>Frequently Asked Questions</h2>

          <h3>How should I deal with <i>View from</i> shots?</h3>
          <p>
            Sometimes prints and photographs will be of the “A View From” type shots. Meaning, they
            depict a very wide view from one particular point in the city. How for instance, should
            you tag the following?
          </p>
          <DigitalCollectionsImage uuid='510d47d9-7aba-a3d9-e040-e00a18064a99'
            imageId='53913' title='The south prospect of the city of New York, in North America' />
          <p>
            For these images place the marker in the approximate middle of the view. In Surveyor, a
            second, optional step allows you to mark the full width of the image and note place where
            the images point of view. You can use this second step to more accurately tag these wide images.
          </p>
          <h3>How to handle low res images?</h3>
          <p>
            If an image is low resolution and difficult to view, try viewing the item in our Digital
            Collections, where higher resolution versions of the image are available. Each item will
            have an easy link to their Digital Collections page.
          </p>
          <h3>Historic addresses! How do I handle them?</h3>
          <p>
            As history buffs and others know, New York City’s addresses aren’t static through time. Since
            street names change and numerical addresses have been reassigned throughout the years. How to
            accurately map historic materials is one of the big challenges we’re tackling with the NYC
            Space/Time Directory project. For Surveyor, pin the item based on the physical location rather
            than the street address.
          </p>
          <h3>How do I tag an item when the buildings don’t exist anymore?</h3>
          <p>
            Tag the items where they would have stood when they existed. For instance, this lantern
            slide of the Crystal Palace should be pinned to the area which is now Bryant Park.
          </p>
          <h3>Why can't I search for addresses, streets and places?</h3>
          <DigitalCollectionsImage uuid='510d47da-ea3d-a3d9-e040-e00a18064a99'
            imageId='465509' title='Crystal Palace, ca. 1853, from an engraving' />
          <h2>Keyboard Navigation</h2>
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
                  Move map, camera or target east, north, west and south &mdash; hold <kbd>Shift</kbd> for a larger
                  distance. Use <kbd>Tab</kbd> to switch between map, camera, target.
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
                  <kbd aria-label='left bracket key'>[</kbd>
                  <kbd aria-label='right bracket key'>]</kbd>
                </td>
                <td>
                  Switch between photo or map pane
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
                  <kbd aria-label='L key'>L</kbd>
                </td>
                <td>
                  Lights out — toggle metadata display. Clicking or tapping the image will also toggle displaying the metadata.
                </td>
              </tr>
            </tbody>
          </KeyboardTable>

          <h2>Data</h2>
          <p>
            All submissions are open data. Concensus algorithm.
            See GitHub for more information
          </p>

          <h2>Public Domain Thank You Animals</h2>
          <p>
            Every time you submit the location of a photo, you're thanked by a thankful animal from our public domain image collections.
          </p>
          <img src={bat} alt='Wrinkle-lipped free-tailed bat' />

          <Table>
            <thead>
              <tr>
                <th scope='col'>Animal</th>
                <th scope='col'>UUID</th>
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
            <a href='https://www.nypl.org/'>The New York Public Library</a> strives to ensure that
            everyone has access to the full range of information, programs, and services that it
            offers. When developing NYPL websites and mobile applications, our digital teams seek
            to conform to <a href='https://www.w3.org/TR/WCAG20/'>Web Content Accessibility Guidelines
            (WCAG) 2.0</a> success criteria of at least Level AA. Even when surpassing these
            criteria, we realize that we might not meet the needs of all users. As new techniques
            emerge to address accessibility issues, we are committed to incorporating them into our
            development processes.
          </p>
          <p>
            Some items in our collections present accessibility challenges. In such cases, we look
            at using metadata in different ways to improve accessibility. Additionally, as part of
            our efforts, we actively work on projects that enrich our metadata. As a result, we are
            increasingly able to provide better experiences with our collections for all
            users&mdash;regardless of their abilities.
          </p>
          <p>
            If you encounter any accessibility shortfalls when using Surveyor, or would like
            to provide other feedback, please email <a href='mailto:spacetime@nypl.org'>spacetime@nypl.org</a> or
            call <a href='tel:9172756975'>917-275-6975</a> (TTY <a href='tel:2129300020'>212-930-0020</a>).
          </p>
          <p>
            For further information about assistive technologies and accommodations available
            for people with disabilities at the <a href='https://www.nypl.org/locations/'>research
            centers and branch libraries</a> of The New York Public Library, please visit <a href='http://nypl.org/accessibility'>nypl.org/accessibility</a> or email <a href='mailto:accessibility@nypl.org'>accessibility@nypl.org</a>.
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
