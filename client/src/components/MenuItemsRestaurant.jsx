import React from 'react';
import PropTypes from 'prop-types';
import MenuItemRestaurant from './MenuItemRestaurant.jsx';
import { Card } from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';

const MenuItemsRestaurant = ({
  errors,
  menuItems,
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
            <MenuItemRestaurant
              key={index}
              index={index}
              errors={errors}
              id={menuItem.id}
              restaurant_id={menuItem.restaurant_id}
              description={menuItem.description}
              price={menuItem.price}
              name={menuItem.name}
              quantity={menuItem.quantity}
              onChange={onChange}
            />
          ))
        }
        <div className="button-line">
          <RaisedButton type="submit" label="Update Menu" primary />
        </div>
      </form>
    </Card>
  </div>
);

MenuItemsRestaurant.propTypes = {
  errors: PropTypes.object.isRequired,
  menuItems: PropTypes.arrayOf(MenuItemRestaurant).isRequired,
};

export default MenuItemsRestaurant;
