define(['jquery','template','util','datepicker','language','form','validate'],function($,template,util) {
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
				// 处理表单提价，调用方法
				submitForm('/api/teacher/update');
			}
		});
	}else{
		// 添加操作
		var html = template('teacherTpl',{abc:'添加讲师'});
		$('#teacherEdit').html(html);
		submitForm('/api/teacher/add');
	}

	// 用表单提交插件--实现表单提交
	function submitForm(url) {
		$('#teacherForm').validate({           //调用validate() api
			sendForm: false,				//阻止submit的默认提交行为	
			valid: function(){				//当所有输入域验证通过
				console.log('success');
				// 调用api 手动提交表单
				$(this).ajaxSubmit({
					url: url,
					type: 'post',
					dataType: 'json',       //不需要序列化表单name属性的属性值了，插件内部帮忙做了这件事
					success: function(data) {
						if (data.code==200) {
							location.href = '/teacher/list';
						}
					} 
				})
			},
			description: {
				tcName: {
					required: '用户名不能为空'
				},
				tcPass: {
					required: '密码不能为空',
					pattern: '密码的组成必须为6位数字'
				},
				tcJoinDate: {
					required: '入职日期不能为空'	
				}
			}
		})

	}


	// 实现表单提交（修改讲师）
	// function submitForm(url) {
	// 	$('#teacherBtn').click(function(){
	// 			$.ajax({
	// 			url: url,
	// 			type: 'post',
	// 			dataType: 'json',
	// 			data: $('#teacherForm').serialize(),
	// 			success:function(data){
	// 				// 响应成功，重新跳转到登录页
	// 				if (data.code==200) {
	// 					location.href='/teacher/list';
	// 				}
	// 			}
	// 		})
		
	// 	});
		
	// }

})