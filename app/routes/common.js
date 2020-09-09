var restify = require('restify');
// Routes
module.exports = function (server) {
    server.get('/docs', function (req, res, next) {
        res.redirect(301, '/docs/apis/', next);
    });
    server.get('/docs/apis', function (req, res, next) {
        res.redirect(301, '/docs/apis/', next);
    });
    server.get('/docs/apis/*', restify.plugins.serveStatic({
        directory: __dirname + '/../../',
        default: 'index.html'
    }));
    server.get('/docs/app', function (req, res, next) {
        res.redirect(301, '/docs/app/', next);
    });
    server.get('/docs/app/*', restify.plugins.serveStatic({
        directory: __dirname + '/../../',
        default: 'index.html'
    }));
};
