import React from 'react'
import { connect } from 'react-redux'
import { createSelector } from 'reselect'

import {
  selectHasTouch
} from 'containers/App/selectors'

import Button from 'components/Button'
import ExplainScreen from 'containers/ExplainScreen'

const tableCells = {
  metadata: [
    undefined,
    'The title and metadata can give you important information on the geographic location of the image. You can toggle this information by clicking or tapping on the image.'
  ],
  new: [
    <Button fake type='new'>New</Button>,
    'You can always try a different image by clicking the New button. (You might see the current image again in the future.)'
  ],
  map: [
    undefined,
    'To geotag the image, move the map so that the location of the marker reflects the location depicted on the image. Once you’ve submitted a location, you can take the optional step of marking the direction and angle of the view of the image.'
  ],
  score: [
    undefined,
    'Every time you geotag an image, you score increases. To save your score, you can log in using one of the services from the menu.'
  ],
  skip: [
    <Button fake type='skip'>Skip</Button>,
    'You can skip images that don’t depict a location, or that are too difficult to geotag. (If you skip an image, you will not see this image again.)'
  ],
  submit: [
    <Button fake type='submit'>Submit</Button>,
    'If you’ve found the correct location, click Submit to send this information to the NYPL.'
  ],
  panes: [
    undefined,
    'To make the image or the map bigger, you can switch between split pane mode and single pane mode.'
  ],
  toMap: [
    undefined,
    'To switch between the image and the map, click the small map in the corner'
  ],
  toImage: [
    undefined,
    'And you can go back to the image by clicking the small image'
  ]
}

const screens = {
  desktop: {
    image: require('images/get-started/desktop.jpg'),
    dimensions: [760, 525.1],
    svgOffset: [330, -212.1],
    components: [
      {
        dimensions: {
          x: 366.8, y: -115.3, width: 280.5, height: 116.9
        },
        tableCells: tableCells.metadata
      },
      {
        dimensions: {
          x: 365.7, y: 221.6, width: 75.3, height: 43.4
        },
        tableCells: tableCells.new
      },
      {
        dimensions: {
          x: 836.1, y: 9.6, width: 87.0, height: 79.7
        },
        tableCells: tableCells.map
      },
      {
        dimensions: {
          x: 869.6, y: 221.6, width: 74.4, height: 43.4
        },
        tableCells: tableCells.skip
      },
      {
        dimensions: {
          x: 965.6, y: 221.6, width: 86.4, height: 43.4
        },
        tableCells: tableCells.submit
      },
      {
        dimensions: {
          x: 935.5, y: -150.3, width: 68.9, height: 43.2
        },
        tableCells: tableCells.panes
      },
      {
        dimensions: {
          x: 804.2, y: -150.3, width: 113.2, height: 43.2
        },
        tableCells: tableCells.score
      }
    ]
  },
  mobile: {
    image: require('images/get-started/mobile.jpg'),
    dimensions: [760, 600],
    svgOffset: [330, -250],
    components: [
      {
        dimensions: {
          x: 374.5, y: -160.0, width: 300.2, height: 123.0
        },
        tableCells: tableCells.metadata[1]
      },
      {
        dimensions: {
          x: 368.5, y: 207, width: 76.5, height: 44
        },
        tableCells: tableCells.new[1]
      },
      {
        dimensions: {
          x: 580, y: 179, width: 100, height: 74
        },
        tableCells: tableCells.toMap[1]
      },
      {
        dimensions: {
          x: 734, y: 179, width: 100, height: 74
        },
        tableCells: tableCells.toImage[1]
      },
      {
        dimensions: {
          x: 843, y: -26, width: 95, height: 85
        },
        tableCells: tableCells.map[1]
      },
      {
        dimensions: {
          x: 857, y: 207, width: 75, height: 44
        },
        tableCells: tableCells.skip[1]
      },
      {
        dimensions: {
          x: 954, y: 207, width: 90, height: 44
        },
        tableCells: tableCells.submit[1]
      },
      {
        dimensions: {
          x: 968, y: -199, width: 76, height: 41
        },
        tableCells: tableCells.score[1]
      }
    ]
  }
}

export class GetStarted extends React.Component {

  constructor (props) {
    super(props)

    this.state = {
      mode: this.props.hasTouch ? 'mobile' : 'desktop'
    }
  }

  render () {
    const screen = screens[this.state.mode]
    return (
      <div>
        <p>
          Use visual clues, as well as information within each item’s metadata, to place images on the map.
          If you encounter an image containing multiple places or landmarks, geotag the image based on its most
          prominent subject. If an image doesn’t clearly indicate a location, skip it.
        </p>
        <ExplainScreen {...screen} />
        <p>
          You might be able to geotag some items almost instantly, while others will require a bit
          of investigation. For more information about an item and to see it in high resolution,
          view it in Digital Collections. Outside resources such as Wikipedia and Google Maps can
          also be helpful in determining locations. If an item ends up being too difficult to
          geotag, skip it.
        </p>
        <p>
          There are two guiding principles of geotagging with Surveyor: take your best guess,
          and it’s okay to skip! With that in mind, start surveying!
        </p>
      </div>
    )
  }

  switchMode () {
    this.setState({
      mode: (this.state.mode === 'mobile' ? 'desktop' : 'mobile')
    })
  }
}

export default connect(createSelector(
  selectHasTouch(),
  (hasTouch) => ({
    hasTouch
  })
))(GetStarted)
