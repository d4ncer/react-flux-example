var request = require('superagent');
var AppDispatcher = require('../dispatcher/dispatcher');
var path = require('path');
var config = require('../../../../config/config');
var moment = require('moment');
var actionCreator = require('../actions/actionCreator');

var URL = 'https://api.parse.com/1/classes/events';

var getMonthDateRange = function(dateTuple) {
  var start, end;
  var year = dateTuple[0],
    month = dateTuple[1];


  start = moment([year, month - 1]);
  end = moment(start).endOf('month');

  return {
    start: start.toISOString(),
    end: end.toISOString()
  }
};

var getDateQuery = function(dateTuple) {
  var dateRange = getMonthDateRange(dateTuple);
  var qString = JSON.stringify({
    eventDate: {
      '$gte': dateRange.start,
      '$lt': dateRange.end
    }
  });
  return '?where=' + qString;
};

var makeUrl = function(dateTuple) {
  var queryString = getDateQuery(dateTuple);

  return URL + queryString;
};

var dispatch = function(payload) {
  AppDispatcher.dispatch(payload);
};

var Api = {
  getCalendarData: function(dateTuple) {
    dispatch({
      actionType: 'REQUEST_PENDING',
      content: 'loading'
    });
    request
      .get(makeUrl(dateTuple))
      .set('Content-Type', 'application/json')
      .set('X-Parse-Application-Id', config.appID)
      .set('X-Parse-REST-API-Key', config.apiKey)
      .end(function(err, resp) {
        dispatch({
          actionType: 'REQUEST_RESOLVED',
          content: resp,
          dateRange: dateTuple
        });
      });
  },
  postCalendarData: function(data) {
    dispatch({
      actionType: 'REQUEST_PENDING',
      content: 'loading'
    });
    request
      .post(URL)
      .set('Content-Type', 'application/json')
      .set('X-Parse-Application-Id', config.appID)
      .set('X-Parse-REST-API-Key', config.apiKey)
      .send(JSON.stringify(data.vals))
      .end(function(err, resp) {
        this.getCalendarData(data.date)
      }.bind(this));
  }
};

module.exports = Api;
