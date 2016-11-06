$(function(){
    $("thead th, thead td").click(function(){
        this.flag = this.flag == undefined? true : this.flag;
        var index = $(this).index();
        var index_start_from_1 = index + 1;
        var body = $(this).parents("table").find("tbody");
        var nodes = body.children("tr");
        var sort_function = this.flag ? function(a, b){
            var str1 = $(a).find("td:nth-child(" + index_start_from_1  + ")").text();
            var str2 = $(b).find("td:nth-child(" + index_start_from_1  + ")").text();
            return str1.localeCompare(str2);
        } :
        function(a, b){
            var str1 = $(a).find("td:nth-child(" + index_start_from_1  + ")").text();
            var str2 = $(b).find("td:nth-child(" + index_start_from_1  + ")").text();
            return str2.localeCompare(str1);
        };

        $(this).attr("class", "clicked");//change the color of this title

        if ($(this).children("img").length == 0){//if not exist, add an image in the right
            var $img_node = $("<img></img>").attr("src", "ascend.png").addClass("right");
            $img_node.appendTo($(this));
        }

        if (this.flag)                 //decide the image 
            $(this).children("img").attr("src", "ascend.png");
        else
            $(this).children("img").attr("src", "descend.png");

        nodes.sort(sort_function);
        nodes.each(function(i, node){//turn the even ones into grey 
            if (i % 2 == 0)
                $(node).attr("class", "");
            else
                $(node).attr("class", "alternate");
        })
        nodes.each(function(i, element){
            $(element).appendTo(body);
        });
        this.flag = !this.flag;
        });
});