import React from 'react';

import './header.scss';

const Header = React.createClass({

  getInitialState: function() {
    return {
      collections: {},
      mods: {
        subject: [],
        originInfo: {}
      }
    };
  },

  render: function() {
    var uuid = this.props.item.uuid;

    var subject = this.state.mods.subject;
    if (!Array.isArray(subject)) {
      subject = [subject];
    }

    var originInfo = this.state.mods.originInfo;
    if (!Array.isArray(originInfo)) {
      originInfo = [originInfo];
    }

    var date = originInfo.filter(o => o.dateCreated || o.dateIssued || o.dateOther)
      .map(o => o.dateCreated || o.dateIssued || o.dateOther)
      .filter(o => o.keyDate)
      .map(o => o['$'])
      .sort(function(a, b) {
        return b.length - a.length;
      });

    var geographic = subject.filter(s => s.geographic && s.geographic['$'])
      .map(s => s.geographic['$'])
      .sort(function(a, b) {
        return b.length - a.length;
      });

    var collectionHeader;
    if (this.state.collections[this.props.item.collection]) {
      collectionHeader = (
        <div className='header-text'>
          <h2>From <a href={`http://digitalcollections.nypl.org/items/${this.props.item.collection}`}>{this.state.collections[this.props.item.collection].title.trim()}</a></h2>
        </div>
      );
    }

    var geoDateHeader;
    if (geographic[0] || date[0]) {
      var spans = [];

      if (geographic[0]) {
        spans.push({
          key: 'Location',
          value: geographic[0]
        });
      }

      if (date[0]) {
        spans.push({
          key: 'Date',
          value: date[0]
        });
      }

      geoDateHeader = (
        <div className='header-text'>
          <h2>
          {spans.map(function(span, i) {
            return <span key={i}>{i ? span.key.toLowerCase() : span.key}: {span.value}{i < (spans.length - 1) ? ', ' : ''}</span>;
          })}
          </h2>
        </div>
      );
    }



    return (
      <header>
        <div className='header-text'>
          <h1>{this.props.item.title}</h1>
        </div>
        {collectionHeader}
        {geoDateHeader}
        <div className='header-text'>
          <a href={`http://digitalcollections.nypl.org/items/${uuid}`}>Open item in Digital Collections</a>
        </div>
      </header>
    );
  },

  componentDidMount: function() {
    this.fetchMods(this.props.item.uuid);
    this.fetchCollections();
  },

  componentDidUpdate: function(prevProps) {
    var prevUuid = prevProps.item.uuid;
    var uuid = this.props.item.uuid;

    if (prevUuid !== uuid) {
      this.fetchMods(uuid);
    }
  },

  fetchCollections: function() {
    fetch(`${this.props.api.url}collections`)
    .then(function(response) {
      return response.json();
    }).then(json => {
      var collections = {};
      json.forEach(c => collections[c.uuid] = c)
      this.setState({
        collections: collections
      });
    }).catch(function(err) {
      console.error(`Error fetching collections`, err);
    });
  },

  fetchMods: function(uuid) {
    fetch(`${this.props.api.url}items/${uuid}/mods`)
    .then(function(response) {
      return response.json();
    }).then(json => {
      this.setState({
        mods: json
      });
    }).catch(function(err) {
      console.error(`Error fetching MODS for ${uuid}`, err);
    });
  }

});

export default Header;
