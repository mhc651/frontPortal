<template>
<div class="container--fluid">
    <div class="main" id="fpw">
      <!-- 表单 -->
       <Form ref='formValidate' :model='formValidate' :rules='ruleValidate' :label-width='245'>
         <table class="ititle">
           <thead>
            <th  class="nowC comC" :class="classNow" v-if="ind==0? classNow='nowC': classNow='passC'"><div>1</div><span>填写账户名</span></th>
             <th  class="defaultC comC" id="twoth"><div>2</div><span>验证身份</span></th>
            <!--<th  class="nowC comC" :class="classNow" v-if="ind==1? classNow='nowC': classNow='passC'"><div>1</div><span>选择账户类型</span></th>-->
             <th  class="defaultC comC" id="threeth"  ><div>3</div><span>设置新密码</span></th>
             <th  class="defaultC comC"   id="four"><div>4</div><span>重置成功</span></th>
           </thead>
         </table>
       <div class="mt60">
         <div v-if="ind==0">
           <inputItem
             :labelVal='{label:"账号"}'
             :model='formValidate'
             prop='username'
             ref='username'
             plh=" 请输入登录账号"
           />
         </div>
         <div v-if="ind==1">

           <div class='verificationCode publicInput'>
             <FormItem label='用户名：' prop='username' class='formItem'>
               <label class='rightTip text-center lh40'>{{formValidate.username}}</label>
             </FormItem>
           </div>
           <div class='verificationCode publicInput'>
             <FormItem label='企业名称：' prop='orgname' class='formItem'>
               <label class='rightTip text-center lh40'>{{formValidate.orgname}}</label>
             </FormItem>
           </div>
           <div class='verificationCode publicInput'>
             <FormItem label='已验证手机：' prop='mobile' class='formItem'>
               <label class='rightTip text-center lh40'>{{formValidate.mobile}}</label>
             </FormItem>
           </div>


          <!-- 手机验证码 -->
          <div class='verificationCode publicInput'>
            <FormItem label='验证码：' prop='phoneCode' class='formItem'>
              <div class='NumCode'>
                <Input type='text' v-model='formValidate.phoneCode' placeholder="请输入验证码"/>
                <Button disabled v-show='disabledBtn'>{{time}}s后可重新获取</Button>
                <Button @click='getNumCode' v-show='!disabledBtn'>获取验证码</Button>
              </div>
              <label class='rightTip text-center'>请于2分钟内查收手机短信，并填写短信中的验证码</label>
            </FormItem>
          </div>
          <!-- 手机验证码 end-->

           <div class='verificationCode publicInput'>
             <FormItem  class='formItem'>
               <i class=" icon hx hx-hx_quangantanhao fzth"></i>
               <!--<lable class='rightTip text-center lh40'>没收到短信验证码</lable>-->
               <div class="ml210">没收到短信验证码</div>
               <div class="ml210">1、网络通讯异常可能会造成短信丢失，请重新获取或稍后再试。</div>
               <div class="ml210">2、请核实手机是否已欠费停机，或者屏蔽了系统短信。</div>
             </FormItem>
           </div>

         </div>
          <!-- passwork -->
         <div v-if="ind==2">

           <div class='verificationCode publicInput'>
             <FormItem label='用户名：' prop='username' class='formItem'>
               <label class='rightTip text-center lh40'>{{formValidate.username}}</label>
             </FormItem>
           </div>
           <div class='verificationCode publicInput'>
             <FormItem label='企业名称：' prop='orgname' class='formItem'>
               <label class='rightTip text-center lh40'>{{formValidate.orgname}}</label>
             </FormItem>
           </div>
           <div class='verificationCode publicInput'>
             <FormItem label='已验证手机：' prop='mobile' class='formItem'>
               <label class='rightTip text-center lh40'>{{formValidate.mobile}}</label>
             </FormItem>
           </div>
            <inputItem
              :labelVal='{label:"输入新密码",tip:"密码为6-20位英文字母、数字的组合"}'
              :model='formValidate'
              prop='password'
              inputType='password'
            />
            <inputItem
              :labelVal='{label:"确认新密码",tip:"请确保两次密码输入保持一致"}'
              :model='formValidate'
              prop='confirmPwd'
              inputType='password'
            />
         </div>
          <!-- passwork end-->
         <div v-if="ind==3">
           <div class="congr">恭喜您！密码设置成功，请重新登录！</div>
           <div class="relogin">系统将在<span class="textred">{{fsecond}}</span><span>秒后自动调整至登录页面，您可以选择直接登陆</span> <router-link class="pull-right relot" to="/login">返回登录</router-link></div>

         </div>
        </div>
      </Form>
      <!-- 表单 end-->
      <!-- sub -->
      <div class="registerWrap w1198">
      <!-- tip -->
      <p class='errRemind'>{{errMsg}}</p>
      <!-- tip end-->
       <Button v-if="ind==0 || ind==1 || ind==2" type='primary' class='registerBtn' @click='handleSubmit("formValidate")'>下一步</Button>
      </div>
      <!-- sub end-->
    </div>

</div>
</template>

<script>
// import Steps from "../../components/NewPasswordSteps";

import { mapActions, mapState } from 'vuex'
import inputItem from '../../components/complexInputItem'
import validatejs from '../../assets/js/validate'

export default {
  name: 'NewPassword',
  components: {
    inputItem
    // Steps
  },
  data: function() {
    /*
    *  确认密码验证
    * */
    const validatePassCheck = (rule, value, callback) => {
      if (value !== this.formValidate.password) {
        callback(new Error('密码和确认密码输入不一致'))
      } else {
        callback()
      }
    }

    return {
      ind: 0,
      fsecond: 5,
      ftimer: null,
      fsd: true,
      clientHeight: '500',
      src: '',
      disabledBtn: false,
      time: 180,
      timer: null,
      err: false,
      errMsg: '',
      reviewUrl: '', // 存放预览图片
      formValidate: {
        cardNo: '',
        phone: '',
        phoneCode: '',
        password: '',
        confirmPwd: '',
        username: '',
        orgname: '',
        realname: '',
        mobile: '',
        verification: ''
      },
      ruleValidate: {
        cardNo: [
          { required: true, message: '身份证号码不能为空', trigger: 'blur' },
          { validator: validatejs.validateIdCard, trigger: 'blur' }
        ],
        username: [
          { required: true, message: '账号不能为空', trigger: 'blur' },
        ],
        phoneCode: [
          { required: true, message: '验证码不能为空', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '密码不能为空', trigger: 'blur' },
          {
            type: 'string',
            min: 6,
            message: '密码为6-20位英文字母、数字的组合',
            trigger: 'blur'
          },
          {
            type: 'string',
            max: 20,
            message: '密码为6-20位英文字母、数字的组合',
            trigger: 'blur'
          }
        ],
        confirmPwd: [
          { required: true, message: '确认密码不能为空', trigger: 'blur' },
          { validator: validatePassCheck, trigger: 'blur' }
        ]
      }
    }
  },

  computed: {
    ...mapState(['app', 'qcode']),
  },

  methods: {
    ...mapActions(['getPhoneCode', 'getqcode', 'resetpwd', 'validatePhonefp', 'validMessFp', 'validUserName']),
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
    /*
    * 倒计时
    * */
    getNumCode: function() {
      let phoneReg = /(^1[3|4|5|7|8]\d{9}$)|(^09\d{8}$)/
      //if (phoneReg.test(this.formValidate.phone)) {
      this.disabledBtn = !this.disabledBtn
      this.time = 120
      clearInterval(this.timer)
      this.timer = null
      if (this.disabledBtn) {
        this.timer = setInterval(
          function() {
            this.time--
            if (this.time === 0) {
              this.disabledBtn = !this.disabledBtn
              this.time = 120
              clearInterval(this.timer)
            }
          }.bind(this),
          1000
        )
      }
      // 获得验证码
      this.getPhoneCode({
        username: this.formValidate.username,
        types: 'forgetPwd'
      }).then(res => {
        if (res.success) {
          // this.formValidate.uuid = res.content.uuid;
        }
      })

    },
    fiveCountd: function(){
      this.fsecond = 5
      clearInterval(this.ftimer)
      this.ftimer = null
      if(this.fsd){
        this.ftimer = setInterval(function(){
          this.fsecond--
          if(this.fsecond==0){
            clearInterval(this.ftimer);
            this.$router.push('/login')
          }
        }.bind(this),1000)
      }

    },

    /*
    * 注册提交
    * */
    handleSubmit: function(name) {
      this.$refs[name].validate(valid => {
        // 判断是否通过本地验证
        if (!valid) return
        if(this.ind==0){/*第一步提交*/
          let param = {
            username: this.formValidate.username,
          }

          this.validUserName(param).then(
            res => {
              console.log("res is" +res)
              if (res.success) {
                // 成功提醒
                this.ind=1
                document.getElementById("twoth").setAttribute("class","comC nowC");
                this.errMsg = ''
                this.formValidate.realname = res.content.realname
                this.formValidate.mobile = res.content.mobile
                this.formValidate.orgname = res.content.orgname
              }
            },err => {
              this.errMsg = err.errmsg
              console.log("err is "+err)
            }

          )
        }
        else if(this.ind==1){/*第2步提交*/
          let param = {
            username: this.formValidate.username,
            realname: this.formValidate.realname,
            orgname: this.formValidate.orgname,
            mobile: this.formValidate.mobile,
            verification: this.formValidate.phoneCode
          }

          this.validMessFp(param).then(
            res => {
              if (res.success) {
                // 成功提醒
                this.ind=2
                document.getElementById("twoth").removeAttribute("class","nowC");
                document.getElementById("twoth").setAttribute("class","comC passC");
                document.getElementById("threeth").setAttribute("class","comC nowC");
                this.errMsg = ''
              }
            },
            err => {
                this.errMsg = err.errmsg
                console.log("校验短信err is "+err)
            }
          )

        }else if(this.ind==2){
          let param = {
            username: this.formValidate.username,
            userpwd: this.formValidate.password,
            userpwd2: this.formValidate.confirmPwd // 请在之前调用发送短信验证码的接口向用户发送短信验证码,
          }
          //document.getElementById("twoth").setAttribute("class","comC passC");
          document.getElementById("threeth").setAttribute ("class","comC passC");
          document.getElementById("four").setAttribute ("class","comC nowC");
          this.resetpwd(param).then(res => {
            if (res.success) {
              this.ind = 3
              this.fiveCountd()
              document.getElementById("threeth").setAttribute ("class","comC passC");
              document.getElementById("four").setAttribute ("class","comC nowC");
              // 成功提醒
              this.errMsg = ''
            } else {
              // 失败提醒
              this.errMsg = res.errmsg
            }
          })
        }
      })
    },
    /*
    * 高度设置
    * */
    setHeight: function () {
      let clih = document.documentElement.clientHeight;
      if(clih<=768){
        this.clientHeight = '498px'
      }else{
        let fheight = document.getElementsByTagName("footer")[0].clientHeight
        console.log("footer height is: "+fheight)
        this.clientHeight = `${document.documentElement.clientHeight-fheight-91-30}px`;
      }
    }
  },

  mounted() {
    this.setHeight()
    const that = this
    window.onresize = function temp() {
      that.setHeight()
    }
  }
}
</script>
<style lang="scss" src="./NewPassword.scss" type="text/css"></style>
<style lang="scss" src="../Register/Register.scss" type="text/css"></style>
<style lang="scss" src="../../assets/iconfont/iconfont.css" ></style>
<style lang="scss" scoped>
.main{
  position: relative;
  left: 50%;
  top: 50%;
  transform: translateX(-50%) translateY(-50%);
  margin: 0;
}
.verificationCode label.rightTip.lh40 {
  line-height: 40px;
}
.fzth {
  float: left;
  font-size: 30px;
  margin-left: 212px;
}
.ml210{margin-left: 245px;}
.verificationCode label.rightTip{margin-left: 0}
.mt60{margin: 60px auto}
@media screen and (max-height: 768px) {
  .ivu-form-item {
    margin-bottom: 4px;
  }
  .ivu-form-item-error {
    margin-bottom: 14px;
  }
  .mt60{margin: 20px auto 10px auto}
}


</style>
