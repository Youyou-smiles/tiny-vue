<template>
  <tiny-file-upload
    ref="upload"
    :action="action"
    :file-list="fileList"
    @download-file="handleDownloadFile"
  ></tiny-file-upload>
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
      fileList: [
        {
          docId: 'M1T2A1N548572512085860351',
          path: 'edm/one/',
          docVersion: 'V1',
          name: 'test1.png',
          docSize: 100 * 1024,
          size: 100 * 1024,
          serverName: 'ShenZhen'
        }
      ]
    }
  },
  methods: {
    handleDownloadFile() {
      console.log(...arguments)
    }
  }
}
</script>
