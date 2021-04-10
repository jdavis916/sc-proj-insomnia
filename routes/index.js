//import userModel from "../backend/models/users";
//const mongoose = require('mongoose');
var express = require('express');
var router = express.Router();
 
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
router.get('/', function(req, res, next) {
  res.render('index', { 
  	title: 'Project Insomnia',
  	msg: 'This sample template should help get you on your way.',
  	pageMainClass: 'pgHome',
    active: getMenuActive('home', activeMenu)
  });
})
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






module.exports = router;
