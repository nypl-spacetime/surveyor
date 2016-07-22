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
  selectUuid,
  selectModsTitle,
  selectModsLocation,
  selectModsDate,
  selectCollectionForItem,
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
    var collectionLink
    if (this.props.collection) {
      collectionLink = (
        <a href={this.props.collection.url}>{this.props.collection.title}</a>
      )
    }

    var geoDateHeader;
    if ((this.props.location && this.props.location[0]) || (this.props.date && this.props.date[0])) {
      var spans = [];

      if (this.props.location[0]) {
        spans.push({
          key: 'Location',
          value: this.props.location[0]
        });
      }

      if (this.props.date[0]) {
        spans.push({
          key: 'Date',
          value: this.props.date[0]
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

    const titleLength = this.props.title ? this.props.title.length : 0
    // Default fontSize = 36px, approx 30 character
    // per line, when metadata box has default width

    var fontSize = 36;
    if (titleLength > 300) {
      fontSize = 16;
    } else if (titleLength > 200) {
      fontSize = 26;
    }

    const titleStyle = {
      fontSize: `${fontSize}px`
    };

    var titleClasses = styles.title
    if (fontSize > 300) titleClasses.push(styles.longTitle)

    var searchLinks = null
    if (this.props.currentStep === 'location') {
      searchLinks = (
        <div>
          <h2 className={styles.subtitle}>From: {collectionLink}</h2>
          {geoDateHeader}
          <div>
            <a target='_blank' href={`http://digitalcollections.nypl.org/items/${this.props.uuid}`}>
              View in high resolution in NYPL Digital Collections
            </a>
          </div>
        </div>
      )
    }

    var toggleMoreInfoLink = null
    if (searchLinks) toggleMoreInfoLink = <a href="javascript:void(0)" onClick={this.toggleMoreInfo} className={styles.toggleMoreInfo}>{ (() => this.state.showingMoreInfo ? 'Hide Info' : 'Show Info' )() }</a>

    return (
      <div className={`${styles.metadata} sidebar-padding`}>
        <h1 className={titleClasses} title={this.props.title}>{this.props.title}</h1>
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
  selectUuid(),
  selectModsTitle(),
  selectCollectionForItem(),
  selectModsLocation(),
  selectModsDate(),
  selectCurrentStep(),
  (uuid, title, collection, location, date, currentStep) => ({
    uuid, title, collection, location, date, currentStep
  })
))(Metadata);
