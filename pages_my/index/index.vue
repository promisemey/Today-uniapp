<template>
	<view class="my">
		<van-nav-bar title="个人中心" title-class="navbar" :fixed="true" :placeholder="true" />
		<view class="info-panel">
			<!-- 头像 -->
			<view class="avatar" @click="edit">
				<image v-if="user.avatar" class="img" :src="user.avatar" mode="aspectFill"></image>
				<image v-else class="img" src="../../static/c1.png" mode=""></image>
			</view>
			<!-- 头像 -->
			<!-- 信息 -->
			<view class="user-panel">
				<view class="info">
					<view class="uname">
						{{user.username}}
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
				<van-icon name="setting-o" @click="onSetting" />
			</view>

			<!-- 信息 -->

			<!-- 关注 -->
			<view class="box">
				<view class="attention" @click="onInfo(0)">
					<view class="num">
						{{attention}}
					</view>
					<view class="txt">
						关注
					</view>
				</view>
				<view class="attention" @click="onInfo(1)">
					<view class="special">
						<view class="num">
							{{fans}}
						</view>
						<view class="txt">
							粉丝
						</view>
					</view>
				</view>
				<view class="attention" @click="onInfo(2)">
					<view class="num">
						0
					</view>
					<view class="txt">
						收到的赞
					</view>
				</view>
			</view>
			<!-- 关注 -->
		</view>
		<!-- 底部 -->

		<!-- 内容 -->
		<van-tabs :active="active" class="tabs" z-index="0" title-active-color="#666eeb" color="#666eeb" animated swipeable>
			<van-tab title-style="display: none;" :disabled="true" :title="'选项1 '">
				内容 {{ JSON.stringify(active) }}
			</van-tab>
			<van-tab :title="`菜谱${recipe.total}`">
				<view class="content">
					<view class="food-menu" v-for="item in recipe.list" :key="item.recipe_id">
						<view class="img" @click="onDetails(item.recipe_id)">
							<image v-if="item.foods_img" :src="item.foods_img" mode="aspectFill"></image>
						</view>
						<view class="title">
							{{item.sub_title}}
						</view>
					</view>
				</view>
				<view class="end">
					<view class="line"></view>
					<view>我是有底线的</view>
					<view class="line"></view>
				</view>
			</van-tab>
			<van-tab :title="`作品${works.total}`">
				<view class="content">
					<view class="works" v-for="item in works.list" :key="items.work_id">
						<image :src="item.image_url" mode="aspectFill" @click="getAllWorks"></image>
					</view>
				</view>
			</van-tab>
			<van-tab title-style="display: none;" :disabled="true" :title="'选项 '">
				内容 {{ JSON.stringify(active) }}
			</van-tab>
		</van-tabs>
		<!-- 内容 -->

		<tabbar />
		<!-- 底部 -->
	</view>
</template>

<script>
	import {
		mapState,
		mapMutations,
		mapActions
	} from 'vuex'
	export default {
		data() {
			return {
				user: {},
				active: 1,
				recipe: {},
			}
		},
		watch: {
			userInfo: {
				handler(n) {
					this.user = n
				},
				deep: true,
				immediate: true
			}
		},
		computed: {
			...mapState({
				userInfo: state => state.userInfo,
				api: state => state.api,
				attention: state => state.attentionCount,
				fans: state => state.fansCount,
				works: state => state.works,
			}),
			sexCp() {
				const sex = this.user.sex
				if (sex > 2 || sex < 0) return '未知'
				return ['男', '女', '保密'][sex]
			},
			timeCp() {
				return new Date(this.user.createtime).getFullYear()
			}
		},
		created() {
			// 获取用户基本信息
			const userInfo = this.userInfo || uni.getStorageSync('userInfo') ? JSON.parse(uni.getStorageSync('userInfo')) : []
			if (userInfo) {
				this.user = userInfo
				this.getRecipe()
				// this.getWorks()
				this.GET_WORKS()
			}
			this.GET_ATTENTION_COUNT()
			this.GET_FANS_COUNT()
		},
		methods: {
			...mapMutations({
				setUser: 'updateUserInfo',
			}),
			...mapActions({
				GET_ATTENTION_COUNT: 'GET_ATTENTION_COUNT',
				GET_FANS_COUNT: 'GET_FANS_COUNT',
				GET_WORKS: 'GET_WORKS'
			}),
			getAllWorks() {
				uni.navigateTo({
					url: '/pages_attention/works/works'
				})
			},
			// async getWorks() {
			// 	const {
			// 		uuid: author_id
			// 	} = this.user
			// 	const res = await this.$api.getWorks({
			// 		author_id
			// 	})
			// 	if (res.meta.state === 200) {
			// 		this.works = res.data
			// 	}
			// },
			async getRecipe() {
				const {
					uuid: author_id
				} = this.user
				const res = await this.$api.getUserFoods({
					author_id
				})

				if (res.meta.state === 200) {
					this.recipe = res.data
				}
			},
			onDetails(id) {
				uni.navigateTo({
					url: `/pages_foods-detail/index/index?uid=${id}`
				})
			},
			edit() {
				uni.navigateTo({
					url: '/pages_attention/editUser/editUser'
				})
			},
			onSetting() {
				uni.navigateTo({
					url: '/pages_setting/index/index'
				})
			},
			onInfo(id) {
				uni.navigateTo({
					url: `/pages_attention/attention/attention?title=${id}&follow=${this.user.uuid}`
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.my {
		box-sizing: border-box;
		width: 100%;
		padding: 0 30rpx 60rpx;

		// 个人信息
		.info-panel {
			position: relative;
			display: flex;
			flex-direction: column;
			margin-top: 70rpx;
			margin-bottom: 40rpx;
			width: 100%;
			height: 300rpx;
			border-radius: 20rpx;
			box-sizing: border-box;
			// overflow: hidden;
			box-shadow: 0 5px 20px rgba(0, 0, 0, .2);

			// 头像
			.avatar {
				position: absolute;
				left: 30rpx;
				top: -70rpx;
				width: 200rpx;
				height: 200rpx;
				padding: 10rpx;
				box-sizing: border-box;
				border-radius: 50%;
				background-color: #fff;
				box-shadow: 0 5px 10px rgba(0, 0, 0, .1);

				.img {
					background-color: pink;
					border-radius: 50%;
					overflow: hidden;
				}
			}

			// 信息
			.user-panel {
				display: flex;
				justify-content: space-between;
				align-items: flex-start;
				margin: 30rpx 30rpx 0 250rpx;

				/deep/ .van-icon {
					font-size: 44rpx;
					font-weight: 700;
					color: #333;
				}

				.info {

					.uname {
						font-size: 40rpx;
						font-weight: 700;
						line-height: 1;
					}

					.other-info {
						font-size: 26rpx;
						margin-top: 16rpx;
						color: #aaa;

						.sex {
							margin-right: 20rpx;
						}
					}
				}
			}

			.box {
				flex: 1;
				display: flex;
				// justify-content: space-between;
				justify-content: space-evenly;
				align-items: center;
				margin: 30rpx;
				overflow: hidden;
				box-sizing: border-box;

				// .attention:not(:nth-of-type(2)) {
				.attention:not(:nth-of-type(2)) {
					// max-width: 30%;
					box-sizing: border-box;
					flex-basis: 0;
					flex: 1;
					display: flex;
					justify-content: center;
					flex-direction: column;
					text-align: center;
					align-items: center;
					font-size: 30rpx;
					overflow: hidden;

					.num {
						width: 100%;
						text-overflow: ellipsis;
						white-space: nowrap;
						overflow: hidden;
					}

					.txt {
						color: #aaa;
						font-size: 26rpx;
					}
				}

				.attention:nth-of-type(2) {
					flex: 1;
					display: flex;
					justify-content: space-between;
					padding: 0 10rpx;
					max-width: 33%;
					align-items: center;
					text-align: center;
					font-size: 30rpx;

					&::after,
					&::before {
						content: '';
						width: 2rpx;
						height: 40rpx;
						background-color: #ccc;
					}

					.special {
						display: flex;
						flex-direction: column;
						max-width: 70%;

						.num {
							width: 100%;
							text-overflow: ellipsis;
							white-space: nowrap;
							overflow: hidden;
						}

						.txt {
							color: #aaa;
							font-size: 26rpx;
						}
					}
				}

			}
		}

		// 内容
		.tabs {
			.content {
				display: flex;
				justify-content: space-between;
				flex-wrap: wrap;
				margin-top: 30rpx;

				.works {
					width: 224rpx;
					height: 220rpx;
					border-radius: 10rpx;
					margin-bottom: 20rpx;
					background-color: aliceblue;
				}

				&::after {
					content: '';
					width: 224rpx;
				}

				.food-menu {
					width: 338rpx;
					height: 450rpx;
					margin-bottom: 40rpx;
					display: flex;
					flex-direction: column;
					justify-content: space-between;

					.img {
						width: 100%;
						height: 400rpx;
						background-color: rgba(0, 0, 0, .1);
						border-radius: 20rpx;
						overflow: hidden;

					}

					.title {
						width: 100%;
						font-size: 32rpx;
						text-overflow: ellipsis;
						white-space: nowrap;
						overflow: hidden;
					}
				}

			}

			// 底线
			.end {
				display: flex;
				align-items: center;
				justify-content: space-evenly;
				margin-top: 50rpx;
				color: #ccc;
				font-size: 24rpx;

				.line {
					width: 25%;
					height: 1rpx;
					background-color: #ccc;
				}
			}
		}
	}

	.van-nav-bar_title {
		z-index: 10;
		position: absolute;
	}
</style>