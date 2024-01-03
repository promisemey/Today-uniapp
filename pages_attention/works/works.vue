<template>
	<view class="works">
		<navbar :title="title" />
		<view v-if="id === 1 && Allworks.length" class="works-card">
			<uni-card :is-shadow="true" is-full v-for="item in  Allworks" :key="item.work_id">
				<view class="works-ava" v-if="user.uuid">
					<author :data="user" @onDelete="onDel" :work_id="item.work_id" :del="true" />
				</view>
				<!-- 内容 -->
				<view class="context" @click="jump(item.work_id)">
					<view class="title">
						{{item.title}}
					</view>
					<view class="details">
						{{item.text_content}}
					</view>
					<view class="img">
						<image v-if="item.image_url" :src="item.image_url" mode="aspectFill"></image>
					</view>
				</view>
				<!-- 内容 -->
				<!-- 发布日期  -->
				<view class="time">
					{{item.created_at}} 发布
				</view>
				<!-- 发布日期  -->
				<!-- 点赞 评论 -->
				<view class="util">
					<!-- hand-up-filled -->
					<!-- 					<view class="up" @click="onUp">
						<uni-icons type="hand-up" size="25"></uni-icons>
						122
					</view> -->
					<!-- 					<view class="comment" @click="onComment">
						<uni-icons type="chatboxes" size="25"></uni-icons>
						4
					</view> -->
				</view>
				<!-- 点赞 评论 -->
			</uni-card>
			<van-divider contentPosition="center" customStyle="color: #1989fa; border-color: #1989fa; font-size: 32rpx;">
				我是有底线的
			</van-divider>
		</view>

		<view v-else-if="id === 2 && works.total " class="works-card">
			<uni-card :is-shadow="true" is-full v-for="item in works.list " :key="item.work_id">
				<view class="works-ava" v-if="user.uuid">
					<author :data="user" @onDelete="onDel" :work_id="item.work_id" :del="true" />
				</view>
				<!-- 内容 -->
				<view class="context" @click="jump(item.work_id)">
					<view class="title">
						{{item.title}}
					</view>
					<view class="details">
						{{item.text_content}}
					</view>
					<view class="img">
						<image v-if="item.image_url" :src="item.image_url" mode="aspectFill"></image>
					</view>
				</view>
				<!-- 内容 -->
				<!-- 发布日期  -->
				<view class="time">
					{{item.created_at}} 发布
				</view>
				<!-- 发布日期  -->
				<!-- 点赞 评论 -->
				<view class="util">
					<!-- hand-up-filled -->
					<!-- 					<view class="up" @click="onUp">
						<uni-icons type="hand-up" size="25"></uni-icons>
						122
					</view> -->
					<!-- 					<view class="comment" @click="onComment">
						<uni-icons type="chatboxes" size="25"></uni-icons>
						4
					</view> -->
				</view>
				<!-- 点赞 评论 -->
			</uni-card>
			<van-divider contentPosition="center" customStyle="color: #1989fa; border-color: #1989fa; font-size: 32rpx;">
				我是有底线的
			</van-divider>
		</view>

		<van-empty v-else description="暂无作品" />
		<van-dialog id="van-dialog" />
	</view>
</template>

<script>
	import Dialog from '@/wxcomponents/vant/dialog/dialog';
	import {
		mapState,
		mapMutations,
		mapActions
	} from 'vuex'
	export default {
		data() {
			return {
				title: '全部作品',
				user: {},
				work_id: '',
				Allworks: [],
				id: 1
			};
		},
		computed: {
			...mapState({
				works: state => state.works,
			}),
		},
		methods: {
			...mapMutations({
				setWorks: 'setWorks'
			}),
			...mapActions({
				GET_WORKS: 'GET_WORKS'
			}),
			async beforeClose(action) {
				if (action === 'confirm') {
					const res = await this.$api.deleteWorks({
						works_id: this.work_id
					})
					if (res.meta.state === 200) this.GET_WORKS()
					Dialog.close()
				} else {
					Dialog.close()
				}
			},
			jump(work_id) {
				uni.navigateTo({
					url: '/pages_attention/works/works_details?work_id=' + work_id
				})
			},
			async getAllWorks() {
				const res = await this.$api.getAllWorks()
				this.Allworks = res.data || []
				// setWorks(res.data)
			},
			async getUserWorks() {
				const {
					userInfo
				} = this.$store.state
				this.user = userInfo
				const res = await this.$api.getWorks({
					author_id: userInfo.uuid
				})
				if (res.meta.state === 200) this.works = res.data.list
			},
			onDel(id) {
				console.log(id);
				this.work_id = id
				console.log(this.work_id);
				Dialog.confirm({
					title: '删除',
					message: '确定删除',
					beforeClose: this.beforeClose
				});
			},
			onUp() {
				console.log('点赞');
			},
			onComment() {
				console.log('评论');
			}
		},
		onLoad(params) {
			if (params.all) {
				this.id = 1
				this.title = '全部作品'
				this.getAllWorks()
			} else {
				const {
					userInfo
				} = this.$store.state
				this.user = userInfo
				this.id = 2
				this.title = '个人作品'
				this.GET_WORKS()
			}
		},

	}
</script>

<style lang="scss">
	.works {
		padding: 0 30rpx 30rpx;

		.uni-card {
			margin: 20rpx 0 !important;
		}

		.works-ava {
			margin: 20rpx 0;
		}

		.context {
			width: 100%;
			overflow: hidden;
			line-height: 1.5;

			.title {
				text-overflow: ellipsis;
				white-space: nowrap;
				overflow: hidden;
				width: 100%;
				font-size: 30rpx
			}

			.details {
				font-size: 26rpx
			}
		}

		.img {
			margin: 15rpx 0;
			border-radius: 20rpx;
			overflow: hidden;
			background-color: antiquewhite;
			width: 600rpx;
			height: 600rpx;
		}

		.time {
			margin: 15rpx 0;
			font-size: 24rpx;
			color: #999;
		}

		.util {
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
</style>