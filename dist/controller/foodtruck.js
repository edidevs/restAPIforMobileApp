'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

exports.default = function (_ref) {
    var config = _ref.config,
        db = _ref.db;


    var api = (0, _express.Router)();

    //CRUD - CREATE Read, Update, and Delete 
    // '/v1/restaurant/add' - Create 

    api.get('/read', function (req, res) {

        res.send("hello read");
    });

    api.post('/add', function (req, res) {
        var newFoodTruck = new _foodtruck2.default();
        newFoodTruck.name = req.body.name;
        newFoodTruck.foodtype = req.body.foodtype;
        newFoodTruck.avgcost = req.body.avgcost;
        newFoodTruck.geometry.coordinates = req.body.geometry.coordinates;
        console.log("Post");
        newFoodTruck.save(function (err) {
            if (err) {
                console.log("Error saving " + err);
            }
            res.json({ message: "Restaurant saved successfully" });
            console.log("saved successfly post");
        });
    });
    // '/v1/restaurant/add' - Read 
    api.get('/', function (req, res) {
        _foodtruck2.default.find({}, function (err, foodtrucks) {

            if (err) {
                res.send(err);
            }

            res.json(foodtrucks);
        });
    });

    // '/v1/restaurant/:id' - Read 1
    api.get('/:id', function (req, res) {
        _foodtruck2.default.findById(req.params.id, function (err, foodtruck) {
            if (err) {
                res.send(err);
            }

            res.json(foodtruck);
        });
    });

    // '/v1/restaurant/:id' - update
    api.put('/:id', function (req, res) {
        _foodtruck2.default.findById(req.params.id, function (err, foodtruck) {
            if (err) {
                res.send(err);
            };
            foodtruck.name = req.body.name;
            foodtruck.save(function (err) {
                if (err) {
                    res.send(err);
                }
                res.json({ message: "Foodtruck info updated" });
            });
        });
    });

    // '/v1/restaurant/:id' - delete 

    api.delete('/:id', function (req, res) {

        _foodtruck2.default.remove({
            _id: req.params.id
        }, function (err, foodtruck) {
            if (err) {
                res.send(err);
            }

            res.json({ message: "Foodtruck succesfully removed" });
        });
    });

    // Add review for a specific foodtruck id 
    // '/v1/foodtruck/reviews/add:id'

    api.post('/reviews/add/:id', function (req, res) {
        _foodtruck2.default.findById(req.params.id, function (err, foodtruck) {
            if (err) {
                res.send(err);
            }

            var newReview = new _review2.default();

            newReview.title = req.body.title;
            newReview.text = req.body.text;
            newReview.foodtruck = foodtruck._id;

            var ftruck = foodtruck;

            newReview.save(function (err, review) {
                if (err) {
                    res.send("Error saving review " + err);
                }
                ftruck.reviews.push(newReview);
                ftruck.save(function (err) {
                    if (err) {
                        res.send(err);
                    }
                    res.json({ message: 'Food truck review saved' });
                });
            });
        });
    });

    // Get review for a specific foodtruck id 
    // '/v1/foodtruck/reviews/:id'
    api.get('/reviews/:id', function (req, res) {

        _review2.default.find({ foodtruck: req.params.id }, function (err, reviews) {
            if (err) {
                res.send(err);
            }

            res.json(reviews);
        });
    });

    return api;
};

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _express = require('express');

var _foodtruck = require('../model/foodtruck');

var _foodtruck2 = _interopRequireDefault(_foodtruck);

var _review = require('../model/review');

var _review2 = _interopRequireDefault(_review);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

;
//# sourceMappingURL=foodtruck.js.map