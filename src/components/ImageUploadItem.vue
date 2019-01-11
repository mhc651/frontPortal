<template>
  <div class="imgWrapItem imageUploadItem" >
    <div class="file-wrapper">
      <!-- 控件 -->
      <div class="shadow" v-show="content.url">
        <div class="black"></div>
        <Icon type="eye" @click.native="bigImg"></Icon>
        <Icon type="trash-b" @click.native="trash"></Icon>
      </div>

      <Icon type="plus-round" class="addIcon"></Icon>
      <!-- 缩列图 -->
      <img class="img" :src="content.smallurl||content.url" v-show="content.url">
      <input :disabled='disabled' v-show='!!!content.url' type="file" class="file" @change="handleFileChange($event)" >
    </div>
    <p><span v-if="required" style="color: red">* </span>{{imgItem.name}}</p>
  </div>
</template>
<script>
import { formApi /*, callApi*/ } from '../utils/callApi'
import { mapState } from 'vuex'
import Viewer from 'viewerjs'
import 'viewerjs/dist/viewer.min.css'

export default {
  props: {
    // content:{
    // 	id:xx,//文件ID
    // 	url:xx //访问的图片地址
    // 	smallurl:xxx,//按width与height缩小并截剪后的地址,
    // 	name:文件名,
    // 	size:大小，字节
    // 	sizeText:大小文本，例如100.01M
    // },
    // 数据
    setData: {},
    // 上传名称
    imgItem: {
      type: Object,
      required: true
    },
    // folder: {
    //   type: Object
    // },
    // 组件key
    name: {
      type: String
    },
    // 显示*
    required: {
      type: Boolean,
      default: false
    },
    // 验证
    validate: {
      type: Function
    }
    // disabled: {
    //   type: Boolean,
    //   default: false
    // }
    // showImgUrl: {
    //   type: String,
    //   default: ''
    // }
  },
  data() {
    return {
      disabled: false,
      //查看图片容器
      viewerContainer: '',
      // 上传的文件
      file: '',
      reset: {
        id: '',
        name: this.name,
        filename: '',
        url: '',
        smallurl: ''
      }
    }
  },
  computed: {
    ...mapState(['ossUrl']),
    // 控件数据
    content() {
      return this.setData ? this.setData : this.reset
    }
  },
  mounted() {
    let that = this
    // 创建图片查看器
    this.viewerContainer = new Viewer(this.$el.querySelector('img'), {
      url(image) {
        return that.content.url
      }
    })
  },
  methods: {
    // 删除
    trash() {
      // 清除上传文件
      this.$el.querySelector('input[type]').value = ''
      this.$emit('imgUrl', this.reset)
    },
    // 查看图片
    bigImg() {
      if (this.content.url) this.viewerContainer.show()
    },
    // 上传图片
    handleFileChange(e) {
      let that = this
      this.file = e.target.files[0]
      if (!this.file || (this.validate && this.validate(this.file) === false)) {
        return
      }
      // 拦截提交
      this.disabled = true
      let formData = new FormData()
      formData.append('width', 100)
      formData.append('height', 100)
      formData.append('file', this.file)
      formData.append('project', 'uas')
      formData.append('filestore', 'fs')
      // 返回图片
      formApi('/dws/pub/uploadimage', formData).then(
        res => {
          this.disabled = false
          // 添加缩列图到外部
          this.$emit('imgUrl', {
            id: res.content.id,
            name: this.name,
            filename: this.file.name,
            url: res.content.url,
            smallurl: res.content.smallurl
          })
        },
        error => {
          this.disabled = false
          this.$Modal.error({
            title: '错误',
            content: error
          })
        }
      )
    }
  }
}
</script>
<style lang="scss" scoped>
.imgWrapItem.imageUploadItem {
  width: 128px;
  .addIcon {
    font-size: 14px;
    vertical-align: middle;
    color: #cbd3da;
    -webkit-transform: scale(5);
    -moz-transform: scale(5);
    -ms-transform: scale(5);
    -o-transform: scale(5);
    transform: scale(5);
  }
  p {
    font-size: 14px;
    color: #373d41;
    margin-top: 10px;
    text-align: center;
  }
  .file-wrapper {
    width: 128px;
    height: 128px;
    border: 1px solid #dcdfe6;
    border-radius: 6px;
    overflow: hidden;
    text-align: center;
    line-height: 128px;
    position: relative;
    display: table;
    .shadow {
      display: none;
      position: absolute;
      width: 100%;
      height: 100%;
      z-index: 1000;
      .black {
        position: absolute;
        width: 100%;
        height: 100%;
        background: #606266;
        opacity: 0.7;
      }
      .ivu-icon {
        position: relative;
        z-index: 10;
        font-size: 24px;
        color: #fff;
        cursor: pointer;
        margin: 0 10px 0;
      }
    }
    &:hover .shadow {
      display: block;
    }
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
  .img {
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    z-index: 500;
    width: 128px;
    height: 128px;
  }
}
</style>
