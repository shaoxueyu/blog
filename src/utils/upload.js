const multer = require("koa-multer")
const path = require("path")
const storage =  multer.diskStorage({
  //文件保存路径
  destination(req,file,cb){
    cb(null,path.join(__dirname,"../server/public/user"))
  },
  // 修改文件名字
  filename(req,file,cb){
    const fileSplit = file.originalname.split(".")
    cb(null,`${Date.now()}-${file.originalname.substring(1,5)}.${fileSplit[fileSplit.length-1]}`)
  }
})
// 加载配置
const upload = multer({storage})

module.exports = upload