/* var express = require('express');
var router = express.Router();
var User = require("../backend/models/user");
var passport = require('passport'); */


console.log('Admin area only: Connected');
window.addEventListener('DOMContentLoaded', (event) => {
    console.log('DOM fully loaded and parsed');
    
	document.querySelector('#btnLogout').onclick = function logout(){
		if(loggedIn){
			this.innerHTML = 'Logout';
		//true
		   location.replace('/logout');
		} else{
		//false
			this.innerHTML = 'Sign in';
			location.replace('/login');
		}
	}
});