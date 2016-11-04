window.onload = function(){
    $("thead th, thead td").click(function(){
        if(this.flag == undefined)
            this.flag = true;
        var index = $(this).index();
        var index_start_from_1 = index + 1;
        var body = $(this).parents("table").find("tbody");
        var nodes = body.children("tr");
        nodes.sort(this.flag ? function(a, b){
            var str1 = $(a).find("td:nth-child(" + index_start_from_1  + ")").text();
            var str2 = $(b).find("td:nth-child(" + index_start_from_1  + ")").text();
            return str1.localeCompare(str2);
        } :
        function(a, b){
            var str1 = $(a).find("td:nth-child(" + index_start_from_1  + ")").text();
            var str2 = $(b).find("td:nth-child(" + index_start_from_1  + ")").text();
            return str2.localeCompare(str1);
        }
        );
        nodes.each(function(i, element){
            $(element).appendTo(body);
        });
        this.flag = !this.flag;
        console.log(this.flag);
        //     if(this.flag == undefined)
        //         this.flag = true;
        //     var index = $(this).index();
        //     var arr = [];
        //     var nodes = $(this).parents("table").find("tbody tr");
        //     nodes.each(function(i, e){
        //         var t = [];
        //         $(e).find("td").each(function(index, element){
        //             t.push($(element).text());
        //         });
        //         arr.push(t);
        //     });
        //     arr.sort(this.flag ? function(a, b){
        //         return a[index].localeCompare(b[index]);
        //     } :
        //     function(a, b){
        //         return b[index].localeCompare(a[index]);
        //     });
        //     this.flag = !this.flag;
        //     nodes.each(function(i, e){
        //         $(e).find("td").each(function(index, element){
        //             if ($(element).find("a").length > 0)
        //                 $(element).find("a").text(arr[i][index]);
        //             else if ($(element).find("font").length  > 0)
        //                 $(element).find("font").text(arr[i][index]);
        //             else
        //                 $(element).text(arr[i][index]);
        //         });
        //      });
         });
};