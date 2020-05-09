module.exports = function() {
	const arrCode = [
		~~(Math.random() * 9),
		~~(Math.random() * 9),
		~~(Math.random() * 9),
		~~(Math.random() * 9),
	]
	let vcode = arrCode.reduce((a, b) => {
		return a.toString() + b.toString()
  })
  return vcode
}
