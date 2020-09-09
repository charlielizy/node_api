const restify = require('restify');
const config = require('./app/config/config');
const corsMiddleware = require('restify-cors-middleware');
var routes = require('./app/routes/index');

const server = restify.createServer();
server.use(restify.plugins.bodyParser());
const port = 8081;

// initial server
routes.init(server);

//logging
server.pre(function (request, response, next) {
  request.log.info({ req: request });
  return next();
});

//use CORS
const cors = corsMiddleware({
  origins: ['*'],
  credentials: false,
  headers: ['Authorization', 'X-Sitename'],
  allow_headers: ['Authorization', 'X-Sitename'],
  methods: ['GET', 'POST', 'OPTIONS', 'HEAD', 'PUT', 'DELETE']
})
server.pre(cors.preflight);
server.use(cors.actual);

// // not found error
server.on('NotFound', function (request, response, error) {
  response.status(error.status || 500);
  response.json({
    error: {
      message: error.message
    }
  });
});

server.on('error', function (request, response, error) {
  response.status(error.status || 500);
  response.json({
    error: {
      message: error.message
    }
  });
});

server.listen(port, () => {
  console.log('Listening on: ' + port);
  console.log('Current environment: ' + config.environment);
});

