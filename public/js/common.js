define(['jquery','template','cookie'],function($,template){
  // NProgress.start();
  // NProgress.done();

  $('.navs ul').prev('a').on('click', function () {
    $(this).next().slideToggle();
  });

  // 实现退出功能
  $('#logoutBtn').click(function(){
    $.ajax({
      type : 'post',
      url : '/api/logout',
      dataType : 'json',
      success : function(data){
        if(data.code == 200){
          // 重新跳转到登录页
          location.href = '/main/login';
        }
      }
    });
  });

  // 检测用户是否登录
  var flag = $.cookie('PHPSESSID');
  if(!flag && location.pathname !== '/main/login'){
    // 如果cookie不存在，跳转到登录页
    location.href = '/main/login';
  }

  // 设置用户头像信息
  var loginInfo = $.cookie('loginInfo');
  loginInfo = loginInfo && JSON.parse(loginInfo);
  // 设置用户的头像信息
  // if(flag){
  //   $('.aside .profile img').attr('src',loginInfo.tc_avatar);
  //   $('.aside .profile h4').html(loginInfo.tc_name);
  // }
  console.log(loginInfo);
    var tpl = '<div class="avatar img-circle"><img src="{{tc_avatar}}" alt="" /></div><h4>{{tc_name}}</h4>';
    // console.log(loginInfo)
    // 调用方法，进行渲染
    var html = template.render(tpl,loginInfo);
    // 添加到上一级元素中
    $('.aside .profile').html(html);
  

})