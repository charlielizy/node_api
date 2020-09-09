var errors = require('restify-errors'),
    middlewares = require('./middlewares.js'),
    routeHandlers = require('../lib/routeHandlers');

module.exports = (server) => {

    /**
    * @apiDefine ApiError
    * @apiError 409  The code name of the error, when there is inconsistency in the passed data. either in
    *                              url parameter, query or POST body
    * @apiErrorExample
    *      HTTP/1.1 409 Conflict
    *      {
                  "code": "InvalidArgumentError",
                  "message": <message>
                }

    * @apiError 500 The code name of the error, this might be triggered if any internal operation within
    *                                  the API fails
    * @apiErrorExample
    *      HTTP/1.1 500 Internal Server Error
    *      {
                  "code": "InternalServerError",
                  "message": <message>
                }
    */
    /**
     * @apiDefine ApiHeaderExtended
     *
     * @apiHeader   {String}  X-Sitename        HEADER: The sitename of the product
     * @apiHeader   {String}  X-LocationId      HEADER: [OPTIONAL]: The location Id
     */
    /**
    * 
    * @api {get} /order-priorities?year=<string>&month=<string>     Number of each Priority Orders for each Month
    * @apiDescription                      Number of each Priority Orders for each Month                               
    *
    *
    * @apiGroup Order Statistics
    * @apiVersion 1.0.0
    *
    * @apiUse ApiHeaderExtended
    *
    * @apiParam   {Number}  year         the year of order date
    * @apiParam   {Number}  month        the month of order date
    *
    *
    * @apiSuccessExample Success-Response:
    * HTTP/1.1 200 OK
    {
      "code": "Ok",
      "message": null,
      "metadata": {},
      "data": {
        "2011": {
          "5": {
            "H": 4251,
            "M": 4091,
            "L": 4243,
            "C": 4183
          }
        }
      }
    }
     *
     * @apiUse ApiError
     */

    server.get('/order-priorities', middlewares.CORSMiddleware, routeHandlers.orderPriorities);
}