var querystring = require('querystring'),
  routeHandlerUtils = require('./route-handler-utils.js'),
  _ = require('lodash'),
  csvFileModel = require('../modles/csvFileModel');

module.exports = {
  deliveryDays: async function (req, res, next) {
    let routerParams = querystring.parse(req._url.query);
    let paramsArray = ['year', 'month','region', 'country'];
    if (!_.isEqual(Object.keys(routerParams).sort(), paramsArray.sort())) {
      routeHandlerUtils.sendInvalidArgumentError(res, 'invalid query param');
    } else {
      try {
        var result = await csvFileModel.deliveryDays(routerParams.year, routerParams.month, routerParams.region, routerParams.country)
        routeHandlerUtils.sendOk(res, null, null, result.data);
      } catch (err) {
        routeHandlerUtils.sendInvalidArgumentError(res, err);
      }
    }
  }
}