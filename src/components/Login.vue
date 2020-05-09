<template>
  <div class="login-page">
    <el-form
      :model="formData"
      :rules="formRules"
      ref="formRef"
    >

      <el-form-item
        label="用户名："
        prop="username"
      >
        <el-input
          type="text"
          v-model="formData.username"
          autocomplete="off"
          class="box"
        >
        </el-input>
      </el-form-item>
      <el-form-item
        label="密码："
        prop="pwd"
      >
        <el-input
          type="text"
          v-model="formData.pwd"
          autocomplete="off"
          class="box"
        >
        </el-input>
      </el-form-item>
      <el-form-item class="btn-wrap">
        <el-button
          type="danger"
          round
          class="left"
          @click="resetForm"
        >
          <i class="el-icon el-icon-delete"></i>
        </el-button>
        <el-button
          type="success"
          round
          class="right"
          style="margin-right:25px"
          @click="submitForm(formRules)"
        >
          <i class="el-icon el-icon-check"></i></el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import throttle from "@/utils/throttle"
export default {
  data() {
    return {
      formData: {
        username: "",
        pwd: ""
      },
      formRules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          //三到十五位数字、字母、下划线，中日韩/
          { type: "string", pattern: /^[\w\u4e00-\u9f5a5\uac00-\ud7ff\u0800-\u4e00\-\_]{3,15}$/, message: "3~15位数字、字母、下划线，中日韩", trigger: "blur" },
          { min: 3, max: 15, message: '长度在 3 到 15 个字符', trigger: 'blur' }
        ],
      }
    }
  },
  methods: {
    //提交表单
    submitForm(formRules) {
      this.$refs["formRef"].validate(async (vaild) => {
        if (!vaild) return
        let body = {}
        body.username = this.formData.username
        body.pwd = this.formData.pwd
        let { status, data } = await registerUser(body)
        if (status >= 200 && status < 300) {
          if (status === 201) {
            this.$message({
              type: "success",
              message: data.message
            })
          } else {
            this.closeRegister()
          }
        }
      })
    },
  },
  mounted() {

  }

}
</script>

<style lang="less" scoped>
/deep/.box {
  input {
    &:focus {
      border: 1px solid skyblue !important;
    }
  }
}
</style>