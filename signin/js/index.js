$(function(){
	var resetButtonPrepare = function(){
		$("#reset").click(function(){
			$("input").val("");
		})
	}

	var uploadButtonPrepare = function(){
		$("#upload").click(function(){
			if (allInputAreValid())
			$("#user-form").submit();
			else{

			}
		})
	}

	var allInputAreValid = function(){
		var username_re = /^[a-zA-Z]\w{5,17}$/;
		var username = $("input[name='username']").val();
		var username_pass = username_re.test(username);

		var id_re = /^[1-9]\d{7}$/;
		var id = $("input[name='id']").val();
		var id_pass = id_re.test(id);

		var phone_re = /^[1-9]\d{10}$/;
		var phone = $("input[name='phone']").val();
		var phone_pass = phone_re.test(phone);

		var email_re = /^[a-zA-Z_\-]+@(([a-zA-Z_\-])+\.)+[a-zA-Z]{2,4}$/;
		var email = $("input[name='email']").val();
		var email_pass =  email_re.test(email);

		if (username_pass
		 && id_pass
		 && phone_pass
		 && email_pass)
			return true;
		else{
			var alert = $(".alert").html("");
			var error_html = "";
			if (!username_pass)
				error_html += "<p><strong>用户名</strong>6~18位英文字母、数字或下划线，必须以英文字母开头</p>";
			if (!id_pass)
				error_html += "<p><strong>学号</strong>8位数字，不能以0开头</p>";
			if (!phone_pass)
				error_html += "<p><strong>电话</strong>11位数字，不能以0开头</p>";
			if (!email_pass)
				error_html += "<p><strong>邮箱</strong>格式不符合规范!</p>";
			alert.attr("class", "alert alert-danger").html(error_html);
		}
	}
	
	resetButtonPrepare();
	uploadButtonPrepare();
	
})