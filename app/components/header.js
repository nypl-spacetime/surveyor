import React from 'react';

import './header.scss';

const Header = React.createClass({

  getInitialState: function() {
    return {
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

    var geographic = subject.filter(s => s && s.geographic && s.geographic['$'])
      .map(s => s.geographic['$'])
      .sort(function(a, b) {
        return b.length - a.length;
      });

    var collectionHeader;
    if (this.props.collections[this.props.item.collection]) {
      collectionHeader = (
        <div>
          <span className='header-text'>
            From <a href={`http://digitalcollections.nypl.org/items/${this.props.item.collection}`} target='_black'>{this.props.collections[this.props.item.collection].title.trim()}</a>
          </span>
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
        <div>
          <span className='header-text'>
            {spans.map(function(span, i) {
              return <span key={i}>{i ? span.key.toLowerCase() : span.key}: {span.value}{i < (spans.length - 1) ? ', ' : ''}</span>;
            })}
          </span>
        </div>
      );
    }

    return (
      <header>
        <h1>
          <span className='header-text'>{this.props.item.title}</span>
        </h1>
        {collectionHeader}
        {geoDateHeader}
        <span className='header-text'>
          <a href={`http://digitalcollections.nypl.org/items/${uuid}`} target='_black'>Open item in Digital Collections</a>
        </span>
      </header>
    );
  },

  componentDidMount: function() {
    this.fetchMods(this.props.item.uuid);
  },

  componentWillUnmount: function() {
    this.unmounted = true;
  },

  componentDidUpdate: function(prevProps) {
    var prevUuid = prevProps.item.uuid;
    var uuid = this.props.item.uuid;

    if (prevUuid !== uuid) {
      this.fetchMods(uuid);
    }
  },

  fetchMods: function(uuid) {
    fetch(`${this.props.api.url}items/${uuid}/mods`)
      .then(function(response) {
        return response.json();
      }).then(json => {
        if (!this.unmounted) {
          this.setState({
            mods: json
          });
        }
      }).catch(function(err) {
        console.error(`Error fetching MODS for ${uuid}`, err);
      });
  }

});

export default Header;
