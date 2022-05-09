import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import Restaurants from '../components/Restaurants.jsx';

const GET_ALL_POSTS_URL = '/api/restaurants';

class AllRestaurantsPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      errors: {},
      restaurants: [],
      customerId: null,
    };
  }

  componentDidMount() {
    const paramCustomerId = this.props.match.params.customer_id;
    this.setState({
      customerId: paramCustomerId,
    })
    fetch(GET_ALL_POSTS_URL)
      .then((response) => {
        response.json()
          .then((responseJson) => {
            switch (response.status) {
              case 200: {
                this.setState({
                  errors: {},
                });

                localStorage.setItem('successMessage', responseJson.message);
                const possibleRestaurants = responseJson.restaurants;
                if (!_.isEmpty(possibleRestaurants) && Array.isArray(possibleRestaurants)) {
                  this.setState({
                    restaurants: possibleRestaurants,
                  });
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
              }
            }
          })
          .catch((error) => { throw error; });
      });
  }

  render() {
    return (
      <Restaurants
        errors={this.state.errors}
        restaurants={this.state.restaurants}
        customerId={this.state.customerId}
      />
    );
  }
}

export default AllRestaurantsPage;
