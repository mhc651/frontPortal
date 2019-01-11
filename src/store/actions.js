/**
 * @file vuex 异步处理
 */
import callApi from '../utils/callApi'
import * as types from './mutations-types'

const actions = {
  getFrameData({ commit }, payload) {
    return callApi('aup2org/api/model/getframework', 'POST', payload).then(
      res => {
        if (res.success) {
          commit({
            type: types.APPMODEL,
            content: res.content
          })
          return Promise.resolve(res)
        } else {
          return Promise.reject(res)
        }
      }
    )
  },
  // 获得应用token
  setAppToken({ commit }, payload) {
    return callApi('/portal/api/auth/tokenAddApiData', 'POST', {
      apiData: 1
    }).then(res => {
      if (res.success) {
        commit({
          type: types.APPTOKEN,
          content: res.content
        })
        return Promise.resolve(res)
      } else {
        return Promise.reject(res)
      }
    })
  },
  // 获得应用列表
  proApps({ commit }, payload) {
    return callApi('/portal/api/app/proApps', 'POST', payload).then(res => {
      if (res.success) {
        commit({
          type: types.POR_APPS,
          content: res.content
        })
        return Promise.resolve(res)
      } else {
        return Promise.reject(res)
      }
    })
  },
  /**
   * 重置密码
   * @author qiu
   */
  resetpwd({ commit }, payload) {
    return callApi('/dws/uas/login/savepwd', 'POST', payload).then(res => {
      return Promise.resolve(res)
    })
  },
  /**验证手机验证码
   * **/
  validatePhonefp({ commit }, payload) {
    return callApi('/dws/uas/login/fgtpwd', 'POST', payload).then(res => {
      return Promise.resolve(res)
    })
  },
  /**CA绑定验证手机验证码
   * **/
  validatePhoneCa({ commit }, payload) {
    return callApi('/dws/uas/ca/verifyMobile', 'POST', payload).then(res => {
      return Promise.resolve(res)
    })
  },
  // 登陆
  login({ commit }, payload) {
    return callApi('/dws/uas/login/login', 'POST', payload).then(res => {
      if (res.success) {
        commit({
          type: types.LOGIN,
          content: res.content
        })
        return Promise.resolve(res.content)
      } else {
        return Promise.reject(res)
      }
    })
  },
  // 演示登陆
  ysTlogin({ commit }, payload) {
    return callApi('/dws/uas/yanshi/login', 'POST', payload).then(res => {
      if (res.success) {
        commit({
          type: types.LOGIN,
          content: res.content
        })
        return Promise.resolve(res.content)
      } else {
        return Promise.reject(res)
      }
    })
  },
  // 登出
  loginOut({ state, commit }, payload) {
    let api = '/dws/uas/login/logout'
    // let arr = ['01', '02', '03']
    // if (arr.indexOf(state.app.auditStatus) !== -1) {
    //   // 未提交的 退出
    //   api = '/portal/pub/auth/logout'
    // }
    return callApi(api, 'POST', payload).then(res => {
      if (res && res.success) {
        commit({
          type: types.LOGINOUT,
          content: ''
        })
        return Promise.resolve(res)
      } else {
        commit({
          type: types.LOGINOUT,
          content: ''
        })
        return Promise.reject(res)
      }
    })
  },
  // 去除数据
  removeToken({ commit }, payload) {
    commit({
      type: types.LOGINOUT,
      content: ''
    })
    return Promise.resolve(res)
  },
  // 获取图片验证码
  getqcode({ commit }, payload) {
    callApi('/dws/pub/vcode/img', 'GET', payload).then(res => {
      if (res.success) {
        commit({
          type: types.GET_QCODE,
          content: res.content
        })
      }
    })
  },
  test: function({ commit }, payload) {
    commit({
      type: types.REG_USER,
      content: payload
    })
  },
  // 验证机构名称 x
  validateOrgName: function({ commit }, payload) {
    return callApi('org/checkOrgName', 'POST', payload).then(res => {
      if (res.success) {
        return Promise.resolve(res)
      } else {
        return Promise.resolve(res)
      }
    })
  },
  // 验证手机号码 x
  validatePhone: function({ commit }, payload) {
    return callApi('org/checkPhone', 'POST', payload).then(res => {
      if (!res.success) {
        return Promise.resolve(res)
      } else {
        return Promise.resolve(res)
      }
    })
  },
  // 获取手机验证码
  getPhoneCode: function({ commit }, payload) {
    console.log(JSON.stringify(payload))
    let url = ''
    if(payload.types == 'reBindPhone'){
      url = '/dws/uas/portal/getSmsVcode3'
    }else if(payload.types == 'register'){
      url = '/dws/uas/register/getSmsVcode'
    }else if(payload.types == 'registerReset'){
      url = '/dws/uas/register/getSmsVcode2'
    }else if(payload.types == 'forgetPwd'){
      url = '/dws/uas/login/getSmsVcode4'
    }
    return callApi(url, 'POST', payload).then(res => {
      if (res.success) {
        return Promise.resolve(res)
      } else {
        return Promise.resolve(res)
      }
    })
  },
  // 获取手机验证码
  getPCodeBindCa: function({ commit }, payload) {
    return callApi('/dws/uas/ca/smsCode', 'POST', payload).then(res => {
      if (res.success) {
        return Promise.resolve(res)
      } else {
        return Promise.resolve(res)
      }
    })
  },
  // 提交注册
  register: function({ commit }, payload) {
    let api = '/dws/uas/register/dis'
    if (payload.regState === 'hos') {
      // 医疗机构
      api = '/dws/uas/register/hos'
    } else if (payload.regState === 'update') {
      api = '/dws/uas/register/modify_dis'
      payload.username = document.getElementById("username").innerText
    } else if (payload.regState === 'updatehos') {
      api = '/dws/uas/register/modify_hos'
      payload.username = document.getElementById("username").innerText
    }
    return callApi(api, 'POST', payload).then(res => {
      // console.log('add', res)
      if (res.success) {
        commit({
          type: types.REG_USER,
          content: res.content
        })
        return Promise.resolve(res)
      } else {
        return Promise.reject(res)
      }
    })
  },
  getOrgInfo({ commit }, payload) {
    let url = '/dws/uas/register/view_dis'
    /*医疗机构*/
    if(payload.mode){
      url = '/dws/uas/register/view_hos'
    }
    return callApi(url, 'POST', payload).then(
      res => {
        if (res.success) {
          return Promise.resolve(res)
        } else {
          return Promise.reject(res)
        }
      }
    )
  },
  // 重新提交注册信息 x
  resubmit: function({ commit }, payload) {
    return callApi('/portal/org/orgUpdate', 'POST', payload, true).then(res => {
      if (res.success) {
        commit({
          type: types.REG_TOKEN,
          content: res.content
        })
        return Promise.resolve(res.success)
      } else {
        return Promise.reject(res)
      }
    })
  },
  //  获取阿里云地址 x
  /**
   * @author zhengzz
   * @param commit
   * @param payload 空
   */
  getOssUrl({ commit }, payload) {
    callApi('/portal/comm/getOssAddress', 'POST', payload).then(res => {
      if (res.success) {
        commit({
          type: types.OSSURL,
          content: res.content.ossUrl
        })
      }
    })
  },
  // 请求机构状态 x
  getOrgStatus({ commit }) {
    return callApi('/dws/uas/register/audit', 'POST', {}, true).then(res => {
      //alert(JSON.stringify(res))
      if (res.success) {
        commit({
          type: types.ORG_STATUS,
          content: res.content
        })
        return Promise.resolve(res.success)
      }
    })
  },
  // 撤回注册信息
  withdraw({ commit }, payload) {
    return callApi('/portal/api/auth/reg/cancel', 'POST', {}, true).then(
      res => {
        if (res.success) {
          return Promise.resolve(res)
        } else {
          return Promise.reject(res)
        }
      }
    )
  },
  // // 应用开通撤回 zhengzz
  // dredgeRecall({ commit }, payload) {
  //   return callApi('app/appWithDraw', 'POST', payload, true)
  //     .then((res) => {
  //       if (res.success) {
  //         return Promise.resolve(res)
  //       }
  //     })
  // },
  // 开通状态页面数据
  getAppList({ commit }) {
    return callApi('/portal/app/getAppList', 'POST', {}, true).then(res => {
      if (res.success) {
        commit({
          type: types.GET_APP_LISTS,
          content: res.content
        })
        return Promise.resolve(res.success)
      }
    })
  },
  // 提交/保存 耗材产品申报服务授权资料
  /**
   * @author zhengzz
   * @param commit
   * @param payload  保存/提交耗材产品申报服务授权资料数据
   * @returns {PromiseLike<T> | Promise<T> | *}
   */
  submitProductDeclare({ commit }, payload) {
    return callApi(payload.url, 'POST', payload.content, true).then(res => {
      if (res.success) {
        return Promise.resolve(res)
      } else {
        return Promise.reject(res)
      }
    })
  },
  // 查询applist状态
  getAppApplyStatus({ commit }, payload) {
    return callApi('/portal/app/getAppApplyStatus', 'POST', payload, true).then(
      res => {
        if (res.success) {
          commit({
            type: types.GET_APP_STATUS,
            content: res.content
          })
          return Promise.resolve(res.content)
        }
      }
    )
  },
  saveAppId({ commit }, payload) {
    commit({
      type: types.APP_ID,
      content: payload
    })
  },
  // 未登陆情况头部尾部信息
  gethfUnLoginInfo({ commit }, payload) {
    return callApi('/dws/uas/login/entry', 'POST', payload, true).then(
      res => {
        if (res.success) {
          commit({
            type: types.ENTRY,
            content: res.content
          })
          return Promise.resolve(res.content)
        }else{
          return Promise.reject(res.content)
        }
      }
    )
  },
  // 注册成功撤回
  revoke({ commit }, payload) {
    return callApi('/dws/uas/register/revoke', 'POST', payload, true).then(
      res => {
        if (res.success) {
          return Promise.resolve(res.content)
        }
      }
    )
  },
  //获取potal信息
  gtPortalInfo({ commit }, payload) {
    return callApi('/dws/uas/portal/apps/mock', 'POST', payload, true).then(
      res => {
        if (res.success) {
          return Promise.resolve(res.content)
        }else{
          return Promise.reject(res.content)
        }
      }
    )
  },
  //登录用户修改密码
  updatePwds({ commit }, payload) {
    return callApi('/dws/uas/portal/uppwd', 'POST', payload, true).then(
      res => {
        if (res.success) {
          return Promise.resolve(res)
        }else{
          return Promise.resolve(res)
        }
      }
    )
  },
  // 校验图片验证码
  verifPicCode: function({ commit }, payload) {
    return callApi('/dws/pub/vcode/img/valid?vcode='+payload.code, 'POST', payload).then(res => {
      if (res.success) {
        return Promise.resolve(res)
      } else {
        return Promise.resolve(res)
      }
    })
  },
  //获取随机数
  getRandom: function({ commit }, payload) {
    return callApi('/dws/uas/ca/randomNum', 'POST', payload).then(res => {
      //alert(res)
      if (res.success) {
        return Promise.resolve(res)
      } else {
        return Promise.resolve(res)
      }
    })
  },
  //CA登陆
  caLogins: function({ commit }, payload) {
    return callApi('/dws/uas/ca/login', 'POST', payload).then(res => {

      if (res.success) {
        return Promise.resolve(res)
      } else {
        return Promise.reject(res)
      }
    })
  },
  //获取序列号
  getSerials: function({ commit }, payload) {
    return callApi('/dws/uas/ca/getCaInfo', 'POST', payload).then(res => {
      if (res.success) {
        return Promise.resolve(res)
      } else {
        return Promise.reject(res)
      }
    })
  },
  //portal页绑定CA
  bindCa: function({ commit }, payload) {
    console.log(payload)
    let url = ''
    if(payload.type == 'login'){
      url = '/dws/uas/ca/binding3'
    }else if(payload.type == 'portal'){
      url = '/dws/uas/ca/binding3'
    }
    return callApi(url, 'POST', payload).then(res => {
      if (res.success) {
        return Promise.resolve(res)
      } else {
        return Promise.reject(res)
      }
    })
  },
  //校验账号
  validUserName: function({ commit }, payload) {
    return callApi('/dws/uas/login/getuname', 'POST', payload).then(res => {
      if (res.success) {
        return Promise.resolve(res)
      } else {
        return Promise.reject(res)
      }
    })
  },
  //校验短信
  validMessFp: function({ commit }, payload) {
    return callApi('/dws/uas/login/checkvcode', 'POST', payload).then(res => {
      if (res.success) {
        return Promise.resolve(res)
      } else {
        return Promise.reject(res)
      }
    })
  },
  //判断是否绑定CA
  validBindCa: function({ commit }, payload) {
    return callApi('/dws/uas/ca/audit', 'POST', payload).then(res => {
      if (res.success) {
        return Promise.resolve(res)
      } else {
        return Promise.reject(res)
      }
    })
  },
  //用户基本资料获取
  userBaseM: function({ commit }, payload) {
    return callApi('/dws/uas/portal/user', 'POST', payload).then(res => {
      if (res.success) {
        return Promise.resolve(res)
      } else {
        return Promise.reject(res)
      }
    })
  },
  //获取手机号
  getMobile: function({ commit }, payload) {
    return callApi('/dws/uas/portal/getmobile', 'POST', payload).then(res => {
      if (res.success) {
        return Promise.resolve(res)
      } else {
        return Promise.reject(res)
      }
    })
  },
  //短信验证
  messageVali: function({ commit }, payload) {
    return callApi('/dws/uas/portal/verify', 'POST', payload).then(res => {
      if (res.success) {
        return Promise.resolve(res)
      } else {
        return Promise.reject(res)
      }
    })
  },
  //手机号重绑
  bindNewPhone: function({ commit }, payload) {
    return callApi('/dws/uas/portal/newmobile', 'POST', payload).then(res => {
      if (res.success) {
        return Promise.resolve(res)
      } else {
        return Promise.reject(res)
      }
    })
  }


}

export default actions
