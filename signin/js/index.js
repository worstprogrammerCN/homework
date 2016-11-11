$(function(){
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
			$(".alert").html("");
			if (!username_pass)
				$("")
		}
	}

	uploadButtonPrepare();
	
})