var express = require('express');
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
  var user = {
    "id" : 123
  }
  res.render('information', {user : user});
})
module.exports = router;
