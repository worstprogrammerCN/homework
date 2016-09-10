
  function clearInput(){
  items = document.getElementsByTagName('p');
  for(var i = 0; i < items.length; i++)
    items[i].getElementsByTagName('input')[0].value = "";
  
  }
  function checkForm() {
    items = document.getElementsByTagName('p');
    contents = [];
    errors = "";
    
    for(var i = 0; i < items.length; i++)
      contents[i] = items[i].getElementsByTagName('input')[0].value;
    
    
    if (contents[0].length < 6 || contents[0].length > 18)
      errors += "用户名要在6~18位" + "<br>";
    
    for (var i in contents[0])
      if ((i < '0' || i > '9') && (i < 'a' || i > 'z') && (i != '_')){
        errors += "用户名只能用英文字母、数字或下划线" + "<br>";
        break;
      }
    
    if (contents[0][0] < 'a' || contents[0][0] > 'z')
        errors += "用户名必须以英文字母开头" + "<br>";
      
    if (contents[1].length != 8 || contents[1][0] == '0')
      errors += "学号8位数字，不能以0开头" + "<br>";
    
    if (contents[2].length != 11 || contents[2][0] == '0')
      errors += "电话11位数字，不能以0开头" + "<br>";
    
    sum1 = 0;
    
    for (var i = 0; i < contents[3].length; i++)
      if (contents[3][i] == '@')
        sum1++;

    if (sum1 != 1)
      errors += (contents[3][1] == '@') + "邮箱格式错误:只能有一个@符号,你用了" + sum1 + "个" + "<br>";
    
    if (errors != "") {
      document.getElementById("theErrors").innerHTML = errors;
      return false;
    }
 
    
    return true;
  }
  
 function CheckMail(mail) {
 var filter  = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
 if (filter.test(mail)) return true;
 else {
 return false;}
}