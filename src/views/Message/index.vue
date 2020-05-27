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
            :data-index="index"
          >
            <textarea
              name="desc"
              placeholder="请输入内容"
              class="layui-textarea"
              ref="textareaRef"
            ></textarea>
            <button
              class="layui-btn layui-btn-sm"
              style="margin-top:7px"
              @click="handleSubCommitClick"
            >提交</button>
          </div>
        </el-card>
      </div>
    </div>

  </div>
</template>

<script>
import { store } from "@/vuex/index"
import { getCommentList, createComment, createSubComment } from "@/http/message"
import currentTime from '@/utils/currentTime';
import throttle from "@/utils/throttle"
export default {
  data() {
    return {
      commentList: [],
      ifShowCommentBox: false,
      page: 1,
      pagesize: 8,
      tip: true
    }
  },
  filters: {
    timeFormat(time) {
      let date = new Date(time)
      let [year, month, day, hour, min, sec] =
        [date.getFullYear(), date.getMonth() + 1, date.getDate(), date.getHours(), date.getMinutes(), date.getSeconds()]

      return `${year}-${month.toString().padStart(2, "0")}-${day.toString().padStart(2, "0")} ${hour.toString().padStart(2, "0")}:${min.toString().padStart(2, "0")}:${sec.toString().padStart(2, "0")}`
    }
  },
  methods: {
    handleSubCommitClick(e) {
      const commitBox = e.target.parentNode
      const commentItem = this.commentList[commitBox.dataset.index]
      const _id = commentItem._id
      const content = commitBox.children[0].value
      const username = commitBox.children[0].placeholder.split(" ")[1]
      let userEmail = ""
      if (content.trim() === "") {
        return this.layer.msg("所填内容不能是空哦~", { icon: 0 })
      }
      //没有子留言
      if (commentItem.children.length === 0) {
        userEmail = commentItem.user.email
      } else { // 说明有子评论
        /*  let parentIndex =  */
        if (commentItem.user.username === username) {
          userEmail = commentItem.user.email
        } else {
          let index = commentItem.children.findIndex(value => {
            if (value.user.username === username) {
              return true
            }
          })
          userEmail = commentItem.children[index].user.email
        }
      }
      this.$confirm(`确认要${commitBox.children[0].placeholder}吗`, "提示", {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'info'
      }).then(async () => {
        try {
          const { data, status } = await createSubComment({
            _id,
            content,
            userEmail,
            date: currentTime(2)
          })
          window.location.reload();
        } catch (e) {
          e = e.toString()
          if (/401/.test(e)) {
            this.layer.msg("请先登录", { icon: 2 })
            store.user = null
          }
        }
      })
    },
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
        this.$msgbox("确认留言吗？", "提示", {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(async () => {
          let { status, data } = await createComment({
            date: currentTime(2),
            content: this.layedit.getContent(this.index)
          })
          if (status === 200) {
            this.layer.msg(data.message, { icon: 1 })
            let data1 = await getCommentList()
            this.commentList = data1.data.data
            this.layedit.setContent(this.index, "")
          } else {
            this.layer.msg(data.message, { icon: 2 })
          }
        }).catch(() => { })

      } else if (store.user && store.user.disabled) {
        this.layer.msg("由于发表不正当言论，您被禁言", { icon: 2 })
      } else {
        this.layer.msg("请先登录", { icon: 2 })
      }
    },
    async getCommentList(page, pagesize) {
      let { status, data } = await getCommentList(page, pagesize)
      if (status === 200) {
        this.commentList = data["data"]
        console.log(data.data)
      } else {
        this.$message({
          type: "warning",
          message: "未知错误"
        })
      }
    },
    async handlerSroll(e) {
      if (!this.tip) return
      // 滚动高
      const scrollTop = document.documentElement.scrollTop
      // 可视高
      const clientHeight = document.documentElement.clientHeight
      //文档高
      const offsetHeight = document.documentElement.offsetHeight
      if (scrollTop + clientHeight > offsetHeight - 200) {
        this.tip = false
        let { status, data } = await getCommentList(this.page + 1, this.pagesize)
        if (status === 200) {
          this.commentList = [...this.commentList, ...data.data]
          this.page++ //只有当请求到了数据，并且显示在页面上才会加+1
          this.tip = true
        }
      }
    }
  },
  created() {
    let _this = this
    this.getCommentList(_this.page, _this.pagesize)
    _this.handlerSroll = throttle(_this.handlerSroll, 150)
    window.addEventListener("scroll", this.handlerSroll)
    //给页面绑定滑轮滚动事件 
    if (document.addEventListener) {//firefox 
      document.addEventListener('DOMMouseScroll', this.handlerSroll);
    }
    //滚动滑轮触发scrollFunc方法 //ie 谷歌 
    window.onmousewheel = document.onmousewheel = this.handlerSroll;
  },
  destroyed() {
    if (document.addEventListener) {
      document.removeEventListener("DOMMouseScroll", this.handlerSroll)
    }
    window.onmousewheel = document.onmousewheel = null
    window.removeEventListener("scroll", this.handlerSroll)
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
  margin-top: 50px;
  padding: 15px 0;
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