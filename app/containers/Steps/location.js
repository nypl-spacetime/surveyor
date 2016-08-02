import React from 'react';

import Map from 'containers/Map';

import StepContainer from 'components/StepContainer';
import Button from 'components/Button';
import Buttons from 'components/Buttons';

import styles from './location.css';

export class Step extends React.Component {

    constructor(props) {
      super(props);
      this.state = {
        hasMoved: false
      };
    }

  render() {
    var mapEvents = {
      movestart: this.onMoveStart.bind(this)
    };

    return (
      <StepContainer>
        <div className={styles['map-container']}>
          <Map ref='map' defaults={this.props.defaults} mapEvents={mapEvents} geocoder={true} />
          <div className={styles['crosshair-container']}>
            <div className={styles.crosshair}>
              <div className={styles.box}>
                <span className={styles.here}>Here!</span>
                <span>(I think)</span>
              </div>
              <div className={styles.shadow} />
            </div>
          </div>
        </div>
        <Buttons>
          <Button onClick={this.props.skip} type='secondary'>Skip</Button>
          <Button onClick={this.submit.bind(this)} type='primary' disabled={!this.state.hasMoved}>Submit</Button>
        </Buttons>
      </StepContainer>
    );
  }

  submit () {
    if (this.state.hasMoved) {
      var view = this.refs.map.getWrappedInstance().getView();
      this.props.submit({
        zoom: view.zoom
      }, {
        type: 'Point',
        coordinates: view.center
      });
    }
  }

  onMoveStart () {
    if (!this.state.hasMoved) {
      this.setState({
        hasMoved: true
      })
    }
  }
}

export default Step;
