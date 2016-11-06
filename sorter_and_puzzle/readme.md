优化前后loc:  
hit:100->78  
puzzle:152->91

$("thead th, thead td").click(function(){ this.flag = this.flag == undefined? true : this.flag; var index = $(this).index(); var index_start_from_1 = index + 1; var body = $(this).parents("table").find("tbody"); var nodes = body.children("tr"); var sort_function = this.flag ? function(a, b){ var str1 = $(a).find("td:nth-child(" + index_start_from_1 + ")").text(); var str2 = $(b).find("td:nth-child(" + index_start_from_1 + ")").text(); return str1.localeCompare(str2); } : function(a, b){ var str1 = $(a).find("td:nth-child(" + index_start_from_1 + ")").text(); var str2 = $(b).find("td:nth-child(" + index_start_from_1 + ")").text(); return str2.localeCompare(str1); };nodes.sort(sort_function); nodes.each(function(i, element){ $(element).appendTo(body); }); this.flag = !this.flag; });

网站:  
http://soj.sysu.edu.cn/contests.php  
http://soj.sysu.edu.cn/courses.php  
http://soj.sysu.edu.cn/ranklist.php