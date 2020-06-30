<template>
  <div id="article-page">
    <div id="article-cover"></div>
    <el-card>
      <div class="article-header">
        <div class="h-content">
          <h2>
            {{article.title}}
          </h2>
          <p class="author-box">
            <span class="author-span">作者:</span>
            <span class="author-name"> {{article.author ? article.author.username:""}} </span>
            <span class="author-pv" style="margin-left:7px">点击量:</span>
            <span> {{article.pv}} </span>
            <span style="margin-left:7px">发布时间:</span>
            <span> {{article.date | timeFormat}} </span>
          </p>
        </div>
      </div>
      <div class="article-container">
        {{article.content}}
      </div>
    </el-card>
  </div>

</template>

<script>
import { getArticleDetail } from '@/http/article';
export default {
  data() {
    return {
      article: {}
    }
  },
  computed: {
    id() {
      return this.$route.params.id
    }
  },
  async created() {
    const { status, data } = await getArticleDetail(this.id)
    if (status === 200) {
      this.article = data.data
      console.log(this.article);
    } else {
      this.$message({
        message: "未知错误",
        type: "error"
      })
    }
  },
  mounted() {

  },
  filters:{
    timeFormat(value){
      const date = new Date(value).toLocaleDateString()
      return date.replace(/\//g,"-")
    }
  }
}
</script>

<style lang="less" scoped>
.article-container{
  padding:0 25px 25px 25px;
  line-height: 36px;
}
.author-box{
  padding-bottom: 10px;
  margin-top: 1px;
  font-size: 13px;
  border-bottom: 1px dashed #909fe673;
  color: #4d4949;
}

#article-page {
  padding-top: 60px;
  animation: appear .4s;
}
@keyframes appear {
  from{
    visibility: hidden;
    opacity: 0;
  }
  to{
    visibility: visible;
    opacity: 1;
  }
}
.el-card {
  width: 1280px;
  height: 800px;
  margin: 45px auto;
  background: #ffffffb8;
}
#article-cover {
  z-index: -1;
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  background-image: linear-gradient(45deg, #1c7ced, #d7f6fb);
}
.article-header {
  padding: 25px;
  .h-content {
    h2 {
      overflow: hidden;
      font-size: 24px;
      line-height: 45px;
     /*  border-bottom: 1px solid #adb2b852; */
    }
  }
}
</style>