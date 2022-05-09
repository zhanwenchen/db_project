import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import MenuItemsRestaurant from '../components/MenuItemsRestaurant.jsx';

const GET_RESTAURANT_MENU_ITEMS_URL = restaurant_id => `/api/restaurant/${restaurant_id}/inventory`;
const PUT_RESTAURANT_MENU_ITEMS_URL = GET_RESTAURANT_MENU_ITEMS_URL;

class RestaurantMenuItemsPageRestaurant extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      errors: {},
      menuItems: [],
      restaurantId: null,
    };

    this.processForm = this.processForm.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  /**
   * @function handleInputChange
   * @description Update the state.post object when user changes the form
   * @param {Object} event - the JavaScript event object
   */
  handleInputChange(event) {
    // console.log(`event.target=${event.target}`);
    // console.log(`event.target.id=${event.target.id}`);
    // console.log(`event.target.name=${event.target.name}`);
    // console.log(`event.target.value=${event.target.value}`);
    if (['description', 'price', 'name', 'quantity'].includes(event.target.name)) {
      let menuItems = this.state.menuItems;
      menuItems[event.target.id][event.target.name] = event.target.value;
      this.setState({
        menuItems,
      })
      console.log(JSON.stringify(menuItems));
    } else {
      console.log(`event.target.name=${[event.target.name]}`);
      this.setState({
        [event.target.name]: event.target.value,
      });
    }
  }

  /**
   * @function processForm
   * @description process the form
   * @param {Object} event - the JavaScript event Object
   */
  processForm(event) {
    // prevent default action. In this case, action is the form submission
    event.preventDefault();

    const data = {
      restaurant_id: this.state.restaurantId,
      menuItems: this.state.menuItems,
    };

    const dataString = JSON.stringify(data);

    // PUT Update menu items
    fetch(PUT_RESTAURANT_MENU_ITEMS_URL(this.state.restaurantId), {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        // Authorization: `Bearer ${Auth.getToken()}`,
      },
      body: dataString,
    })
      .then((response) => {
        response.json()
          .then((responseJson) => {
            switch (response.status) {
              case 200: {
                this.setState({
                  errors: {},
                });
                localStorage.setItem('successMessage', responseJson.message);
                // redirect to menu items
                window.location.reload();
                // this.props.history.push(GET_RESTAURANT_MENU_ITEMS_URL(this.state.restaurantId));
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
          });
      })
      .catch((error) => { throw error; });
  }

  componentDidMount() {
    const paramRestaurantId = this.props.match.params.restaurant_id;
    this.setState({
      restaurantId: paramRestaurantId,
    });
    // console.log(`Fetching from ${GET_RESTAURANT_MENU_ITEMS_URL(paramRestaurantId)}`);
    fetch(GET_RESTAURANT_MENU_ITEMS_URL(paramRestaurantId))
      .then((response) => {
        response.json()
          .then((responseJson) => {
            // console.log(`Response status is ${response.status}`);
            // console.log(`Response json is ${JSON.stringify(responseJson)}`);
            switch (response.status) {
              case 200: {
                this.setState({
                  errors: {},
                });

                localStorage.setItem('successMessage', responseJson.message);
                const possibleRestaurantMenuItems = responseJson.inventories;
                if (!_.isEmpty(possibleRestaurantMenuItems) && Array.isArray(possibleRestaurantMenuItems)) {
                  this.setState({
                    menuItems: possibleRestaurantMenuItems,
                  });
                } else {
                  // TODO: handle 404 error in the front-end
                  throw new TypeError('No menu items for this restaurant');
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
      <MenuItemsRestaurant
        errors={this.state.errors}
        menuItems={this.state.menuItems}
        onSubmit={this.processForm}
        onChange={this.handleInputChange}
      />
    );
  }
}

export default RestaurantMenuItemsPageRestaurant;
