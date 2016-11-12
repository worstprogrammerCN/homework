var http = require("http");            //提供web服务  
var url = require("url");            //解析GET请求  
var query = require("querystring");    //解析POST请求
var fs = require('fs');

var map = [];
map['jzl'] = ['15331132', '13719338953', 'a@a'];

//服务
var server = function(request,response){  
    //定义报文头
    var pathname = url.parse(request.url).pathname;
    //console.log(pathname);
    if(pathname == "/favicon.ico"){
    return;
    }
    response.writeHead(200,{
       'Content-Type':"text/html; charset=utf-8"
      });
    //判断是GET/POST请求
    //if(false){
    if(request.method == "GET"){
      var params = url.parse(request.url,true).query;
      //console.log('this username is:' + map[params['username']]);
      var username = params['username'];
      if (map[username] == undefined){
        var contentText = fs.readFileSync('signin.html', 'utf-8');
        response.write(contentText);
        response.end();
        }
        //response.write('无此用户名');
      
      else{
        response.write('有此用户名' + '<br>');
        var temp_params = {'username':username, 'id':map[username][0], 'number':map[username][1], 'email':map[username][2]};
        writePage(response, temp_params);
      }
    
    }else if (request.method == "POST"){
      
      console.log('answer post');      //用于在控制台标志自己正在回应post
      var postdata = "";
      request.on("data",function(data){
        postdata += data;
      })
        
      //POST结束输出结果
      request.on("end",function(){
			console.log("postdata:" + postdata);          //在控制台输出接收的数据
      var params = query.parse(postdata);
      var flag = false;
      var duplicateItems = '';
      for(var i in map) {
        if (i == params['username'])
          duplicateItems += '用户名重复' + '<br>';
        
        if (map[i][0] == params['id'])
          duplicateItems += '学号重复' + '<br>';
        if (map[i][1] == params['number'])
          duplicateItems += '电话重复' + '<br>';
        if (map[i][2] == params['email'])
          duplicateItems += '邮箱重复' + '<br>';
        if (duplicateItems != '')
          break;
      }
      
      if (duplicateItems != '') {
        var contentText = fs.readFileSync('signin.html', 'utf-8');
        response.write(contentText);
        response.write(duplicateItems);
        response.end();
      }
      else {
        map[params['username']] = [params['id'], params['number'], params['email']];
        //var params = url.parse(request.url,true).query;
        writePage(response, params);
      }
      
      })
    }

}

function writePage(res, params){
  res.write('详情<br>');
	res.write('用户名:' + params['username'] + '<br>');
	res.write('学号:' + params['id'] + '<br>');
	res.write('电话:' + params['number'] + '<br>');
	res.write('邮箱:' + params['email'] + '<br>');
  res.end();
}


//开启服务在127.0.0.1:8080
http.createServer(server).listen(8080);  
console.log("Server start!");  