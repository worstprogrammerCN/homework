var mongojs = require('mongojs')
var db = mongojs('signin', ['users']);

db.users.find(function (err, docs) {
    console.log(docs);
	db.close();
})


