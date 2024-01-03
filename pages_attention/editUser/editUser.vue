<template>
	<view class="editUser">
		<navbar title="编辑资料" />

		<view class="ava">
			<!-- <view class="avatar" @click="modufyimage"> -->
			<view class="avatar">
				<!---->
				<van-uploader :show-upload="upload" :file-list="avatar" @after-read="afterRead" @delete="deleteAvatar"
					image-fit="aspectFill" showmenu />
				<!-- <image :src="avatar+'?key='+time " mode="aspectFill"></image> -->
			</view>
			<view class="txt">
				点击更换头像
			</view>
		</view>


		<!-- 用户资料 -->
		<form @submit="formSubmit">
			<van-cell-group inset>
				<van-field label="用户名" :value="formData.username" name="username" placeholder="请输入用户名" />
				<van-field label="手机" :value="formData.phone" name="phone" placeholder="请输入手机号" />
				<van-field disabled label="性别" :value="['男', '女', '保密'][formData.sex]" name="sex"
					@click-input="onPull('sex')" />
				<van-field disabled label="生日" :value="dateCp" name="birth" placeholder="完善生日信息"
					@click-input="onPull('birth')" />
				<van-field disabled label="地址" :value="formData.address.text" name="birth" placeholder="完善地址信息"
					@click-input="onPull('address')" />
			</van-cell-group>
			<view class="subbtn">
				<van-button :loading="loading" :disabled="loading" size="large" type="info" loading-text="加载中..."
					form-type="submit">修改完成</van-button>
			</view>
		</form>

		<!-- 用户资料 -->
		<van-popup position="bottom" custom-style="height: 40%;" :show="sex" @close="sex = false">
			<van-picker cancel-button-text="取消" confirm-button-text="确认" title="性别" :show-toolbar="true" :columns="columns"
				:default-index="formData.sex" @cancel="onCancel('sex')" @confirm="onConfirm($event,'sex')" />
		</van-popup>

		<!-- 生日 -->
		<van-popup position="bottom" custom-style="height: 40%;" :show="birth" @close="birth = false">
			<van-datetime-picker type="date" cancel-button-text="取消" confirm-button-text="确认" :show-toolbar="true"
				:value="currentDate" :min-date="50" @cancel="onCancel('birth')" @confirm="onConfirm($event,'birth')" />
		</van-popup>
		<!-- 生日 -->

		<!-- 地址 -->
		<van-popup :show="address" round position="bottom">
			<van-cascader wx:if="address" title="请选择所在地区" ref="picker" :options="addressOptions" :field-names="fieldNames"
				:value="cascaderValue" @finish="onFinish" @close="onCancel('address')" />
		</van-popup>
		<!-- 地址 -->

	</view>
</template>

<script>
	import {
		userInfo
	} from 'os';
	import {
		mapState,
		mapMutations
	} from 'vuex'
	import {
		onMounted
	} from "vue";
	export default {
		data() {
			return {
				uuid: '',
				upload: true,
				avatar: [],
				sex: false,
				birth: false,
				address: false,
				addressOptions: [], // 地址
				cascaderValue: [2, 52, 500], // 选中
				fieldNames: {
					text: 'district_name',
					value: 'city_id',
					children: 'children'
				},
				columns: ['男', '女', '保密'],
				formData: {
					username: '',
					sex: 1,
					birth: '',
					avatar: '',
					address: {
						value: [],
						text: ''
					},
					phone: ''
				},
				currentDate: 0,
				loading: false
			};
		},
		async created() {
			// 获取用户信息
			const user = JSON.parse(uni.getStorageSync('userInfo'))
			this.formData.username = user.username
			this.formData.phone = user.phone
			this.formData.sex = user.sex
			this.formData.birth = Number(user.birth)
			this.currentDate = Number(user.birth) ?? new Date().getTime()
			this.uuid = user.uuid
			// 头像存在 则显示
			console.log('头像', user.avatar.length);
			const reg = /^http:\/\/\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}:\d{1,5}$/
			if (!reg.test(user.avatar)) {
				this.avatar = [{
					url: user.avatar
				}]
				this.formData.avatar = user.avatar.replace(/^(http:\/\/[\d.]+:\d+)/, '')
			}

			this.formData.address = JSON.parse(user.address)

			// 地址信息
			const cityInit = uni.getStorageSync('cityAll') ? JSON.parse(uni.getStorageSync('cityAll')) : []
			if (!this.addressOptions.length) {
				const {
					data
				} = await this.$api.getAllCity()

				this.addressOptions = data[0].children
				uni.setStorage({
					key: 'cityAll',
					data: JSON.stringify(data[0].children),
					success: (success) => {
						console.log('success cityAll');
					}
				})
				return
			}
			this.addressOptions = this.city || cityInit
		},
		onLoad() {
			const reg = /^http:\/\/\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}:\d{1,5}$/
			if (!reg.test(this.userInfo.avatar)) {
				this.avatar = [{
					url: this.userInfo.avatar
				}]
				this.upload = false
			}
		},
		computed: {
			...mapState({
				userInfo: state => state.userInfo,
				city: state => state.city
			}),
			dateCp() {
				if (!Number(this.formData.birth)) return '完善生日信息'
				console.log();
				return new Date(this.formData.birth).toLocaleDateString()
			}
		},

		methods: {
			...mapMutations({
				setUser: 'updateUserInfo'
			}),
			async PostUser(params) {
				const res = await this.$api.postUser(params)
				if (res.meta.state === 200) {
					this.setUser(res.data[0])
					uni.setStorageSync('userInfo', JSON.stringify(res.data[0]))
				}
			},
			async formSubmit(e) {
				e.detail.value.sex = this.formData.sex
				e.detail.value.birth = this.formData.birth

				console.log('fromData => ', this.formData);
				// 序列号地址信息
				const address = JSON.stringify(this.formData.address)
				const params = {
					...this.formData,
					uuid: this.uuid,
					address,
				}
				console.log(params);

				const res = await this.$api.putUserInfo(params)
				if (res.meta.state === 201) {

					this.PostUser({
						uuid: this.uuid
					})
					uni.showToast({
						title: '修改成功',
						duration: 2000
					});
					// 返回
					uni.navigateBack({
						delta: 1
					})

				}

			},
			// 地址
			onFinish(e) {
				const {
					selectedOptions
				} = e.detail;
				// console.log(selectedOptions);
				const fieldValue = {
					district_name: [],
					city_id: []
				}
				selectedOptions.reduce((prev, cur, next) => {
					prev.district_name.push(cur.district_name)
					prev.city_id.push(cur.city_id)
					return prev
				}, fieldValue)

				this.formData.address = {
					value: fieldValue.city_id.join(),
					text: fieldValue.district_name.join('/')
				}
				this.address = false
			},

			onPull(val) {
				this[val] = true
			},
			onConfirm(e, val) {
				const {
					picker,
					value,
					index
				} = e.detail;
				console.log(e.detail);
				this.formData[val] = index ?? e.detail
				this[val] = false
			},

			onCancel(val) {
				this[val] = false
			},
			deleteAvatar(event) {
				const id = event.detail.index
				this.avatar.pop()
				this.upload = true
				// 清空头像信息
				this.formData.avatar = ''
			},
			afterRead(event) {
				const {
					file
				} = event.detail;
				uni.uploadFile({
					url: uni.getStorageSync('api') + '/upload/profile', // 上传地址
					filePath: file.url,
					name: 'avatar', // 接口字段
					header: {
						'token': this.$store.state.token,
					},
					success: (uploadFileRes) => {
						let res = JSON.parse(uploadFileRes.data);

						console.log(res);

						if (res.meta.state === 201) {
							const url = res.data[0].fullPath
							this.formData.avatar = '/' + res.data[0].filename
							this.avatar = [{
								url
							}]
							this.upload = false
						}

					},
					fail: (e) => {
						console.log("网络请求fail");
					},
					complete: (val) => {
						//返回成功后调用后端返回的照片接口刷新头像

						uni.hideLoading();
						uni.showToast({
							title: '上传成功！',
							icon: 'none'
						});
					}

				});

			},

			// 弃用。。。
			async onChange(e) {
				const {
					value,
					selectedOptions
				} = e.detail;
				const res = await this.$api.getOnlyCity({
					hierarchy: Number(selectedOptions[0].hierarchy) + 1,
					pid: value
				})
				const pArr = this.addressOptions[value - 2]

				if (value === pArr.city_id) {
					// console.log();
					this.addressOptions[value - 2].children = [...res.data]
					const temp = JSON.stringify(this.addressOptions)
					// this.addressOptions = []
					console.log(temp);
					// this.addressOptions.pop()
					this.$set(this.addressOptions, 0, [...res.data])
					// this.$forceUpdate()
					console.log('111111', this.$refs.picker, this.cascaderValue);
					// this.addressOptions = JSON.parse(JSON.stringify(this.addressOptions))

				}
			},
			// 弃用。。。
		}

	}
</script>

<style lang="scss">
	.editUser {

		/deep/ .van-field__label--disabled,
		.van-field__label {
			color: #000 !important;
		}

		// .van-cell {
		// 	padding-left: 0;
		// 	padding-right: 0;
		// }

		.ava {
			display: flex;
			align-items: center;
			justify-content: center;
			flex-direction: column;
			margin: 60rpx 0;

			.avatar {
				width: 150rpx;
				height: 150rpx;
				border-radius: 50%;
				// background-color: skyblue;
				margin-bottom: 20rpx;
			}

			.txt {
				font-size: 32rpx
			}
		}

		.subbtn {
			padding: 32rpx;
		}
	}
</style>