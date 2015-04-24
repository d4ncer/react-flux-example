/**
 * Sidebar (for event creation)
 * ============================
 */

var React = require('react');
var actionCreator = require('../actions/actionCreator');
var _ = require('underscore');
var $ = require('sprint');
var moment = require('moment');

var Sidebar = React.createClass({

  // Handle form submit
  submitForm: function(ev) {
    ev.preventDefault();
    var $eName = $('#EventName'),
      $eDate = $('#EventDate'),
      $eDesc = $('#EventDesc');

    var vals = {
      name: $eName.val() || 'untitled',
      eventDate: $eDate.val() ? moment($eDate.val()).toISOString() : moment().toISOString(),
      description: $eDesc.val() || 'An untitled event'
    };

    var postData = {
      date: this.props.date,
      vals: vals
    };

    _.each([$eName, $eDate, $eDesc], function($el) {
      $el.val('');
    });

    actionCreator.postCalendarData(postData);
  },

  render: function() {
    return (
      <div className="cal-sidebar">
        <form onSubmit={this.submitForm}>
          <input type="text" name="event-name" id="EventName" placeholder="Event name" ref="name" />
          <input type="date" name="event-date" id="EventDate" />
          <textarea ref="description" rows="10" name="event-desc" id="EventDesc" placeholder="Event description"></textarea>
          <input type="submit" value="Submit" />
        </form>
      </div>
    )
  }
});

module.exports = Sidebar;
