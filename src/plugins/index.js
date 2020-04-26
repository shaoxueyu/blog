import Vue from 'vue'
import element from './element'
Object.keys(element).forEach((key) => {
	Vue.use(element[key])
})
