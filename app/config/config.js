/**
 * Config for the project
 * @module config
 * @author Charlie Li <charlielizy@gmail.com>
 */
'use strict';
//import the env file
var env = require('dotenv').config({path: __dirname + '/../../.env', silent: true});
var fs = require('fs');
var _ = require('lodash');
var packageFile = JSON.parse(fs.readFileSync(__dirname + '/../../package.json'));
var environment = process.env.NODE_ENV || 'dev';
/**
 * config object
 * @var
 * @type {Object}
 */
var config = {
    environment: 'dev',
    https: environment === 'dev' ? false : true,
    debug: process.env.DEBUG || environment.toLowerCase() === 'dev',
    server: {
        port: process.env.C360_PORT || process.env.PORT || 5004,
        host: '',
        logPath: __dirname + '/../logs', //the bunyan log dir
        logLevel: environment === 'dev' ? 'info' : 'error', //log level
        logName: packageFile.name, //the log identifier
        logKeepCount: environment === 'dev' ? 1 : 5 //number of logs to be kept back before deleting
    },
    /** the file cache base dir */
    cache: {
        active: process.env.C360_FILE_CACHE || 1,
        folderPath: __dirname + '/../cache'
    },
    user_auth: {
        expiry_timeout: 30 //expiry of the saved user in app_users table in minutes, to avoid hitting Focus API every time
    },
    //the default settings of the api, that controls the default number of records to fetch and other settings
    api: {
        defaults: {
            offset: 0,
            limit: 50,
            order: 'primary_key'
        }
    },

    auth0: {
        //using Auth0 Management API from Auth0, checkout https://manage.auth0.com/#/apis/5705066983c90a8a93e02f8b/settings
        management_api_client_id: process.env.NA_AUTH0_MA_CLIENT_ID || null,
        management_api_client_secret: process.env.NA_AUTH0_MA_CLIENT_SECRET || null,
        management_api_audience: process.env.NA_AUTH0_MA_AUDIENCE || null,
        management_api_token_url: process.env.NA_AUTH0_MA_TOKEN_URL || null
    }
};
module.exports = config;
