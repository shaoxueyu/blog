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
        label="邮箱："
        prop="email"
      >
        <el-input
          type="text"
          v-model="formData.email"
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
      <el-form-item
        type="text"
        autocomplete="off"
        class="box vcode-box"
        label="验证码："
        prop="vcode"
      >
        <el-input
          v-model="formData.vcode"
          autocomplete="off"
        ></el-input>
        <div
          @click="regetVcode"
          class="svg-inner"
          v-html="vcode.data"
        ></div>
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
import { getVcode } from "@/http/vcode"
import { registerUser } from "@/http/user"
import throttle from "@/utils/throttle"
export default {
  data() {
    return {
      vcode: {
        text: "", // 答案
        data: "" // svg
      },
      formData: {
        username: "",
        email: "",
        pwd: "",
        checkPwd: "",
        vcode: ""
      },
      formRules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          //三到十五位数字、字母、下划线，中日韩/
          { type: "string", pattern: /^[\w\u4e00-\u9f5a5\uac00-\ud7ff\u0800-\u4e00\-\_]{3,15}$/, message: "3~15位数字、字母、下划线，中日韩", trigger: "blur" },
          { min: 3, max: 15, message: '长度在 3 到 15 个字符', trigger: 'blur' }
        ],
        email: [
          { required: true, message: "请输入邮箱", trigger: "blur" },
          { type: "string", pattern: /^([A-Za-z0-9_\-.])+@([A-Za-z0-9_\-.])+\.([A-Za-z]{2,4})$/, message: "请输入正确的邮箱格式", trigger: "blur" }
        ],
        pwd: {
          required: true,
          type: "string",
          trigger: ["blur", "change"],
          validator: (rule, value, callback) => {
            if (/^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,20}$/.test(value) && !/ /.test(value)) {
              callback()
            } else {
              callback(new Error("密码至少包含 数字和英文，长度6-20, 且不能包含空格"))
            }
            //还需要触发确认密码验证 
            //手动触发
            this.formData.checkPwd && this.$refs.formRef.validateField("checkPwd")
          }

        },
        checkPwd: [
          {
            validator: (rule, value, callback) => {
              if (value === this.formData.pwd) {
                callback()
              } else {
                callback(new Error("两次密码不一致"))
              }
            },
            trigger: "blur",
            required: true
          }
        ],
        vcode: {
          required: true,
          trigger: "blur",
          validator: (rule, value, callback) => {
            if (value === this.vcode.text) {
              callback()
            } else {
              callback(new Error("验证码错误"))
            }
          }
        }
      }
    }
  },
  watch: {
  },
  mounted() {
    this.getVcode()
    this.throttleRegetVcode()
    this.submitForm = throttle(this.submitForm, 3000)

  },
  methods: {
    //提交表单
    submitForm(formRules) {
      this.$refs["formRef"].validate(async (vaild) => {
        if (!vaild) return
        let body = {}
        body.username = this.formData.username
        body.pwd = this.formData.pwd
        body.vcode = this.formData.vcode
        body.email = this.formData.email
        let { status, data } = await registerUser(body)
        if (status >= 200 && status < 300) {
          if (status === 201 || status === 200) {
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
    async getVcode() {
      let { status, data } = await getVcode()
      this.vcode.data = data.data.data
      this.vcode.text = data.data.text
    },
    resetForm() {
      this.$refs["formRef"].resetFields()
    },
    throttleRegetVcode() {
      this.regetVcode = throttle(this.regetVcode, 2000)
    },
    async regetVcode() {
      let { status, data } = await getVcode()
      if (status >= 200 && status < 300) {
        this.vcode.data = data.data.data
        this.vcode.text = data.data.text
      }
    }
  }
}
</script>

<style lang="less" scoped>
/deep/.vcode-box {
  .el-form-item__label {
    display: block;
    text-align: left;
    float: none;
  }
  .el-input {
    width: 30%;
  }
  .svg-inner {
    position: absolute;
    width: 30%;
    height: 100%;
    top: -19px;
    bottom: 0;
    margin: auto;
    left: 35%;
    cursor: pointer;
  }
}
.btn-wrap {
  padding: 0 45px;
}
/deep/.box {
  input {
    &:focus {
      border: 1px solid skyblue !important;
    }
  }
}
</style>