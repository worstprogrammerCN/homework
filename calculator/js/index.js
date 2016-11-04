window.onload = function(){
	var buttons = document.getElementById("buttons").getElementsByTagName("input");
	for(var i = 0; i < buttons.length; i++) {
		if (buttons[i].value != "del" && buttons[i].value != "ce" && buttons[i].value != "=")
			buttons[i].onclick = function() {
				var input_box = document.getElementById("input_box");
				input_box.value += this.value;
			}
		if (buttons[i].value == "del") {
			buttons[i].onclick = function() {
				var input_box = document.getElementById("input_box");
				var value = input_box.value;
				input_box.value = value.substring(0, value.length - 1);
			}
		}
		if (buttons[i].value == "ce") {
			buttons[i].onclick = function() {
				var input_box = document.getElementById("input_box");
				input_box.value = "";
			}
		}
		if (buttons[i].value == "=") {
			buttons[i].onclick = function() {
				var input_box = document.getElementById("input_box");
				try{
					input_box.value = eval(input_box.value);
				}
				catch(exception){
					alert("非法表达式！");
				}
			}
		}
	}
}