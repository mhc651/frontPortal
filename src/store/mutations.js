/**
 *  @file vuex 管理
 */
import * as types from './mutations-types'
const mutations = {
  // 框架数据
  [types.APPMODEL](state, payload) {
    state.pageModel = payload.content
  },
  // 应用列表 交换token
  [types.APPTOKEN](state, payload) {
    state.token = payload
    let obj = sessionStorage.getItem('_token')
    obj = JSON.parse(obj)
    obj.accessToken = payload.content
    obj = JSON.stringify(obj)
    sessionStorage.setItem('_token', obj)
  },
  // 应用状态
  [types.app_state](state, payload) {
    state.app.auditStatus = payload.content
  },
  // 应用列表
  [types.POR_APPS](state, payload) {
    state.pro_apps = payload.content
  },
  // 图片验证码
  [types.GET_QCODE](state, payload) {
    state.qcode = payload.content
  },
  // 登录信息
  [types.LOGIN](state, payload) {
    // 企业名称
    state.org_name = payload.content.orgName
    // 全部信息
    state.app = payload.content
    state.org_status = payload.content
    //if (!payload.content.token) return
    //保存token到缓存中
    // let data = payload.content
    // let obj = JSON.stringify({
    //   accessToken: data.token,
    //   app: {
    //     orgId: data.orgId,
    //     userId: data.userId,
    //     userRealName: data.userRealName,
    //     orgName: data.orgName
    //   }
    // })
    // sessionStorage.setItem('_token', obj)
  },
  // 登出
  [types.LOGINOUT](state, payload) {
    // console.log(types.LOGINOUT)
    // 企业名称
    state.org_name = ''
    // // 全部信息
    state.app = {}
    state.token = ''
    // 企业状态
    state.org_status = {}
    sessionStorage.removeItem('uuid')
    //localStorage.removeItem('vuex')
    // state.pro_apps = []
    //window.location.href = '/portal/login'
    //window.location.href = '/login'
  },
  // 注册成功保存用户状态
  [types.REG_USER](state, payload) {
    state.org_status = payload.content
    if (state.app) {
      state.app.auditStatus = payload.content.auditStatus
    }
    // console.log(1, state.org_status, payload)
  },
  // 刷新token
  [types.REG_TOKEN](state, payload) {
    state.app.token = payload.content
    //保存token到缓存中
    let obj = JSON.stringify({
      accessToken: payload.content
    })
    sessionStorage.setItem('_token', obj)
  },
  [types.ORG_STATUS](state, payload) {
    state.org_status = payload.content
    state.app.auditStatus = payload.content.auditStatus
  },
  [types.OSSURL](state, payload) {
    state.ossUrl = payload.content
  },
  [types.GET_APP_LISTS](state, payload) {
    state.appList = payload.content
  },
  // 获取app列表耗材申报状态、id查询
  [types.GET_APP_STATUS](state, payload) {
    state.app_list_status = payload.content.auditStatus
    state.app_list_id = payload.content.id
  },
  // 保存 appid
  [types.APP_ID](state, payload) {
    state.app_id = payload.content
  },
  // 应用服务开通从审核不通过中返回点击重新提交材料标识符
  [types.RESUBMIT_FROM_FAIL](state, payload) {
    state.resubmit_from_fail = payload
  },
  ['APP_PLACARD'](state, payload) {
    state.app_placard = payload.content
  },
  //未登陆情况页面头部尾部信息
  [types.ENTRY](state, payload) {
    state.entry = payload.content
  }

}

export default mutations
