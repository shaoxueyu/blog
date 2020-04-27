const mongoose = require('mongoose')
const config = require('./config/conf')
const { loadModel } = require('./framework/loader')
let model = {}
model = loadModel(config)
module.exports = model
