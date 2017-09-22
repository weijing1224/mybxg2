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


			// 完成讲师的注销和启用功能
			$('.enable').click(function(){
				// 获取注销/启用按钮最近的父元素
				var td = $(this).closest('td');
				// 获取自定义属性的值
				var tcid = td.attr('data-tcid');
				var status = td.attr('data-status');
				console.log(tcid,status);
				// 保存当前this的值
				var $that = $(this)
				// 通过ajax调用后台接口传响应的参数，得到后台的返回值
				$.ajax({
					url: '/api/teacher/handle',
					type: 'post',
					dataType: 'json',
					// 向后台传数据
					data: {tc_id:tcid,tc_status:status},
					success:function(data){
						// console.log(data)
						// 响应成功  修改状态
						if (data.code==200) {
							// 给td添加返回过来的状态值(如之前是0返回过来是1)
							td.attr('tc_status',data.result.tc_status);
							// 进行判断 修改状态（修改为启用/注销）
							if (data.result.tc_status==0) {
								$that.text('注销');
							}else{
								$that.text('启用');
							}
						}
					}
				});
				
			});
		}
		
	})

})