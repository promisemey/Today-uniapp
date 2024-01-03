const operate = 'http://192.168.0.114:3000'
// const operate = 'http://192.168.29.93:3000'
const defaultToken =
	'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjp7InJvbGUiOiJhZG1pbiJ9LCJpYXQiOjE2ODI1NTQxODUsImV4cCI6MTY4MzE1ODk4NX0.UWFSzmB-U6Ip-OylXt9gkgoJ9-TQWyckclKIdp9AWIo'
export default class Request {
	http(param) {

		// 请求参数
		let url = param.url,
			method = param.method || 'GET',
			header = {},
			data = param.data || {},
			token = param.token || param.data?.token || defaultToken;
		// hideLoading = param.hideLoading || false;

		//拼接完整请求地址
		let requestUrl = operate + url;
		//拼接完整请求地址（根据环境切换）
		// var requestUrl = operate.api() + url;

		//请求方式:GET或POST(POST需配置
		// header: {'content-type' : "application/x-www-form-urlencoded"},)
		if (method) {
			method = method.toUpperCase(); //小写改为大写
			if (method == "POST" || method == "PUT") {
				header = {
					'content-type': "application/x-www-form-urlencoded"
				};
			} else {
				header = {
					'content-type': "application/json"
				};
			}
		}

		// 返回promise
		return new Promise((resolve, reject) => {
			// 请求
			uni.request({
				url: requestUrl,
				data: data,
				method: method,
				header: {
					...header,
					token
				},
				success: (res) => {
					// 判断 请求api 格式是否正确
					// console.log(res.statusCode);
					if (res.statusCode && res.statusCode != 200) {
						uni.showToast({
							title: "api错误" + res.errMsg,
							icon: 'none'
						});
						return;
					}
					// 将结果抛出
					resolve(res.data)
				},
				//请求失败
				fail: (e) => {
					// uni.showToast({
					// 	title: "" + e.data.msg,
					// 	icon: 'none'
					// });
					resolve(e);
				},
				//请求完成
				complete(e) {
					//隐藏加载
					// if (!hideLoading) {
					// 	uni.hideLoading();
					// }
					// console.log(e);
					resolve();
					return;
				}
			})
		})
	}
}