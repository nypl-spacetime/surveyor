/*
 * Header
 *
 * Header header header
 */
/* eslint-disable react/prefer-stateless-function */

import React from 'react';
import { connect } from 'react-redux';

import { createSelector } from 'reselect';

import {
  selectItem,
  selectCurrentStep
} from 'containers/App/selectors';

import styles from './styles.css';

export class Metadata extends React.Component {

  constructor (props) {
    super(props)

    this.state = {
      showingMoreInfo: false
    }
  }

  render() {
    const collection = (this.props.item && this.props.item.collection) || {}
    const itemData = (this.props.item && this.props.item.data) || {}

    var collectionLink
    if (collection.url) {
      const title = collection.title || 'Digital Collections'
      collectionLink = (
        <a target='_blank' href={collection.url}>{title}</a>
      )
    }

    var geoDateHeader;
    if (itemData.location || itemData.date) {
      var spans = [];

      if (itemData.location) {
        spans.push({
          key: 'Location',
          value: itemData.location
        });
      }

      if (itemData.date) {
        spans.push({
          key: 'Date',
          value: itemData.date
        });
      }

      geoDateHeader = (
        <div>
          <span className='header-text'>
            {spans.map(function(span, i) {
              return <span key={i}>{span.key}: {span.value}{i < (spans.length - 1) ? '; ' : ''}</span>;
            })}
          </span>
        </div>
      )
    }

    const titleLength = itemData.title ? itemData.title.length : 0

    let titleStyle;
    if (titleLength > 100) {
      titleStyle = {
        fontSize: `1.6em`
      };
    } else if (titleLength > 50) {
      titleStyle = {
        fontSize: `1.8em`
      };
    }

    var titleClasses = styles.title

    var searchLinks = null

    if (this.props.currentStep === 'location' || this.props.currentStep === 'bearing') {
      searchLinks = (
        <div>
          <h2 className={styles.subtitle}>From: {collectionLink}</h2>
          {geoDateHeader}
          <div>
            <a target='_blank' href={`http://digitalcollections.nypl.org/items/${this.props.item.id}`}>
              View in high resolution in NYPL Digital Collections
            </a>
            <div>
              Use outside resources like <a href='https://www.wikipedia.org/' target='_blank'>Wikipedia</a> and <a href='https://www.google.nl/maps/@40.7425428,-73.9664649,11.58z' target='_blank'>Google Maps</a> to scout out the location.
            </div>
          </div>
        </div>
      )
    }

    var toggleMoreInfoLink = null
    if (searchLinks) toggleMoreInfoLink = <a href="javascript:void(0)" onClick={this.toggleMoreInfo} className={styles.toggleMoreInfo}>{ (() => this.state.showingMoreInfo ? 'Hide Info' : 'Show Info' )() }</a>

    return (
      <div className={`${styles.metadata} sidebar-padding`}>
        <h1 style={titleStyle} className={titleClasses} title={itemData.title}>{itemData.title}</h1>
        {toggleMoreInfoLink}
        <div className={styles.moreInfo}>
          {searchLinks}
        </div>
        <div className={`${styles.moreInfoOverlay} ${(() => this.state.showingMoreInfo ? styles.active : '' )()}`}>
          {searchLinks}
        </div>
      </div>
    );
  }

  toggleMoreInfo = () => {
    this.setState({showingMoreInfo: ! this.state.showingMoreInfo})
  }

}

export default connect(createSelector(
  selectItem(),
  selectCurrentStep(),
  (item, currentStep) => ({
    item, currentStep
  })
))(Metadata);
