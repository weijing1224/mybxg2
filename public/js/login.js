define(['jquery','cookie'],function($){
	$('#loginBtn').click(function(){
            $.ajax({
                type : 'post',
                url : '/api/login',
                // serialize() 是jquery方法,作用:找到$('#loginForm')下所有input里的name属性值,提交给后台
                data : $('#loginForm').serialize(),
                dataType : 'json',
                success : function(data){
                    if(data.code == 200){
                        // 把用户的登录信息存储到cookie中，方便跨页面共享数据
                        $.cookie('loginInfo',JSON.stringify(data.result),{path:'/'});
                        // 登录成功，跳转到主页面
                        location.href = '/main/index';
                    }
                }
            });

            return false;// 阻止按钮的默认行为
        });
})