

<style lang="scss" scoped>

.login {
  background: url('../../assets/images/login_bgn.jpg') center no-repeat;
  background-size: 1920px;
  background-position: center center;
}
.login .container {
  position: relative;
  height: 100%;
}
// 内容
.login-main {
  position: absolute;
  right: 0;
  top: 50%;
  transform: translateY(-50%);
  border-radius: 10px;
  width: 398px;
  height: 368px;
  box-shadow: 0 0 5px 1px rgba(0, 0, 0, 0.1);
  background: rgba(255, 255, 255, 1);
  .tabs {
    margin-bottom: 20px;
    span {
      border-right: 1px solid #dfdfdf;
      font-size: 18px;
      color: #606266;
      display: inline-block;
      padding-right: 18px;
      cursor: pointer;
      font-weight: bold;
      &:hover {
        color: #398bf1;
      }
      &:last-child {
        padding-left: 18px;
        border: 0;
      }
    }
    span.active {
      color: #398bf1;
    }
  }
  .ivu-form-item {
    margin-bottom: 25px;
  }
  .login_btn,
  .input {
    height: 40px;
    font-size: 14px;
    //box-shadow: 0 0 100px 2px rgba(0, 0, 0, 0.1);
  }



}
.form-group {
  margin-bottom: 15px;
}

.form-control {
  height: 44px;
}

.input_remove {
  cursor: pointer;
  pointer-events: auto;
  top: 7px;
  right: 7px;
  width: 30px;
  height: 30px;
  line-height: 30px;
  border-radius: 50%;
  background-color: rgba(200, 200, 200, 0.2);
  font-size: 11px;
}

.from_code {
  width: 124px;
  height: 40px;
  float: right;
  overflow: hidden;
  cursor: pointer;
}
// 忘记密码
.form-checkbox {
  input {
    vertical-align: top;
  }
  label {
    color: #1686ea;
    cursor: pointer;
    font-weight: normal;
  }
  a {
    color: #000;
    float: right;
    &:hover {
      color: #1686ea;
      text-decoration: none;
    }
  }
}
// 注册
.a_register {
  text-align: center;
  a {
    border: 1px solid #1686ea;
    display: inline-block;
    padding-left: 15px;
    padding-right: 15px;
    height: 30px;
    line-height: 28px;
    border-radius: 15px;
    margin-left: 5px;
    &:hover {
      text-decoration: none;
      color: #1686ea;
    }
  }
}
// CA
.login-ca {
  height: 200px;
  background: #FAFAFA;
  margin-bottom: 28px;
  padding: 20px;
}

.login_ca_p {
  padding: 0 26px;
  text-align: center;
  font-size: 14px;
}

.login-error {
  color: red;
  font-size: 14px;
  text-align: center;
  height: 30px;
  line-height: 30px;
}
</style>
<style lang="scss">
.login {
  .ivu-tabs-nav {
    width: 100%;
  }
  .ivu-tabs-tabpane {
    padding: 0 20px 20px 20px;
  }
  .ivu-tabs-bar .ivu-tabs-tab {
    width: 50%;
    padding: 13px;
    margin-right: 0;
    text-align: center;
    font-weight: bold;
    font-size: 20px;
    //box-shadow: 0 -10px 25px 5px rgba(0, 0, 0, 0.1) inset;
    background-image: url("../../assets/images/ilgbk.png");
    background-repeat: repeat-x;
    border-radius: 10px;
    border:1px solid #DCDFE6;
    height: 53px;
    border-bottom-left-radius: 0;
    border-bottom-right-radius: 0;
    border-top: none;
  }

  .nav-text div:nth-child(3){
    border-top-left-radius: 0;
    margin-right: -1px;
    border-right: none;
    margin-bottom: 2px;
  }
  .nav-text div:nth-child(2){
    border-top-right-radius: 0;
    border-left: none;
    margin-bottom: 2px;
  }
  .ivu-tabs-tab.ivu-tabs-tab-active {
    //box-shadow: none;
    background:url(#);
    border:none;
  }
  .ivu-tabs-bar {
    border: 0 none;
    margin-bottom: 25px;
  }
  .ivu-tabs-ink-bar {
    height: 0;
    display: none;
  }
  .fgpw{
    float: right;
    margin: -30px 10px 0 0;
    position: relative;
    z-index: 10;
    border-left: 1px solid #E4E7ED;
    height: 20px;
    line-height: 20px;
    padding-left: 10px;
  }
  .bkm{
    position: absolute;
    left: 0;
    top: 50%;
    transform: translateY(-50%);
    width: 780px;
  }
  .ysAccount{
    position: absolute;
    right: 470px;
    top: 50%;
    transform: translateY(-50%);
    width: 398px;
    z-index: 100;
    height: 368px;
    background-color: #FFFFFF;
    border-radius: 8px;
  }
  .h40{
    height: 40px;
    text-align: center;
    color: #303133;
    font-size: 16px;
    font-weight: bold;
    border-bottom: 1px solid #EBEEF5;
    line-height: 40px;
  }
  ul{
    list-style: none;
  }
  li{
    float: left;width: 50%;height: 82px;line-height: 82px;text-align: center;font-size: 16px;cursor: pointer;color: #303133;
  }
  li:hover{
    background-color: #F5F7FA;
    color: #1686EA;
  }
  .libr{
    border-right: 1px solid #EBEEF5;
  }
  .libb{
    border-bottom: 1px solid #EBEEF5;
  }
  .ysAccountBtn{
    margin-top:1px;width: 135px;height: 29px;border: #DCDFE6;border-top: none;background-color: #FFF;color: #303133;position: absolute;
    right: 120px;border-radius: 4px;text-align: center;line-height: 29px;border-top-left-radius:0;
    border-top-right-radius:0;cursor: pointer;
  }
}
.ivu-input {
  box-shadow: 0px 2px 3px 0px #eee inset;
}

.register-model .ivu-btn-text,.register-model  .ivu-btn-primary {
  display: none;
}
.calogintip{font-size: 14px;color: #606266;margin: 40px auto 0 auto;}
.caerror{font-size: 12px;margin: 0 auto;color:#E83611;min-width: 200px;text-align: center}
.caloginbtn{width: 270px;margin: 0px auto 0 auto;}

</style>


<template>
<section class="login container--fluid" style="overflow: hidden">
  <div class="container ">
    <img class="bkm" src="../../assets/images/bkm.png">
    <div class="ysAccount" v-if="ysshow">
      <div class="h40">演示账号</div>
      <ul>
        <li class="libr libb" @click="ysTLogin('admin@00000201')">国家医保局人员</li>
        <li class="libr libb" @click="ysTLogin('admin@00000501')">生产企业人员</li>
        <li class="libr libb" @click="ysTLogin('admin@00000301')">省级医保局人员</li>
        <li class="libr libb" @click="ysTLogin('admin@00000701')">医疗机构人员</li>
        <li class="libr libb" @click="ysTLogin('admin@00000401')">市级医保局人员</li>
        <li class="libr libb" @click="ysTLogin('admin@00000601')">配送企业人员</li>
        <li class="libr libb" @click="ysTLogin('admin@00000101')">平台运营人员</li>
        <li class="libr libb"></li>
      </ul>
    </div>
    <div class="login-main">
      <Tabs  :value="tagsname">
        <TabPane label="账号登录" name="name1">
            <Form ref="formInlines" :model="formInline" :rules="ruleInline" >
              <FormItem prop="user">
              <Input class="input" v-model="formInline.user" placeholder="账号"/>
              </FormItem>
              <FormItem prop="password">
              <Input class="input" v-model="formInline.password" type="password" placeholder="请输入密码"/>
                <div class="fgpw"><router-link class="pull-right" to="/newpassword">忘记密码</router-link></div>
              </FormItem>
              <FormItem prop="code">
              <Input class="input" v-model="formInline.code" placeholder="输入验证码" style="width: 220px"/>
                <!--<img @click="handleRefreshCode" :src="qcode.data" alt="" class="from_code">-->
                <!--<img @click="handleRefreshCode" id="verify" class="from_code" src='/dws/pub/vcode?sessionKey=11' />-->
                <img @click="handleRefreshCode" width="80" height="30" :src="'/dws/pub/vcode/img'" class="from_code" id="verify"/>
              <!--<a href="#" class="from_code">验证码</a>-->
              </FormItem>
            <!--<div class="form-group form-checkbox clearfix">-->
              <!--<label class="pull-left">-->
                <!--<Checkbox v-model="single"> 记住登录状态</Checkbox>-->
              <!--</label>-->
               <!--<router-link class="pull-right" to="/newpassword">忘记密码 ？</router-link>-->
            <!--</div>-->
              <div class="login-error" v-if="login_error">
                {{ login_error }}
              </div>
              <FormItem>

              <Button :disabled='post' class="login_btn" type="primary" size="large" long @click="handleSubmit('formInlines')" @keyup.enter="handleSubmit('formInlines')">
                立即登录
              </button>
              </FormItem>
            <!-- <div class="a_register">
              没有账号，我要
              <router-link to="/register">企业注册
                <Icon style="margin-left: 5px" type="arrow-right-c"></Icon>
              </router-link>
              <router-link to="/register?m=1">医疗机构注册
                <Icon style="margin-left: 5px" type="arrow-right-c"></Icon>
              </router-link>
            </div> -->
            </Form>
        </TabPane>
        <!-- ca -->
        <TabPane label="CA登录" name="name2">
            <div class="login-ca flex align-items--center">
              <div style="" class="calogintip">登录前请检查是否已安装CA证书客户端</div>
              <Button type="primary"  class="login_btn caloginbtn"  size="large" long @click="caLogin">
                立即登录
              </button>
              <div class="caerror">{{ca_error}}</div>
            </div>

            <!--<OBJECT id="obj" name="obj" classid="CLSID:093EA822-9C5D-4D46-883E-3421A93DCCF8" codebase="FJCAApi.ocx" style="LEFT: 0px; TOP: 0px" height="12" width="12"></OBJECT>-->
            <p class="login_ca_p">首次登录时，请下载并安装 “<a href="#" style="color: #1686EA">CA证书客户端</a>” 仅支持IE浏览器</p>
        </TabPane>
      </Tabs>
      <!-- ca end-->
      <div class="ysAccountBtn" @click="ysLogin">演示账号</div>
    </div>

  </div>
</section>
</template>
<script>
import { mapActions, mapState } from 'vuex'
import uuids from '../../assets/js/common'
export default {
  name: 'Login',
  computed: {
    ...mapState(['qcode'])
  },
  data() {
    return {
      ysshow: false,
      tagsname:'name1',
      ca_error:'',
      post: false,
      serRandom: 123,
      sessionKey: '110',
      // login data
      formInline: {
        user: '',
        password: '',
        code: ''
      },
      code_error:'',
      // 错提示
      login_error: '',
      // login validate
      ruleInline: {
        user: [
          { required: true, message: '请输入账号', trigger: 'blur' }
        ],
        password: [{ required: true, message: '请输入密码', trigger: 'blur' }],
        code: [{ required: true, message: '请输入验证码', trigger: 'blur' }]
      }
    }
  },
  mounted() {
    this.sessionKey = this.mathRandow()
    this.handleRefreshCode()
  },
  created() {
    this.toTabPane2()
  },
  methods: {
    ...mapActions(['getqcode', 'login', 'verifPicCode', 'getRandom', 'caLogins', 'getOrgStatus', 'ysTlogin']),
    ysLogin() {
      if(this.ysshow==false){
        this.ysshow = true
      }else {
        this.ysshow = false
      }
    },
    ysTLogin(uname) {
      console.log("user is: "+uname)
      const now_uuid = uuids.reuuid()
      if(sessionStorage.getItem("uuid")==null){
        sessionStorage.setItem("uuid",now_uuid)
      }
      this.ysTlogin({
        // 帐号
        username: uname
      }).then(
        res => {
          if (res) {
            switch (res.status) {
              case 'ORG_NOT_AUDIT_PASS':/*机构还未审核通过*/
                if(res.org_type=='HOS'){ /*医疗机构*/
                  this.$router.push('/review?mode=1')
                }else if(res.org_type=='DIS'){/*生产企业*/
                  this.$router.push('/review?mode')
                }
                //this.$router.push('/resubmitInfo')
                break
              case 'ORG_NOT_COMMIT_APPLY':/*机构还未提交审核*/
                if(res.org_type=='HOS'){ /*医疗机构*/
                  this.$router.push('/register1?reset=1&flag=0')
                }else if(res.org_type=='DIS'){/*生产企业*/
                  this.$router.push('/register?reset=1&flag=0')
                }
                //this.$router.push('/auditcheck')
                break
              case 'ORG_AUDIT_PASS':/*机构已审核通过*/
                this.$router.push('/app')
                break
              case 'NOT_BINDING_CA':/*管理单位生产企业审核通过未绑定CA*/
                this.$router.push('/compBindCa')
                break
              default:
              //this.$router.push('/review')
            }
          }
        },
        err => {
          if(err){
            switch (err.errcode) {
              case 'NOT_BINDING_CA':/*管理单位生产企业审核通过未绑定CA*/
                this.$router.push('/compBindCa')
                break
              default:
              //this.$router.push('/review')
            }
          }
        }
      )

    },
    toTabPane2() {
      let tag = this.$route.query.tag;
      if(tag=='ca'){
        this.tagsname = 'name2'
      }
    },
    mathRandow() {
      var s = [];
      var hexDigits = "0123456789abcdef";
      for (var i = 0; i < 36; i++) {
        s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
      }
      s[14] = "4";
      s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1);
      s[8] = s[13] = s[18] = s[23] = "-";
      var uuid = s.join("");
      return uuid;
    },
    handleRefreshCode() {
      document.getElementById("verify").src = "/dws/pub/vcode/img?sessionKey ="+ this.mathRandow()
    },
    loginInfo() {
      const now_uuid = uuids.reuuid()
      if(sessionStorage.getItem("uuid")==null){
        sessionStorage.setItem("uuid",now_uuid)
      }
      this.login({
        // 帐号
        username: this.formInline.user,
        // 用户填写的验证码
        vcode: this.formInline.code,
        // 验证码的标识
        //vcodekey: this.qcode.key,
        // 密码
        password: this.formInline.password
      }).then(
        res => {
          if (res) {
            switch (res.status) {
              case 'ORG_NOT_AUDIT_PASS':/*机构还未审核通过*/
                if(res.org_type=='HOS'){ /*医疗机构*/
                  this.$router.push('/review?mode=1')
                }else if(res.org_type=='DIS'){/*生产企业*/
                  this.$router.push('/review?mode')
                }
                //this.$router.push('/resubmitInfo')
                break
              case 'ORG_NOT_COMMIT_APPLY':/*机构还未提交审核*/
                if(res.org_type=='HOS'){ /*医疗机构*/
                  this.$router.push('/register1?reset=1&flag=0')
                }else if(res.org_type=='DIS'){/*生产企业*/
                  this.$router.push('/register?reset=1&flag=0')
                }
                //this.$router.push('/auditcheck')
                break
              case 'ORG_AUDIT_PASS':/*机构已审核通过*/
                this.$router.push('/app')
                //this.$router.push('/reviewing')
                break
              case 'NOT_BINDING_CA':/*管理单位生产企业审核通过未绑定CA*/
                this.$router.push('/compBindCa')
                break
              default:
                //this.$router.push('/review')
            }
          }
        },
        err => {
          if(err){
            switch (err.errcode) {
              case 'NOT_BINDING_CA':/*管理单位生产企业审核通过未绑定CA*/
                this.$router.push('/compBindCa')
                break
              default:
                //this.$router.push('/review')
            }
          }
          this.post = false
          // 提示错误
          this.login_error = err.errmsg
          this.handleRefreshCode()
        }
      )
    },
    // 登录
    handleSubmit(name) {
      this.$refs[name].validate(valid => {
          // 提交拦截
        if (valid) {
          this.post = true
          this.verifPicCode({code:this.formInline.code}).then(res => {
            if(res.success){
              this.loginInfo()
            }else {
              this.login_error = res.errmsg
              this.post = false
            }
          })

        }

      })
    },
    getCertBsf() {
      var textCertID="";
      var ret = obj.SOF_Login('','');
      if (ret != 0)
      {
        this.ca_error = "未检测到UKey或Ukey未登陆"
        //alert(obj.SOF_GetReturnString());
        return;
      }
      var ret = obj.SOF_GetUserList();
      if (ret == "")
      {
        //alert(obj.SOF_GetReturnString());
        return;
      }
      var len = ret.length;
      var len2 = '38';
      var str2 = ret.substr(len-len2,len2);
      textCertID = str2;
      var ret = obj.SOF_ExportUserCert(textCertID);
      if (ret == "")
      {
        //alert(obj.SOF_GetReturnString());
        return;
      }
      var sign = obj.SOF_SignData(textCertID, this.serRandom);
      if (sign == "")
      {
        //alert(obj.SOF_GetReturnString());
        return;
      }
       let params = {
        strData: this.serRandom,
        strSign: sign,
        strCert: ret,
      }
      return params
    },
    caLogin() {
      var objks = document.getElementById("obj");
      if (objks == null || objks.object == null){
        this.ca_error = "您未使用新版证书或未正确安装证书驱动";
        return false;
      } else {
        this.ca_error = "";
      }
      const now_uuid = uuids.reuuid()
      if(sessionStorage.getItem("uuid")==null){
        sessionStorage.setItem("uuid",now_uuid)
      }
      this.getRandom().then(res => {
        this.serRandom = res.content
        let updata = this.getCertBsf()
        //updata.testExpired = true
        console.log("ca登陆上传参数: "+JSON.stringify(updata))
        if(updata){
          this.caLogins(updata).then(
            res => {
              console.log(JSON.stringify(res))
              if(res.success){
                this.getOrgStatus().then(res => {
                  console.log("orgstatus: "+JSON.stringify(res))
                })
                this.$router.push('/app')
              }
            },
            err => {
              console.log(err)
              if(err.errcode=='CA_CERT_UNBINDING'){
                this.ca_error = "“UKey”未在系统注册！";
              }else if(err.errcode=='CA_CERT_EXPIRED'){
                this.ca_error = "UKey证书已过期";
              }else if(err.errcode=='CA_ERROR_LOGIN'){
                this.ca_error = "登录KEY出错！";
              }else if(err.errcode=='CA_CERT_ERROR'){
                this.ca_error = "证书错误！";
              }else if(err.errcode=='USER_DISABLED'){
                this.ca_error = "用户被禁用";
              }else if(err.errcode=='ORG_NOT_FOUND'){
                this.ca_error = "机构不存在";
              }else if(err.errcode=='ORG_NOT_VALID'){
                this.ca_error = "机构已过期";
              }else if(err.errcode=='ORG_FORBIDED'){
                this.ca_error = "机构被禁用";
              }
              //console.log(JSON.stringify(res))
            }
          )
        }
      })
    },
    getServerRandom() {
      this.getRandom().then(res => {
        console.log(JSON.stringify(res))
      })
    }
  }
}
</script>
<style lang="scss" scoped src="./login.scss" ></style>
