const debug = require('debug')('blog');
const models = require('../models');

// IDEA, FIXME: validate string_id uniqueness in the method or in User.hooks?
module.exports = (req, res) => {
  // Option 1: implement validating string_id checking in route handler
  // models.Post.findOne({ where: { string_id: req.body.title } })
  //   .then((possiblePost) => {
  //     // if that string_id is already taken, then alter it
  //     if (possiblePost) {
  //       throw Error(`Unique string_id validation has not been
  //           implemented in route handler`);
  //     }
  //
  //     console.log(req.user);
  //
  //     // console.log(req);
  //
  //     models.Post.create({
  //       title: req.body.title,
  //       body: req.body.body,
  //     })
  //       .then(newPost => res.status(200).json(newPost));
  //   });

  // Option 2: implement validating string_id checking in User.hooks.
  // debug(`createPostHandler: req.user.sub is ${JSON.stringify(req.user.sub, null, 2)}`);
  models.Order.create({
    customer_id: req.params.customer_id,
    restaurant_id: req.body.restaurant_id,
  })
  .catch(error => res.status(500).json({ errors: error.toString() }))
  .then((order) => {
    debug(JSON.stringify(order));
    return (req.body.ordered_items
    .map((ordered_item) => {
      models.OrderedItem.create({
        order_id: order.id,
        inventory_id: ordered_item.inventory_id,
        quantity: ordered_item.quantity,
        notes: ordered_item.notes,
      })
      .then(ordered_item => {
        debug(JSON.stringify(ordered_item));
      })
    }))
  })
  .then((ordered_items) => {
    debug(JSON.stringify(ordered_items));

    return res.status(200).json({
    ordered_items
  })})
  .catch(error => {console.trace(error); return res.status(500).json({ errors: error.toString() })});
};
