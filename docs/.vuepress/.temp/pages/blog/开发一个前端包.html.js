export const data = JSON.parse("{\"key\":\"v-b3ae65c8\",\"path\":\"/blog/%E5%BC%80%E5%8F%91%E4%B8%80%E4%B8%AA%E5%89%8D%E7%AB%AF%E5%8C%85.html\",\"title\":\"开发一个包\",\"lang\":\"zh-CN\",\"frontmatter\":{},\"headers\":[],\"git\":{\"updatedTime\":null,\"contributors\":[]},\"filePathRelative\":\"blog/开发一个前端包.md\"}")

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
