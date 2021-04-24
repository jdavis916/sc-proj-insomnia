var express = require('express');
var router = express.Router();
import { 
  permEditPost,
  permDelPost,
  permProfile,
  permProject,
  viewMessages,
  adminMessages,
  delComment
   } from '../permissions/perms';

import { authUser, authRole, authBan } from '../basicAuth';
import User from "../backend/models/user";
var passport = require('passport');
const mongoose = require('mongoose');
var db = mongoose.connection;


/* **TEST ACCOUNTS FOR SITE:**
    USER: {
      username: User,
      password: user
    },
    ADMIN {
      username: Admin,
      password: admin
    } */


var activeMenu = {
    home: false,
    projects: false,
    users: false,
    tools: false,
    teams: false,
    search: false,
    contact: false,
};
//fabricated array of projects
const stubProjList = ['Enterprise Venture','Infrastructure Plan','Photoshoot','Sculpture Project','Charity Event'];

//restricts access to a page based on role (these will be changed and implemented later)
/* function authGetProject(req, res, next){
	if (!canViewProject(req.user, req.project)) {
		res.status(401);
		return res.send('Not Allowed');
	}

	next();
};
function authDeleteProject(req, res, next){
	if (!canDeleteProject(req.user, req.project)) {
		res.status(401);
		return res.send('Not Allowed');
	}

	next();
}; */

//checks to see if a user is logged in on your machine
function loginStatus(req){
	return (req.user)? true : false;
}

//grabs user's first name
function whoIs(req){
  if(req.user){
  return (req.user.fname);
  }
}

function getMenuActive(key, menu){
    //makes a copy of the menu object
    var activeMenu = JSON.parse(JSON.stringify(menu));
    // var activeMenu = menu;

    //changed the proper key to true based on page route
    activeMenu[key] = true;

    return activeMenu;
}

/* GET home page */
router
    .get('/', function(req, res, next) {
    res.render('index', {
  	title: 'Project Insomnia',
  	msg: 'This sample template should help get you on your way.',
  	loggedIn: loginStatus(req),
    who: whoIs(req),
  	pageMainClass: 'pgHome',
    active: getMenuActive('home', activeMenu)
  });
})
.get('/projects', function(req, res, next) {
  try{
    var result = [];
    if(!req.user){
      db.collection('users').find({role: 'user'}).toArray(function(err, resp){
        console.log(resp);

      });
    }else if(req.user.role === 'user'){
      db.collection('users').find({});
    }
    res.render('projects', {
    	title: 'Projects',
    	msg: 'This sample template should help get you on your way.',
    	loggedIn: loginStatus(req),
      who: whoIs(req),
    	pageMainClass: 'pgProjects',
    	projList: stubProjList,
      active: getMenuActive('projects', activeMenu)
    });
  }catch(error){

  }
})
.get('/users', authUser, function(req, res, next) {
  try{
    db.collection('users').find({}).toArray(function(err, resp){
      console.log(resp);
      res.render('users', {
        title: 'Users',
        msg: 'This sample template should help get you on your way.',
        response: resp,
        loggedIn: loginStatus(req),
        who: whoIs(req),
        pageMainClass: 'pgTools',
        active: getMenuActive('users', activeMenu)
      });
    });
  }catch(error){
    res.render('errPageGeneral', {pageMainClass: 'errPageGeneral', path: path});
  }
  /* res.render('users', {
    title: 'Users',
    msg: 'This sample template should help get you on your way.',
    loggedIn: loginStatus(req),
    who: whoIs(req),
    pageMainClass: 'pgTools',
    active: getMenuActive('users', activeMenu)
  }); */
})
.get('/tools', function(req, res, next) {
  res.render('tools', {
  	title: 'Tools',
  	msg: 'This sample template should help get you on your way.',
  	loggedIn: loginStatus(req),
    who: whoIs(req),
  	pageMainClass: 'pgTools',
    active: getMenuActive('tools', activeMenu)
  });
})
.get('/teams', function(req, res, next) {
  res.render('teams', {
    title: 'Teams',
    msg: 'This sample template should help get you on your way.',
    loggedIn: loginStatus(req),
    who: whoIs(req),
    pageMainClass: 'pgTeams',
    active: getMenuActive('teams', activeMenu)
  });
})
.get('/search', function(req, res, next) {
  res.render('search', {
  	title: 'Search',
  	msg: 'This sample template should help get you on your way.',
  	loggedIn: loginStatus(req),
    who: whoIs(req),
  	pageMainClass: 'pgSearch',
    active: getMenuActive('search', activeMenu)
  });
})
.get('/signup', function(req, res, next) {
  res.render('signup', {
    title: 'Sign Up',
    msg: 'This sample template should help get you on your way.',
    loggedIn: loginStatus(req),
    who: whoIs(req),
    pageMainClass: 'pgSignup',
    active: getMenuActive('signup', activeMenu)
  });
})

//later on, this route will contain middleware the redirects to a user's own profile
.get('/profile', authUser, function(req, res, next) {
  var path = '/login';
  /* if (!errors.isEmpty()) {
    res.render('notAuth', {pageMainClass: 'notAuth', path: path});
  } */

  res.render('profile', {
  	title: 'User Profile',
  	msg: 'This sample template should help get you on your way.',
  	loggedIn: loginStatus(req),
    who: whoIs(req),
  	pageMainClass: 'pgProfile',
    active: getMenuActive('profile', activeMenu)
  });
})
.get('/contact', function(req, res, next) {
  res.render('contact', {
  	title: 'Contact Us',
  	msg: 'This sample template should help get you on your way.',
  	loggedIn: loginStatus(req),
    who: whoIs(req),
  	pageMainClass: 'pgContact',
    active: getMenuActive('contact', activeMenu)
  });
})
.get('/login', function(req, res, next) {
  //checks to see if a user is logged in
	if(req.user){
		res.send('You are already logged in!');
	}
  res.render('login', {
  	title: 'Log in',
  	loggedIn: loginStatus(req),
    who: whoIs(req),
  	pageMainClass: 'pgLogin',
  	usernameLabel: 'Username',
  	passwordLabel: 'Password',
  	logBtnLabel: 'Log In',
    active: getMenuActive('login', activeMenu)
  });
})
.get('/signup', function(req, res, next) {
  res.render('signup', {
  	title: 'Sign up',
  	msg: "Don't worry, we will not share this information with anyone.",
  	pageMainClass: 'pgSignUp',
  	fnameLabel: 'Enter your first name:',
	  lnameLabel: 'Enter your last name:',
	  emailLabel: 'Enter your email address:',
	  dobLabel: 'Select your date of birth:',
	  projectsLabel: 'What projects are you working on?',
	  usernameLabel: 'Enter a username:',
	  passwordLabel: 'Choose a password:',
    active: getMenuActive('signup', activeMenu)
  });
})
.post('/contactSubmit', function(req, res, next) {
  console.log(req.body);
})
.post('/messages', function(req, res, next) {

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
        //redirects to error page if the request fails
        if(err) {
          console.log(err);
          //res.statusCode = 500;
          res.setHeader('Content-Type', 'application/json');
          var path = '/signup';
          res.render('errPage', {pageMainClass: 'errPage', path: path});
        }
        //displays a 'success' message if the request went through
        else {
          //checks the information before sending it through
          passport.authenticate('local', { failureRedirect: '/errPage' })(req, res, () => {
            res.setHeader('Content-Type', 'application/json');
            res.redirect('/');
          });
        }
      });
})
/* checks the username and password against entries in the database
also assigns session id
redirects to an error page if it fails */
.post('/login', passport.authenticate('local', { failureRedirect: '/errPageLogin' }), authBan, (req, res) => {
  //console.log(req.session);
	try{
 		console.log(JSON.stringify(req.headers));
 		res.statusCode = 200;
 		res.setHeader('Content-Type', 'application/x-www-form-urlencoded');
 		res.redirect('/profile');
 		window.location.reload();
 	}catch(err){
 	  var path = '/login';
    res.render('errPage', {pageMainClass: 'errPage', path: path});
  } 	
})
.post('/createProfile', authUser, passport.authenticate('local'), (req, res) => {
  //console.log(req.session);
  try{
    
    
  }catch(err){
    var path = '/createProfile';
    res.render('notAuth', {pageMainClass: 'notAuth', path: path});
  }
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
})
//general redirect page when a route returns 403
.get('/notAuth', function(req, res, next) {
  res.render('notAuth', {
    title: 'Not Authorized',
    msg: 'This sample template should help get you on your way.',
    loggedIn: loginStatus(req),
    who: whoIs(req),
    pageMainClass: 'notAuth'
  });
})
//general redirect page when a route returns 500
.get('/errPage', function(req, res, next) {
  res.render('errPage', {
    title: 'Error!',
    msg: 'This sample template should help get you on your way.',
    loggedIn: loginStatus(req),
    who: whoIs(req),
    pageMainClass: 'errPage'
  });
});





module.exports = router;
