var At_plus_container = function(){
	var info_bar;
	var buttons = [];
	var icon;

	var info_bar = function(){
		this.dom = $("#info-bar")[0];
		this.activated = false;
		var that = this;

		$(this.dom).bind("all_buttons_get_its_number", function(){
			that.activated = true;
		});

		$(this.dom).on("click", function(){
			var total = 0;
			if (!that.activated)
				return;
			for(var i = 0; i < buttons.length; i++)
				total += buttons[i].number;
			$(that.dom).find(".info-text").text("" + total);
			this.activated = false;
		});
	}
	info_bar.prototype.init = function(){
		this.activated = false;
		$(this.dom).find(".info-text").text("");
	}

	//Button
	var Button = function(index){
		this.dom = $("#control-ring .button:nth-of-type(" + index + ")")[0];
		this.waiting = false;
		this.has_number = false;
		this.number;
		var that = this;

		$(this.dom).on("click", function(){
			console.log("clicked");
			if (this.waiting)
				return;
			if ($(this).hasClass("disabled"))
				return;
			if ($(this).hasClass("activated"))
				that.button_activated_on_click();

		});
		
	}

	var button_prototype = Button.prototype;
	button_prototype.init = function(){
		this.waiting = false;
		this.has_number = false;
		$(this.dom).removeClass("disabled").addClass("activated");
		$(this.dom).find(".unread").remove();
		
	}

	button_prototype.add_waiting_tag = function(){
		var tag = $("<div></div>").addClass("unread").text("...");
		$(this.dom).append(tag);
	}

	button_prototype.disable_other_button = function(){
		$(this.dom).prevAll().removeClass("activated").addClass("disabled");
		$(this.dom).nextAll().removeClass("activated").addClass("disabled");
	}

	button_prototype.tag_display_number = function(data){
		$(this.dom).children(".unread").text(data);
	}

	button_prototype.activate_other_button = function(){
		$(this.dom).prevAll().removeClass("disabled").addClass("activated");
		$(this.dom).nextAll().removeClass("disabled").addClass("activated");
	}

	button_prototype.all_buttons_get_its_number = function(){
		for(var i = 0; i < buttons.length; i++){
			if (!buttons[i].has_number)
				return false;
		}
		return true;
	}

	button_prototype.button_activated_on_click = function(){
		var that = this;
		this.waiting = true;
		this.add_waiting_tag();
		this.disable_other_button();
		$.get("http:127.0.0.1:8000/", function(data, status){
			console.log(status);
			if (status == "success"){
				that.has_number = true;
				that.number = parseInt(data);
				that.tag_display_number(data);
				$(that.dom).removeClass("activated").addClass("disabled");
				that.activate_other_button();
				if (that.all_buttons_get_its_number())
					$("#info-bar").trigger("all_buttons_get_its_number");
			}
			else {
				alert("连接失败");
				return;
			}
		});
	}

	// Icon
	var Icon = function(){
		this.dom = $(".icon")[0];

		var auto_click = function(button, click_queue){
			console.log(button);
			var index = $(button.dom).index();
			var next_index = index + 1;

			console.log(index);
			
			button.add_waiting_tag();
			button.disable_other_button();
			$.get("http:127.0.0.1:8000/", function(data, status){
				console.log(status);
				if (status == "success"){
					button.has_number = true;
					button.number = parseInt(data);
					button.tag_display_number(data);
					$(button.dom).removeClass("activated").addClass("disabled");
					button.activate_other_button();
					if (button.all_buttons_get_its_number())
						$("#info-bar").trigger("all_buttons_get_its_number").click();
					else
						auto_click(buttons[click_queue[next_index]], click_queue);
				}
				else {
					alert("连接失败");
					return;
				}
			});
		};

		$(this.dom).on("mouseout", function(){
			for(var i = 0; i < buttons.length; i++)
				buttons[i].init();

			info_bar.init();
		});

		$(this.dom).on("click", function(){
			var click_queue = [0, 1, 2, 3 ,4];
			auto_click(buttons[click_queue[0]], click_queue);
		})
	}

	for(var i = 0; i < 5; i++)
		buttons.push(new Button(i + 1));

	info_bar = new info_bar();
	icon 	 = new Icon();

}

$(function(){
	new At_plus_container();
})