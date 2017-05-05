const express = require ('express');
const router = express.Router();
const db = require('../models');
const Hotel = require('../models/hotel');
const Place = require('../models/place');
const Restaurant = require('../models/restaurant')
const Activity = require('../models/activity');
const Promise = require('bluebird');
module.exports = router;


router.get('/', function(req, res, next){
  var hotelPromise = Hotel.findAll();
  var restaurantPromise = Restaurant.findAll();
  var activityPromise = Activity.findAll();
  Promise.all([hotelPromise, restaurantPromise, activityPromise]).then(function(promiseArray){
    console.log(promiseArray[0]);
    res.render('index', {
      templateHotels: promiseArray[0],
      templateRestaurants: promiseArray[1],
      templateActivities: promiseArray[2]
    })
  })
  // res.send("something to test");
});
