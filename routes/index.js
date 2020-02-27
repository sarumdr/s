
const express = require('express');
const app= express();
const bodyParser = require('body-parser');
const bcrypt=require('bcryptjs');
const mongoose=require('mongoose');
const jwt=require('jsonwebtoken');

//app.set('views', __dirname + '/views');


let User=require('../model/user');
let Blood=require('../model/blood');


app.use(bodyParser.urlencoded({
	extended: true
}))

app.get('/register',(req,res)=>{
	res.render("signup.ejs");
});

app.get('/',(req,res)=>{
	res.render("login.ejs");
});


// app.post('/register',(req,res)=>{
// //console.log("req.body",req.body)
// 	let user=new User({
// 	fname:req.body.fname,
// 	lname:req.body.lname,
// 	dob:req.body.dob,
// 	phone:req.body.phone,
// 	gender:req.body.gender,
// 	email:req.body.email,
// 	password:req.body.password
// });

// 	if(user){
// 	user.saveRecord().then((doc,err)=>{
// 	 console.log("done",doc);
// 	});
// }
//   else{
//    console.log(err);
//   }
	
// });
app.get('/home',(req,res)=>{
	res.render('home.ejs');
})
app.post("/register", (req, res, next) => {
	User.find({ email: req.body.email })
	  .exec()
	  .then(user => {
		if (user.length >= 1) {
		  return res.status(409).json({
			message: "Mail exists"
		  });
		} else {
		  bcrypt.hash(req.body.password, 10, (err, hash) => {
			if (err) {
			  return res.status(500).json({
				error: err
			  });
			} else {
			  const user = new User({
				_id: new mongoose.Types.ObjectId(),
				email: req.body.email,
				password: hash
			  });
			  user
				.save()
				.then(result => {
				  console.log(result);
				  res.status(201).json({
					message: "User created"
				  });
				})
				.catch(err => {
				  console.log(err);
				  res.status(500).json({
					error: err
				  });
				});
			}
		  });
		}
	  });
  });

app.post("/login", (req, res, next) => {
	let SECRET_KEY="tHIS IS SECRET";
	console.log(req.body);
	User.findOne({'email':req.body.email},function(err,user){
	// User.findOne({ 'email': req.body.email })
	//   .exec()
	//   .then(user => {
	 console.log("fhdfh");
		  console.log(user);
		  console.log(user.password);
		  console.log(req.body.password);
		if (user.length < 1) {
		  return res.status(401).json({
			message: "Auth failed"
		  });
		}

		// let comparePassword = bcrypt.compareSync(req.body.password, user.password);
		// console.log(comparePassword);
		 bcrypt.compare(req.body.password,user.password, (err, result) => {
			console.log(result);
			//result=true;
		  if (err) {
			return res.status(401).json({
			  message: "Auth failed1"
			});
		  }
		  if (result) {
			  console.log(result);
			  
			const token = jwt.sign(
			  {
				email: user.email,
				userId: user._id,
			  },
			  SECRET_KEY,
			  {
				  expiresIn: "1h"
			  }
			);
			return res.status(200).json({
			  message: "Auth successful",
			  token: token,
			  
			});
			res.render('home.ejs');
		  }
		  res.status(401).json({
			message: "Auth failed2"
		  });
		});
	  })
	//   .catch(err => {
	// 	console.log(err);
	// 	res.status(500).json({
	// 	  error: err
	// 	});
	//   });
  });


  app.post('/donate',(req,res)=>{

	
		let blood=new Blood({
			bloodgroup:req.body.bloodgroup,
			locality:req.body.locality,
		
			});
	
		let promise = blood.save()
		promise.then((blood)=>{
			console.log(blood);
			res.redirect('/');
			//res.send({status:"done"})
		})
	
	});
	
	
	
module.exports = app;