import React from 'react';
import PropTypes from 'prop-types';
import { Card, CardText } from 'material-ui/Card';
import MenuItemReadOnly from './MenuItemReadOnly.jsx';


const OrderCustomer = ({
  errors,
  orderIdGroup,
}) => (
  <Card className="container">
    {errors && errors.summary && <p className="error-message">{errors.summary}</p>}

    <h2 className="card-heading">Order {orderIdGroup[0].orderId} from {orderIdGroup[0].restaurantName}</h2>
    {/* <h2 className="card-heading">{title}</h2> */}
    {/* <p>Phone: {notes}</p> */}
    <table>
      <tr>
        <th>Name</th>
        <th>Description</th>
        <th>Price</th>
        <th>Quantity</th>
        <th>Notes</th>
      </tr>
      {orderIdGroup.map((menuItem, index) => (
        <MenuItemReadOnly
          key={index}
          index={index}
          errors={errors}
          id={menuItem.menuItemId}
          description={menuItem.description}
          price={menuItem.price}
          name={menuItem.menuItemName}
          quantity={menuItem.quantity}
          notes={menuItem.notes}
        />
      ))}
    </table>
  </Card>
);
export default OrderCustomer;

//
// OrderCustomer.propTypes = {
//   errors: PropTypes.object.isRequired,
//   menuItemId: PropTypes.number.isRequired,
//   quantity: PropTypes.string.isRequired,
//   notes: PropTypes.string.isRequired,
//   restaurantName: PropTypes.string.isRequired,
// };
