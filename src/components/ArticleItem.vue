<template>
  <!-- 博客文章内容 -->
  <div>
    <ul>
      <li
        v-for="item in articlelist"
        :key="item._id"
      >
        {{item.content}}
      </li>
    </ul>
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
      },
      immediate: true
    }
  }
}
</script>

<style lang="less" scoped>
</style>