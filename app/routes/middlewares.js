// var request = require('request');

module.exports = {
    CORSMiddleware: function (req, res, next) {
        res.header('Access-Control-Allow-Headers', 'Authorization, X-Sitename, X-Productname, X-Clientid, X-LocationId, api-version, content-length, content-md5, content-type, date, request-id, response-time');
        res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, HEAD, PUT, DELETE, PATCH');
        return next();
    },
    authMiddleware: function (request, response, next) {
        //validate the HEADERs values
        if (!request.header('Authorization') || !request.header('X-Sitename')) {
            next(new restify.InvalidArgumentError('You must pass in the HTTP HEADERs: Authorization and X-Sitename, to make this request'));
        }
    },
};
