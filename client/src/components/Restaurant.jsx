import React from 'react';
import PropTypes from 'prop-types';
import { Card, CardText } from 'material-ui/Card';
import { Link } from 'react-router-dom';

const restaurantBaseUrl = customerId => `/customer/${customerId}/restaurant`
const Restaurant = ({
  errors,
  id,
  address,
  phone,
  name,
  customerId,
}) => (
  <Card className="container">
    {errors && errors.summary && <p className="error-message">{errors.summary}</p>}

    {/* <h2 className="card-heading"><Link href={`/posts/${stringId}`}>{title}</Link></h2> */}
    <Link to={`${restaurantBaseUrl(customerId)}/${id}`}><h2 className="card-heading">{name}</h2></Link>
    {/* <h2 className="card-heading">{title}</h2> */}
    <p>Address: {address}</p>
    {/* <p>Phone: {phone}</p> */}

    <CardText>{phone}</CardText>

  </Card>
);

Restaurant.propTypes = {
  errors: PropTypes.object.isRequired,
  id: PropTypes.number.isRequired,
  address: PropTypes.string.isRequired,
  phone: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
};

export default Restaurant;
