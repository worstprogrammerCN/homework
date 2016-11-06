优化前后loc:  
hit:100->78  
puzzle:152->91
上次的puzzle作业可能提交了有bug的一份，导致分数很低.  
这次检查了应该是没问题的，如果还有bug只能说很遗憾了...  
jquery确实能大幅减少代码量，loadash也是不错的，比如_.random和 _.times等  
听从ta的教导采用了github来管理版本更新，感觉受益良多

$("thead th, thead td").click(function(){ this.flag = this.flag == undefined? true : this.flag; var index = $(this).index(); var index_start_from_1 = index + 1; var body = $(this).parents("table").find("tbody"); var nodes = body.children("tr"); var sort_function = this.flag ? function(a, b){ var str1 = $(a).find("td:nth-child(" + index_start_from_1 + ")").text(); var str2 = $(b).find("td:nth-child(" + index_start_from_1 + ")").text(); return str1.localeCompare(str2); } : function(a, b){ var str1 = $(a).find("td:nth-child(" + index_start_from_1 + ")").text(); var str2 = $(b).find("td:nth-child(" + index_start_from_1 + ")").text(); return str2.localeCompare(str1); };nodes.sort(sort_function); nodes.each(function(i, element){ $(element).appendTo(body); }); this.flag = !this.flag; });

网站:  
http://soj.sysu.edu.cn/contests.php  
http://soj.sysu.edu.cn/courses.php  
http://soj.sysu.edu.cn/ranklist.php