import React from 'react';
import PropTypes from 'prop-types';
import MenuItem from './MenuItem.jsx';
import { Card } from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';

const MenuItems = ({
  errors,
  menuItems,
  orderedItems,
  onSubmit,
  onChange,
}) => (
  <div className="menuItems">
    <Card className="container">
      <form
        onSubmit={onSubmit}
        onChange={onChange}>
        {/* {errors.summary && <p className="error-message">{errors.summary}</p>} */}
        {menuItems.length === 0 && <p>There are currently no menu items</p>}
        {menuItems.length > 0 && <p> what </p> &&
          menuItems.map((menuItem, index) => (
            <MenuItem
              key={index}
              index={index}
              errors={errors}
              id={menuItem.id}
              restaurant_id={menuItem.restaurant_id}
              description={menuItem.description}
              price={menuItem.price}
              name={menuItem.name}
              quantity={menuItem.quantity}
              orderedQuantity={orderedItems[index].orderedQuantity}
              notes={orderedItems[index].notes}
              onChange={onChange}
            />
          ))
        }
        <div className="button-line">
          <RaisedButton type="submit" label="Create New Order" primary />
        </div>
      </form>
    </Card>
  </div>
);

MenuItems.propTypes = {
  errors: PropTypes.object.isRequired,
  menuItems: PropTypes.arrayOf(MenuItem).isRequired,
};

export default MenuItems;
