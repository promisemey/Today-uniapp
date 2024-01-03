<template>
	<view class="navbar">
		<van-nav-bar :title="title" left-text="返回" :fixed="true" :placeholder="true" left-arrow @click-left="onClickLeft"
			bind:click-right="onClickRight" />
	</view>
</template>

<script>
	export default {
		name: "navbar",
		props: {
			title: {
				default: '食谱详情'
			}
		},
		data() {
			return {

			};
		},
		methods: {
			onClickLeft() {
				uni.navigateBack({
					delta: 1
				})
			},
		}
	}
</script>

<style lang="scss">

</style>