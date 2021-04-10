const mongoose = require('mongoose');
//const express = require('express');

const UserSchema = new mongoose.schema({
	fname: {
		type: String	
	},
	lname: {
		type: String
	},
	dob: {
		type: Date
	}
	email:{
		type: String,
		unique: true
	},
	pw: {
		type: String
	},
	role: {
		type: String
	},
	projects: {
		type: String
	}

});

var userModel = mongoose.model("users", UserSchema);
module.exports = userModel;










