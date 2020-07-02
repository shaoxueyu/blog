import Vue from 'vue'
import element from './element'
import "./progress"
Object.keys(element).forEach((key) => {
	Vue.use(element[key])
})

