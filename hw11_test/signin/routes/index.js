var express = require('express');
var validator = require('../public/javascripts/validator.js');
var router = express.Router();
var debug = require('debug')('signup:');


/* GET home page. */
module.exports = function(db){
  var users;
  db.users.find(function(err, docs){
    users = docs;
    debug("users collection set up :", docs);
  });
  router.all('/', function(req, res, next){
    req.session.user? next() : res.redirect('/signin');
  })

  router.get('/', function(req, res, next){
    res.render('index', { title: 'Express' });
  });

  router.get('/signin', function(req, res, next){
    res.render('signin');
  })

  router.get('/signup', function(req, res, next){
    res.render('signup', {information:"请输入用户各信息"});
  })

  router.post('/signup', function(req, res, next){
    debug(req.body);
    var user = req.body;
    req.session.user = req.session.user || user;
    res.render('information', {user : req.session.user});
  })

  router.get('information', function(req, res, next){
    res.render('information', {user : user});
  })
  return router;
}
