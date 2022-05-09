import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import MenuItems from '../components/MenuItems.jsx';

const GET_RESTAURANT_MENU_ITEMS_URL = restaurant_id => `/api/restaurant/${restaurant_id}/inventory`;
const CREATE_ORDER_URL = customer_id => `/api/customer/${customer_id}/orders`;

class RestaurantMenuItemsPageCustomer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      errors: {},
      menuItems: [],
      orderedItems: [],
      restaurantId: null,
      customerId: null,
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
    if (['inventory', 'orderedQuantity', 'notes'].includes(event.target.name)) {
      let orderedItems = this.state.orderedItems;
      orderedItems[event.target.id][event.target.name] = event.target.value;
      this.setState({
        orderedItems,
      })
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
      ordered_items: this.state.orderedItems.map(orderedItem => ({
        inventory_id: orderedItem.inventoryId,
        quantity: orderedItem.orderedQuantity,
        notes: orderedItem.notes,
      })),
    };
    // console.log(`data is ${JSON.stringify(data)}`)

    const dataString = JSON.stringify(data);


    fetch(CREATE_ORDER_URL(this.state.customerId), {
      method: 'POST',
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
                // redirect to login
                const ordersUrl = `/customer/${this.state.customerId}/orders`;
                this.props.history.push(ordersUrl);
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
    const paramCustomerId = this.props.match.params.customer_id;
    this.setState({
      customerId: paramCustomerId,
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
                    orderedItems: possibleRestaurantMenuItems.map(menuItem => ({
                         inventoryId: menuItem.id,
                         quantity: null,
                         notes: null,
                       })
                    )
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
      <MenuItems
        errors={this.state.errors}
        menuItems={this.state.menuItems}
        orderedItems={this.state.orderedItems}
        onSubmit={this.processForm}
        onChange={this.handleInputChange}
      />
    );
  }
}

export default RestaurantMenuItemsPageCustomer;
