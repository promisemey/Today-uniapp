// #ifndef VUE3
import Vue from 'vue'
import App from './App'
import store from './store'
import api from './common/api.js'

const operate = 'http://192.168.0.104:3000'
Vue.config.productionTip = false
Vue.prototype.$store = store
Vue.prototype.$api = api

App.mpType = 'app'

const app = new Vue({
	...App,
	store
})
app.$mount()
// #endif

// #ifdef VUE3
import {
	createSSRApp
} from 'vue'
import App from './App.vue'
export function createApp() {
	const app = createSSRApp(App)
	return {
		app
	}
}
// #endif