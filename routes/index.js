var express = require('express');
var router = express.Router();
import User from "../backend/models/user";
var passport = require('passport');
const mongoose = require('mongoose');
var db = mongoose.connection;
/* GET home page */
router
	.get('/', function(req, res, next) {
	  	res.render('index', { 
		  	title: 'Simple Node Template',
		  	msg: 'This sample template should help get you on your way.',
		  	pageMainClass: 'pgHome'
	  	});
	})
	.get('/projects', function(req, res, next) {
	  res.send('Projects page')
	})
	.get('/featured', function(req, res, next) {
	  res.send('Featured page')
	})
	.get('/search', function(req, res, next) {
	  res.send('Search page')
	})
	.get('/contactUs', function(req, res, next) {
	  res.send('Contact page')
	})
	.get('/users', function(req, res, next) {
	  res.send('Users page')
	})
	.post('/signup', (req, res, next) => {
		//takes in a username and password and stores it to the database
	  	User.register(new User({
	  		username: req.body.username,
	  		email: req.body.email,
	  		fname: req.body.fname,
	  		lname: req.body.lname,
	  		dob: req.body.dob,
	  		password: req.body.password,
	  		projects: req.body.projects
	  	}), 
	    req.body.password, (err, user) => {
	    	//displays an error message if the request fails
		    if(err) {
		    	console.log(err);
		      res.statusCode = 500;
		      res.setHeader('Content-Type', 'application/json');
		      res.json({err: err});
		    }
		    //displays a 'success' message if the request went through
		    else {
		    //checks the information before sending it through
		      passport.authenticate('local')(req, res, () => {
		        res.statusCode = 200;
		        res.setHeader('Content-Type', 'application/json');
		        res.json({success: true, status: 'Registration Successful!'});
		      });
		    }
	 	});
	})
	//checks the username and password against entries in the database
	//also assigns session id
	.post('/login', passport.authenticate('local'), (req, res) => {
		console.log(req.session);
		res.statusCode = 200;
		res.setHeader('Content-Type', 'application/json');
		res.json({success: true, status: 'You are successfully logged in!'});
	})
	//clears session info and redirects to the home page
	.get('/logout', (req, res) => {
		if (req.session) {
		  req.session.destroy();
		  res.clearCookie('session-id');
		  res.redirect('/');
		}
		else {
		  var err = new Error('You are not logged in!');
		  err.status = 403;
		  next(err);
		}
	});
	
/* .post('/messages', function(req, res, next) {

}) */





module.exports = router;
