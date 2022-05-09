/**
* @file Route handler for router.get('/customer')
*/
const { OrderedItem, Order, Customer, Inventory } = require('../models');


module.exports = (req, res) => {
  OrderedItem.findAll({
    include: [
      {
        model: Order, required: true,
        where: { restaurant_id: req.params.restaurant_id},
        attributes: ['id'],
        include: [
          {
            model: Customer,
            required: true,
            attributes: ['first_name', 'last_name'],
          },
        ]
      },
      {
        model: Inventory,
        required: true,
        attributes: ['name'],
      },

    ],
    // where: {
    //   '$Order.customer_id': customer_id
    // }
    attributes: ['quantity', 'notes'],
  }).then(possibleOrders =>
      (
        possibleOrders ?
          res.status(200).json({ errors: {}, orders: possibleOrders }) :
          res.status(404).json({ errors: 'orders not found', orders: null })
      ),
    )
    .catch(error => res.status(500).json({ errors: error.toString() }));
};
