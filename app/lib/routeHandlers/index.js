var itemTypes = require('./itemTypes.js'),
    orderPriorities = require('./orderPriorities'),
    deliveryDays = require('./deliveryDays'),
    extend = require('extend');
    
module.exports = extend(itemTypes, orderPriorities, deliveryDays);
