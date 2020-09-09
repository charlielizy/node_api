# Node API

## Architecture
The API is going to feed the front end application called This will depend on the resources that client side application needs.
The core of the application is the _server.js_ file. This file instantiates the server and bootstraps the application.

## Setting up data file
To do local test you need to set up local file under project root. file name is alldata.csv

## Running the local server
**This project proposed node > 13.7.0, so make sure you use versions greater than that**

After installing all the dependencies, run the script
    npm start

## Docs
The project uses _APIDoc_ to render the API documentation in interactive UI view and _JSDoc_ to render app documentation for developers. 
You must also generate docs as new codes are added and commit them with code. To do it run: 

    npm run docs:api    --generate api documentation
    gulp docs:app       --generate app documentation


## Test


## Project Structure
The app is structured in the following folder format:

    project_root
     |- app
    	|- config
    	|- lib
    	|- routes
     |- docs
        |- apis
	|- app
     |- gulpfile.js
     |- server.js
     |- sample-data.js
     |- package.json
     |- README.md


## Application Architecture

The app is split into two main segments:

1. Models: handles all the internals of fetching data and returning formatted data
2. Route handlers: responds to HTTP request based on route pattern, logging and returning HTTP response.

## App Lifecycle

1. _server.js_ is the entry point of a request.
2. After getting request from _server.js_, _restify_ tried to match the route against all the routes defined under **routes**
folder. This folder is a portal of all the routes defined under their corresponding namespace. So, each type of routes
are defined within their own file.
3. Route, after doing all the middlewares (middlewares are defined _routes/middlewares.js_), directs the call to route handlers.
Like _routes_, route handlers also designed like a main portal pattern where all the handlers are registered in _app/lib/route-handlers/index.js_.
Note the order of precedence in that file. So more specific route handler override the less specific ones.

## Deployment

