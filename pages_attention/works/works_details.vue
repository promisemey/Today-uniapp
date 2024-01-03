<template>
	<view class="works-details">
		<navbar title="作品详情" />
		<view class="image">
			<van-image width="100%" height="100%" :src="work_details.image_url" fit="cover" />
		</view>
		<!-- 作品详情 -->
		<view :class="{details:true,sticky:open}">
			<!-- 内容 -->
			<view class="context">
				<view class="title">
					{{work_details.title}}
				</view>
				<view class="text">
					{{work_details.text_content}}
				</view>
			</view>
			<!-- 内容 -->
			<!-- 发布日期  -->
			<view class="time">
				{{work_details.created_at | timeF}} 发布
			</view>
			<!-- 发布日期  -->
			<van-divider />
		</view>
		<!-- 作品详情 -->
		<!--  -->
		<scroll-view scroll-y="true" class="details-box" @scroll="onScroll">
			<!-- 评论 -->
			<view class="main">
				<!-- 评论列表 -->
				<view class="message-box">
					<view class="title">
						评论 ({{total}})
					</view>
					<message :comment="comment" />
				</view>
				<!-- 评论列表 -->
			</view>
			<!-- 评论 -->
		</scroll-view>
		<!--  -->

		<!-- 发送评论 -->
		<view class="send">
			<view class="input-box">
				<input class="input" v-model.trim="sendcomment" type="text" confirm-type="send" placeholder="添加评论..."
					@confirm="onSendComment">
			</view>
			<!-- 点赞 评论 -->
			<view class="util">
				<!-- hand-up-filled -->
				<!-- 				<view class="up" @click="onUp">
					<uni-icons type="hand-up" size="25"></uni-icons>
					122
				</view> -->
				<view class="comment" @click="onComment">
					<uni-icons type="chatboxes" size="25"></uni-icons>
					{{total}}
				</view>
			</view>
			<!-- 点赞 评论 -->
		</view>
		<!-- 发送评论 -->
		<van-dialog id="van-dialog" />
	</view>
</template>

<script>
	export default {
		data() {
			return {
				user: {},
				works: [],
				comment: [],
				work_details: {},
				sendcomment: '',
				work_id: '',
				total: 0,
				top: 0,
				open: false
			};
		},
		filters: {
			timeF(time) {
				console.log(time);
				return new Date(time).toLocaleDateString()
			}
		},
		onLoad(params) {
			uni.createSelectorQuery().in(this).select('.send').boundingClientRect(rect => {
				this.top = rect.top
			}).exec()
			this.work_id = params.work_id
			const init = {
				work_id: params.work_id
			}
			this.getWorksDetails(init)
			this.getComment(init)
		},
		methods: {
			onScroll(e) {
				if (e.target.scrollTop >= this.top) {
					this.open = true
				} else {
					this.open = false
				}
			},
			async onSendComment(event) {
				// console.log(event.detail, this.sendcomment);
				const user = this.$store.state.userInfo
				if (!this.sendcomment.length) return
				const params = {
					content: this.sendcomment,
					author_id: user.uuid,
					work_id: this.work_id
				}
				const res = await this.$api.postComment(params)
				if (res.meta.state === 201) {
					this.sendcomment = ''
					this.getComment({
						work_id: this.work_id
					})
				}

			},
			async getComment(id) {
				const res = await this.$api.getAllComment(id)
				console.log('=>>', res);
				if (res.meta.state === 200) {
					this.comment = res.data.list,
						this.total = res.data.total
				}
			},
			async getWorksDetails(id) {
				const res = await this.$api.getWorksDetails(id)
				console.log('=>>', res);
				if (res.meta.state === 200) {
					this.work_details = res.data
				}
			}
		}
	}
</script>

<style lang="scss">
	.works-details {
		position: relative;
		width: 100%;
		height: 100%;
		box-sizing: border-box;

		.sticky {
			position: sticky !important;
			top: 120rpx !important;
			z-index: 10;
			background-color: pink;
		}

		.image {
			width: 100vw;
			height: 800rpx;
			box-sizing: border-box;
			overflow: hidden;
			position: fixed;
		}

		.details-box {
			top: 0;
			width: 100vw;
			height: 100vh;
			position: absolute;
			overflow: scroll;

		}

		// 详情
		.details {
			position: absolute;
			width: 100%;
			box-sizing: border-box;
			background-color: #fff !important;
			top: 800rpx;
			height: 280rpx;

			.time {
				font-size: 24rpx;
				color: #999;
			}

			.context {
				width: 100%;
				overflow: hidden;
				line-height: 1.5;
				box-sizing: border-box;
				padding: 20rpx 30rpx;

				.title {
					text-overflow: ellipsis;
					white-space: nowrap;
					overflow: hidden;
					width: 100%;
					font-size: 30rpx
				}

				.text {
					font-size: 26rpx
				}
			}
		}

		.main {
			position: absolute;
			width: 100vw;
			overflow: hidden;
			box-sizing: border-box;
			background-color: #fff;
			top: 1050rpx;
		}

		.message-box,
		.content,
		.time {
			padding: 20rpx 30rpx;
		}

		.message-box {
			&::after {
				content: '';
				display: block;
				height: 130rpx
			}
		}

		.send {
			position: fixed;
			left: 0;
			bottom: 0;
			width: 100%;
			height: 120rpx;
			overflow: hidden;
			display: flex;
			align-items: center;
			background-color: #fff;
			z-index: 999;

			.input-box {
				flex: 1;
				display: flex;
				justify-content: center;
				align-items: center;
				background-color: #f7f8fa;
				height: 60rpx;
				border-radius: 30rpx;
				margin: 0 20rpx;
				padding: 0 16rpx;
				box-sizing: border-box;

				.input {
					position: relative;
					height: 50rpx;
					box-sizing: border-box;
					width: 100%;
					min-width: 0;
					margin: 40rpx 0;
					padding: 0;
					color: #323233;
					line-height: inherit;
					text-align: left;
					background-color: transparent;
					border: 0;
					resize: none;
				}
			}

			.util {
				width: 200rpx;
				display: flex;
				align-items: center;

				.up,
				.comment {
					display: flex;
					align-items: center;
					margin-right: 20rpx;
				}
			}
		}

	}
</style>