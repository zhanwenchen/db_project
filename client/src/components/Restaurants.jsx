import React from 'react';
import PropTypes from 'prop-types';
import Restaurant from './Restaurant.jsx';

const Restaurants = ({
  errors,
  restaurants,
  customerId
}) => (
  <div className="restaurants">
    {/* {errors.summary && <p className="error-message">{errors.summary}</p>} */}
    {restaurants.length === 0 && <p>There are currently no restaurants</p>}
    {restaurants.length > 0 && <p> what </p> &&
      restaurants.map(restaurant => (
        <Restaurant
          key={restaurant.id}
          errors={errors}
          id={restaurant.id}
          // author={`${restaurant.User.firstName} ${restaurant.User.lastName}`}
          address={restaurant.address}
          phone={restaurant.phone}
          name={restaurant.name}
          customerId={customerId}
        />
      ))
    }
  </div>
);

Restaurants.propTypes = {
  errors: PropTypes.object.isRequired,
  restaurants: PropTypes.arrayOf(Restaurant).isRequired,
};

export default Restaurants;
