window.onload = function(){
    $("thead th, thead td").click(function(){
            if(this.flag == undefined)
                this.flag = true;
            console.log(this.flag);
            var index = $(this).index();
            var arr = [];
            var nodes = $(this).parents("table").find("tbody tr");
            nodes.each(function(i, e){
                var t = [];
                //console.log(e);
                $(e).find("td").each(function(index, element){
                    t.push($(element).text());
                });
                arr.push(t);
            });
            //console.log(arr);
            arr.sort(this.flag ? function(a, b){
                return a[index].localeCompare(b[index]);
            } :
            function(a, b){
                return b[index].localeCompare(a[index]);
            });
            this.flag = !this.flag;
            nodes.each(function(i, e){
                $(e).find("td").each(function(index, element){
                    if ($(element).find("a").length > 0)
                        $(element).find("a").text(arr[i][index]);
                    else if ($(element).find("font").length  > 0)
                        $(element).find("font").text(arr[i][index]);
                    else
                        $(element).text(arr[i][index]);
                });
             });
        });
    // var flag = true;
    // $("thead th").click(function(){
    //     var index = $(this).index();
    //     var arr = [];
    //     var nodes = $(this).parents("table").find("tbody tr");find("td:nth-child(" + (index + 1) + ")");
    //     console.log(nodes);
    //     nodes.each(function(index, element){
    //         arr.push($(element).text());
    //     });
    //     console.log(arr);
    //     // _.forEach(nodes
    //     // ,function(n){
    //     //     arr.push($(n).text());
    //     //    // console.log($(n).text());
    //     // }
    //     // );
    //     arr.sort(flag ?function(a, b){
    //         return a > b;
    //     } : function(a, b){
    //         return a < b;
    //     });
    //     flag = !flag;
    //     console.log(arr);
    //     nodes.each(function(index, element){
    //         $(element).text(arr[index]);
    //     });
    // });
};