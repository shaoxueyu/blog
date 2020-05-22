<template>
  <div id="Message-page">
    <!-- 遮罩层 -->
    <div class="message-cover">
    </div>
    <div class="message-content">
      <el-card>
        <article>
          <h3>留言板 <strong style="font-family:smallkerBoom;font-size:35px;font-weight:bolder">Message Board</strong></h3>
          <h4>留不住你的人，但要留住你的心 <strong>❤</strong></h4>
        </article>
        <textarea
          id="edit"
          style="display: none;"
        ></textarea>
        <button
          class="layui-btn"
          @click="submitMessage"
        >提交留言</button>

      </el-card>
    </div>
    <!-- 用户留言 -->
    <div class="message-list">

    </div>

  </div>
</template>

<script>
import { store } from "@/vuex/index"
export default {
  data() {
    return {
      commentList:[
        {
         
        }
      ]
    }
  },
  methods: {
    submitMessage() {
      // 登录并且有权限的才能留言
      if (store.user && !store.user.disabled) {

      } else if (store.user && store.user.disabled) {
        this.layer.msg("由于发表不正当言论，您被禁言", { icon: 2 })
      } else {
        this.layer.msg("请先登录", { icon: 2 })
      }
    }
  },
  mounted() {
    layui.use('layedit', () => {
      this.layedit = layui.layedit;
      this.index = this.layedit.build('edit'); //建立编辑器
    });
    layui.use("layer", () => {
      this.layer = layui.layer
    })
  }
}
</script>

<style lang="less" scoped>
#Message-page {
  padding-top: 60px;
}
/deep/.layui-layedit {
  margin: 50px 0;
}
.message-cover {
  z-index: -1;
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  background: url(../../assets/images/message-bg.jpg);
  background-size: cover;
  filter: blur(2px);
}
.el-card {
  background-color: #ffffffde;
  margin-top: 45px;
  h3 {
    text-align: center;
    font-size: 25px;
    line-height: 100px;
  }
  h4 {
    position: relative;
    text-align: center;
    font-size: 18px;
    line-height: 20px;
    transition: 0.7s;
    strong {
      color: #ff0036;
      transition: 0.7s;
    }
    &:hover {
      color: transparent;
    }
    &:hover strong {
      color: transparent;
    }
    &:hover::after {
      color: black;
    }
    &::after {
      content: "Can't keep your people, but keep your heart";
      position: absolute;
      left: 0;
      top: 0;
      height: 100%;
      width: 100%;
      transition: 0.7s;
      color: transparent;
      font-family: smallkerBoom;
      font-size: 35px;
    }
  }
}
.message-content {
  width: 1280px;
  margin: 0 auto;
}
</style>