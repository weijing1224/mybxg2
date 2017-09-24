define(['jquery'],function($) {
	return {
		qs: function(key){
			// 获取URL参数中指定的参数值
			var param = location.search.substr(1);
			var result = null; 
			if (param) {
				// 再以'&' 拆分字符串
				var ps = param.split('&');
				// 循环遍历
				$.each(ps,function(index,item) {
					// console.log(item)
					var kv = item.split('=');
					if (kv[0]==key) {
						result = kv[1];
						return false;
					}
				});
			}
			return result;
		}
	}
})