var querystring = require('querystring'),
  routeHandlerUtils = require('./route-handler-utils.js'),
  _ = require('lodash'),
  csvFileModel = require('../modles/csvFileModel');

module.exports = {
  itemTypes: async function (req, res, next) {
    let routerParams = querystring.parse(req._url.query);
    let paramsArray = ['region', 'country', 'type', 'generaltype'];
    if (!_.isEqual(Object.keys(routerParams).sort(), paramsArray.sort())) {
      routeHandlerUtils.sendInvalidArgumentError(res, 'invalid query param');
    } else {
      try {
        var result = await csvFileModel.itemTypes(routerParams.region, routerParams.country, routerParams.type, routerParams.generaltype)
        routeHandlerUtils.sendOk(res, null, null, result.data);
      } catch (err) {
        routeHandlerUtils.sendInvalidArgumentError(res, err);
      }
    }
  }
}