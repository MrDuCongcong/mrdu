export const data = JSON.parse("{\"key\":\"v-a5bcfca4\",\"path\":\"/blog/%E5%89%8D%E7%AB%AF%E4%B8%AD%E7%9A%84%E7%8E%AF%E5%A2%83%E5%8F%98%E9%87%8F.html\",\"title\":\"\",\"lang\":\"zh-CN\",\"frontmatter\":{},\"headers\":[],\"git\":{\"updatedTime\":null,\"contributors\":[]},\"filePathRelative\":\"blog/前端中的环境变量.md\"}")

if (import.meta.webpackHot) {
  import.meta.webpackHot.accept()
  if (__VUE_HMR_RUNTIME__.updatePageData) {
    __VUE_HMR_RUNTIME__.updatePageData(data)
  }
}

if (import.meta.hot) {
  import.meta.hot.accept(({ data }) => {
    __VUE_HMR_RUNTIME__.updatePageData(data)
  })
}
