/**
* @file Route handler for router.get('/customer')
*/
const { OrderedItem, Order, Restaurant, Inventory } = require('../models');


module.exports = (req, res) => {
  OrderedItem.findAll({
    include: [
      {
        model: Order, required: true,
        where: { customer_id: req.params.customer_id},
        attributes: [
          ['id', 'orderId']
        ],
      },
      {
        model: Inventory,
        required: true,
        attributes: [
          ['name', 'menuItemName'],
          'price'
        ],
        include: [
          {
            model: Restaurant,
            required: true,
            attributes: [
              ['name', 'restaurantName']
            ],
          },
        ]
      },

    ],
    // where: {
    //   '$Order.customer_id': customer_id
    // }
    attributes: [['id', 'menuItemId'], 'quantity', 'notes'],
  }).then(possibleOrders =>
      (
        possibleOrders ?
          res.status(200).json({ errors: {}, orders: possibleOrders }) :
          res.status(404).json({ errors: 'orders not found', orders: null })
      ),
    )
    .catch(error => {
      console.trace(error);
      return res.status(500).json({ errors: error.toString() });

    });
};
