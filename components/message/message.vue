<template>
	<view class="message">
		<view class="comment-message" v-for="item in comment" :key="item.author_id">
			<view class="avatar">
				<van-image width="100%" height="100%" :src="item.avatar" fit="cover">
				</van-image>
			</view>
			<view class="info">
				<view class="uname">
					{{item.username}}
				</view>
				<view class="date">
					{{item.created_at | timeF}}
				</view>
				<view class="mess">
					{{item.content}}
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name: "message",
		props: {
			comment: {
				type: Array,
				default: []
			}
		},
		filters: {
			timeF(time) {
				return new Date(time).toLocaleDateString()
			}
		},
		data() {
			return {

			};
		}
	}
</script>

<style lang="scss" scoped>
	.message {

		.comment-message {
			display: flex;
			margin-top: 30rpx;

			.avatar {
				width: 60rpx;
				height: 60rpx;
				border-radius: 50%;
				background-color: skyblue;
				overflow: hidden;
			}

			.info {
				flex: 1;
				display: flex;
				justify-content: space-between;
				flex-direction: column;
				margin-left: 10rpx;
				font-size: 24rpx;
				line-height: 1.5;
				color: #aaa;

				.date {
					font-size: 20rpx;
				}

				.mess {
					font-size: 30rpx;
					color: #000;
				}
			}
		}
	}
</style>