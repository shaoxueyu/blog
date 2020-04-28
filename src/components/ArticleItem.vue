<template>
  <!-- 博客文章内容 -->
  <div class="article-inner">
    <article
      class="article-item"
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
            <div class="left-content left">
              <img
                src="http://localhost:8000/images/default_surface.jpg"
                alt=""
                class=""
              >
            </div>
            <div class="right-content right">
              <p>{{item.content}}</p>
            </div>
          </a>
        </div>

        <div class="item-tip clearfix">
          <!-- 书签 -->
          <i class="el-icon el-icon-s-claim left"></i>
          <span class="left"> {{item.tag}} </span>
          <div class="right">
            <!-- 浏览量 评论-->
            <span>
              <i class="el-icon el-icon-view right"></i>{{item.pv}}
            </span>
            <span>
              <i class="el-icon el-icon-chat-dot-round right"></i>
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
export default {
  data() {
    return {
      articlelist: []
    }
  },
  methods: {

  },
  mounted() {
  },
  watch: {
    "$route": {
      async handler($route) {
        if ($route.meta.tag) {
          let { data, status } = await getArticleInfo(1, 5, $route.meta.tag)
          this.articlelist = data.data
        } else {
          let { data, status } = await getArticleInfo(1, 5)
          if (status === 200) {
            this.articlelist = data.data
          }
        }
        console.log(this.articlelist);
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
      div {
        i {
          &:nth-child(2) {
            text-align: right;
            font-size: 15px;
            padding-right: 35px;
            color: green;
          }
        }
      }
      i {
        font-size: 18px;
      }
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
    .content {
      margin-top: 25px;
      .left-content {
        width: 300px;
        height: 180px;
        img {
          border-radius: 3px;
          width: 100%;
          height: 100%;
        }
      }
      .right-content {
        box-sizing: border-box;
        width: calc(100% - 320px);
        height: 180px;
        overflow: hidden;
        padding: 20px 15px;
        p {
          overflow: hidden;
          width: 100%;
          height: 100%;
          line-height: 25px;
          text-indent: 1em;
        }
      }
    }
  }
}
</style>