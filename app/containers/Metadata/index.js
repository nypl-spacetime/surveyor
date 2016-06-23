/*
 * Header
 *
 * Header header header
 */
/* eslint-disable react/prefer-stateless-function */

import React from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';

import { createSelector } from 'reselect';

import {
  selectModsTitle,
  selectModsLocation,
  selectModsDate,
  selectCollectionForItem,
  selectSearchButtons
} from 'containers/App/selectors';

import styles from './styles.css';

export class Metadata extends React.Component {

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
              return <span key={i}>{i ? span.key.toLowerCase() : span.key}: {span.value}{i < (spans.length - 1) ? ', ' : ''}</span>;
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

    return (
      <div className={`${styles.metadata} sidebar-padding`}>
        <h1 style={titleStyle} className={styles.title} title={this.props.title}>{this.props.title}</h1>
        <h2 className={styles.subtitle}>From: {collectionLink}</h2>
        {geoDateHeader}
        <div>
          Search in new tab:
          <ul className={styles['search-buttons']}>
            { this.props.searchButtons.map((searchButton, i) => {
              return (<li key={i}>
                <a target='_blank' href={searchButton.url}>{searchButton.title}</a>
              </li>)
            }) }
          </ul>
        </div>
      </div>
    );
  }

}

//
// function mapDispatchToProps(dispatch) {
//   return {
//     changeRoute: (url) => dispatch(push(url)),
//     getOAuth: () => {
//       dispatch(loadOAuth());
//     },
//     nextItem: () => {
//       dispatch(loadItem());
//     },
//
//     loadItem: (uuid) => {
//       dispatch(loadItem(uuid));
//     },
//
//     loadMods: () => {
//       dispatch(loadMods());
//     },
//     onSubmitForm: (evt) => {
//       evt.preventDefault();
//       dispatch(loadRepos());
//     },
//
//     dispatch
//   };
// }

// Wrap the component to inject dispatch and state into it
export default connect(createSelector(
  selectModsTitle(),
  selectCollectionForItem(),
  selectModsLocation(),
  selectModsDate(),
  selectSearchButtons(),
  (title, collection, location, date, searchButtons) => ({
    title, collection, location, date, searchButtons
  })
))(Metadata);



//
//
// import React from 'react';
//
// import './details.scss';
//
// const Details = React.createClass({
//
//   getInitialState: function() {
//     return {
//       mods: {
//         subject: [],
//         originInfo: []
//       }
//     };
//   },
//
//   render: function() {
//     var uuid = this.props.item.uuid
//
//     var subject = this.state.mods.subject
//     if (!Array.isArray(subject)) {
//       subject = [subject]
//     }
//
//     var originInfo = this.state.mods.originInfo
//     if (!Array.isArray(originInfo)) {
//       originInfo = [originInfo]
//     }
//
//     var date = originInfo.filter((o) => o.dateCreated || o.dateIssued || o.dateOther)
//       .map((o) => o.dateCreated || o.dateIssued || o.dateOther)
//       .filter((o) => o.keyDate)
//       .map(o => o['$'])
//       .sort((a, b) => {
//         return b.length - a.length;
//       })
//
//     var geographic = subject.filter(s => s && s.geographic && s.geographic['$'])
//       .map((s) => s.geographic['$'])
//       .sort((a, b) => {
//         return b.length - a.length
//       })
//
//     var collectionHeader;
//     if (this.props.collections[this.props.item.collection]) {
//       collectionHeader = (
//         <div>
//           <span className='header-text'>
//             From <a href={`http://digitalcollections.nypl.org/items/${this.props.item.collection}`} target='_black'>{this.props.collections[this.props.item.collection].title.trim()}</a>
//           </span>
//         </div>
//       );
//     }
//
//     var geoDateHeader;
//     if (geographic[0] || date[0]) {
//       var spans = [];
//
//       if (geographic[0]) {
//         spans.push({
//           key: 'Location',
//           value: geographic[0]
//         });
//       }
//
//       if (date[0]) {
//         spans.push({
//           key: 'Date',
//           value: date[0]
//         });
//       }
//
//       geoDateHeader = (
//         <div>
//           <span className='header-text'>
//             {spans.map(function(span, i) {
//               return <span key={i}>{i ? span.key.toLowerCase() : span.key}: {span.value}{i < (spans.length - 1) ? ', ' : ''}</span>;
//             })}
//           </span>
//         </div>
//       );
//     }
//
//     return (
//       <div id='details'>
//         <h1>
//           <span className='header-text'>{this.props.item.title}</span>
//         </h1>
//         {collectionHeader}
//         {geoDateHeader}
//         <span className='header-text'>
//           <a href={`http://digitalcollections.nypl.org/items/${uuid}`} target='_black'>View details and high-res version on Digital Collections</a>
//         </span>
//       </div>
//     );
//   },
//
//   componentDidMount: function() {
//     this.fetchMods(this.props.item.uuid)
//   },
//
//   componentWillUnmount: function() {
//     this.unmounted = true
//   },
//
//   componentDidUpdate: function(prevProps) {
//     var prevUuid = prevProps.item.uuid
//     var uuid = this.props.item.uuid
//
//     if (prevUuid !== uuid) {
//       this.fetchMods(uuid)
//     }
//   },
//
//   fetchMods: function(uuid) {
//
//     function handleErrors(response) {
//       if (!response.ok) {
//         throw Error(response.statusText)
//       }
//       return response
//     }
//
//     fetch(`${this.props.api.url}items/${uuid}/mods`, {
//       credentials: 'include'
//     })
//       .then(handleErrors)
//       .then(function(response) {
//         return response.json()
//       }).then(json => {
//         if (!this.unmounted) {
//           this.setState({
//             mods: json
//           })
//         }
//       }).catch((err) => {
//         console.error(`Error fetching MODS for ${uuid}`, err)
//       })
//   }
// })
//
// export default Details
