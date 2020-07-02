<template>
  <div class="avatar-conainer">
    <el-upload
      class="avatar-uploader"
      action="http://localhost:8000/api/user/upload/avatar"
      :show-file-list="false"
      :before-upload="beforeAvatarUpload"
      :headers="myHeaders"
      :auto-upload="false"
      :http-request="httpRequest"
      :on-change="onChange"
      ref="upload"
    >
      <img
        v-if="imageUrl"
        :src="imageUrl"
        class="avatar"
      >
      <i
        v-else
        class="el-icon-plus avatar-uploader-icon"
      ></i>

    </el-upload>
    <div>
      <el-button @click="uploadSubmit">确认修改</el-button>
    </div>
  </div>
</template>

<script>
import { updateUserAvatar } from "@/http/user"
import { store } from "@/vuex/index"
export default {
  data() {
    return {
      imageUrl: "",
      myHeaders: {}
    }
  },
  props: {

  },
  created() {
    this.myHeaders.Authorization = window.localStorage.getItem("token")
  },
  methods: {
    onChange(file) {
      if (this.checkUploadFile(file)) {
        const url = URL.createObjectURL(file.raw ? file.raw : file)
        this.imageUrl = url
      }
    },
    //检查上传文件是否符合标准
    checkUploadFile(file) {
      let isPhoto, isLt2M

      isPhoto = /^image\/(jpeg|png|gif)$/.test(file.raw ? file.raw.type : file.type)
      isLt2M = (file.raw ? file.raw.size : file.size) / 1024 / 1024 < 2;

      if (!isPhoto) {
        this.$message.error('上传类型错误！')
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!')
      }
      if (!(isPhoto && isLt2M)) {
        this.$refs.upload.clearFiles() // 清除待上传文件
      }

      return isPhoto && isLt2M;
    },
    async httpRequest(ctx) {
      const formData = new FormData()
      formData.append("file", ctx.file)
      let { status, data } = await updateUserAvatar(formData)
      if (status >= 200 || status < 300) {
        store.user.photo = data.data.photo
        this.$message.success("头像修改成功")
        this.$msgbox.close()
      }
    },
    uploadSubmit() {
      this.$refs.upload.submit() // 会自动调用beforeAvatarUpload 方法
    },
    beforeAvatarUpload(file) {
      return this.checkUploadFile(file) // 如果为true直接调用httpRequest
    }

  }

}
</script>

<style lang="less">
.avatar-uploader {
  text-align: center;
}
.el-icon-plus {
  line-height: 178px !important;
}
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>