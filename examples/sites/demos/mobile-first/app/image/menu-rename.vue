<template>
  <div>
    <tiny-button @click="() => (show = !show)">点我触发</tiny-button>
    <div v-if="show">
      <tiny-image-viewer is-menu-view :url-list="srcList" show-index @delete="deleteHander"></tiny-image-viewer>
    </div>
  </div>
</template>

<script>
import { TinyImageViewer, TinyButton } from '@opentiny/vue'

export default {
  components: {
    TinyImageViewer,
    TinyButton
  },
  data() {
    return {
      show: false,
      srcList: [
        { url: `${import.meta.env.VITE_APP_BUILD_BASE_URL}static/images/3.jpg`, name: '名称1' },
        { url: `${import.meta.env.VITE_APP_BUILD_BASE_URL}static/images/1.jpg`, name: '名称2' },
        { url: `${import.meta.env.VITE_APP_BUILD_BASE_URL}static/images/3.jpg`, name: '名称3' },
        { url: `${import.meta.env.VITE_APP_BUILD_BASE_URL}static/images/1.jpg`, name: '名称4' },
        { url: `${import.meta.env.VITE_APP_BUILD_BASE_URL}static/images/3.jpg`, name: '名称5' },
        { url: `${import.meta.env.VITE_APP_BUILD_BASE_URL}static/images/1.jpg`, name: '名称6' },
        { url: `${import.meta.env.VITE_APP_BUILD_BASE_URL}static/images/3.jpg`, name: '名称7' },
        { url: `${import.meta.env.VITE_APP_BUILD_BASE_URL}static/images/1.jpg`, name: '名称8' },
        { url: `${import.meta.env.VITE_APP_BUILD_BASE_URL}static/images/3.jpg`, name: '名称9' },
        { url: `${import.meta.env.VITE_APP_BUILD_BASE_URL}static/images/1.jpg`, name: '名称10' },
        { url: `${import.meta.env.VITE_APP_BUILD_BASE_URL}static/images/3.jpg`, name: '名称11' },
        { url: `${import.meta.env.VITE_APP_BUILD_BASE_URL}static/images/1.jpg`, name: '名称12' },
        { url: `${import.meta.env.VITE_APP_BUILD_BASE_URL}static/images/3.jpg`, name: '名称13' },
        { url: `${import.meta.env.VITE_APP_BUILD_BASE_URL}static/images/1.jpg`, name: '名称14' },
        { url: `${import.meta.env.VITE_APP_BUILD_BASE_URL}static/images/3.jpg`, name: '名称15' },
        { url: `${import.meta.env.VITE_APP_BUILD_BASE_URL}static/images/1.jpg`, name: '名称16' },
        { url: `${import.meta.env.VITE_APP_BUILD_BASE_URL}static/images/3.jpg`, name: '名称17' },
        { url: `${import.meta.env.VITE_APP_BUILD_BASE_URL}static/images/1.jpg`, name: '名称18' }
      ]
    }
  },
  methods: {
    deleteHander(imageName) {
      this.$message({ message: `已删除${imageName}图片`, status: 'info' })
    }
  }
}
</script>
