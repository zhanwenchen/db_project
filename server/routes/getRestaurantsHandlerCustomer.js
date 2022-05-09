/**
* @file Route handler for router.get('/customer')
*/
const { Restaurant } = require('../models');


module.exports = (req, res) => {
  Restaurant.findAll({
    attributes: ['id', 'address', 'phone', 'name'],
  }).then(possibleRestaurants =>
      (
        possibleRestaurants ?
          res.status(200).json({ errors: {}, restaurants: possibleRestaurants }) :
          res.status(404).json({ errors: 'restaurants not found', restaurants: null })
      ),
    )
    .catch(error => {
      console.trace(error);
      return res.status(500).json({ errors: error.toString() });

    });
};
