var Immutable = require('immutable');
var AppDispatcher = require('../dispatcher/dispatcher');
var EventEmitter = require('events').EventEmitter;
var _ = require('underscore');
var assign = require('object-assign');
var moment = require('moment');

var CHANGE_EVENT = 'change';
var now = moment();

var _state = {
  focusDate: [now.year(), now.month() + 1],
  request: 'pending',
  events: []
};

var _events = Immutable.Map();
var _defaultDate = new Date();

var CalEvent = Immutable.Record({
  id: null,
  name: 'CalendarEvent',
  date: _defaultDate,
  description: null
});

var setState = function(params) {
  params = params || {};
  assign(_state, params);
};

var stringToDate = function(dateString) {
  return moment(dateString, moment.ISO_8601);
};

var createAll = function(response, dateRange) {

  if (_events.size) {
    _events = _events.clear();
  }

  _.each(response.body.results, function(el, idx) {
    _events = _events.set(idx, new CalEvent({
      id: el.objectId,
      date: stringToDate(el.eventDate),
      name: el.name,
      description: el.description
    }));
  });

  setState({
    focusDate: dateRange,
    request: 'done',
    events: _events.toJS()
  });

};

var EventStore = assign({}, EventEmitter.prototype, {

  getState: function() {
    return _state;
  },

  emitChange: function() {
    this.emit(CHANGE_EVENT);
  },

  addChangeListener: function(callback) {
    this.on(CHANGE_EVENT, callback);
  },

  removeChangeListener: function(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  }
});

EventStore.dispatchToken = AppDispatcher.register(function(payload) {
  switch(payload.actionType) {
    case 'REQUEST_RESOLVED':
      createAll(payload.content, payload.dateRange);
      EventStore.emitChange();
      break;
    case 'REQUEST_PENDING':
      setState({
        request: 'pending'
      });
      EventStore.emitChange();
      break;
    case 'POST_RESOLVED':
      EventStore.emitChange();
      break;
    default:
      return true;
  }
});

module.exports = EventStore;



