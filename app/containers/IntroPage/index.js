import React from 'react'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import { createSelector } from 'reselect'

import {
  selectItem
} from 'containers/App/selectors'

import {
  setIntroductionWatched
} from '../App/actions'

import Page from 'components/Page'
import SurveyorButton from 'components/SurveyorButton'

export class IntroPage extends React.Component {

  // openRoute = (route) => {
  //   this.props.changeRoute(route)
  // }

  // toSurveyor = () => {
  //   this.props.setIntroductionWatched()
  //   this.openRoute('/')
  // }

  render () {
    // <IntroVideo />
    return (
      <Page>
        <h2>
          Help The New York Public Library put NYC history on the map!
        </h2>
        <p>
          You'll be presented with an item from the Library's digitized collections, use clues
          in the item's metadata and the image itself to locate on a map of New York City. Some
          you might recognize instantly while others can require a bit of investigation. Visit
          the item in our <a href='https://digitalcollections.nypl.org/'>Digital Collections</a> for
          more clues and to view the image in high resolution. Use outside resources
          like <a href='https://www.wikipedia.org/'>Wikipedia</a> and <a href='https://www.google.com/maps/@40.7520018,-73.9834879,15.5z'>Google Maps</a> to scout out the location.
        </p>
        <p>
          Click submit once you've identified the item's location and you'll have the optional
          step of marking the direction and angle of the view. Not sure about the location or
          want a different challenge? It's always okay to skip!
        </p>
        <SurveyorButton id={this.props.item.id} />
      </Page>
    )
  }
}

function mapDispatchToProps (dispatch) {
  return {
    changeRoute: (url) => dispatch(push(url)),
    setIntroductionWatched: () => dispatch(setIntroductionWatched())
  }
}

export default connect(createSelector(
  selectItem(),
  (item) => ({
    item
  })
), mapDispatchToProps)(IntroPage)

