var mongoose=require('mongoose');
var bcrypt=require('bcryptjs');
//const mongooseFieldEncryption = require("mongoose-field-encryption").fieldEncryption;
//const enc=require('../enc-dec');

const secretOrPrivateKey="This is a secret key";

const userSchema=mongoose.Schema({
	fname:String,
	lname:String,
	dob:String,
	phone:String,
	gender:String,

	email:{
		type:String,
		unique:true,
		required:true
	},

	password:{
		required:true,
		type:String
	},

    createdDate:{
        type:Date,
        default:Date.now()
    },
});

userSchema.pre('save',function(next){  
	if (this.isModified('password')){
	  bcrypt.genSalt(10,(err,salt)=>{
		bcrypt.hash(this.password,salt,(err,hash)=>{
		  this.password=hash;
		  next();
		});
	  });
	}else{
	  next();
	}
  });
  
  userSchema.methods.saveRecord=function(){
  return   this.save().then((doc)=>{
	  return doc;
	},(err)=>{
	  return err;
	});
  };
  
module.exports = mongoose.model('user', userSchema);