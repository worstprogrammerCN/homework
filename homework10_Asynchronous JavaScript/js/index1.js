$(function(){
	var control_ring_button_prepare = function(){
		var switch_button_class = function(dom, old_class, new_class){

		}

		var button_activated_on_click = function(){
			switch_button_class(this, "activated", "waiting");
			add_waiting_tag();
			disable_other_button();
			$.get("/number", function(data, status){
				if (status == "success"){
					display_number();
					switch_button_class(this, "waiting", "disabled");  //disable current button
					activate_other_button();
				}
				else {
					alert("连接失败");
					return;
				}
			})
		}

		var button_waiting_on_click = function(){
			//do nothing
		}

		var button_disabled_on_click = function(){
			//do nothing
		}

		$(".button").on("click", function(){
			if ($(this).hasClass("activated"))
				button_activated_on_click.bind(this)();
			else if ($(this).hasClass("waiting"))
				button_waiting_on_click.bind(this)();
			else if ($(this).hasClass("disabled"))
				button_disabled_on_click.bind(this)();
		})

	}

	var info_bar_prepare = function(){
		$(this).on("click", function(){

		})
	}

	control_ring_button_prepare();
	
})