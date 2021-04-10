//import userModel from "../backend/models/users";
//const mongoose = require('mongoose');
var express = require('express');
var router = express.Router();
 
var activeMenu = {
    home: false,
    cars: false,
    search: false,
    survey: false,
    about: false,
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
  	title: 'Simple Node Template',
  	msg: 'This sample template should help get you on your way.',
  	pageMainClass: 'pgHome',
    active: getMenuActive('home', activeMenu)
  });
})
.get('/projects', function(req, res, next) {
  res.render('index', { 
  	title: 'Projects',
  	msg: 'This sample template should help get you on your way.',
  	pageMainClass: 'pgProjects',
    active: getMenuActive('home', activeMenu)
  });
})
.get('/tools', function(req, res, next) {
  res.render('index', { 
  	title: 'Tools',
  	msg: 'This sample template should help get you on your way.',
  	pageMainClass: 'pgTools',
    active: getMenuActive('home', activeMenu)
  });
})
.get('/search', function(req, res, next) {
  res.render('index', { 
  	title: 'Search',
  	msg: 'This sample template should help get you on your way.',
  	pageMainClass: 'pgSearch',
    active: getMenuActive('home', activeMenu)
  });
})
.get('/teams', function(req, res, next) {
  res.render('index', { 
    title: 'Teams',
    msg: 'This sample template should help get you on your way.',
    pageMainClass: 'pgTeams',
    active: getMenuActive('home', activeMenu)
  });
})
.get('/profile', function(req, res, next) {
  res.render('index', { 
  	title: 'Simple Node Template',
  	msg: 'This sample template should help get you on your way.',
  	pageMainClass: 'pgProfile',
    active: getMenuActive('home', activeMenu)
  });
})
.get('/contact', function(req, res, next) {
  res.render('index', { 
  	title: 'Simple Node Template',
  	msg: 'This sample template should help get you on your way.',
  	pageMainClass: 'pgContact',
    active: getMenuActive('home', activeMenu)
  });
})
.post('/contactSubmit', function(req, res, next) {
  console.log(req.body);
})
.post('/messages', function(req, res, next) {

})






module.exports = router;
