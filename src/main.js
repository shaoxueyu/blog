import Vue from 'vue'
import App from './views/App.vue'
import router from './router'
import '@/http/index'
import './assets/css/reset.css'
import './assets/css/global.css'
import './assets/css/animate.min.css'
import './assets/fonts/font.css'
import '@/plugins/index'

console.log(process.env.NODE_ENV,"---------------------------------------------");


new Vue({
	render: (h) => h(App),
	router,
}).$mount('#app')
