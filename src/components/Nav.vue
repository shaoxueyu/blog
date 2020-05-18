<template>
  <div id="nav-page">
    <div class="nav-container clearfix">
      <!-- log -->
      <div class="nav-left-logo left">Smallker · Blog</div>
      <!-- ?? -->
      <div
        class="right nav-right-login"
        v-if="!userInfo"
      >
        <el-button
          type="primary"
          size="small"
          @click="login"
        >登 &nbsp 录</el-button>
        <el-button
          type="success"
          size="small"
          @click="register"
        >注 &nbsp 册</el-button>
      </div>
      <div
        class="right nav-right-login user-info"
        v-else-if="userInfo"
      >
        <span><img
            alt="头像"
            src="http://localhost:8000/images/default_surface.jpg"
          ></span>
        <span>{{userInfo.username}}</span>

      </div>
      <div
        class="small-nav"
        @click="MenuActive"
      ><span>Menu</span></div>
      <ul class="nav-right-main-nav right clearfix">

        <li
          v-for="item in navList"
          :key="item.path"
          :class="['nav-li', 'left',{active:routes.indexOf(item.path) !== -1}]"
        >
          <router-link :to="item.path">{{item.pathName}}</router-link>
        </li>
      </ul>
    </div>
    <nav
      :class="['nav-small',{active: navSmActive? true:false}]"
      ref="navSmallRef"
    >
      <ul class="nav-ul-sm">
        <li
          class="nav-li-sm"
          v-for="item in navList"
          :key="item.path"
        >
          <router-link :to="item.path">
            {{item.pathName}}
          </router-link>
        </li>
      </ul>
    </nav>
  </div>
</template>

<script>
import throttle from "@/utils/throttle"
import Register from "@/components/Register"
import Login from "@/components/Login"
import { store } from "@/vuex/index"
import { getUserInfoToToken } from "@/http/user"
export default {
  name: "Nav",
  data() {
    return {
      alertKey: 0, //弹窗key值
      navSmActive: false,
      navList: [
        {
          path: "/home",
          pathName: "首页"
        },
        {
          path: "/blog",
          pathName: "博客"
        },
        {
          path: "/message",
          pathName: "留言"
        },
        {
          path: "/diary",
          pathName: "日记",
        },
        {
          path: "/links",
          pathName: "友链"
        },
        {
          path: "/about",
          pathName: "关于"
        }
      ]
    }
  },
  methods: {
    closeRegister() {
      this.$msgbox.close()
    },
    closeLogin() {
      this.$msgbox.close()
    },
    register() {
      const h = this.$createElement;
      //手动注入Vue到实例
      Register.methods.closeRegister = this.closeRegister
      Register.methods.openLogin = this.login

      this.$msgbox({
        title: `注册`,
        message: h(Register, { key: this.alertKey++ }),
        showCancelButton: false,
        showConfirmButton: false,
        closeOnClickModal: false,
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        customClass: "message-box-register",
      }).then(null).catch(() => { })
    },
    login() {
      const h = this.$createElement;
      //手动注入Vue到实例
      Login.methods.closeLogin = this.closeLogin
      this.$msgbox({
        title: `登录`,
        message: h(Login, { key: this.alertKey++ }),
        showCancelButton: false,
        showConfirmButton: false,
        closeOnClickModal: false,
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        customClass: "message-box-login",
      }).then(null).catch(() => { })

    },
    MenuActive() {
      this.navSmActive = !this.navSmActive
    }
  },
  async created() {
    try {
      let { status, data } = await getUserInfoToToken()
      console.log(status, data)
      store.user = data.data
    } catch (err) {
      store.user = null
      this.$message({
        type: "warning",
        message: "身份认证失败或已过期, 请重新登录"
      })
    }
  },
  mounted() {

  },
  computed: {
    routes() {
      return this.$route.path
    },
    userInfo() {
      console.log(store);
      return store.user
    }
  }
}
</script>

<style lang="less" scoped>
.nav-small {
  position: absolute;
  width: 0;
  left: 0;
  opacity: 0;
  transition: 0.5s;
  li {
    padding: 15px 0;
    cursor: pointer;
    text-align: center;
    height: 0;
    transition: 0.5s;
  }
}
.small-nav {
  display: none;
}
#nav-page {
  z-index: 999;
  position: fixed;
  box-sizing: border-box;
  width: 100%;
  height: 60px;
  background-color: rgba(255, 255, 255, 0.8);
  padding: 0 50px;
  border-bottom: 1px solid #e8e9e7;
  top: 0;
  left: 0;
  font-size: 16px;
  .nav-container {
    position: relative;
    width: 1280px;
    margin: 0 auto;
    height: 100%;
    .nav-left-logo {
      font-family: smallkerBoom;
      font-size: 40px;
      height: 100%;
      text-align: center;
      line-height: 60px;
      font-weight: bold;
    }
    .nav-right-login {
      height: 100%;
      line-height: 60px;
    }

    .nav-right-main-nav {
      height: 100%;
      line-height: 60px;
      text-align: center;
      margin-right: 7%;
      li.nav-li.active {
        a {
          color: rgb(107, 195, 13);
        }
        &::after {
          content: "";
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          width: 100%;
          height: 2px;
          margin: 0 auto;
          background-color: rgb(107, 195, 13);
        }
      }
      li.nav-li {
        position: relative;
        width: 75px;
        padding: 0 1px;
        a {
          display: block;
          width: 100%;
          height: 100%;
        }
        &:hover {
          a {
            transition: 0.3s;
            color: rgb(107, 195, 13);
          }
          &::after {
            width: 100%;
            transition: 0.5s;
          }
        }
        &::after {
          content: "";
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          width: 0;
          height: 2px;
          margin: 0 auto;
          background-color: rgb(107, 195, 13);
        }
      }
    }
  }
}
@media screen and (max-width: 1050px) {
  .nav-left-logo {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    float: none;
    width: 200px;
    height: 100%;
    margin: 0 auto;
  }
  .nav-small.active {
    box-shadow: 0 0 10px 0 inset;
    opacity: 1;
    transition: 0.5s;
    width: 100%;
    li {
      box-shadow: 0 0 1px 0 inset;
      transition: 0.5s;
      height: 25px;
      line-height: 25px;
    }
  }
  .nav-right-login {
    float: none;
    position: absolute;
    left: calc(1% - 50px);
    top: 50%;
    transform: translateY(-50%);
  }
  .nav-right-main-nav {
    display: none;
  }
  .small-nav {
    font-family: smallkerBoom;
    font-size: 45px;
    height: 100%;
    display: block;
    position: absolute;
    right: calc(1% - 50px);
    text-align: center;
    line-height: 50px;
    transform: translateY(5px);
  }
}
.user-info {
  height: 100%;
  line-height: 60px;

  span {
    &:nth-child(1) {
      display: inline-block;
      width: 50px;
      height: 50px;
      margin: 0 auto;
      overflow: hidden;
      border-radius: 50%;
      vertical-align: middle;
      cursor: pointer;
      img {
        width: 100%;
        height: 100%;
      }
    }
    &:nth-child(2) {
      display: inline-block;
      height: 100%;
      text-align: center;
      padding-left: 15px;
      font-size: 18px;
      cursor: pointer;
    }
  }
}
@media screen and (max-width: 1350px) {
  .nav-container {
    transition: 0.5s;
    width: 90% !important;
  }
}
.el-button {
  font-family: sunshineKing !important;
  text-align: center;
}
</style>