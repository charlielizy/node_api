var itemTypes = require('./itemTypes'),
    deliveryDays = require('./deliveryDays'),
    common = require('./common'),
    orderPriorities = require('./orderPriorities');
    extend = require('extend');
module.exports = {
    init: function (server) {
        itemTypes(server);
        orderPriorities(server);
        deliveryDays(server);
        common(server);
    }
};
