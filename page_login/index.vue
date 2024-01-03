<template>
	<view class="content">
		<view class="bg"></view>
		<view class="bg2"></view>
		<view class="tips">
			<text class="title">{{['登录','注册'][reg]}}</text>
			<text class="subtitle">欢迎{{['再次回来~','注册'][reg]}}</text>
		</view>

		<!-- 注册 -->
		<view v-show="reg" class="form-box">
			<uni-forms ref="regform" :model="regData">
				<uni-forms-item label="账号" name="username">
					<uni-easyinput type="text" v-model="regData.username" placeholder="请输入账号" />
				</uni-forms-item>
				<uni-forms-item label="密码" name="password">
					<uni-easyinput type="password" v-model="regData.password" placeholder="请输入密码" />
				</uni-forms-item>
			</uni-forms>
			<view class="btn" @click="register">注册</view>
			<view class="other">
				<text>找回密码</text>
				<text style="color:#00c6fc;" @click="this.reg = 0">回到登录</text>
			</view>
		</view>
		<!-- 注册 -->

		<!-- 登录 -->
		<view v-show="!reg" class="form-box">
			<uni-forms ref="form" :model="formData">
				<uni-forms-item label="账号" name="username">
					<uni-easyinput type="text" v-model="formData.username" placeholder="请输入账号" />
				</uni-forms-item>
				<uni-forms-item label="密码" name="password">
					<uni-easyinput type="password" v-model="formData.password" placeholder="请输入密码" />
				</uni-forms-item>
			</uni-forms>
			<view class="btn" @click="submit">登录</view>
			<view class="other">
				<text>找回密码</text>
				<text style="color:#00c6fc;" @click="this.reg = 1">快速注册</text>
			</view>
		</view>
		<!-- 登录 -->
		<van-toast id="van-toast" />
	</view>
</template>

<script>
	import Toast from '@/wxcomponents/vant/toast/toast.js';
	import {
		mapState,
		mapMutations,
		mapActions
	} from 'vuex'
	import store from '../store';
	export default {
		data() {
			return {
				reg: 0, // 是否是注册
				formData: {
					username: '',
					password: ''
				},
				regData: {
					username: '',
					password: ''
				},
				rules: {
					// 对name字段进行必填验证
					username: {
						rules: [{
								required: true,
								errorMessage: '请输入账号',
							},
							{
								validateFunction: function(rule, value, data, callback) {
									const rules = /^[a-zA-Z0-9_!@#$%^&*()-=+]{3,10}$/
									if (!rules.test(value)) {
										callback('账号由3-10位字母、数字_-=+等字符组成')
									}
									return true
								}
							}
						]
					},
					password: {
						rules: [{
								required: true,
								errorMessage: '请输入密码',
							},
							{
								validateFunction: function(rule, value, data, callback) {
									const rules = /^[a-zA-Z0-9_!@#$%^&*()-=+]{3,16}$/
									if (!rules.test(value)) {
										callback('密码由3-16位字母、数字_-=+等字符组成')
									}
									return true
								}
							}
						]
					},
				}
			}
		},
		onReady() {
			// 需要在onReady中设置规则
			this.$refs.form.setRules(this.rules)
			this.$refs.regform.setRules(this.rules)
		},

		computed: {
			...mapState({
				userInfo: state => state.userInfo,
				token: state => state.token,
			})
		},

		mounted() {
			// 获取地区信息
			uni.getStorage({
				key: 'city',
				success: (res) => {
					this.setCity(JSON.parse(res.data))
				},
				complete: (end) => {
					if (!end.data) this.getCity()
				}
			})
			this.setApiPath()
			// this.getCity()
		},
		methods: {
			...mapMutations({
				setUser: 'updateUserInfo',
				setCity: 'setCity',
				setToken: 'setToken',
				setApi: 'setApi',
			}),
			...mapActions({
				getCity: 'GET_CITY'
			}),
			submit() {
				// 在 onLoad 生命周期中，formData添加了一个 id 字段 ，此时这个字段是不参数校验的，所以结果中不返回
				// 在 validate(['id']) 方法中，指定第一个参数 ，即可返回id字段
				this.verify()
			},
			// 注册
			register() {
				this.verify('regform', 'reg')
			},
			// 验证

			verify(form = 'form', reg) {
				console.log(this.$refs);
				this.$refs[form].validate(['id'], async (err, formData) => {
					if (!err) {
						let res = null
						if (reg) {
							// 切换为注册接口
							res = await this.$api.postUserRegister(formData)
							// 清空表单
							this.regData = {
								username: '',
								password: ''
							}

						} else {
							res = await this.$api.postUserLogin(formData)
						}
						if (res.meta.state !== 200) {
							return Toast.fail(res.meta.message);
						}

						// 注册
						if (res.meta.state === 201) {
							this.$refs.form.resetFields()
							return Toast.fail(res.meta.message);
						}

						// 登录
						if (res.meta.state === 200) {
							Toast.success(res.meta.message);
							this.setToken(res.meta.token)
							uni.setStorageSync('token', res.meta.token)
							uni.setStorageSync('userInfo', JSON.stringify(res.data[0]))
							this.setUser(res.data[0])
							uni.switchTab({
								url: '/pages_index/index/index'
							})
						}
					}
				})
			},
			// ...
			setApiPath() {
				uni.getStorage({
					key: 'api',
					success: (e) => {
						this.setApi(e.data)
					},
					fail: async (e) => {
						const {
							data: {
								api
							}
						} = await this.$api.postServeIp()
						if (api) {
							uni.setStorageSync('api', api)
							this.setApi(api)
						}

					}
				})
			}
			// ...
		}

	}
</script>

<style lang="scss">
	.content {
		width: 100vw;
		height: 100vh;
		background-color: #ffffff;

		.tips {
			padding-top: 200rpx;
			padding-left: 80rpx;
			display: flex;
			flex-direction: column;

			.title {
				line-height: 70rpx;
				font-weight: bold;
				font-size: 50rpx;
			}

			.subtitle {
				line-height: 70rpx;
				font-size: 35rpx;
				font-weight: bold;
				color: #b0b0b1;
			}

		}

		.bg {
			position: fixed;
			top: -250rpx;
			right: -250rpx;
			width: 600rpx;
			height: 600rpx;
			border-radius: 100%;
			background-color: #00baef;
			z-index: 2
		}

		.bg2 {
			position: fixed;
			top: -150rpx;
			right: -300rpx;
			width: 600rpx;
			height: 600rpx;
			border-radius: 100%;
			background-color: #ade8f9;
			z-index: 1;
		}

		.form-box {
			padding-top: 180rpx;
			padding-left: 70rpx;
			width: 610rpx;

			.input-box {
				margin: 40rpx 0;
				display: flex;
				justify-content: flex-start;
				align-items: center;
				height: 100rpx;
				background-color: #f5f5f5;
				border-radius: 100rpx;
				width: 100%;

				input {
					flex: 1;
					height: 100%;
					font-size: 30rpx;
				}

				.left {
					padding: 0 30rpx;
					width: 35rpx;
					height: 35rpx;
				}

				.right {
					padding: 0 30rpx;
					width: 40rpx;
					height: 40rpx;
				}
			}

			.btn {
				display: flex;
				justify-content: center;
				align-items: center;
				width: 100%;
				height: 100rpx;
				border-radius: 100rpx;
				color: #FFFFFF;
				background: linear-gradient(to right, #00c6fc, #9adcf1);
			}

			.other {
				display: flex;
				justify-content: space-between;

				text {
					line-height: 80rpx;
					font-size: 28rpx;
				}
			}
		}
	}
</style>