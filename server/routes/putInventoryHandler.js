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
  let success = true;
  let errors = [];
  const inventories = req.body.menuItems.map((menuItem, index) => {
    models.Inventory.update({
      description: menuItem.description,
      price: menuItem.price,
      name: menuItem.name,
      quantity: menuItem.quantity,
    }, { where: { id: menuItem.id } })
    .catch((error) => {
      console.error(error);
      errors.push(error);
      success = false;
    });
  });
  if (success) {
    return res.status(200).json({ updated_inventories: inventories })
  } else {
    return res.status(500).json({ errors: errors.map(error => error.toString )});
  }

};
