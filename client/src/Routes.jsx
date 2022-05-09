/**
 * @file a central route configuring module for the client
 */
import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Base from './components/Base.jsx';
import Home from './components/Home.jsx';
import AllRestaurantsPage from './containers/AllRestaurantsPage.jsx';
import RestaurantMenuItemsPageCustomer from './containers/RestaurantMenuItemsPageCustomer.jsx';
import RestaurantMenuItemsPageRestaurant from './containers/RestaurantMenuItemsPageRestaurant.jsx';


// Orders
import GetOrdersPageCustomer from './containers/GetOrdersPageCustomer.jsx';

/**
 * @function bounceIfNotLoggedIn
 * @description a helper method that wraps around the React Router
 * "getComponent" route option (that replaces the "component" option)
 * callback that conditionally returns a component to the route
 * @param {React.Component} protectedComponent - a react component
 * @return {function} a react
 * @example {path: '/protected', getComponent: protectedComponent(ProtectedPage)}
 */
const bounceIfNotLoggedIn = protectedComponent =>
  (location, callback) => {
    if (Auth.isTokenExist()) {
      callback(null, protectedComponent);
    } else {
      callback(null, LoginPage);
    }
  };

const Routes = () => (
  <Base>
    <Switch>
      <Route exact path="/" render={Home} />
      <Route exact path="/customer/:customer_id/restaurants" component={AllRestaurantsPage} />
      <Route exact path="/customer/:customer_id/restaurant/:restaurant_id" component={RestaurantMenuItemsPageCustomer} />
      <Route exact path="/restaurant/:restaurant_id/inventory" component={RestaurantMenuItemsPageRestaurant} />
      <Route exact path="/customer/:customer_id/orders" component={GetOrdersPageCustomer} />
    </Switch>
  </Base>
);

export default Routes;
