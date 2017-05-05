const Sequelize = require('sequelize');
const db = require('./db');

const Place = require('./place');
const Activity = require('./activity');
const Hotel = require('./hotel');
const Restaurant = require('./restaurant');

Hotel.belongsTo(Place);
Activity.belongsTo(Place);
Restaurant.belongsTo(Place);

module.exports = {
  db: db,
  Place: Place,
  Hotel: Hotel,
  Activity: Activity,
  Restaurant: Restaurant
};
