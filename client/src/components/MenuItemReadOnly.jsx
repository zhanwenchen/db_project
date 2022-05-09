import React from 'react';
import PropTypes from 'prop-types';
import { Card, CardText } from 'material-ui/Card';
import { Link } from 'react-router-dom';
import TextField from 'material-ui/TextField';

const restaurantBaseUrl = `/menu-item`
const MenuItemReadOnly = ({
  index,
  errors,
  id,
  notes,
  description,
  price,
  name,
  quantity,
}) => (
  <Card className="container">
    {errors && errors.summary && <p className="error-message">{errors.summary}</p>}

    {/* <Link to={`${restaurantBaseUrl}/${id}`}><h2 className="card-heading">{name}</h2></Link> */}
    <tr>
      <td>{name}</td>
      <td>{description}</td>
      <td>{price}</td>
      <td>{quantity}</td>
      <td>{notes}</td>
    </tr>
    {/* <CardText>{description}</CardText> */}
    {/* <div className="field-line">
      <TextField
        floatingLabelText="Title"
        name="inventoryId"
        errorText={errors}
        onChange={onChange}
        value={id}
        id={index}
      />
    </div> */}
    {/* <div className="field-line">
      <TextField
        floatingLabelText="Quantity"
        name="orderedQuantity"
        errorText={JSON.stringify(errors)}
        onChange={onChange}
        value={orderedQuantity}
        id={index}
      />
    </div>
    <div className="field-line">
      <TextField
        floatingLabelText="Notes"
        name="notes"
        errorText={JSON.stringify(errors)}
        onChange={onChange}
        value={notes}
        id={index}
      />
    </div> */}
    {/* <input id={index} name="" type="text"/>
    <input id={index} name="" type="text"/> */}
  </Card>
);
//
// MenuItemReadOnly.propTypes = {
//   errors: PropTypes.object.isRequired,
//   id: PropTypes.number.isRequired,
//   name: PropTypes.string.isRequired,
//   restaurant_id: PropTypes.number.isRequired,
//   description: PropTypes.string.isRequired,
//   price: PropTypes.number.isRequired,
//   quantity: PropTypes.number.isRequired,
// };

export default MenuItemReadOnly;
