import { Card, CardTitle } from 'material-ui/Card';
import React from 'react';
import Restaurants from '../containers/AllRestaurantsPage.jsx';

const Home = () => (
  <Card className="container">
    <CardTitle title="React Blog" subtitle="Blog Home" />
    <Restaurants />
  </Card>
);

export default Home;
