define(['jquery','template'],function($,template){
	// 调用接口获取获取所有讲师的数据
	$.ajax({
		url: '/api/teacher',
		type: 'get',
		dataType: 'json',
		success:function(data){
			// console.log(data);
			// console.log(data.result);
			// 解析数据，渲染页面
			var html = template('teachertpl',{list:data.result});
			$('#teacherInfo').html(html);
		}
		
	})

})