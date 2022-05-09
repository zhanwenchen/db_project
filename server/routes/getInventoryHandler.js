/**
* @file Route handler for router.get('/customer')
*/
const { OrderedItem, Order, Customer, Inventory } = require('../models');


module.exports = (req, res) => {
  Inventory.findAll({
    where: {
      restaurant_id: req.params.restaurant_id
    },
    attributes: ['id', 'name', 'price', 'quantity', 'description'],
    order: ['id'],
}).then(possibleInventories =>
      (
        possibleInventories ?
          res.status(200).json({ errors: {}, inventories: possibleInventories }) :
          res.status(404).json({ errors: 'inventories not found', inventories: null })
      ),
    )
    .catch(error => res.status(500).json({ errors: error.toString() }));
};
