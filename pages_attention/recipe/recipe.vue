<template>
	<div class="recipe">
		<navbar title="上传菜谱" />
		<div class="cover">
			<uni-file-picker limit="1" :del-icon="true" disable-preview fileMediatype="image"
				@select="select($event,'foods_img')" @progress="progress" @success="success" @fail="fail">选择</uni-file-picker>
		</div>
		<div class="title"><input type="text" placeholder="添加菜谱名称" :value="name" @input="changeName"
				placeholder-style="text-align: center;" /></div>
		<div class="use">
			<div class="top">用料</div>
			<form>
				<div v-for="(item, i) in one" :key="i">
					<div class="test">
						<input type="text" id="name" :value="formData[i].name" placeholder="填写材料" placeholder-style="color:#bcbcbc"
							@input="change($event, i)" />
						<input type="text" id="dosage" :value="formData[i].dosage" placeholder="用料单位"
							placeholder-style="color:#bcbcbc" @input="change($event, i)" />
					</div>
				</div>
				<div class="add" @click="add">再新增一行</div>
			</form>
		</div>
		<div class="todo">
			<div class="top">做法</div>
			<form>
				<div v-for="(item, i) in two" :key="i">
					<div class="titles">步骤{{ i + 1 }}</div>
					<div class="img">
						<uni-file-picker limit="1" :del-icon="true" disable-preview fileMediatype="image"
							@select="select($event,i)">添加步骤</uni-file-picker>
					</div>
					<textarea id="step_content" placeholder="添加步骤说明" :value="step[i].step_content"
						@input="changes($event, i)"></textarea>
				</div>
				<div class="add" @click="adds">再新增一步</div>
			</form>
		</div>
		<div class="select">
			<div class="title">烹饪时常</div>
			<div class="time">
				<div :class="{ times: true, active: active === i }" v-for="(item, i) in need_time" :key="i" @click="active = i">
					{{ item }}
				</div>
			</div>
		</div>
		<div class="select">
			<div class="title">烹饪难度</div>
			<div class="time">
				<div :class="{ times: true, active: difficulty === i }" v-for="(item, i) in difficultys" :key="i"
					@click="difficulty = i">{{ item }}</div>
			</div>
		</div>
		<div class="recommend">
			<div class="left">推荐至分类</div>
			<div class="right">></div>
		</div>
		<div class="submit"><button @click="submit">发布菜谱</button></div>
		<van-toast id="van-toast" />
	</div>
</template>

<script>
	import {
		type
	} from 'os';
	import {
		request
	} from '../../utils/request.js';
	import Toast from '@/wxcomponents/vant/toast/toast.js';
	export default {
		data() {
			return {
				one: 1,
				two: 1,
				formData: [{
					name: '',
					dosage: ''
				}],
				step: [{
					step_num: 1,
					step_img: [],
					step_content: ''
				}],
				need_time: ['15分钟左右', '15-30分钟', '30-60分钟', '1小时以上'],
				active: 0,
				difficulty: 0,
				difficultys: ['零厨艺', '容易做', '有点挑战', '非常难'],
				name: '',
				upload: true,
				foods_img: "",

			};
		},
		methods: {
			// 获取上传状态
			select(e, model) {

				const {
					tempFilePaths
				} = e
				this.afterRead(tempFilePaths, model)
			},

			add() {
				this.one += 1;
				this.formData.push({
					name: '',
					dosage: ''
				});
			},
			cha() {
				console.log(111, this.step);
			},
			change(e, i) {
				this.formData[i][e.target.id] = e.target.value;
			},
			adds() {
				this.two += 1;
				this.step.push({
					step_num: this.step.length,
					step_img: '',
					step_content: ''
				});
			},
			changes(e, i) {
				this.step[i][e.target.id] = e.target.value;
			},
			changeName(e) {
				this.name = e.target.value;
			},
			async submit() {
				const res = await this.$api.postCreateFood({
					author_id: this.$store.state.userInfo.uuid,
					name: this.name,
					formData: JSON.stringify(this.formData),
					step: JSON.stringify(this.step),
					need_time: this.need_time[this.active],
					difficulty: this.difficulty,
					foods_img: this.foods_img
				});
				console.log('发布 => ', res);
				if (res.meta.state === 201) {
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
							if (typeof model === 'number') {
								this.step[model].step_img = url
							} else {
								this[model] = url
							}
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
	// ::v-deep .van-uploader {
	// 	width: 100%;
	// 	height: 100%;
	// 	background-color: pink;
	// }

	.recipe {
		overflow: auto;

		.cover {
			width: 100vw;
			height: 400rpx;
			background-color: #f8f8f8;
			display: flex;
			justify-content: center;
			align-items: center;

			::v-deep .uni-file-picker__container {
				margin: 0 !important;
			}

			::v-deep .file-picker__box {
				width: 100vw !important;
				height: 400rpx !important;
				text-align: center;
				line-height: 400rpx;
				border: 0 !important;
			}
		}

		.title {
			font-size: 50rpx;
			font-weight: 700;
			color: #bcbcbc;
			width: 100%;
			height: 300rpx;
			display: flex;
			align-items: center;
			justify-content: center;

			input {
				height: 60rpx;
			}
		}

		.use {
			.top {
				width: 100%;
				padding: 0 20rpx;
				box-sizing: border-box;
				font-weight: 700;
				font-size: 40rpx;
				margin-bottom: 20rpx;
			}

			.test {
				padding: 0 20rpx;
				box-sizing: border-box;
				display: flex;

				// border-bottom: 1rpx solid #bcbcbc;
				input {
					// color: #bcbcbc;
					margin-bottom: 15rpx;
				}
			}

			.add {
				color: #6c7ff6;
				margin-top: 20rpx;
				width: 100%;
				padding-left: 20rpx;
				box-sizing: border-box;
			}
		}

		.todo {
			margin-top: 30rpx;
			margin-bottom: 30rpx;

			.top {
				width: 100%;
				padding: 0 20rpx;
				box-sizing: border-box;
				font-weight: 700;
				font-size: 40rpx;
				margin-bottom: 20rpx;
			}

			.add {
				color: #6c7ff6;
				margin-top: 20rpx;
				width: 100%;
				padding-left: 20rpx;
				box-sizing: border-box;
			}

			.titles {
				width: 100%;
				padding-left: 20rpx;
				box-sizing: border-box;
			}

			.img {
				width: 100%;
				height: 400rpx;
				background-color: #f8f8f8;
				margin: 15rpx 0;

				::v-deep .uni-file-picker__container {
					margin: 0 !important;
				}

				::v-deep .file-picker__box {
					width: 100vw !important;
					height: 400rpx !important;
					text-align: center;
					line-height: 300rpx;
					border: 0 !important;
				}
			}

			textarea {
				padding: 0 20rpx;
				box-sizing: border-box;
				width: 100%;
				height: 100rpx;
			}
		}

		.select {
			padding: 0 20rpx;
			box-sizing: border-box;
			margin-bottom: 30rpx;

			.active {
				background-color: #666ee8;
				color: #fff;
			}

			.time {
				display: flex;
				justify-content: space-between;
				height: 40rpx;
			}

			.times {
				width: 20%;
				font-size: 27rpx;
				display: flex;
				justify-content: center;
				align-items: center;
				height: 40rpx;
				border-radius: 8rpx;
			}
		}

		.recommend {
			margin-top: 50rpx;
			width: 100%;
			height: 50rpx;
			padding: 0 20rpx;
			box-sizing: border-box;
			display: flex;
			justify-content: space-between;
			align-items: center;
			font-size: 40rpx;
			font-weight: 700;
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