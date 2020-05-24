<template>
  <!-- 博客文章内容 -->
  <div class="article-inner">
    <article
      class="article-item animated bounceIn"
      v-for="item in articlelist"
      :key="item._id"
    >
      <section>
        <h5>
          <i>【 {{item.type}} 】</i>
          <span> {{item.title}} </span>
        </h5>
        <div class="time">
          <span>{{new Date(item.date).getDay()}}</span>
          <div>{{new Date(item.date).getMonth() + 1}}月 &nbsp &nbsp {{new Date(item.date).getFullYear()}}</div>
        </div>
        <div class="content">
          <a
            href="
          #"
            class="clearfix"
          >
            <div class="left left-content">
              <div class="dummy"></div>
              <img
                src="http://localhost:8000/images/content.jpg"
                alt=""
                class=""
              >

            </div>
            <div class="right right-content ">
              <p>{{item.content}}</p>
            </div>
          </a>
        </div>

        <div class="item-tip clearfix">
          <!-- 书签 -->
          <div class="left">
            <i class="el-icon el-icon-s-claim left"></i>
            <span class="left"> {{item.tag}} </span>
          </div>

          <div class="right">
            <!-- 浏览量 评论-->
            <span>
              <i class="el-icon el-icon-view"></i>{{item.pv}}
            </span>
            <span>
              <i class="el-icon el-icon-chat-dot-round"></i>
              1
            </span>
          </div>
        </div>
      </section>
    </article>
  </div>
</template>

<script>
import { getArticleInfo } from "@/http/article"
import throttle from "@/utils/throttle"
export default {
  data() {
    return {
      articlelist: [],
      page: 1,
      pagesize: 5
    }
  },
  methods: {
    async handlerSroll(e) {
      // 滚动高
      const scrollTop = document.documentElement.scrollTop
      // 可视高
      const clientHeight = document.documentElement.clientHeight
      //文档高
      const offsetHeight = document.documentElement.offsetHeight
      console.log(scrollTop + clientHeight > offsetHeight - 100);
      if (scrollTop + clientHeight > offsetHeight - 100) {
        let { status, data } = await getArticleInfo(this.page + 1, this.pagesize, this.$route.meta.tag)
        if (status === 200) {
          this.articlelist = [...this.articlelist, ...data.data]
          this.page++ //只有当请求到了数据，并且显示在页面上才会加+1
        }
      }
    }
  },
  mounted() {
    this.handlerSroll = throttle(this.handlerSroll, 2000)
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
  watch: {
    "$route": {
      async handler($route) {
        this.page = 1
        window.scrollTo(0, 0)
        if ($route.meta.tag) {
          let { data, status } = await getArticleInfo(1, 5, $route.meta.tag)
          this.articlelist = data.data
        } else {
          let { data, status } = await getArticleInfo(1, 5)
          if (status === 200) {
            this.articlelist = data.data
          }
        }
      },
      immediate: true
    }
  }
}
</script>

<style lang="less" scoped>
.article-inner {
  margin-top: 5px;
  width: calc(100% - 100px);
  font-size: 23px;
  .article-item {
    overflow: hidden;
    position: relative;
    margin-bottom: 50px;
    box-shadow: 0 0 10px 0 #989997 inset;
    padding: 20px;
    background-color: white;
    border-radius: 10px;
    &:nth-child(1) {
      &::after {
        content: "置顶";
        position: absolute;
        top: 6px;
        left: -60px;
        background-color: #ff5722;
        text-align: center;
        line-height: 25px;
        color: aliceblue;
        font-size: 15px;
        width: 150px;
        transform: rotateZ(-50deg);
      }
    }
    .time {
      right: 26px;
      top: 15px;
      position: absolute;
      span {
        display: block;
        line-height: 30px;
        text-align: center;
        font-size: 35px;
        font-weight: bold;
        color: #6bc30d;
      }
      div {
        color: #989997;
      }
    }
    h5 {
      line-height: 30px;
      padding-bottom: 10px;
      border-bottom: 1px solid #e8e9e7;
      i {
        color: #2ea7e0;
        font-weight: 500;
      }
      span {
        font-size: 20px;
      }
    }
    .item-tip {
      font-size: 16px;
      margin-top: 30px;
      color: #787977;
      i {
        font-size: 18px;
      }
      .left {
        span {
          margin-left: 1px;
          padding: 0 5px;
          background-color: #f1f2f0;
          &:hover {
            background-color: #6bc30d;
            color: white;
            transition: 0.5s;
          }
        }
      }
    }
    .content {
      margin-top: 25px;
      .left-content {
        position: relative;
        overflow: hidden;
        width: 300px;
        height: 180px;
        &:hover::after {
          transition: left 0.7s ease-in-out;
          left: 160%;
        }
        &::after {
          content: "";
          height: 100%;
          width: 100px;
          left: -90%;
          position: absolute;
          transform: skewX(-25deg) translateZ(0);
          background-image: linear-gradient(
            90deg,
            hsla(0, 0%, 100%, 0),
            hsla(0, 0%, 100%, 0.3) 50%,
            hsla(0, 0%, 100%, 0)
          );
          transform: skewX(-25deg) translateZ(0);
          z-index: 2;
        }
        img {
          border-radius: 3px;
          width: 100%;
        }
      }
      .right-content {
        box-sizing: border-box;
        width: calc(100% - 320px);
        height: 180px;
        overflow: hidden;
        padding: 20px 15px;
        font-size: 17px;
        line-height: 35px;
        p {
          overflow: hidden;
          width: 100%;
          height: 100%;
          text-indent: 1em;
        }
      }
    }
  }
}
@media screen and (max-width: 875px) {
  .el-aside {
    display: none;
  }

  .article-inner .article-item .content .left-content {
    width: 100%;
  }
  .article-inner .article-item .content .right-content {
    float: none;
    width: 100%;
    transition: 0.5s;
    p {
      margin-top: 25px;
    }
  }
}
@media screen and (max-width: 675px) {
  .article-inner .article-item .time {
    transition: 0.5s;
    opacity: 0 !important;
  }
}
</style>