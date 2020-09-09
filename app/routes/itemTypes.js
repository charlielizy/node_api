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
    * @apiDescription                      The Total Revenue, Cost and Profit for each region and item type
    * @api {get} /itemtypes?region=<string>&country=<string>&type=<string>&generaltype=<string>     The Total Revenue, Cost and Profit for each region and item type
    *                                
    *
    *
    * @apiGroup Order Statistics
    * @apiVersion 1.0.0
    *
    * @apiUse ApiHeaderExtended
    *
    * @apiParam   {String}  region         the region is within 'Sub-Saharan Africa, Middle East and North Africa, Australia and Oceania, Europe, Asia, Australia and Oceania, ...'
    * @apiParam   {String}  country        the country is within the region
    * @apiParam   {String}  type           the type is within 'Fruits, Clothes, Meat, Beverages, Office Supplies, Cosmetics, Snacks, Personal Care, ...'
    * @apiParam   {String}  generaltype    the general type is within 'Fruits, Clothes, Meat, Beverages, Office Supplies, Cosmetics, Snacks, Personal Care, ...'
    *
    *
    * @apiSuccessExample Success-Response:
    * HTTP/1.1 200 OK
    {
      "code": "Ok",
      "message": null,
      "metadata": {},
      "data": {
        "Regions": {
          "Australia and Oceania": {
            "Total": {
              "Revenue": "161527462512.65",
              "Cost": "113857305007.15",
              "Profit": "47670157505.50"
            },
            "Countries": {
              "Australia": {
                "Total": {
                  "Revenue": "11019528082.81",
                  "Cost": "7775461157.84",
                  "Profit": "3244066924.97"
                },
                "ItemTypes": {
                  "Fruits": {
                    "Revenue": "11001236635.67",
                    "Cost": "7762158785.86",
                    "Profit": "3239077849.81"
                  }
                }
              }
            }
          }
        },
        "ItemTypes": {
          "Fruits": {
            "Revenue": "5838878235.99",
            "Cost": "4330657812.76",
            "Profit": "1508220423.23"
          }
        }
      }
    }
     *
     * @apiUse ApiError
     */

    server.get('/itemtypes', middlewares.CORSMiddleware, routeHandlers.itemTypes);

    server.get('/test001', (req, res, next) => {
        // console.log(req);
        console.log(__dirname);
        try {
            res.send({ msg: 'test001' });
            next();

        } catch (err) {
            next(new errors.InvalidContentError(err));
        }
    })

}