<template>
  <!-- 博客内容 -->
  <div id="blog-page">
    <div id="blog-cover"></div>
    <el-container class="blog-container">
      <el-container>
        <router-view></router-view>
      </el-container>
      <el-aside>
        <div :class="['aside-search',{'aside-search-fixed':ifFixed}]">
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
            <template v-for="(item) in articleTagsList">
              <li
                class="search-acticle-li"
                :key="item.path"
                @mouseleave="handleUlCoverOut($route.meta.id)"
              >
                <router-link :to="'/blog'+item.path">
                  {{item.pathName}}
                </router-link>
              </li>
            </template>

            <!-- 动画遮罩层 -->
            <li
              class="article-li-cover"
              :style="{top: liTopcover+ `px`}"
            ></li>
          </ul>

        </div>
        <div class="aside-hot">
          <h3>热门文章 <i>Popular articles</i></h3>
          <ul class="aside-hot-ul">
            <li
              v-for="(item,index) in hotArticleList"
              :key="item.title"
              class="aside-hot-li"
              :data-index=index+1
            ><a href="#">
                {{item.title}} </a></li>
          </ul>
        </div>
        <div class="aside-visitor">
          <h3>
            最近访客
            <i>
              Recent Visitors
            </i>
          </h3>
          <ul class="aside-visitor-ul clearfix">
            <li class="aside-visitor-li">
              <img
                src="http://localhost:8000/images/default_surface.jpg"
                alt=""
              >
            </li>
            <li class="aside-visitor-li">
              <img
                src="http://localhost:8000/images/default_surface.jpg"
                alt=""
              >
            </li>
            <li class="aside-visitor-li">
              <img
                src="http://localhost:8000/images/default_surface.jpg"
                alt=""
              >
            </li>
            <li class="aside-visitor-li">
              <img
                src="http://localhost:8000/images/default_surface.jpg"
                alt=""
              >
            </li>
            <li class="aside-visitor-li">
              <img
                src="http://localhost:8000/images/default_surface.jpg"
                alt=""
              >
            </li>
            <li class="aside-visitor-li">
              <img
                src="http://localhost:8000/images/default_surface.jpg"
                alt=""
              >
            </li>
            <li class="aside-visitor-li">
              <img
                src="http://localhost:8000/images/default_surface.jpg"
                alt=""
              >
            </li>
            <li class="aside-visitor-li">
              <img
                src="http://localhost:8000/images/default_surface.jpg"
                alt=""
              >
            </li>
            <li class="aside-visitor-li">
              <img
                src="http://localhost:8000/images/default_surface.jpg"
                alt=""
              >
            </li>
            <li class="aside-visitor-li ">
              <img
                src="http://localhost:8000/images/default_surface.jpg"
                alt=""
              >
            </li>
            <li class="aside-visitor-li">
              <img
                src="http://localhost:8000/images/default_surface.jpg"
                alt=""
              >
            </li>
            <li class="aside-visitor-li">
              <img
                src="http://localhost:8000/images/default_surface.jpg"
                alt=""
              >
            </li>
          </ul>
        </div>
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
      articleTagsList: [..."loading... ".repeat(6).split(" ").filter(item => item !== "")],
      hotArticleList: [..."loading... ".repeat(8).split(" ").filter(item => item !== "")],
      liTopcover: 25,
      ifFixed: false
    }
  },
  methods: {
    //接口统一处理
    async handleApi() {
      let { status, data } = await getArticleTagsInfo()
      if (status === 200) {
        this.articleTagsList = data["data"].tags
      }
      let { status: status1, data: data1 } = await getHotArticleInfo()
      if (status1 === 200) {
        this.hotArticleList = data1.data
      }
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
    handleUlCoverOut(id) {
      this.liTopcover = 25 + (id - 1) * 40
    },
    handleScroll() {
      this.ifFixed = document.documentElement.scrollTop >= 900;
    }

  },
  created() {
    this.handleApi()
  },
  mounted() {
    window.addEventListener("scroll", this.handleScroll)
  },

  destroyed() {
    window.removeEventListener("scroll", this.handleScroll)
  },
  watch: {
    "$route.meta.id": {
      handler(value) {
        this.liTopcover = 25 + (value - 1) * 40
      },
      immediate: true
    }
  },
  components: {
    Nav,
  },
  destroyed() {
    window.scrollTo(0, 0)
  }
}
</script>

<style lang="less" scoped>
#blog-page {
  position: relative;
  padding-top: 60px;
  #blog-cover {
    background-image: url(../../assets/images/bg.png);
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center center;
    background-attachment: fixed;
    z-index: -98;
    position: fixed;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.2);
    filter: blur(5px);
  }
  .blog-container {
    padding: 10px 0;
    width: 1280px;
    box-sizing: border-box;
    padding: 35px 45px;
    margin: 0 auto;
    .aside-visitor {
      height: 250px;
      overflow: hidden;
      margin-top: 25px;
      border-radius: 25px;
      padding: 15px;
      background-color: white;
      .aside-visitor-ul {
        margin-top: 7px;
        padding: 4px;
        text-align: center;
        .aside-visitor-li {
          position: relative;
          display: inline-block;
          &::after {
            content: "像风一样";
            position: absolute;
            width: 100%;
            bottom: 0;
            left: 0;
            color: white;
            font-size: 12px;
            line-height: 20px;
            background-color: rgba(0, 0, 0, 0.5);
          }
          img {
            width: 60px;
            height: 60px;
          }
        }
      }
      h3 {
        margin: 0 10px;
        padding: 15px 0 4px 15px;
        border-bottom: 1px solid #e8e9e7;
        font-size: 20px;
        i {
          font-family: smallkerBoom;
          font-size: 33px;
        }
      }
    }
    .aside-hot {
      margin-top: 25px;
      padding: 10px 25px;
      background: white;
      border-radius: 25px;
      h3 {
        padding: 15px 15px 7px;
        line-height: 30px;
        font-size: 20px;
        border-bottom: 1px solid #e8e9e7;
        i {
          font-size: 33px;
          font-family: smallkerBoom;
        }
      }
      ul.aside-hot-ul {
        margin-top: 15px;
        .aside-hot-li {
          position: relative;
          line-height: 32px;
          &:hover a {
            color: #67c23a !important;
            transform: translateX(20px) rotateX(360deg);
          }
          &:nth-child(1)::before {
            background-color: #e24d46;
            color: #e8e9e7;
          }
          &:nth-child(2)::before {
            background-color: #2ea7e0;
            color: #e8e9e7;
          }
          &:nth-child(3)::before {
            background-color: #6bc30d;
            color: #e8e9e7;
          }
          a {
            width: 72%;
            display: block;
            padding-left: 30px;
            color: #787977 !important;
            font-size: 14px;
            cursor: pointer;
            transition: transform 0.5s;
          }

          &::before {
            content: attr(data-index);
            position: absolute;
            width: 22px;
            height: 22px;
            top: 0;
            bottom: 0;
            left: 0;
            margin: auto;
            border-radius: 50%;
            background-color: #e8e9e7;
            line-height: 22px;
            text-align: center;
          }
        }
      }
    }
    .aside-search {
      z-index: 99;
      overflow: hidden;
      width: 300px;
      background: white;
      border-radius: 25px;
    }
    .aside-search.aside-search-fixed {
      position: fixed;
      animation: searchMove 1s 1 ease-in-out;
      animation-fill-mode: forwards;
    }
    @keyframes searchMove {
      0% {
        top: -100%;
      }
      40% {
        top: 10%;
      }
      60% {
        top: 6%;
      }
      80% {
        top: 10%;
      }
      100% {
        top: 10%;
      }
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
@media screen and (max-width: 1260px) {
  .el-aside {
    display: none;
  }
  .el-container {
    .article-inner {
      margin: 0 auto;
    }
  }
}
@media screen and (max-width: 580px) {
  #blog-page .blog-container {
    padding: 0;
  }
}
</style>