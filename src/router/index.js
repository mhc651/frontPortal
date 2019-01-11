import Vue from 'vue'
import Router from 'vue-router'
import store from '../store'
// 懒加载组件
// 登录
// const Login = () => import('../views/Login/Index.vue')
// 忘记密码
 const NewPassword = () => import('../views/NewPassword/Index.vue')
// 忘记密码设置完成
const NewPasswordSuccess = () =>
  import('../views/NewPassword/NewPasswordSuccess.vue')
// // 注册
// const Register = () => import('../views/Register/Register.vue')
// // 注册成功
// const RegisterSuccess = () =>
//   import('../views/RegisterSuccess/RegisterSuccess.vue')
// // 审核结果
const AppMain = () => import('../views/App/Index.vue')
const Review = () => import('../views/Review/index.vue')

Vue.use(Router)

//  验证token
function validateToken(to, from, next) {
  let token = sessionStorage.getItem('uuid')
  let app = store.state.app
  if (!token) {
    // 未登陆
    next('/login')
  }  else {
    next()
  }
}

function removeOrgStatus() {
  store.state.org_status = {}
}

const router = new Router({
  //mode: 'history',
  //base: '/portal/',
  scrollBehavior(to, from, savedPosition) {
    return { x: 0, y: 0 }
  },
  routes: [
    {
      path: '/',
      redirect: '/login'
    },
    {
      path: '/index.html',
      redirect: '/login'
    },
    // {
    //   path: '/fj.html',
    //   redirect: '/login'
    // },
    /**
     * 用户登录
     */
    {
      path: '/login',
      name: '登录',
      component: () => import('../views/Login/Index.vue')
    },

    {
      path: '/app',
      name: '应用中心',
      component: AppMain,
      beforeEnter:validateToken
    },

    // {
    //   path: '/app',
    //   name: '应用中心',
    //   component: AppMain,
    //   beforeEnter:validateToken
    // },

    /**
     * @author linsw
     * 设置新密码(手机验证)路由
     */
    {
      path: '/newpassword',
      name: '忘记密码',
      component: NewPassword
    },
    /**
     * @author linsw
     * 设置新密码(完成)路由
     */
    {
      path: '/newpasswordsuccess',
      name: '密码设置完成！',
      component: NewPasswordSuccess
    },
    /**
     * @author yuyan
     * 注册成功路由
     */
    {
      path: '/register-success',
      name: '注册成功',
      component: () => import('../views/RegisterSuccess/RegisterSuccess'),
      beforeEnter:validateToken
    },
    /**
     * @author qiu
     * 审核
     */
    {
      path: '/review',
      name: '审核结果',
      component: Review,
      beforeEnter:validateToken
      //component: () => import('../views/Review/index')
    },
    /**
     * 企业注册
     */
    {
      path: '/register',
      name: '企业注册',
      component: () => import('../views/Register/Register'),
    },
    /**
     * 医疗注册
     */
    {
      path: '/register1',
      name: '医疗机构注册',
      component: () => import('../views/Register/Register1'),
    },
    /**
     * 审核通过，企业管理单位绑定CA
     */
    {
      path: '/compBindCa',
      name: '企业管理单位绑定CA',
      component: () => import('../views/compBindCa/Index.vue'),
      //beforeEnter:validateToken
    },
    /**
     * 子账号绑定CA，Ukey未在系统注册
     */
    {
      path: '/sonBindCa',
      name: '子账号绑定CA',
      component: () => import('../views/sonBindCa/Index.vue'),
      //beforeEnter:validateToken
    }
  ]
})
// 全局路由守卫
router.beforeEach((to, from, next) => {
  // 设置title
  if(to.path == '/login'){
    store.state.org_status = {}
  }
  document.querySelector('title').innerText = to.name
  next()
})
export default router
