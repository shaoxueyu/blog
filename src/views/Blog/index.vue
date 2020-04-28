<template>
  <!-- 博客内容 -->
  <div id="blog-page">
    <el-container class="blog-container">
      <el-container></el-container>
      <el-aside>
        <div class="aside-search">
          <!-- 搜索栏 -->
          <div class="search-main">
            <el-input
              placeholder="输入关键字搜索"
              v-model="keywordSearch"
            ></el-input>
            <i class="el-icon el-icon-search"></i>
          </div>
          <!-- 文章分类选项 -->
          <ul
            class="search-acticle"
            @mouseover="handleUlCover"
          >
            <li
              class="search-acticle-li"
              v-for="item in articleList"
              :key="item.pathName"
              @mouseleave="handleUlCoverOut"
            >
              <a :href="
              item.path? item.path:'#'">{{item.pathName? item.pathname:item}}</a>

            </li>
            <!-- 动画遮罩层 -->
            <li
              class="article-li-cover"
              :style="{top: liTopcover+ `px`}"
            ></li>
          </ul>

        </div>
        <div class="aside-hot">热门</div>
        <div class="aside-recommond">评论</div>
        <div class="aside-visitor">有谁看我</div>
      </el-aside>
    </el-container>
  </div>
</template>

<script>
import Nav from "@/components/Nav"
import { getArticleTagsInfo, getHotArticleInfo } from "@/http/article"
export default {
  data() {
    return {
      keywordSearch: "", //关键字搜索
      articleList: [..."loading... ".repeat(6).split(" ").filter(item => item !== "")],
      liTopcover: 25
    }
  },
  methods: {
    //接口统一处理
    async handleApi() {
      let { status, data } = await getArticleTagsInfo()
      console.log(status, data);
    },
    handleUlCover(e) {
      /* 利用事件委托 */
      if (e.target.tagName === "LI") {
        this.liTopcover = Number(e.target.offsetTop)
      } else if (e.target.tagName === "A") {
        this.liTopcover = Number(e.target.parentNode.offsetTop)
      } else {
        this.liTopcover = 25
      }
    },
    handleUlCoverOut() {
      this.liTopcover = 25
    }


  },
  created() {
    this.handleApi()
  },
  mounted() {
    document.title = "博客"
  },
  components: {
    Nav
  }
}
</script>

<style lang="less" scoped>
#blog-page {
  padding-top: 60px;
  .blog-container {
    padding: 10px 0;
    width: 1280px;
    box-sizing: border-box;
    padding: 35px 45px;
    background-color: pink;
    margin: 0 auto;
    .aside-search {
      width: 300px;
      background: white;
    }
    .search-main {
      position: relative;
      background-color: #808080;
      padding: 20px 20px;
      i {
        width: 15px;
        height: 15px;
        top: 0;
        bottom: 0;
        right: calc(20px + 15px);
        margin: auto;
        position: absolute;
      }
    }
    .search-acticle {
      position: relative;
      padding: 25px 0;
      .article-li-cover {
        box-sizing: border-box;
        position: absolute;
        top: 0;
        border-right: 5px solid rgb(72, 73, 71);
        height: 40px;
        width: 100%;
        background-color: #f8f9f7;
        transition: 0.25s;
      }
      .search-acticle-li {
        position: relative;
        z-index: 99;
        padding: 0 25px 0 45px;
        box-sizing: border-box;
        height: 40px;
        line-height: 39px;
        text-align: left;
        color: #787977;
        a {
          display: block;
          border-bottom: 1px solid #f8f9f7;
          color: #787977 !important;
          font-size: 15px;
        }
      }
      &::after {
        bottom: 0;
        position: absolute;
        content: "";
        height: 1px;
        width: 100%;
        box-shadow: 0 -3px 5px 3px #787977;
        background-color: rgb(162, 163, 162);
      }
    }
  }
}

@media screen and (max-width: 1350px) {
  .blog-container {
    transition: 0.5s;
    width: 90% !important;
  }
}
</style>