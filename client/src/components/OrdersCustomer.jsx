import React from 'react';
import PropTypes from 'prop-types';
import OrderCustomer from './OrderCustomer.jsx';

const OrdersCustomer = ({
  errors,
  ordersGrouped,
}) => (
  <div className="ordersGrouped">
    {alert(`OrdersCustomer: ordersGrouped=${JSON.stringify(ordersGrouped)}`)}
    {ordersGrouped.length === 0 && <p>There are currently no ordersGrouped</p>}
    {ordersGrouped.length > 0 && <p> what </p> &&
      Object.fromEntries(Object.entries(ordersGrouped)).map(orderIdGroup => (
        <OrderCustomer
          key={order.orderId}
          errors={errors}
          orderIdGroup={orderIdGroup}
        />
      ))
    }
  </div>
);

export default OrdersCustomer;


// orderId={order.orderId}
// // author={`${order.User.firstName} ${order.User.lastName}`}
// menuItemName={order.menuItemName}
// phone={order.phone}
// name={order.name}
// customerId={customerId}

// OrdersCustomer.propTypes = {
//   errors: PropTypes.object.isRequired,
//   ordersGrouped: PropTypes.arrayOf(OrderCustomer).isRequired,
// };
