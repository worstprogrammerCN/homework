//用于检测用户信息是否符合规格
var validator = {
	user:{
		username:{
			re:/^[a-zA-Z]\w{5,17}$/,
			error_message:"用户名6~18位英文字母、数字或下划线，必须以英文字母开头"
		},
		password:{
			re:/^[a-zA-Z0-9_\-]{6,12}$/,
			error_message:"密码为6~12位数字、大小写字母、中划线、下划线"
		},
		id:{
			re:/^[1-9]\d{7}$/,
			error_message:"学号8位数字，不能以0开头"
		},
		phone:{
			re:/^[1-9]\d{10}$/,
			error_message:"电话11位数字，不能以0开头"
		},
		email:{
			re:/^[a-zA-Z_\-]+@(([a-zA-Z_\-])+\.)+[a-zA-Z]{2,4}$/,
			error_message:"邮箱格式不符合规范!"
		}
	},
	username_valid:function(username){
		return user.username.re.test(username)
	},
	password_valid:function(password){
		return user.password.re.test(password)
	},
	id_valid:function(id){
		return user.id.re.test(id)
	},
	phone_valid:function(phone){
		return user.phone.re.test(phone)
	},
	email_valid:function(email){
		return user.email.re.test(email)
	},
	user_valid:function(t_user){
		var errors = [];
		for(var infomation in user)
			if (!this.user[infomation].re.test(t_user[infomation]))  //  若不符合规范
				errors.push(this.user[infomation].error_message); // 增添错误信息
		return errors;
	}
}

if (typeof module == 'object')
	module.exports = validator;