import {
	Button,
	Aside,
	Container,
	Input,
	MessageBox,
	Form,
	FormItem,
	Timeline,
	TimelineItem,
	Card,
	Message,
	Dropdown,
	DropdownMenu,
	DropdownItem,
	Dialog,
	Upload
} from 'element-ui'
import Vue from 'vue'
import 'element-ui/lib/theme-chalk/index.css'
Vue.prototype.$msgbox = MessageBox
Vue.prototype.$confirm = MessageBox.confirm
Vue.prototype.$message = Message
export default {
	Button,
	Aside,
	Container,
	Input,
	Form,
	FormItem,
	Timeline,
	TimelineItem,
	Card,
	Dropdown,
	DropdownMenu,
	DropdownItem,
	Dialog,
	Upload
}
