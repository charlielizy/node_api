var restify = require('restify');
var errors = require('restify-errors');

module.exports = {
    sendOk: function (res, message, metadata, data) {
        res.send(200, {
            code: 'Ok',
            message: message || null,
            metadata: metadata || {},
            data: data
        });
    },
    /**
     * Send Unauthorized, HTTP/1.1 401 response
     * @method   sendUnauthorizedError
     * @param {Object}      res             the response object
     * @param   {string}    message         The human readable message sent with the error code
     */
    sendUnauthorizedError: function (res, message) {
        res.send(new errors.UnauthorizedError(message instanceof Error ? message.message : message));
    },

    /**
     * Send Unauthorized, HTTP/1.1 409 response
     * @method   sendInvalidArgumentError
     * @param {Object}      res             the response object
     * @param   {string}    message         The human readable message sent with the error code
     */
    sendInvalidArgumentError: function (res, message) {
        res.send(new errors.InvalidArgumentError(message instanceof Error ? message.message : message));
    },
    /**
     * Send MethodNotImplementedError, HTTP/1.1 501 response
     * @method   sendMethodNotImplementedError
     * @param {Object}      res             the response object
     * @param   {string}    message         The human readable message sent with the error code
     */
    sendMethodNotImplementedError: function (res, message) {
        res.send(new errors.NotImplementedError(message instanceof Error ? message.message : message));
    },
    /**
     * Send InternalServerError, HTTP/1.1 500 response
     * @method   sendInternalServerError
     * @param {Object}      res             the response object
     * @param   {string}    message         The human readable message sent with the error code
     */
    sendInternalServerError: function (res, message) {
        res.send(new errors.InternalServerError(message instanceof Error ? message.message : message));
    },
    /**
     * Send PreconditionFailedError, HTTP/1.1 412 response
     * @method   sendPreconditionFailedError
     * @param {Object}      res             the response object
     * @param   {string}    message         The human readable message sent with the error code
     */
    sendPreconditionFailedError: function (res, message) {
        res.send(new errors.PreconditionFailedError(message instanceof Error ? message.message : message));
    },
    /**
     * Send ServiceUnavailableError, HTTP/1.1 503 response
     * @method   sendServiceUnavailableError
     * @param {Object}      res             the response object
     * @param   {string}    message         The human readable message sent with the error code
     */
    sendServiceUnavailableError: function (res, message) {
        res.send(new errors.ServiceUnavailableError(message instanceof Error ? message.message : message));
    }
};
