var mongoose=require('mongoose');
var bcrypt=require('bcryptjs');
//const mongooseFieldEncryption = require("mongoose-field-encryption").fieldEncryption;
//const enc=require('../enc-dec');

const secretOrPrivateKey="This is a secret key";

const bloodSchema=mongoose.Schema({
	bloodgroup:String,
	locality:String,
    createdDate:{
        type:Date,
        default:Date.now()
    },
});

module.exports = mongoose.model('blood', bloodSchema);