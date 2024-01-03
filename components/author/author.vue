<template>
	<!-- 作者信息 -->
	<view class="author" v-if="data.uuid || data.follower_id || del">
		<view class="ava">
			<image :src="data.avatar" mode="aspectFill">
			</image>
		</view>

		<!-- 信息 -->
		<view class="author-info">
			<view class="uname">
				{{data.username}}
			</view>
			<view class="other-info">
				<text class="sex">
					{{sexCp}}
				</text>
				<text class="year">
					{{timeCp}}年加入
				</text>
			</view>
		</view>
		<!-- 信息 -->

		<!-- 关注 -->
		<view v-if="!del" :class="{'van-tag':true,active:isfollowing}" @click="follow(isfollowing)">
			{{['+关注','取关'][isfollowing]}}
		</view>
		<!-- 关注 -->
		<!-- 删除 -->
		<van-icon v-if="del" class="del-icon" name="delete-o" @click="handleDelete" />
		<!-- 删除 -->
	</view>
	<!-- 作者信息 -->
</template>

<script>
	export default {
		name: "author",
		props: {
			data: {
				type: Object,
			},
			isfollowing: {
				type: Number,
				default: 0
			},
			del: {
				type: Boolean,
				default: false
			},
			work_id: {
				type: String
			}
		},

		computed: {
			sexCp() {
				console.log(this.data);
				const sex = this.data.sex
				if (sex > 2 || sex < 0) return '未知'
				return ['男', '女', '保密'][sex]
			},
			timeCp() {
				return new Date(this.data.createtime).getFullYear()
			}
		},

		methods: {
			follow(isfollowing) {
				this.$emit('onIsFollow', {
					following_id: this.data.uuid || this.data.follower_id,
					condition: isfollowing
				})
			},

			handleDelete() {
				this.$emit('onDelete', this.work_id)
				console.log('删除');
			}
		}
	}
</script>

<style lang="scss" scoped>
	.del-icon {
		font-size: 40rpx
	}

	// 作者
	.author {
		display: flex;
		justify-content: space-between;
		align-items: center;

		.ava {
			width: 80rpx;
			height: 80rpx;
			border-radius: 50%;
			overflow: hidden;
		}

		.author-info {
			flex: 1;
			margin-left: 20rpx;

			.uname {
				font-size: 30rpx;
				// font-weight: 700;
				line-height: 1.3;
			}

			.other-info {
				font-size: 26rpx;
				// margin-top: 16rpx;
				color: #aaa;

				.sex {
					margin-right: 20rpx;
				}
			}
		}

		.van-tag {
			width: 100rpx;
			padding: 10rpx 15rpx;
			font-size: 26rpx;
			text-align: center;
			color: #fff;
			background-color: #666ee8;
			border-radius: 50rpx;

			&.active {
				background-color: #F56C6C;
			}
		}
	}
</style>