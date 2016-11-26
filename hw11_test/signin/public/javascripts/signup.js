$(function(){
	var resetButtonPrepare = function(){
		$("#reset").click(function(){
			$("input").val("");
			$(".alert").attr("class", "alert alert-success").html("<p class='check'>已重置输入框</p>");
		});
	}

	var uploadButtonPrepare = function(){
		$("#upload").click(function(){
			if (checkInput()){
				$("#user-form").submit();
			}
			else{
				//do nothing
			}
				
		});
	}

	var repeatInputPrepare = function(){
		$("#repeat").on("blur", function(){
			if (passwordIsRepeated())
				showCheck("密码输入一致");
			else
				showErrors(["密码应两次输入相同"]);
		});
	};

	var passwordInputPrepare = function(){
		$("input[name='password']").on("blur", function(){
			if (passwordIsRepeated())
				showCheck("密码输入一致");
			else
				showErrors(["密码应两次输入相同"]);
		});
	}

	var passwordIsRepeated = function(){
		// 判断密码是否重复
		var password = $("input[name='password']").val();
		var password_repeat = $("#repeat").val();
		return password == password_repeat;
	}

	var showCheck = function(message){
		// 显示成功信息
		$(".alert").html("");
		var check_node = $("<p>").addClass("check").text(message);
		$(".alert").append(check_node);
		$(".alert").attr("class", "alert alert-success");
	}

	var showErrors = function(errors){
		// 显示错误信息
		$(".alert").html("");
		for(var i in errors){
			var error_node = $("<p>").addClass("danger").text(errors[i]);
			$(".alert").append(error_node);
		}
		$(".alert").attr("class", "alert alert-danger");
	}

	var checkInput = function(){
		// 检测输入的各信息是否符合规范
		user = {
			username : $("input[name='username']").val(),
			password : $("input[name='password']").val(),
			id 		 : $("input[name='id']").val(),
			phone	 : $("input[name='phone']").val(),
			email	 : $("input[name='email']").val()
		}
		var errors = validator.user_valid(user);
		if (!passwordIsRepeated())
			errors.push("密码应两次输入相同");
		if (errors.length == 0)
			return true;
		else{
			showErrors(errors);
			return false;
		}
	}
	resetButtonPrepare();
	uploadButtonPrepare();
	repeatInputPrepare();
	passwordInputPrepare();
})