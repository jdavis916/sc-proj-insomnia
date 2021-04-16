const mongoose = require('mongoose');
//const express = require('express');
var Schema = mongoose.Schema;
//helps passport work with mongoose
var passportLocalMongoose = require('passport-local-mongoose');
var User = new Schema({
	username: {
		type: String,
		unique: true
	},
	fname: {
		type: String	
	},
	lname: {
		type: String
	},
	dob: {
		type: Date
	},
	email:{
		type: String,
		unique: true
	},
	password: {
		type: String
	},
	role: {
		type: String,
		default: 'user'
	},
	projects: {
		type: String
	}

});

User.plugin(passportLocalMongoose);

module.exports = mongoose.model('users', User);










