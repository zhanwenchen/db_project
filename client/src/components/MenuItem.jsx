import React from 'react';
import PropTypes from 'prop-types';
import { Card, CardText } from 'material-ui/Card';
import { Link } from 'react-router-dom';
import TextField from 'material-ui/TextField';

const restaurantBaseUrl = `/menu-item`
const MenuItem = ({
  index,
  errors,
  id,
  restaurant_id,
  description,
  price,
  name,
  quantity,
  orderedQuantity,
  notes,
  onChange,
}) => (
  <Card className="container">
    {errors && errors.summary && <p className="error-message">{errors.summary}</p>}

    {/* <Link to={`${restaurantBaseUrl}/${id}`}><h2 className="card-heading">{name}</h2></Link> */}
    <p>{name}: {price}</p>
    <CardText>{description}</CardText>
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
    <input id={index} name="inventoryId" type="hidden" value={id} onChange={onChange}/>
    <label>Order Quantity:
      <input id={index} name="orderedQuantity" type="text" value={orderedQuantity} onChange={onChange}/>
    </label>
    <label>Notes:
      <input id={index} name="notes" type="text" value={notes} onChange={onChange}/>
    </label>
    {/* <input id={index} name="" type="text"/>
    <input id={index} name="" type="text"/> */}
  </Card>
);

MenuItem.propTypes = {
  errors: PropTypes.object.isRequired,
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  restaurant_id: PropTypes.number.isRequired,
  description: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  quantity: PropTypes.number.isRequired,
};

export default MenuItem;
