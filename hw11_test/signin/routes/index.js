var express = require('express');
var validator = require('validator');
var router = express.Router();


/* GET home page. */
router.get('/', function(req, res, next) {
  console.log(req.query);
  res.render('index', { title: 'Express' });
});

router.get('/signup', function(req, res, next){
  res.render('signup', {information:"请输入用户各信息"});
})

router.post('/signup', function(req, res, next){
  var user = req.query;
  var errors = validator.user_valid();
  if (validator.user_valid())
  res.render('information', {user : user});
})

router.get('information', function(req, res, next){
  res.render('information', {user : user});
})
module.exports = router;
