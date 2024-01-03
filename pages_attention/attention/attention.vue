<template>
	<view class="attention">
		<navbar :title="title"></navbar>
		<view class="list">
			<template v-for="item in following">
				<!-- {{item}} -->
				<author :data="item" :key="item.follower_id" :isfollowing="item.is_followed_by_me" @onIsFollow="onIsFollow">
				</author>
			</template>
		</view>
		<van-dialog id="van-dialog" />
	</view>
</template>

<script>
	import Dialog from '@/wxcomponents/vant/dialog/dialog';
	import {
		mapActions
	} from 'vuex'
	export default {
		data() {
			return {
				title: '',
				titleId: 0,
				following: [],
				user: 0,
				condition: 0,
				follows: 0,
			};
		},
		methods: {
			...mapActions({
				GET_ATTENTION_COUNT: 'GET_ATTENTION_COUNT',
				GET_FANS_COUNT: 'GET_FANS_COUNT'
			}),
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
					following_id: this.follows, // 作者
					follower_id: this.user // 当前用户
				}
				const res = await this.$api.deletefollow(params)
				if (res.meta.state === 200) {
					this.init()
					this.GET_ATTENTION_COUNT()
					this.GET_FANS_COUNT()
				}
				return true
			},
			async becomeFans() {
				const params = {
					following_id: this.follows, // 作者
					follower_id: this.user // 当前用户
				}
				const res = await this.$api.postFans(params)
				if (res.meta.state === 201) {
					this.init()
					this.GET_ATTENTION_COUNT()
					this.GET_FANS_COUNT()
				}
				return true
			},
			onIsFollow(params) {
				this.condition = params.condition
				this.follows = params.following_id
				Dialog.confirm({
					title: '关注',
					message: ['确认要关注', '确认要取消关注'][params.condition],
					beforeClose: this.beforeClose
				});
			},
			async init() {
				const follow = ['follower_id', 'following_id'][this.titleId]
				let res = []
				if (!Number(this.titleId)) {
					res = await this.$api.getFollowInfo({
						[follow]: this.user
					})
				} else {
					res = await this.$api.postAllisFollowed({
						[follow]: this.user
					})
				}
				this.following = res.data
			}
		},
		async onLoad(option) {
			this.user = option.follow
			this.titleId = option.title
			this.init()
			this.title = ['关注', '粉丝', '收到的赞'][option.title]
		},
	}
</script>

<style lang="scss" acoped>
	.list {
		padding: 30rpx;

		.author {
			margin-bottom: 30rpx;
		}
	}
</style>