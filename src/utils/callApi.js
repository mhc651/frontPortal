import ES6Promise from 'es6-promise'
import 'whatwg-fetch'
import store from '../store/index'
import * as types from '../store/mutations-types'
import iview from 'iview'
ES6Promise.polyfill()


// 服务器errcode 401 token过期
function callApi(url, method = 'GET', paramsObj, rootPath = false) {
  iview.LoadingBar.start()
  let $url = `${url}`
  let opts = {}
  let token = ''

  let cooki =  sessionStorage.getItem("uuid");
  if (typeof store.state.app !== 'undefined') {
    // 获得token
    token = store.state.app ? store.state.app.token : ''
  }
  if (method === 'POST') {
    opts = {
      credentials: 'include',
      method,
      headers: {
        'Content-Type': 'application/json',
        accesstoken: token || '',
        cookie:  'SESSION='+cooki,
      },
      body: JSON.stringify(paramsObj)
    }
  }
  return fetch($url, opts)
    .then(response => {
      if (response.ok) {
        iview.LoadingBar.finish()
        return response.json().then(res => {
          if (!res || res.errcode == '401') {
            iview.Modal.warning({
              title: '系统提示',
              content: '登陆失效请重新登录',
              onOk() {
                // 执行登出
                store.dispatch('removeToken', {})
              }
            })
            return Promise.reject(res)
          } else {

            return Promise.resolve(res)
          }
        })
      }
    })
    .catch(err => {
      iview.LoadingBar.error()
      console.log(err)
    })
}
/**
 * 表单提交
 * @param {string} url 地址
 * @param {formData} paramsObj new formData 对象
 * */
function formApi(url, paramsObj, rootPath = false) {
  iview.LoadingBar.start()
  //let $url = `/portal/pub/${url}`
  let $url = url
  let token = ''
  if (typeof store.state.app !== 'undefined') {
    token = store.state.app ? store.state.app.token : ''
  }
  // if (method === 'POST') {
  let opts = {
    method: 'POST',
    headers: {
      // 'Content-Type': 'application/json',
      accesstoken: token
    },
    body: paramsObj
  }
  // }
  return fetch($url, opts)
    .then(response => {
      iview.LoadingBar.finish()
      if (response.ok) {
        return response.json()
      }
    })
    .catch(err =>{

      console.log(err)
    } )
}

export default callApi
export { formApi, callApi }
