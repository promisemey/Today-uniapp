<template>
	<view class="food-detail">
		<van-nav-bar title="食谱详情" left-text="返回" :fixed="true" :placeholder="true" left-arrow @click-left="onClickLeft" />

		<view class="foods-img">
			<!-- 			<video id="myVideo" :src="foodsDetail.detail_video" @error="videoErrorCallback" :danmu-list="danmuList"
				enable-danmu danmu-btn controls> -->
			</video>
			<image :src="foodsDetail.foods_img" mode="aspectFill"></image>
			<view class="like">
				<van-checkbox use-icon-slot :value="checked" @change='onChange'>
					<van-icon slot="icon" color="#ee7001" :name="checked ? 'like' :'like-o'" />
				</van-checkbox>
			</view>
		</view>

		<!-- 菜谱详情 -->
		<view class="food-detail">
			<!-- 标题 -->
			<view class="title">
				{{foodsDetail.title}}
			</view>
			<!-- 标题 -->

			<!-- 做法信息 -->
			<view class="food-info">
				<view class="unit">
					<van-icon name="underway-o" />
					<span class="title-info">时间</span>
					<span>约{{foodsDetail.need_time}}</span>
				</view>
				<view class="unit">
					<van-icon name="star-o" />
					<span class="title-info">难度</span>
					<span>{{["零厨艺", "容易做", "有点挑战", "非常难"][foodsDetail.difficulty]}}</span>
				</view>
				<view class="unit">
					<van-icon name="like-o" />
					<span class="title-info">收藏</span>
					<span>{{count}}人</span>
				</view>
			</view>
			<!-- 做法信息 -->

			<!-- 分割线 -->
			<van-divider />
			<!-- 分割线 -->

			<!-- 作者信息 -->
			<author :data="author" :isfollowing="following" @onIsFollow="onIsFollow"></author>
			<!-- 作者信息 -->

			<!-- 用料 -->
			<view class="material">
				<view class="title">
					用料
				</view>
				<!-- 食材 -->
				<van-cell-group>
					<van-cell v-for="(item,i) in foodsDetail.ingredient" :key="i" :title="item.name" :value="item.dosage" />

				</van-cell-group>
				<!-- 食材 -->
			</view>
			<!-- 用料 -->

			<!-- 步骤 -->
			<view class="step">
				<view class="step-box" v-for="(item,i) in foodsDetail.step" :key="item.step_num">
					<view class="step-title">
						步骤{{i+1}}
					</view>
					<view class="step-img">
						<image :src="item.step_img" mode="aspectFill"></image>
					</view>
					<view class="step-content">
						<view class="step-txt" v-for="(content,i) in JSON.parse(item.step_content)" :key="i">
							{{content}}
						</view>
					</view>
				</view>
			</view>
			<!-- 步骤 -->

			<!-- 创建时间 -->
			<view class="create-time">
				<text>食谱创建于{{ foodsDetail.create_time }}</text>
				<text class="see">浏览1.8万次</text>
			</view>
			<van-divider />
			<!-- 创建时间 -->
		</view>
		<!-- 菜谱详情 -->

		<!-- 评价 -->
		<view class="comment">
			<view class="title">
				大家评价（{{total}}）
			</view>
			<!-- 发送评论 -->
			<view class="send-comment">
				<view class="avatar">
					<image :src="avatar" mode="aspectFill"></image>
				</view>
				<view class="search">
					<view class="input-box">
						<input class="input" v-model.trim="sendcomment" type="text" confirm-type="send" placeholder="留下你的精彩评论..."
							@confirm="onSendComment">
					</view>
				</view>
			</view>
			<!-- 发送评论 -->
			<!-- 评论信息 -->
			<message :comment="comments" />
			<!-- 评论信息 -->
		</view>
		<!-- 评价 -->
		<van-dialog id="van-dialog" />
	</view>
</template>

<script>
	import Dialog from '@/wxcomponents/vant/dialog/dialog';
	import {
		mapMutations,
		mapActions
	} from 'vuex'

	export default {
		data() {
			return {
				checked: false,
				foodsDetail: {},
				author: {},
				comments: [],
				count: 0,
				sendcomment: '',
				payload: {},
				total: 0,
				recipe_id: 0, // 菜谱id
				avatar: this.$store.state.userInfo.avatar,
				following: 0, // 是否关注
				condition: 0, // 用于判断执行取关还是关注
			};
		},
		async onLoad(params) {
			this.recipe_id = params.uid
			// 获取作者信息
			this.getAuthorInfo({
				recipe_id: this.recipe_id
			})
			this.onCount({
				recipe_id: this.recipe_id
			})
			// 查询是否收藏
			this.payload = {
				user_id: this.$store.state.userInfo.uuid,
				recipe_id: this.recipe_id
			}
			this.postIsFavorites()

			this.getCurrentComment() // 获取评论
			const res = await this.$api.getFoodsDetails({
				recipe_id: params.uid,
				token: this.$store.state.token
			})
			console.log('详情 =>', res);
			if (res.meta.state === 200) {
				this.foodsDetail = res.data
				this.foodsDetail.ingredient = JSON.parse(res.data.ingredient)
				this.foodsDetail.create_time = new Date(this.foodsDetail.create_time).toLocaleDateString().split('/').join(
					'-');
			}
		},
		computed: {
			...mapMutations({
				setFans: 'setFans'
			})
		},
		methods: {
			...mapActions({
				GET_FAVORITES: 'GET_FAVORITES',
				GET_ATTENTION_COUNT: 'GET_ATTENTION_COUNT',
				GET_FANS_COUNT: 'GET_FANS_COUNT'
			}),
			async onCount(id) {
				const res = await this.$api.getCount(id)
				this.count = res.data.total || 0
			},
			// 收藏 
			onChange() {
				switch (this.checked) {
					case 0:
						return this.postFavorites()
					case 1:
						return this.deleteFavorites()
					default:
						break;
				}
			},
			async postFavorites() {
				const res = await this.$api.postFavorites(this.payload)
				if (res.meta.state === 201) {
					this.checked = 1
					this.GET_FAVORITES()
				}
			},
			async deleteFavorites() {
				const res = await this.$api.deleteFavorites(this.payload)
				if (res.meta.state === 200) {
					this.checked = 0
					this.GET_FAVORITES()
				}
			},
			async postIsFavorites() {
				console.log('=<<<<', this.payload);
				const res = await this.$api.postIsFavorites(this.payload)
				if (res.meta.state === 200) {
					return this.checked = res.data.is_favoriting
				}
			},

			// 关注
			beforeClose(action) {
				if (action === 'confirm') {
					switch (this.condition) {
						case 0:
							return this.becomeFans()
						case 1:
							return this.unFollower()
						default:
							break;
					}

				} else {
					Dialog.close()
				}
			},
			// 取关
			async unFollower() {
				const params = {
					following_id: this.author.uuid, // 作者
					follower_id: this.$store.state.userInfo.uuid // 当前用户
				}
				const res = await this.$api.deletefollow(params)

				if (res.meta.state === 200) {
					this.isFollow()
					this.GET_ATTENTION_COUNT()
					this.GET_FANS_COUNT()
				}
				return true
			},
			async becomeFans() {
				const params = {
					following_id: this.author.uuid, // 作者
					follower_id: this.$store.state.userInfo.uuid // 当前用户
				}
				const res = await this.$api.postFans(params)
				if (res.meta.state === 201) {
					this.isFollow()
					this.GET_ATTENTION_COUNT()
				}
				return true
			},
			onIsFollow(params) {
				this.condition = params.condition
				Dialog.confirm({
					title: '关注',
					message: ['确认要关注', '确认要取消关注'][params.condition],
					beforeClose: this.beforeClose
				});
			},
			async isFollow() { // 是否已经关注
				const params = {
					following_id: this.author.uuid, // 作者
					follower_id: this.$store.state.userInfo.uuid // 当前用户
				}
				const res = await this.$api.postIsFollow(params)
				if (res.meta.state === 200) {
					this.following = res.data.is_following
				}
			},
			// 发送评论
			async onSendComment() {
				const user = this.$store.state.userInfo
				if (!this.sendcomment.length) return
				const params = {
					content: this.sendcomment,
					author_id: user.uuid,
					recipe_id: this.recipe_id
				}
				const res = await this.$api.postRecipeComment(params)

				if (res.meta.state === 201) {
					this.getCurrentComment()
					this.sendcomment = ''
				}

			},
			// 获取评论
			async getCurrentComment() {
				const res = await this.$api.getRecipeAllComment({
					recipe_id: this.recipe_id
				})

				if (res.meta.state === 200) {
					this.comments = res.data.list
					this.total = res.data.total
				}
			},
			// 获取作者信息
			async getAuthorInfo(recipe_id) {
				const res = await this.$api.getAuthorInfo(recipe_id)

				if (res.meta.state === 200) {
					this.author = res.data[0]
					// 获取是否关注
					this.isFollow()
				}
			},
			onClickLeft() {
				uni.navigateBack({
					delta: 1
				})
			},
		}
	}
</script>

<style lang="scss" scoped>
	.food-detail {

		.foods-img {
			width: 100%;
			height: 670rpx;
			font-size: 0;
			overflow: hidden;
			position: relative;
			background-color: pink;

			.like {
				font-size: 30rpx;
				display: flex;
				align-items: center;
				justify-content: center;
				width: 60rpx;
				height: 60rpx;
				border-radius: 50%;
				background-color: #fff;
				position: absolute;
				right: 40rpx;
				top: 40rpx;

				/deep/ .van-checkbox {
					display: block;
				}
			}
		}

		// 详情
		.food-detail {
			padding: 50rpx 30rpx 0;
			position: relative;
			top: -30rpx;
			z-index: 5;
			border-radius: 40rpx;
			background-color: #fff;

			.food-info {
				display: flex;
				flex-wrap: wrap;
			}

			.unit {
				width: 40%;
				font-size: 24rpx;
				color: #999;
				line-height: 3;

				&:first-of-type {
					color: #333;
				}

				.title-info {
					margin: 10rpx;
					color: #000;
				}
			}

			// 作者
			.auther {
				display: flex;
				justify-content: space-between;
				align-items: center;

				.ava {
					width: 80rpx;
					height: 80rpx;
					border-radius: 50%;
					overflow: hidden;
				}

				.auther-info {
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
				}
			}

			// 用料
			.material {
				margin-top: 40rpx;

				.title {
					font-size: 36rpx;
					font-weight: 700;
					margin-bottom: 30rpx;
				}

				.van-cell {
					padding-left: 0;
					padding-right: 0;

					&::after {
						left: 0;
						right: 0;
						transform: scale(1);
					}
				}

			}

			// 步骤
			.step {
				width: 100%;
				margin-top: 20rpx;

				.step-box:not(:last-of-type) {
					border-bottom: 2rpx solid #ebedf0;
				}

				.step-box {
					width: inherit;
					padding: 30rpx 0;

					.step-title {
						font-size: 36rpx;
						font-weight: 700;
					}

					.step-img {
						width: inherit;
						height: 400rpx;
						border-radius: 20rpx;
						overflow: hidden;
						margin: 30rpx 0;
					}

					.step-content {
						.step-txt {
							font-size: 26rpx;
							color: #333;
							line-height: 2;
						}
					}
				}
			}

			// 创建时间
			.create-time {
				font-size: 24rpx;
				color: #ccc;

				.see {
					margin-left: 10rpx;
				}
			}
		}

		// 评价
		.comment {
			margin-top: -10rpx;
			padding: 0 30rpx 30rpx;
			// background-color: pink;

			.title {
				font-size: 36rpx;
				font-weight: 700;
				margin-bottom: 30rpx;
			}

			.send-comment {
				display: flex;
				align-items: center;
				background-color: #fff;

				.avatar {
					width: 80rpx;
					height: 80rpx;
					border-radius: 50%;
					overflow: hidden;
					background-color: skyblue;
				}

				.search {
					flex: 1;

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
							// box-sizing: border-box;
							width: 100%;
							min-width: 0;
							margin: 40rpx 0;
							padding: 20rpx 20rpx;
							color: #323233;
							line-height: inherit;
							text-align: left;
							background-color: transparent;
							border: 0;
							resize: none;
						}
					}

				}
			}

		}

	}
</style>