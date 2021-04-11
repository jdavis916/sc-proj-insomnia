var express = require('express');
var router = express.Router();

function loginStatus(req){
	return (req.user)? true : false;
}

/* GET admin dashboard */
router.get('/', function(req, res, next) {
  res.render('adminDashboard', { 
  	layout: 'mainAdmin.hbs',
  	title: 'Admin Section',
  	loggedIn: loginStatus(req),
  	msg: 'This is where your dashboard for the admins would go',
  	pageMainClass: 'pgAdminDashboard'
  });
});

module.exports = router;
