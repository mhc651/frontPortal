<template>
<div class="simpleUploadItem">
  <div class="file-wrapper">
    <Icon type="plus-round" class="addIcon"></Icon>
    <input type="file" class="file" @change="handleFileChange($event)">
  </div>
</div>
</template>

<script>
import {mapState} from 'vuex'
import callApi from '../utils/callApi'
export default {
  props: {
    folder: {
      type: Object,
      required: true
    },
    itemId: {
      type: String
    }
  },
  computed: {
    ...mapState([
      'ossUrl'
    ])
  },
  methods: {
    handleFileChange (e) {
      callApi('comm/getUploadPolicy', 'POST', this.folder)
        .then((res) => {
          if (res.success) {
            let filename = e.target.files[0].name
            const chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678'
            const maxPos = chars.length
            let randomString = ''
            for (let i = 0; i < 10; i++) {
              randomString += chars.charAt(Math.floor(Math.random() * maxPos))
            }
            let pos = filename.lastIndexOf('.')
            let suffix = ''
            if (pos !== -1) {
              suffix = filename.substring(pos)
            }
            filename = randomString + new Date().getTime() + suffix
            res = res.content
            let formData = new FormData()
            let dirFilename = `${res.dir}/${filename}`
            let dir = res.dir
            formData.append('key', `${res.dir}/${filename}`)
            formData.append('policy', `${res.policy}`)
            formData.append('success_action_status', '200')
            formData.append('signature', `${res.signature}`)
            formData.append('OSSAccessKeyId', `${res.OSSAccessKeyId}`)
            formData.append('callback', `${res.callback}`)
            formData.append('x:var2', `${res.uploadUrl}`)
            formData.append('file', e.target.files[0])
            fetch(this.ossUrl, {
              method: 'POST',
              body: formData
            }).then((res) => {
              return res.json()
            }).then((res) => {
              this.$emit('imgUrl', dir, dirFilename, this.itemId, e.target.files[0])
              // 清空 value
              e.target.value = ''
            })
          }
        })
    }
  }
}
</script>

<style lang="scss" scoped>
  .simpleUploadItem {
    width: 128px;
    display: inline-block;
    .addIcon {
      font-size: 14px;
      vertical-align: middle;
      color: #CBD3DA;
      -webkit-transform: scale(5);
      -moz-transform: scale(5);
      -ms-transform: scale(5);
      -o-transform: scale(5);
      transform: scale(5);
    }
    .file-wrapper {
      width: 128px;
      height: 128px;
      border: 1px solid #DCDFE6;
      border-radius: 6px;
      overflow: hidden;
      text-align: center;
      line-height: 128px;
      position:relative;
      display: table;
    }
    .file {
      position: absolute;
      line-height: 1.3;
      width: 128px;
      height: 128px;
      top: 0;
      left: 0;
      cursor: pointer;
      outline: none;
      opacity: 0;
    }
  }
</style>
