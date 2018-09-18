import mongoose from 'mongoose'; 
const Schema = mongoose.Schema; 

import passportLocalMongoose  from 'passport-local-mongoose';
import foodtruck from '../controller/foodtruck';

let Account = new Schema ({
    email : {
        type : String,
        required: true
         
    },
    password : {
        type: String,
        required: true
    }

});

Account.plugin(passportLocalMongoose); 
module.exports = mongoose.model('Account', foodtruck({config, db}));

