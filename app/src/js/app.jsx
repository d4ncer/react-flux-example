var React = require('react');
var Calendar = require('./components/calendar.jsx');
var moment = require('moment');

// Opinionated date formats
moment.locale('en', {
  longDateFormat: {
    LT: 'h:mm A',
    LTS: 'h:mm:ss A',
    L: 'DD-MM-YYYY',
    l: 'D-M-YYYY',
    LL: 'Do MMMM YYYY',
    ll: 'D MMM YYYY',
    LLL: 'Do MMMM YYYY LT',
    lll: 'D MMM YYY LT',
    LLLL: 'dddd, Do MMMM YYYY LT',
    llll: 'ddd, D MMM YYYY LT'
  },
  calendar: {
    lastDay: '[Yesterday]',
    sameDay: '[Today]',
    nextDay: '[Tomorrow]',
    lastWeek: '[Last] ddd',
    nextWeek: 'dddd',
    sameElse: 'Do MMM'
  }
});

// Render the app
React.render(<Calendar />, document.getElementById('calendar-wrapper'));