<template>
  <div>
    <tiny-file-upload
      :action="action"
      list-type="picture-single"
      :file-list="fileList1"
      @preview="handlePreview"
      image-bg-color="red"
    >
    </tiny-file-upload>
    <br />
    <br />
    <tiny-file-upload :action="action" list-type="picture-card" :file-list="fileList2" @preview="handlePreview">
    </tiny-file-upload>
  </div>
</template>

<script>
import { TinyFileUpload } from '@opentiny/vue'

export default {
  components: {
    TinyFileUpload
  },
  data() {
    return {
      action: 'http://localhost:3000/api/upload',
      fileList1: [
        {
          name: 'Snipaste_2022-12-02_18-05-51.png',
          url: `${import.meta.env.VITE_APP_BUILD_BASE_URL}static/images/hae-logo.png`
        }
      ],
      fileList2: [
        {
          name: 'test1.png',
          url: `${import.meta.env.VITE_APP_BUILD_BASE_URL}static/images/ld.png`,
          status: 'uploading',
          percentage: '50'
        },
        {
          name: 'test2',
          url: `${import.meta.env.VITE_APP_BUILD_BASE_URL}static/images/ry.png`
        },
        {
          name: 'test3',
          url: `${import.meta.env.VITE_APP_BUILD_BASE_URL}static/images/ld.png`,
          status: 'fail'
        }
      ]
    }
  },
  methods: {
    handlePreview(...args) {
      console.log(...args)
    }
  }
}
</script>
