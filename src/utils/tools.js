import JSZIP from 'jszip'
import FileSaver from 'file-saver'
let hx = {
  getClientHeight () {
    return document.compatMode === 'BackCompat' ? document.body.clientHeight : document.documentElement.clientHeight
  },
  getDocumentHeight () {
    return Math.max(document.body.scrollHeight, document.documentElement.scrollHeight)
  },
  preventDefault (event) {
    if (event.cancelable) {
      if (!event.preventDefault) {
        event.preventDefault()
      }
    }
  },
  /**
   * @author chargoyao
   * @param obj {object}
   * folderName: 生成压缩包文件夹的名字
   * aliUrls {array} 图片下载的对象数据，url: 图片的url， fileName: 图片的文件名字
   */
  downloadZipImage (obj = {
    folderName: 'example',
    aliUrls: [
      {url: '', fileName: ''}
    ],
    zipName: 'example'
  }) {
    let zip = new JSZIP()
    let imgs = zip.folder(obj.folderName)
    let qArr = []
    for (let v of obj.aliUrls) {
      qArr.push(this.fetchGet(`${v.url}?time=${new Date().getTime()}`))
    }

    Promise.all(qArr).then(res => {
      for (const [k, v] of res.entries()) {
        imgs.file(obj.aliUrls[k].fileName, v)
      }
      zip.generateAsync({type: 'blob'})
        .then((content) => {
          FileSaver.saveAs(content, obj.zipName)
        })
    })
  },
  /**
   *
   * @param url {string}
   * @returns {Promise<Blob>}
   */
  fetchGet (url) {
    return fetch(url)
      .then(res => res.blob())
  }
}

export default hx
