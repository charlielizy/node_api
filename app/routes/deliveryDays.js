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
    * @apiDescription                      Average Time to ship, and Number of Orders For Each Month, and by each Country grouped by region, with totals for each level
    * @api {get} /delivery-days?year=<Number>&month=<Number>&region=<String>&country=<String>     Average Time to ship, and Number of Orders by period and region
    *
    * @apiGroup Order Statistics
    * @apiVersion 1.0.0
    *
    * @apiUse ApiHeaderExtended
    *
    * @apiParam   {Number}  year         the year of order date
    * @apiParam   {Number}  month        the month of order date
    * @apiParam   {String}  region       the region is within 'Sub-Saharan Africa, Middle East and North Africa, Australia and Oceania, Europe, Asia, Australia and Oceania, ...'
    * @apiParam   {String}  country      the country within the region
    * @apiParam   {String}  type         the type is within 'Fruits, Clothes, Meat, Beverages, Office Supplies, Cosmetics, Snacks, Personal Care, ...'
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
            "AverageDaysToShip": "25",
            "NumberOfOrders": 23042,
            "Regions": {
              "Australia and Oceania": {
                "AverageDaysToShip": "25",
                "NumberOfOrders": 1892
              },
              "Countries": {
                "Australia": {
                  "AverageDaysToShip": "22",
                  "NumberOfOrders": 128
                }
              }
            }
          }
        }
      }
    }
     *
     * @apiUse ApiError
     */


    server.get('/delivery-days', middlewares.CORSMiddleware, routeHandlers.deliveryDays);
}