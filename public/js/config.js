require.config({
	// 设置引用模块的参考路径
	baseUrl: '/public/assets',
	// 给文件设置别名
	paths: {
		jquery : 'jquery/jquery',
		cookie : 'jquery-cookie/jquery.cookie',
		template : 'artTemplate/template-web',
		common : '../js/common',
		login : '../js/login',
		teacherlist: '../js/teacher_list',
		teacheradd:'../js/teacher_add',
		util: '../js/util',
		bootstrap: 'bootstrap/js/bootstrap.min',
		datepicker: 'bootstrap-datepicker/js/bootstrap-datepicker.min',
		language: 'bootstrap-datepicker/locales/bootstrap-datepicker.zh-CN.min',
		validate: 'jquery-form/jquery-validate.min',
		form: 'jquery-form/jquery.form'
	},
	// 配置非标准化、不兼容的模块
	shim: {
		// 表示：将bootstrap标准化，并且bootstrap是依赖jquery的
		bootstrap: {
			deps: ['jquery']
		},
		language: {
			deps: ['jquery','datepicker']
		},
		validate: {
			deps: ['jquery']
		}

	}

})

