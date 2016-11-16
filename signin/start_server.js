//homework9 signin 
//服务器
//功能 : 可登陆查看用户信息或注册
http = require('http');
fs   = require('fs');
url  = require('url');
querystring = require('querystring');
mime = require('mime');



// param map : 以username-user的Key-value形式保存用户的信息
var map = JSON.parse(fs.readFileSync('data/users.json'));
http.createServer(function(req, res){
	//param xxx_re   : 匹配请求xxx的域名的正则表达式(xxx为代指)
	//param pathName : 请求的路径名
	//根据css、img、font和js文件的请求返回相应文件
	//对"/"域名的请求分别进行GET和POST的处理

	//处理对"/"的POST请求中:
	//param postdata : 请求的数据
	var css_re = /^\/css\//;
	var js_re = /^\/js\//;
	var font_re = /^\/fonts\//;
	var img_re = /^\/image\//;
	var get_re = /^\/(\?username=)?\w*/;
	pathName = url.parse(req.url).pathname;
	if (css_re.test(req.url) || js_re.test(req.url) || font_re.test(req.url) || img_re.test(req.url)){
		var content = fs.readFileSync('./' + pathName);
		res.writeHead(200,{
			'Content-Type':mime.lookup(pathName)
		});
		res.end(content);
	}
	else if (req.url == "/favicon.ico"){
		res.end("no favicon");
		return;
	}
	else if (get_re.test(req.url)){
		if (req.method == "GET"){
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
	}
	
	console.log(req.url);
	console.log('---------');
}).listen(8080);

process.on("SIGINT", function(){
	//退出时保存用户信息到json文件
	map = JSON.stringify(map);
	console.log(map);
	fs.writeFileSync('data/users.json', map);
	process.exit();
})


function doGet(req, res, params){
	//根据参数是否含有username执行相应函数
	var params = querystring.parse(url.parse(req.url).query);
	console.log("params", params['username']);
	if (params['username']) 
		getWithUsername(req, res, params);
	else getWithoutUsername(req, res);
};

function getWithoutUsername(req, res){
	//进入注册界面
	var content = fs.readFileSync('html/index.html', 'utf-8');
	content = content.replace('{{ alert }}', 'alert-info');
	content = content.replace('{{ information }}', '<p class="info">请填写<strong>用户名</strong>各项信息</p>');
	res.end(content);
}

function getWithUsername(req, res, params){
	//根据是否有该用户执行相应函数
	console.log("username", map[params['username']]);
	if (map[params['username']])
		 getWithUsernameSucceed(req, res, params);
	else getWithUsernameFail(req, res, params);
}

function getWithUsernameSucceed(req, res, params){
	//进入用户详情界面,显示用户信息
	var content = fs.readFileSync('html/user_information.html', 'utf-8');
	var user = map[params['username']];
	
	content = content.replace('{{ username }}', user.username);
	content = content.replace('{{ id }}', user.id);
	content = content.replace('{{ phone }}', user.phone);
	content = content.replace('{{ email }}', user.email);
	res.end(content);
}

function getWithUsernameFail(req, res, params){
	//返回注册界面
	console.log("get with username fail");
	var content = fs.readFileSync('html/index.html', 'utf-8');
	
	content = content.replace('{{ alert }}', 'alert-danger');
	content = content.replace('{{ information }}', '<p class="danger"><strong>不存在<strong>此用户名!</p>');
	res.end(content);
}

function doPost(req, res, params){
	//查看参数是否合法，不合法则返回
	//合法就根据是否有信息重复执行相应函数
	if (!checkIfValid(params)){
		res.end("bad user format");
		return;
	}
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
	//增添新用户并进入用户详情界面
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
	//进入注册界面并显示重复项
	var content = fs.readFileSync('html/index.html', 'utf-8');
	var duplicate = "";
	content = content.replace('{{ alert }}', 'alert-danger');
	if (user.username == params.username){
		duplicate += "<p class='danger'><strong>用户名</strong>不可与已有的重复</p>";
	}
	if (user.id == params.id){
		duplicate += "<p class='danger'><strong>学号</strong>不可与已有的重复</p>";
	}
	if (user.phone == params.phone){
		duplicate += "<p class='danger'><strong>电话</strong>不可与已有的重复</p>";
	}
	if (user.email == params.email){
		duplicate += "<p class='danger'><strong>邮箱</strong>不可与已有的重复</p>";
	}
	content = content.replace('{{ information }}', duplicate);
	res.end(content);
}

function checkIfValid(user){
	//param xxx_re   : 匹配请求xxx的域名的正则表达式(xxx为代指)
	//检测是否参数符合格式
	var username_re = /^[a-zA-Z]\w{5,17}$/;
	var id_re = /^[1-9]\d{7}$/;
	var phone_re = /^[1-9]\d{10}$/;
	var email_re = /^[a-zA-Z_\-]+@(([a-zA-Z_\-])+\.)+[a-zA-Z]{2,4}$/;
	if (username_re.test(user.username)
	 && id_re.test(user.id)
	 && phone_re.test(user.phone)
	 && email_re.test(user.email))
	 	return true;
	return false;
}