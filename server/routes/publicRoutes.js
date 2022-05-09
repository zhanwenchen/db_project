/** ~/routes/index.js
* Load all middleware and route handlers;
* Map HTTP method urls + urls to the
*
* NOTE All responses should be in JSON, including any message returned to the
*   front-end
*/

// IDEA: instead of id as param, use username for users and title for posts?
// IDEA: implement updateUserHandler
// IDEA: implement deleteUserHandler
// IDEA: implement updatePostHandler
// IDEA: implement deletePostHandler
// IDEA: implement /comments routes and handlers

const express = require('express');

const router = express.Router();

// Import middleware

// Import handlers
// Orders
const getOrdersHandlerCustomer = require('./getOrdersHandlerCustomer');
const getOrdersHandlerRestaurant = require('./getOrdersHandlerRestaurant');
const postOrderHandlerCustomer = require('./postOrderHandlerCustomer');

// Inventory
const getInventoryHandler = require('./getInventoryHandler');
const postInventoryHandler = require('./postInventoryHandler');
const putInventoryHandler = require('./putInventoryHandler');

// Restaurants
const getRestaurantsHandlerCustomer = require('./getRestaurantsHandlerCustomer');


router.get('/customer/:customer_id/orders', getOrdersHandlerCustomer);
router.post('/customer/:customer_id/orders', postOrderHandlerCustomer);
router.get('/restaurants', getRestaurantsHandlerCustomer);

router.get('/restaurant/:restaurant_id/orders', getOrdersHandlerRestaurant);
router.get('/restaurant/:restaurant_id/inventory/', getInventoryHandler);
router.post('/restaurant/:restaurant_id/inventory/', postInventoryHandler);
router.put('/restaurant/:restaurant_id/inventory/', putInventoryHandler);

module.exports = router;
