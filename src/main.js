import Vue from 'vue'
import App from './views/App.vue'
import router from './router'
import './assets/css/reset.css'
import './assets/css/global.css'
import './assets/fonts/font.css'
import '@/plugins/index'

new Vue({
	render: (h) => h(App),
	router,
}).$mount('#app')
