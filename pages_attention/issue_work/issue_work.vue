<template>
	<div class="recipe">
		<navbar title="上传作品" />
		<!-- 上传区域 -->
		<view class="upload">
			<view class="box">
				<uni-file-picker limit="1" @select="select"></uni-file-picker>
			</view>
			<van-cell-group>
				<van-field :value="title" @change="change($event,'title')" label="标题" maxlength="20" placeholder="请输入标题"
					border="false" />
				<van-field :value="text_content" @change="change($event,'text_content')" label="留言" type="textarea"
					placeholder="请输入内容" :autosize="{minHeight: 200 }" :border="false" />
			</van-cell-group>
		</view>

		<!-- 上传区域 -->
		<div class="submit"><button @click="submit">发布作品</button></div>
		<van-toast id="van-toast" />
	</div>
</template>

<script>
	import Toast from '@/wxcomponents/vant/toast/toast.js';
	export default {
		data() {
			return {
				foods_img: "",
				text_content: '',
				title: ''
			}
		},
		methods: {
			change(e, id) {
				this[id] = e.detail
				console.log(e, this[id]);
				// e.detail
			},
			// 获取上传状态
			select(e) {
				const {
					tempFilePaths
				} = e
				this.afterRead(tempFilePaths)
			},
			async submit() {
				const params = {
					text_content: this.text_content,
					title: this.title,
					foods_img: this.foods_img,
					author_id: this.$store.state.userInfo.uuid
				}
				const res = await this.$api.issueWork(params)
				if (res.meta.state === 201) {
					this.text_content = ''
					this.title = ''
					Toast.success(res.meta.message);
					uni.navigateBack({
						delta: 1
					})
					return
				}
				return Toast.fail(res.meta.message);
			},

			afterRead(file, model) {
				uni.uploadFile({
					url: this.$store.state.api + '/upload/profile', // 上传地址
					filePath: file[0],
					name: 'img', // 接口字段
					header: {
						token: this.$store.state.token
					},
					success: uploadFileRes => {
						let res = JSON.parse(uploadFileRes.data);
						if (res.meta.state === 201) {
							const url = '/' + res.data[0].filename;
							this.foods_img = url
						}
					},
					fail: e => {
						console.log('网络请求fail');
					},
					complete: val => {
						//返回成功后调用后端返回的照片接口刷新头像
						uni.hideLoading();
						uni.showToast({
							title: '上传成功！',
							icon: 'none'
						});
					}
				});
			}
		}
	};
</script>

<style lang="scss" scoped>
	.recipe {
		.upload {
			padding: 20rpx;

			.box {
				margin-bottom: 20rpx;
				// padding: 20rpx;
			}
		}

		.submit {
			width: 100%;
			margin-top: 50rpx;
			height: 80rpx;
			padding: 0 30rpx;
			box-sizing: border-box;
			margin-bottom: 50rpx;

			button {
				display: flex;
				justify-content: center;
				align-items: center;
				width: 100%;
				height: 100%;
				font-size: 40rpx;
				color: #fff;
				border-radius: 8rpx;
				background-color: #666ee8;
				font-weight: 700;
			}
		}
	}
</style>