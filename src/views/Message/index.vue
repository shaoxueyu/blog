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
      <!-- 用户留言 -->
      <div class="comment-list">
        <el-card
          v-for="(item,index) in commentList"
          :key="item._id"
        >
          <div class="item-parent">
            <div class="info">
              <img
                :src="item.user.photo"
                alt="头像"
              >
              <p class="info-username">
                <span style="color:#01aaed"> {{item.user.username}} </span>
              </p>
              <p
                class="info-content"
                v-html="item.content"
              >
              </p>
              <p class="info-date">
                {{item.date | timeFormat}}
                <span
                  @click="handleReplyClick"
                  style="font-size:14px;color:#009688;cursor:pointer"
                  :data-targetid="index"
                  :data-targetname="item.user.username"
                  data-openBox="false"
                  class="reply-span"
                >回复</span>
              </p>
            </div>
            <template v-if="item.children.length!==0">
              <div
                class="item-child"
                v-for="value in item.children"
                :key="value._id"
              >
                <div class="child-info">
                  <img
                    :src="value.user.photo"
                    alt="头像"
                    width="45"
                    height="45"
                    style="margin-right:7px;border-radius:50%"
                  >
                  <article class="child-item-1 clearfix">
                    <span style="display:inline-block;margin-bottom:15px"> {{value.user.username}} </span>
                    <span style="font-size:14px"> 回复</span>
                    <span> {{value.toUser.username}}:</span>
                    <span
                      v-html="value.content"
                      style="line-height:25px;display:inline-block;font-size:14px"
                    ></span>
                    <p
                      class="child-tip"
                      style="font-size:14px"
                    >
                      <span> {{value.date | timeFormat}} </span>
                      <span
                        @click="handleReplyClick"
                        style="font-size:14px;color:#009688;cursor:pointer"
                        :data-targetid="index"
                        :data-targetname="value.user.username"
                        data-openBox="false"
                        class="reply-span"
                      >回复</span>
                    </p>
                  </article>
                </div>
              </div>
            </template>
          </div>
          <div
            class="comment-box"
            style="display:none"
          >
            <textarea
              name="desc"
              placeholder="请输入内容"
              class="layui-textarea"
              :data-id="index"
              ref="textareaRef"
            ></textarea>
          </div>
        </el-card>
      </div>
    </div>

  </div>
</template>

<script>
import { store } from "@/vuex/index"
import { getCommentList } from "@/http/message"
export default {
  data() {
    return {
      commentList: [],
      ifShowCommentBox: false,
    }
  },
  filters: {
    timeFormat(time) {
      let date = new Date(time)
      let [year, month, day, hour, min, sec] =
        [date.getFullYear(), date.getMonth() + 1, date.getDay(), date.getHours(), date.getMinutes(), date.getSeconds()]

      return `${year}-${month.toString().padStart(2, "0")}-${day.toString().padStart(2, "0")} ${hour.toString().padStart(2, "0")}:${min.toString().padStart(2, "0")}:${sec.toString().padStart(2, "0")}`
    }
  },
  methods: {
    handleReplyClick(e) {
      let ifShowCommentBox = JSON.parse(e.target.dataset.openbox) // 将字符串转成布尔值
      ifShowCommentBox = !ifShowCommentBox

      let node = e.target
      // 获取留言框
      while (true) {
        if (node.parentNode.nextElementSibling && node.parentNode.nextElementSibling.className === "comment-box") {
          node = node.parentNode.nextElementSibling
          break
        } else {
          node = node.parentNode
        }
      }
      [...node.parentNode.children[0].getElementsByClassName("reply-span")].forEach(el => {
        el.innerHTML = "回复"
        el.dataset.openbox = "false"
      })



      e.target.dataset.openbox = ifShowCommentBox.toString()
      e.target.innerHTML = ifShowCommentBox ? "收起" : "回复"


      node.children[0].placeholder = `回复 ${e.target.dataset.targetname}` // 设置留言框初始内容
      node.style.display = ifShowCommentBox ? "block" : "none"
    },
    submitMessage() {
      // 登录并且有权限的才能留言
      if (store.user && !store.user.disabled) {
        console.log(this.layedit.getContent(this.index))
      } else if (store.user && store.user.disabled) {
        this.layer.msg("由于发表不正当言论，您被禁言", { icon: 2 })
      } else {
        this.layer.msg("请先登录", { icon: 2 })
      }
    }
  },
  async created() {
    let { status, data } = await getCommentList()
    if (status === 200) {
      this.commentList = data["data"]
      console.log(data.data);
    } else {
      this.$message({
        type: "warning",
        message: "未知错误"
      })
    }
  },
  mounted() {
    layui.use('layedit', () => {
      this.layedit = layui.layedit;
      this.index = this.layedit.build('edit', {
        tool: ["face", 'strong', 'italic', 'underline', 'del']
      }); //建立编辑器
    });
    layui.use("layer", () => {
      this.layer = layui.layer
    })
  },
  /*   updated(){
      console.log(this.$refs.replyParentRef);
    } */
}
</script>

<style lang="less" scoped>
.info {
  position: relative;
  box-sizing: border-box;
  padding-left: 50px;
}
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
.child-info {
  position: relative;
  > img {
    position: absolute;
    top: 0;
    left: 0;
  }
  .child-item-1 {
    padding: 10px 50px;
  }
}
.comment-list {
  box-sizing: border-box;
  height: 1500px;
  margin-top: 50px;
  padding: 15px 0;
  background-color: white;
}
.info img {
  position: absolute;
  left: 0;
  top: 0px;
  width: 45px;
  height: 45px;
  border-radius: 50%;
}
.info-username {
  line-height: 35px;
}
.info-content {
  font-size: 14px;
  line-height: 20px;
}
.info-date {
  padding-top: 10px;
  font-size: 14px;
}
.item-parent {
  margin-bottom: 15px;
}
.item-child {
  position: relative;
  margin-top: 15px;
  padding: 15px 0 15px 50px;
  border-top: 1px dashed #dedede;
}
</style>