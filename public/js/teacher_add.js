define(['jquery','template','util'],function($,template,util) {
	var tcid = util.qs('tc_id');
	// 判断 tcid 的值,进行相应的操作
	if (tcid) {
		// 编辑操作
		$.ajax({
			url: '/api/teacher/edit',
			type: 'get',
			dataType: 'json',
			data: {tc_id: tcid},
			success: function(data) {
				// 解析数据,渲染页面
				data.result.abc = '编辑讲师';       //表示给data.result 加一个abc的属性，属性值为'编辑讲师'
				var html = template('teacherTpl',data.result);
				$('#teacherEdit').html(html);
			}
		});
	}else{
		// 添加操作
		var html = template('teacherTpl',{abc:'添加讲师'});
		$('#teacherEdit').html(html);
	}

})