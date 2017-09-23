define(['jquery','template'],function($,template){
	// 调用接口获取获取所有讲师的数据(讲师列表)
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
				// console.log(tcid,status);
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

			// 完成讲师查看的功能
			$('.preview').click(function (){
				// 看后台接口文档知，ajax前后端交互需要传参，传tc_id 所以先获取它
				var td = $(this).closest('td');
				// 获取自定义属性的值
				var tcid = td.attr('data-tcid');
				// 通过ajax调用后台接口，向其中传后台需要的参数，得到相应的返回值
				$.ajax({
					url: '/api/teacher/view',
					type: 'get',
					dataType: 'json',
					data: {tc_id: tcid},
					success: function(data){
						console.log(data);
						// 绑定数据   注：模板引擎的id前面不要加#
						var html = template('modelTpl',data.result);
						// 添加数据，模板渲染
						$('#modelInfo').html(html);
						// 模态框显示  bootstrap 的让模态框显示的方法  所以要引入bootstrap插件
						$('#teacherModal').modal();

					}
				})

				



			}); 
			
			
			

			
		}
		
	})

})