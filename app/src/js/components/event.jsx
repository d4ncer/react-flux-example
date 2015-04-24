var React = require('react');
var moment = require('moment');

var Event = React.createClass({

  renderDate: function() {

      return (
        <div className="event-date">
          <p className="date-item">
            {this.props.event.date.calendar()}
          </p>
        </div>
      )

  },

  render: function() {
    return (
      <li className="event-item row">
        <div className="date-container">
          <div className="date-inner">
            {this.renderDate()}
          </div>
        </div>
        <div className="text-container">
          <h4 className="event-title">{this.props.event.name}</h4>
          <p className="event-body">{this.props.event.description}</p>
        </div>
      </li>
    )
  }
});

module.exports = Event;
