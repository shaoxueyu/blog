function throttle(fn, delay) {
	// 记录上一次函数触发的时间
	let lastTime = 0
	return (...arg) => {
		let args = [...arg]
		// 记录当前函数触发的时间
		let nowTime = Date.now()
		if (nowTime - lastTime > delay) {
			fn.apply(this, args) // 修正this指向问题
			// 同步时间
			lastTime = nowTime
			return true
		}
		return false
		
	}
}
export default throttle
