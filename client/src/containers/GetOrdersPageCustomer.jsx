import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import OrdersCustomer from '../components/OrdersCustomer.jsx';

const GET_ORDERS_CUSTOMER_URL = customer_id => `/api/customer/${customer_id}/orders`;

const parse_orders = orderItems => {
  const flatOrders = orderItems.map((orderItem) => ({
    menuItemId: orderItem.menuItemId,
    quantity: orderItem.quantity,
    notes: orderItem.notes,
    orderId: orderItem.Order.orderId,
    menuItemName: orderItem.Inventory.menuItemName,
    restaurantName: orderItem.Inventory.restaurantName,
    menuItemId: orderItem.Inventory.menuItemId,
    price: orderItem.Inventory.price,
  }));
  return _.groupBy( flatOrders, 'orderId' );
};

class GetOrdersPageCustomer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      errors: {},
      ordersGrouped: [],
    };
  }

  componentDidMount() {
    const paramCustomerId = this.props.match.params.customer_id;
    fetch(GET_ORDERS_CUSTOMER_URL(paramCustomerId))
      .then((response) => {
        response.json()
          .then((responseJson) => {
            switch (response.status) {
              case 200: {
                this.setState({
                  errors: {},
                });

                localStorage.setItem('successMessage', responseJson.message);
                const possibleOrders = responseJson.orders;
                if (!_.isEmpty(possibleOrders) && Array.isArray(possibleOrders)) {
                  const parsed_orders = parse_orders(possibleOrders);
                  this.setState({
                    ordersGrouped: parsed_orders,
                  }, () => {console.log(`this.state = ${JSON.stringify(this.state)}`)});

                } else {
                  // TODO: handle 404 error in the front-end
                  throw new TypeError('post does not exist');
                }
                break;
              }
              default: {
                const errors = responseJson.errors ? responseJson.errors : {};
                errors.summary = responseJson.message;

                this.setState({
                  errors,
                });
                console.error(JSON.stringify(errors));
              }
            }
          })
          .catch((error) => { console.error(JSON.stringify(error)); throw error; });
      });
  }

  render() {
    return (
      <div>
      <p>render: this.state = {JSON.stringify(this.state)}</p>
      <OrdersCustomer
        errors={this.state.errors}
        ordersGrouped={this.state.ordersGrouped}
      />
    </div>
    );
  }
}

export default GetOrdersPageCustomer;
