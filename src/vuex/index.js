/**
 * 使用 Vue.observable 模拟vuex
 */
import Vue from 'vue'

export const store = Vue.observable({
	user: {
		username: '',
	}, // 用户信息
})

export const mutations = {
	setUser({ username }) {
		store.username = username
	},
}
