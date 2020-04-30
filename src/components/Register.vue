<template>
  <div class="register">
    <el-form
      ref="formRef"
      class="rule-form"
      :rules="formRules"
      :model="formData"
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
          type="password"
          v-model="formData.pwd"
          autocomplete="off"
          class="box"
          show-password
        ></el-input>
      </el-form-item>
      <el-form-item
        label="确认密码："
        prop="checkPwd"
      >
        <el-input
          type="password"
          v-model="formData.checkPwd"
          autocomplete="off"
          class="box"
          show-password
        ></el-input>
      </el-form-item>
      <el-form-item class="btn-wrap">
        <el-button
          type="danger"
          round
          class="left"
        >
          <i class="el-icon el-icon-delete"></i>
        </el-button>
        <el-button
          type="success"
          round
          class="right"
          style="margin-right:25px"
        >
          <i class="el-icon el-icon-check"></i></el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      validateSpace: (rule, value, callback) => {
        console.log(rule, value, callback);
      },
      formData: {
        username: "",
        pwd: "",
        checkPwd: ""
      },
      formRules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          //三到十五位数字、字母、下划线，中日韩/
          { type: "string", pattern: /^[\w\u4e00-\u9f5a5\uac00-\ud7ff\u0800-\u4e00\-\_]{3,15}$/, message: "3~15位数字、字母、下划线，中日韩", trigger: "blur" },
          { min: 3, max: 15, message: '长度在 3 到 15 个字符', trigger: 'blur' }
        ],
        pwd:{ [
          { required: true, message: '请填写密码', trigger: 'blur' },
          {
            type: "string", pattern: /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,20}$/,
            message: "密码至少包含 数字和英文，长度6-20",
            trigger: "blur"
          }
        ]},
        checkPwd: [
          {
            validator: (rule, value, callback) => {
              if (value === this.formData.pwd) {
                callback()
              } else {
                callback(new Error("两次密码不一致"))
              }
            },
            trigger: "blur" ,
            required: true
          }
        ]
      }
    }
  },
  watch: {
  }
}
</script>

<style lang="less" scoped>
.btn-wrap {
  padding: 0 45px;
}
.box {
  /deep/input {
    &:focus {
      border: 1px solid skyblue !important;
    }
  }
}
</style>