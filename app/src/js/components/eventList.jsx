var React = require('react');
var Event = require('./event.jsx');
var _ = require('underscore');
var actionCreator = require('../actions/actionCreator');

var EventList = React.createClass({

  renderEvents: function() {
    var events = this.props.events;
    if (!_.isEmpty(events)) {
      return _.map(events, function(event) {
        return (
          <Event
            key={event.id}
            event={event}
            />
        )
      }.bind(this));
    } else {
      return (
        <li className="no-events">There are no events for this month.</li>
      )
    }

  },

  renderControl: function(direction) {
    if (direction === 'left') {
      return <div className="controls control-left" onClick={this.props.handleControlClick}>Previous</div>
    } else {
      return <div className="controls control-right" onClick={this.props.handleControlClick}>Next</div>
    }
  },

  render: function() {
    return (
      <div className="events-container">
        <ul className="events-list row">
          {this.renderEvents()}
        </ul>
        <div className="events-controls row">
          {this.renderControl('left')}
          {this.renderControl('right')}
        </div>
      </div>
    )
  }
});

module.exports = EventList;
