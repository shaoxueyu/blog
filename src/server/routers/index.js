const fs = require("fs")
const path = require("path")
module.exports =  {
  "get /": async ctx => {
    ctx.body = "首页"
  },
  "get /favicon.ico":async ctx => {
    ctx.set("Content-Type","image/jpg")
    ctx.body = fs.createReadStream(path.join(__dirname,'../public/images/web-icon.jpg'))
  },
}