var Api = require('../apiUtils/apiUtils');

var actionCreator = {
  getCalendarData: function(params) {
    Api.getCalendarData(params);
  },
  postCalendarData: function(params) {
    Api.postCalendarData(params);
  }
};

module.exports = actionCreator;