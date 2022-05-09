import React from 'react';
import PropTypes from 'prop-types';
import { Card, CardText } from 'material-ui/Card';
import { Link } from 'react-router-dom';
import TextField from 'material-ui/TextField';

const MenuItemRestaurant = ({
  index,
  errors,
  id,
  restaurant_id,
  description,
  price,
  name,
  quantity,
  onChange,
}) => (
  <Card className="container">
    {errors && errors.summary && <p className="error-message">{errors.summary}</p>}

    <p>{name}: {price} ({quantity} available)</p>
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
    <label>Name:
      <input id={index} name="name" type="text" value={name} onChange={onChange}/>
    </label>
    <label>Description:
      <input id={index} name="description" type="text" value={description} onChange={onChange}/>
    </label>
    <label>Price:
      <input id={index} name="price" type="text" value={price} onChange={onChange}/>
    </label>
    <label>Quantity:
      <input id={index} name="quantity" type="text" value={quantity} onChange={onChange}/>
    </label>
    {/* <input id={index} name="" type="text"/>
    <input id={index} name="" type="text"/> */}
  </Card>
);

MenuItemRestaurant.propTypes = {
  errors: PropTypes.object.isRequired,
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  restaurant_id: PropTypes.number.isRequired,
  description: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  quantity: PropTypes.number.isRequired,
};

export default MenuItemRestaurant;
