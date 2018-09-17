import mongoose from 'mongoose'; 

import { Router } from 'express'; 

import FoodTruck from '../model/foodtruck'; 
import Review from '../model/review'; 

export default function ({config, db}) {

    let api = Router(); 

    //CRUD - CREATE Read, Update, and Delete 
    // '/v1/restaurant/add' - Create 
    
    api.get('/read', (req, res) => {

        res.send("hello read");
    });

    api.post('/add', (req, res) => {
        let newFoodTruck = new FoodTruck(); 
        newFoodTruck.name = req.body.name; 
        newFoodTruck.foodtype = req.body.foodtype;
        newFoodTruck.avgcost = req.body.avgcost;
        newFoodTruck.geometry.coordinates = req.body.geometry.coordinates; 
        console.log("Post"); 
        newFoodTruck.save(err => {
            if(err){
                console.log("Error saving " + err)
            }
            res.json({message: "Restaurant saved successfully"}); 
            console.log("saved successfly post");
        });



       
    }); 
    // '/v1/restaurant/add' - Read 
    api.get('/', (req,res) => {
        FoodTruck.find({}, (err, foodtrucks) => {

            if(err){
                res.send(err);
            }

            res.json(foodtrucks);
        });

    });

     // '/v1/restaurant/:id' - Read 1
     api.get('/:id', (req, res) => {
        FoodTruck.findById(req.params.id, (err, foodtruck) => {
            if(err){
                res.send(err);
            }

            res.json(foodtruck); 

        });
     });  

     // '/v1/restaurant/:id' - update
     api.put('/:id', (req, res) => {
        FoodTruck.findById(req.params.id, (err, foodtruck) => {
            if(err){
                res.send(err); 
            }; 
            foodtruck.name = req.body.name; 
            foodtruck.save( err => {
                if(err){
                    res.send(err);
                }
                res.json({message: "Foodtruck info updated"});
            }); 
        });
     }); 

     // '/v1/restaurant/:id' - delete 

     api.delete('/:id', (req, res) => {

        FoodTruck.remove({
            _id : req.params.id
        }, (err, foodtruck) => {
            if(err){
                res.send(err); 
            }

            res.json({message:"Foodtruck succesfully removed"}); 
        });
     });

     // Add review for a specific foodtruck id 
     // '/v1/foodtruck/reviews/add:id'

     api.post('/reviews/add/:id', (req, res) => {
        FoodTruck.findById(req.params.id, (err, foodtruck) => {
            if(err){
                res.send(err);
            }

            let newReview = new Review();

            newReview.title = req.body.title; 
            newReview.text = req.body.text; 
            newReview.foodtruck = foodtruck._id; 

            let ftruck = foodtruck; 

            newReview.save((err, review) => {
                if(err){
                    res.send("Error saving review " + err); 
                }
                ftruck.reviews.push(newReview);
                ftruck.save(err => {
                    if(err){
                        res.send(err);
                    }
                    res.json({message: 'Food truck review saved'});
                });

                

            });
        });
     });

     // Get review for a specific foodtruck id 
     // '/v1/foodtruck/reviews/:id'
     api.get('/reviews/:id', (req, res) => {

        Review.find({foodtruck: req.params.id}, (err, reviews) => {
            if(err){
                console.log("Error get review " + err); 
            }

            res.json(reviews); 
        }); 
     });


    return api; 
}; 