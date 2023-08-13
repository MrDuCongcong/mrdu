export const data = JSON.parse("{\"key\":\"v-5614a36e\",\"path\":\"/blog/vue%E5%8A%A8%E6%80%81%E7%BB%84%E4%BB%B6%E7%9A%84%E5%AE%9E%E7%8E%B0.html\",\"title\":\"\",\"lang\":\"zh-CN\",\"frontmatter\":{},\"headers\":[],\"git\":{\"updatedTime\":null,\"contributors\":[]},\"filePathRelative\":\"blog/vue动态组件的实现.md\"}")

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
