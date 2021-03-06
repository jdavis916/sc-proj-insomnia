var express = require('express');
var router = express.Router();
import { authUser, authRole } from '../basicAuth';
import { canViewProject, canDeleteProject, scopedProjects, canViewPageAdmin } from '../permissions/perms';
import User from "../backend/models/user";
var passport = require('passport');
const mongoose = require('mongoose');
//var db = mongoose.connection;

function loginStatus(req){
	return (req.user)? true : false;
}

/* GET admin dashboard */
router.get('/', authUser, authRole('admin'), function(req, res, next) {
  res.render('adminDashboard', { 
  	layout: 'mainAdmin.hbs',
  	title: 'Admin Section',
  	loggedIn: loginStatus(req),
  	msg: 'This is where your dashboard for the admins would go',
  	pageMainClass: 'pgAdminDashboard'
  });
});

module.exports = router;
