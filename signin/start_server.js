http = require('http');
fs   = require('fs');
url  = require('url');
querystring = require('querystring');

var infoCircleStr = '<i class="fa fa-info-circle" aria-hidden="true"></i>';
var map = [];
map['jzljzl'] = {
	'username' : 'jzljzl',
	'id'       : '15331132',
	'phone'    : '13719338953',
	'email'	   : 'aaa@qq.com'
}
http.createServer(function(req, res){
	var css_re = /^\/css\//;
	var js_re = /^\/js\//;
	var font_re = /^\/fonts\//;
	pathName = url.parse(req.url).pathname;
	if (css_re.test(req.url) || js_re.test(req.url)){
		res.writeHead(200,{
			'Content-Type':"text/css; charset=utf-8"
		});
		var content = fs.readFileSync('./' + pathName, 'utf-8');
		res.end(content);
	}
	else if (font_re.test(req.url)){
		
		res.writeHead(200,{
			'Content-Type':"application/x-font-ttf"
		});
		var content = fs.readFileSync('./' + pathName, 'binary');
		res.end(content);
	}
	
	else if (req.url == "/favicon.ico"){
		res.end("no favicon");
		return;
	}
	else if (req.method == "GET"){
		console.log(req.url, req.method);
		res.writeHead(200,{
			'Content-Type':"text/html; charset=utf-8"
		});
		doGet(req, res);
	}
	else if (req.method == "POST"){
		var postdata = "";
		req.on("data",function(data){
			postdata += data;
		});
		req.on("end", function(){
			console.log(req.url, req.method, postdata);
			res.writeHead(200,{
				'Content-Type':"text/html; charset=utf-8"
			});
			doPost(req, res, querystring.parse(postdata));
		});
	}
	console.log(req.url);
	console.log('---------');
}).listen(8080);


function doGet(req, res, params){
	var params = querystring.parse(url.parse(req.url).query);
	console.log("params", params['username']);
	if (params && params['username']) 
		getWithUsername(req, res, params);
	else getWithoutUsername(req, res);
};

function getWithoutUsername(req, res){
	var content = fs.readFileSync('html/index.html', 'utf-8');
	content = content.replace('{{ alert }}', 'alert-info');
	content = content.replace('{{ information }}', '请填写<strong>用户名</strong>各项信息');
	res.end(content);
}

function getWithUsername(req, res, params){
	console.log(map[params['username']]);
	if (map[params['username']])
		 getWithUsernameSucceed(req, res, params);
	else getWithUsernameFail(req, res, params);
}

function getWithUsernameSucceed(req, res, params){
	var content = fs.readFileSync('html/user_information.html', 'utf-8');
	var user = map[params['username']];
	
	content = content.replace('{{ username }}', user.username);
	content = content.replace('{{ id }}', user.id);
	content = content.replace('{{ phone }}', user.phone);
	content = content.replace('{{ email }}', user.email);
	res.end(content);
}

function getWithUsernameFail(req, res, params){
	var content = fs.readFileSync('html/index.html', 'utf-8');
	
	content = content.replace('{{ alert }}', 'alert-danger');
	content = content.replace('{{ information }}', '<strong>不存在<strong>此用户名!');
	res.end(content);
}

function doPost(req, res, params){
	console.log("params:", params);
	for(username in map){
		var user = map[username];
		if (user.username == params.username
		 || user.id 	  == params.id
		 || user.phone 	  == params.phone
		 || user.email    == params.email){
			 doPostFail(res, params, user)
			 return;
		 }
		 
	}
	console.log("doPostSucceed");
	doPostSucceed(res, params);
}

function doPostSucceed(res, params){
	var content = fs.readFileSync('html/user_information.html', 'utf-8');
	map[params.username] = {
		'username' : params.username,
		'id'	   : params.id,
		'phone'	   : params.phone,
		'email'	   : params.email
	};
	
	content = content.replace('{{ username }}', params.username);
	content = content.replace('{{ id }}', params.id);
	content = content.replace('{{ phone }}', params.phone);
	content = content.replace('{{ email }}', params.email);
	res.end(content);
	
}

function doPostFail(res, params, user){
	var content = fs.readFileSync('html/index.html', 'utf-8');
	var duplicate = "";
	content = content.replace('{{ alert }}', 'alert-danger');
	if (user.username == params.username){
		duplicate += "<p><strong>用户名</strong>不可与已有的重复</p>";
	}
	if (user.id == params.id){
		duplicate += "<p><strong>学号</strong>不可与已有的重复</p>";
	}
	if (user.phone == params.phone){
		duplicate += "<p><strong>电话</strong>不可与已有的重复</p>";
	}
	if (user.email == params.email){
		duplicate += "<p><strong>邮箱</strong>不可与已有的重复</p>";
	}
	content = content.replace('{{ information }}', duplicate);
	res.end(content);
}
