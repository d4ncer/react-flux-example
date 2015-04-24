/**
 * Main Calendar entry point (controller-view)
 * ===========================================
 */

var React = require('react');
var EventStore = require('../stores/events');
var actionCreator = require('../actions/actionCreator');
var EventList = require('./eventList.jsx');
var Sidebar = require('./sidebar.jsx');
var _ = require('underscore');
var $ = require('sprint');

var Calendar = React.createClass({

  monthOpts: [
    {value: '1', label: 'Jan'},
    {value: '2', label: 'Feb'},
    {value: '3', label: 'Mar'},
    {value: '4', label: 'Apr'},
    {value: '5', label: 'May'},
    {value: '6', label: 'Jun'},
    {value: '7', label: 'Jul'},
    {value: '8', label: 'Aug'},
    {value: '9', label: 'Sept'},
    {value: '10', label: 'Oct'},
    {value: '11', label: 'Nov'},
    {value: '12', label: 'Dec'}
  ],

  yearOpts: [
    {value: '2015', label: '2015'},
    {value: '2016', label: '2016'},
    {value: '2017', label: '2017'},
    {value: '2018', label: '2018'},
    {value: '2019', label: '2019'},
    {value: '2020', label: '2020'},
    {value: '2021', label: '2021'},
    {value: '2022', label: '2022'},
    {value: '2023', label: '2023'},
    {value: '2024', label: '2024'},
    {value: '2025', label: '2025'}
  ],

  getInitialState: function () {
    return EventStore.getState();
  },

  componentDidMount: function () {
    EventStore.addChangeListener(this._onChange);
    this.getEvents();
  },

  _isLoading: function(state) {
    var $loadingDiv = $('#calendar-loading');
    if (state === 'pending' && !$loadingDiv.hasClass('active')) {
      $loadingDiv.addClass('active');
    } else {
      $loadingDiv.removeClass('active');
    }
  },

  _onChange: function () {
    var storeState = EventStore.getState();

    this._isLoading(storeState.request);

    this.setState(storeState);
  },

  getEvents: function () {
    var storeState = EventStore.getState();

    if (storeState.request === 'pending') {
      actionCreator.getCalendarData(storeState.focusDate);
    }
  },

  renderHeader: function() {
    var focusDate = this.state.focusDate,
      m = ''+focusDate[1],
      y = ''+focusDate[0],
      month, year;

    month = _.findWhere(this.monthOpts, { value: m });

    year = _.findWhere(this.yearOpts, { value: y });

    return month.label + ' ' + year.label;

  },

  handleControlClick: function(event) {
    var controlClassList = event.target.classList;

    var y = +this.state.focusDate[0],
      m = +this.state.focusDate[1];

    if (_.contains(controlClassList, 'control-left')) {
      if (m === 1) {
        actionCreator.getCalendarData([y-1, 12]);
      } else {
        actionCreator.getCalendarData([y, m-1]);
      }
    } else {
      if (m === 12) {
        actionCreator.getCalendarData([y+1, 1]);
      } else {
        actionCreator.getCalendarData([y, m+1]);
      }
    }
  },

  render: function () {

    return (
      <div className="cal-inner row">
        <header className="cal-header">
          <h2 className="cal-title">{this.renderHeader()}</h2>
        </header>
        <Sidebar
          date={this.state.focusDate}
          />
        <EventList
          events={this.state.events}
          date={this.state.focusDate}
          handleControlClick={this.handleControlClick}
          />
      </div>
    );
  }
});

module.exports = Calendar;
