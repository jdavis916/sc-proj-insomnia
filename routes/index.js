var express = require('express');
var router = express.Router();
import User from "../backend/models/user";
var passport = require('passport');
const mongoose = require('mongoose');
var db = mongoose.connection;

var activeMenu = {
    home: false,
    projects: false,
    users: false,
    tools: false,
    teams: false,
    search: false,
    contact: false,
};

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
  	pageMainClass: 'pgHome',
    active: getMenuActive('home', activeMenu)
  });
})
.get('/projects', function(req, res, next) {
  res.render('projects', {
  	title: 'Projects',
  	msg: 'This sample template should help get you on your way.',
  	pageMainClass: 'pgProjects',
    active: getMenuActive('projects', activeMenu)
  });
})
.get('/users', function(req, res, next) {
  res.render('users', {
    title: 'Users',
    msg: 'This sample template should help get you on your way.',
    pageMainClass: 'pgTools',
    active: getMenuActive('users', activeMenu)
  });
})
.get('/tools', function(req, res, next) {
  res.render('tools', {
  	title: 'Tools',
  	msg: 'This sample template should help get you on your way.',
  	pageMainClass: 'pgTools',
    active: getMenuActive('tools', activeMenu)
  });
})
.get('/teams', function(req, res, next) {
  res.render('teams', {
    title: 'Teams',
    msg: 'This sample template should help get you on your way.',
    pageMainClass: 'pgTeams',
    active: getMenuActive('teams', activeMenu)
  });
})
.get('/search', function(req, res, next) {
  res.render('search', {
  	title: 'Search',
  	msg: 'This sample template should help get you on your way.',
  	pageMainClass: 'pgSearch',
    active: getMenuActive('search', activeMenu)
  });
})
.get('/profile', function(req, res, next) {
  res.render('profile', {
  	title: 'User Profile',
  	msg: 'This sample template should help get you on your way.',
  	pageMainClass: 'pgProfile',
    active: getMenuActive('profile', activeMenu)
  });
})
.get('/contact', function(req, res, next) {
  res.render('contact', {
  	title: 'Contact Us',
  	msg: 'This sample template should help get you on your way.',
  	pageMainClass: 'pgContact',
    active: getMenuActive('contact', activeMenu)
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





module.exports = router;
